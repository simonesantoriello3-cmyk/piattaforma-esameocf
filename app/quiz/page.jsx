'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'

function mescolaOpzioni(domanda) {
  const opzioni = [
    { lettera: 'A', testo: domanda.risposta_a },
    { lettera: 'B', testo: domanda.risposta_b },
    { lettera: 'C', testo: domanda.risposta_c },
    { lettera: 'D', testo: domanda.risposta_d },
  ]
  for (let i = opzioni.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[opzioni[i], opzioni[j]] = [opzioni[j], opzioni[i]]
  }
  const testoCorretto = domanda[`risposta_${domanda.risposta_corretta}`]
  const letteraCorretta = opzioni.find(o => o.testo === testoCorretto)?.lettera || 'A'
  return { opzioni, letteraCorretta }
}

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function QuizInner() {
  const router = useRouter()
  const params = useSearchParams()
  const modalita = params.get('modalita') || 'esercitazione'
  const minuti = parseInt(params.get('minuti') || '85', 10)
  const soglia = parseInt(params.get('soglia') || '48', 10)
  const supabase = createClient()

  const [domande, setDomande] = useState([])
  const [indice, setIndice] = useState(0)
  const [risposte, setRisposte] = useState({})
  const [selezionata, setSelezionata] = useState(null)
  const [confermata, setConfermata] = useState(false)
  const [loading, setLoading] = useState(true)
  const [secondi, setSecondi] = useState(0)
  const [showModalUscita, setShowModalUscita] = useState(false)
  const [visibile, setVisibile] = useState(true)
  const timerRef = useRef(null)
  const concludiRef = useRef(false)

  useEffect(() => {
    async function carica() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const tuttiDomande = []
      let domandeErroriFrequenti = []

      if (modalita === 'esercitazione') {
        const { data: errori } = await supabase
          .from('progressi')
          .select('domanda_id')
          .eq('user_id', user.id)
          .eq('corretta', false)
        const conteggio = {}
        errori?.forEach(e => {
          conteggio[e.domanda_id] = (conteggio[e.domanda_id] || 0) + 1
        })
        domandeErroriFrequenti = Object.entries(conteggio)
          .sort((a, b) => b[1] - a[1])
          .map(([id]) => id)
      }

      if (modalita === 'simulazione') {
        // Distribuzione proporzionale OCF: 60 domande totali
        const distribuzione = [
          { nome: 'Diritto del mercato finanziario e degli intermediari', n: 24 },
          { nome: 'Matematica finanziaria, mercati e strumenti', n: 19 },
          { nome: 'Nozioni di diritto tributario', n: 6 },
          { nome: 'Nozioni di diritto previdenziale e assicurativo', n: 6 },
          { nome: 'Nozioni di diritto privato', n: 5 },
        ]
        const { data: materie } = await supabase.from('materie').select('id, nome')
        await Promise.all(distribuzione.map(async d => {
          const materia = materie?.find(m => m.nome === d.nome)
          if (!materia) return
          const { data } = await supabase
            .from('domande')
            .select('id, testo, risposta_a, risposta_b, risposta_c, risposta_d, risposta_corretta, pratico, materia:materie(id, nome)')
            .eq('materia_id', materia.id)
          if (data) tuttiDomande.push(...shuffleArray(data).slice(0, d.n))
        }))
      } else {
        // Esercitazione
        const selezione = JSON.parse(params.get('selezione') || '[]')
        const haPrioritaNuove = selezione.some(sel => sel.prioritaNuove)
        let domandeVisteIds = new Set()

        if (haPrioritaNuove) {
          const { data: progressi } = await supabase
            .from('progressi')
            .select('domanda_id')
            .eq('user_id', user.id)

          domandeVisteIds = new Set((progressi || []).map(p => p.domanda_id).filter(Boolean))
        }

        for (const sel of selezione) {
          const { data } = await supabase
            .from('domande')
            .select('id, testo, risposta_a, risposta_b, risposta_c, risposta_d, risposta_corretta, pratico, materia:materie(id, nome)')
            .eq('materia_id', sel.materiaId)
          let pool = data || []
          if (sel.prioritaNuove && haPrioritaNuove) {
            const poolNuove = pool.filter(d => !domandeVisteIds.has(d.id))

            if (poolNuove.length >= sel.numero) {
              pool = poolNuove
            }
          }
          if (sel.prioritaSbagliate && domandeErroriFrequenti.length > 0) {
            const sbagliate = pool.filter(d => domandeErroriFrequenti.includes(d.id))
            const altre = pool.filter(d => !domandeErroriFrequenti.includes(d.id))
            const sbagliateOrdinate = domandeErroriFrequenti.map(id => sbagliate.find(d => d.id === id)).filter(Boolean)
            pool = [...sbagliateOrdinate, ...shuffleArray(altre)]
          }
          const selezionate = sel.prioritaSbagliate ? pool.slice(0, sel.numero) : shuffleArray(pool).slice(0, sel.numero)
          tuttiDomande.push(...selezionate)
        }
      }

      const domandeTotali = shuffleArray(tuttiDomande)
      const arricchite = domandeTotali.map(d => {
        const { opzioni, letteraCorretta } = mescolaOpzioni(d)
        return { ...d, opzioni, letteraCorretta }
      })

      const arricchiteConPunti = modalita === 'simulazione'
        ? (() => {
            const duePuntiIds = new Set()
            const pratiche = arricchite.filter(d => d.pratico)
            pratiche.forEach(d => duePuntiIds.add(d.id))

            const altre = arricchite.filter(d => !d.pratico)
            const altreMescolate = shuffleArray(altre)
            altreMescolate.slice(0, Math.max(0, 40 - duePuntiIds.size)).forEach(d => duePuntiIds.add(d.id))

            return arricchite.map(d => ({ ...d, punti: duePuntiIds.has(d.id) ? 2 : 1 }))
          })()
        : arricchite.map(d => ({ ...d, punti: 1 }))

      setDomande(arricchiteConPunti)
      setLoading(false)
    }
    carica()
  }, [])

  useEffect(() => {
    if (modalita !== 'simulazione' || loading) return
    const durata = minuti * 60
    setSecondi(durata)
    timerRef.current = setInterval(() => {
      setSecondi(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          concludi(risposte, 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [loading, modalita, minuti])

  const domanda = domande[indice]

  function cambiaIndice(nuovoIndice, nuovaRisp = null, nuovaConf = false) {
    setVisibile(false)
    setTimeout(() => {
      setIndice(nuovoIndice)
      setSelezionata(nuovaRisp)
      setConfermata(nuovaConf)
      setVisibile(true)
    }, 150)
  }

  function conferma() {
    if (!selezionata) return
    const nuove = { ...risposte, [domanda.id]: selezionata }
    setRisposte(nuove)
    salvaProgresso(domanda.id, selezionata === domanda.letteraCorretta)
    if (modalita === 'esercitazione') {
      setConfermata(true)
    } else {
      if (indice + 1 >= domande.length) { concludi(nuove); return }
      cambiaIndice(indice + 1)
    }
  }

  async function salvaProgresso(domandaId, corretta) {
    if (modalita === 'simulazione') return
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('progressi').insert({ user_id: user.id, domanda_id: domandaId, corretta })
  }

  function avanti() {
    if (indice + 1 >= domande.length) { concludi(risposte); return }
    cambiaIndice(indice + 1)
  }

  function salta() {
    if (indice + 1 >= domande.length) { concludi(risposte); return }
    cambiaIndice(indice + 1)
  }

  async function concludi(r, secondiRimanenti = null) {
    if (concludiRef.current) return
    concludiRef.current = true
    clearInterval(timerRef.current)
    const secondiImpiegati = modalita === 'simulazione'
      ? (typeof secondiRimanenti === 'number' ? minuti * 60 - secondiRimanenti : minuti * 60 - secondi)
      : 0

    const risultati = {
      domande: domande.map(d => ({
        id: d.id, testo: d.testo,
        opzioni: d.opzioni,
        letteraCorretta: d.letteraCorretta,
        rispostaUtente: (r || risposte)[d.id] || null,
        materia: d.materia?.nome || '',
        pratico: d.pratico || false,
        punti: d.punti || 1,
      })),
      modalita, soglia, minuti, secondiImpiegati,
      data: new Date().toISOString(),
    }

    if (modalita === 'simulazione') {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const progressiDaSalvare = domande.map(d => ({
          user_id: user.id,
          domanda_id: d.id,
          corretta: (r || risposte)[d.id] === d.letteraCorretta,
        })).filter(p => (r || risposte)[p.domanda_id])
        if (progressiDaSalvare.length > 0) {
          await supabase.from('progressi').insert(progressiDaSalvare)
        }
      }
    }

    sessionStorage.setItem('FormazioneOCF_risultati', JSON.stringify(risultati))
    sessionStorage.removeItem('FormazioneOCF_sessione_salvata')
    router.push('/risultati')
  }

  function formatTimer(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0')
    const s = (sec % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  function classeOpzione(lettera) {
    const base = 'w-full text-left border-2 rounded-xl px-5 py-4 transition-all flex items-start gap-4 '
    if (!confermata) return base + (selezionata === lettera
      ? 'border-blue-500 bg-blue-50 text-blue-800'
      : 'border-gray-200 bg-white text-gray-800 hover:border-blue-300 cursor-pointer')
    if (lettera === domanda.letteraCorretta) return base + 'border-green-500 bg-green-50 text-green-800'
    if (lettera === selezionata) return base + 'border-red-400 bg-red-50 text-red-800'
    return base + 'border-gray-200 bg-gray-50 text-gray-400'
  }

  const progresso = domande.length > 0 ? ((indice + 1) / domande.length) * 100 : 0

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Caricamento domande…</p>
      </div>
    </div>
  )

  if (!domanda) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-gray-500">Nessuna domanda trovata.</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Modal uscita simulazione */}
      {showModalUscita && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <div className="text-3xl mb-3 text-center">⚠️</div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Vuoi uscire dalla simulazione?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">I progressi di questa sessione non verranno salvati.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowModalUscita(false)} className="flex-1 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 text-sm">
                Continua
              </button>
              <button onClick={() => router.push('/dashboard')} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl text-sm">
                Esci
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <div className="bg-white border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => {
              if (modalita === 'simulazione') setShowModalUscita(true)
              else { if (confirm('Vuoi uscire? I progressi non verranno salvati.')) router.back() }
            }}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center text-sm transition-colors"
          >
            ✕
          </button>
          <div className="flex-1 text-center">
            <span className="text-xs font-semibold text-blue-700 tracking-wide uppercase">
              {modalita === 'simulazione' ? '🎯 Simulazione OCF' : '📚 Esercitazione'}
            </span>
          </div>
          {modalita === 'simulazione' ? (
            <span className={`font-mono text-sm font-bold px-3 py-1 rounded-full ${secondi < 300 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-blue-100 text-blue-700'}`}>
              ⏱ {formatTimer(secondi)}
            </span>
          ) : (
            <div className="w-8" />
          )}
        </div>
      </div>

      {/* Contenuto con animazione */}
      <div
        className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-8 transition-opacity duration-150"
        style={{ opacity: visibile ? 1 : 0 }}
      >
        {domanda.materia?.nome && (
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 self-start">
            {domanda.materia.nome}
          </span>
        )}

        <h2 className="text-lg font-semibold text-gray-900 leading-relaxed mb-8">{domanda.testo}</h2>

        <div className="space-y-3 mb-8">
          {domanda.opzioni.map(({ lettera, testo }) => (
            <button
              key={lettera}
              onClick={() => !confermata && setSelezionata(lettera)}
              disabled={confermata}
              className={classeOpzione(lettera)}
            >
              <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {['A','B','C','D'][domanda.opzioni.indexOf(domanda.opzioni.find(o => o.lettera === lettera))]}
              </span>
              <span className="text-sm leading-relaxed">{testo}</span>
              {confermata && lettera === domanda.letteraCorretta && <span className="ml-auto text-green-600 text-lg">✓</span>}
              {confermata && lettera === selezionata && lettera !== domanda.letteraCorretta && <span className="ml-auto text-red-500 text-lg">✗</span>}
            </button>
          ))}
        </div>

        {/* Feedback esercitazione */}
        {confermata && modalita === 'esercitazione' && (
          <div className={`rounded-xl px-5 py-4 mb-6 border text-sm font-medium ${selezionata === domanda.letteraCorretta ? 'bg-green-50 border-green-300 text-green-800' : 'bg-red-50 border-red-300 text-red-800'}`}>
            {selezionata === domanda.letteraCorretta
              ? '✓ Risposta corretta!'
              : `✗ Risposta errata. Corretta: ${domanda.opzioni.find(o => o.lettera === domanda.letteraCorretta)?.testo}`}
          </div>
        )}

        {/* Barra progresso */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{indice + 1} / {domande.length}</span>
            <span>{Math.round(progresso)}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progresso}%` }} />
          </div>
        </div>

        {/* Bottoni azione */}
        <div className="flex gap-3">
          {!confermata && modalita === 'esercitazione' && (
            <button onClick={salta} className="px-5 py-3 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 text-sm">
              Salta
            </button>
          )}
          {!confermata ? (
            <button
              onClick={conferma}
              disabled={!selezionata}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-300 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {modalita === 'esercitazione' ? 'Conferma' : 'Avanti →'}
            </button>
          ) : (
            <button onClick={avanti} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
              {indice + 1 >= domande.length ? 'Vedi risultati →' : 'Prossima →'}
            </button>
          )}
        </div>

        {/* Navigazione rapida simulazione */}
        {modalita === 'simulazione' && (
          <div className="mt-10">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">Navigazione rapida</p>
            <div className="flex flex-wrap gap-1.5">
              {domande.map((d, i) => (
                <button
                  key={d.id}
                  onClick={() => cambiaIndice(i, risposte[d.id] || null, false)}
                  className={`w-7 h-7 rounded-md text-xs font-semibold ${i === indice ? 'bg-blue-600 text-white' : risposte[d.id] ? 'bg-blue-400 text-white' : 'bg-gray-100 text-gray-500'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => concludi(risposte)}
              className="mt-4 w-full border border-red-300 text-red-600 hover:bg-red-50 font-semibold py-2.5 rounded-xl text-sm transition-colors"
            >
              Termina e vedi risultati
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <QuizInner />
    </Suspense>
  )
}
