'use client'

import { useState, useEffect, useCallback, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'

function QuizInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const modalita = searchParams.get('modalita')
  const minuti = parseInt(searchParams.get('minuti') || '85')
  const soglia = parseInt(searchParams.get('soglia') || '48')

  const [domande, setDomande] = useState([])
  const [indice, setIndice] = useState(0)
  const [risposte, setRisposte] = useState({})
  const [loading, setLoading] = useState(true)
  const [secondiRimasti, setSecondiRimasti] = useState(minuti * 60)
  const [finito, setFinito] = useState(false)
  const [secondiImpiegati, setSecondiImpiegati] = useState(0)
  const [animazione, setAnimazione] = useState('') // 'slide-in' | 'slide-out'
  const secondiImpiegatiRef = useRef(0)

  // Mescola le opzioni di risposta mantenendo traccia della corretta
  function mescolaRisposte(domanda) {
    const opzioni = [
      { lettera: 'a', testo: domanda.risposta_a },
      { lettera: 'b', testo: domanda.risposta_b },
      { lettera: 'c', testo: domanda.risposta_c },
      { lettera: 'd', testo: domanda.risposta_d },
    ]
    // Fisher-Yates shuffle
    for (let i = opzioni.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opzioni[i], opzioni[j]] = [opzioni[j], opzioni[i]]
    }
    // Riassegna lettere a/b/c/d
    const lettereNuove = ['a', 'b', 'c', 'd']
    const testoCorretto = domanda[`risposta_${domanda.risposta_corretta}`]
    const opzioniMescolate = opzioni.map((op, i) => ({ lettera: lettereNuove[i], testo: op.testo }))
    const nuovaCorretta = opzioniMescolate.find(op => op.testo === testoCorretto)?.lettera || 'a'
    return { opzioniMescolate, nuovaCorretta }
  }

  useEffect(() => {
    async function caricaDomande() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      let tuttiDomande = []

      if (modalita === 'simulazione') {
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
            .select('id, testo, risposta_a, risposta_b, risposta_c, risposta_d, risposta_corretta')
            .eq('materia_id', materia.id)
            .limit(d.n * 5)
          if (data) {
            const shuffled = data.sort(() => Math.random() - 0.5).slice(0, d.n)
            shuffled.forEach(dom => {
              const { opzioniMescolate, nuovaCorretta } = mescolaRisposte(dom)
              tuttiDomande.push({ ...dom, materia: materia.nome, opzioniMescolate, risposta_corretta: nuovaCorretta })
            })
          }
        }))
      } else {
        // Esercitazione
        const prioritaSbagliate = searchParams.get('prioritaSbagliate') === 'true'
        const selezione = JSON.parse(searchParams.get('selezione') || '[]')

        // Carica storico errori se priorità sbagliate
        let domandeErrate = new Set()
        if (prioritaSbagliate) {
          const { data: sessioni } = await supabase
            .from('sessioni')
            .select('id')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(10)
          if (sessioni?.length) {
            // Logica semplificata: carica domande con più errori dal progressi
            const { data: progressi } = await supabase
              .from('progressi')
              .select('domanda_id, errate')
              .eq('user_id', user.id)
              .gt('errate', 0)
              .order('errate', { ascending: false })
            progressi?.forEach(p => domandeErrate.add(p.domanda_id))
          }
        }

        await Promise.all(selezione.map(async ({ materiaId, numero }) => {
          const { data: materia } = await supabase.from('materie').select('nome').eq('id', materiaId).single()
          
          let query = supabase
            .from('domande')
            .select('id, testo, risposta_a, risposta_b, risposta_c, risposta_d, risposta_corretta')
            .eq('materia_id', materiaId)
            .limit(numero * 5)

          const { data } = await query

          if (data) {
            let pool = data
            // Se priorità sbagliate, metti in cima le domande sbagliate
            if (prioritaSbagliate && domandeErrate.size > 0) {
              pool = [
                ...data.filter(d => domandeErrate.has(d.id)),
                ...data.filter(d => !domandeErrate.has(d.id)),
              ]
            }
            const selezionate = pool.sort(() => Math.random() - 0.5).slice(0, numero)
            selezionate.forEach(dom => {
              const { opzioniMescolate, nuovaCorretta } = mescolaRisposte(dom)
              tuttiDomande.push({ ...dom, materia: materia?.nome || '', opzioniMescolate, risposta_corretta: nuovaCorretta })
            })
          }
        }))
      }

      tuttiDomande = tuttiDomande.sort(() => Math.random() - 0.5)
      setDomande(tuttiDomande)
      setLoading(false)
    }
    caricaDomande()
  }, [])

  // Timer
  useEffect(() => {
    if (loading || finito) return
    const interval = setInterval(() => {
      secondiImpiegatiRef.current += 1
      setSecondiImpiegati(secondiImpiegatiRef.current)
      if (modalita === 'simulazione') {
        setSecondiRimasti(prev => {
          if (prev <= 1) { clearInterval(interval); termina(); return 0 }
          return prev - 1
        })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [loading, finito])

  const termina = useCallback(() => {
    setFinito(true)
    const risultati = {
      modalita,
      soglia: modalita === 'simulazione' ? soglia : null,
      data: new Date().toISOString(),
      secondiImpiegati: secondiImpiegatiRef.current,
      domande: domande.map(d => ({
        id: d.id,
        testo: d.testo,
        materia: d.materia,
        letteraCorretta: d.risposta_corretta,
        rispostaUtente: risposte[d.id] || null,
        opzioni: d.opzioniMescolate,
      })),
    }
    sessionStorage.setItem('FormazioneOCF_risultati', JSON.stringify(risultati))
    sessionStorage.removeItem('FormazioneOCF_sessione_salvata')
    router.push('/risultati')
  }, [domande, risposte, modalita, soglia])

  function navigaConAnimazione(nuovoIndice) {
    setAnimazione('slide-out')
    setTimeout(() => {
      setIndice(nuovoIndice)
      setAnimazione('slide-in')
      setTimeout(() => setAnimazione(''), 300)
    }, 200)
  }

  function rispondi(lettera) {
    const dom = domande[indice]
    if (!dom) return
    if (modalita === 'simulazione' && risposte[dom.id]) return
    setRisposte(prev => ({ ...prev, [dom.id]: lettera }))
    if (modalita === 'esercitazione') {
      setTimeout(() => {
        if (indice < domande.length - 1) navigaConAnimazione(indice + 1)
        else termina()
      }, 900)
    }
  }

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`
  const domandaCorrente = domande[indice]
  const rispostaCorrente = domandaCorrente ? risposte[domandaCorrente.id] : null
  const letteraCorretta = domandaCorrente?.risposta_corretta
  const risposteDate = Object.keys(risposte).length
  const progressoPct = domande.length > 0 ? ((indice + 1) / domande.length) * 100 : 0

  const getRispostaStyle = (lettera) => {
    if (modalita === 'simulazione') {
      return rispostaCorrente === lettera
        ? 'border-blue-500 bg-blue-50 text-blue-800 shadow-sm'
        : 'border-gray-200 bg-white text-gray-800 hover:border-blue-300 hover:bg-blue-50/30'
    }
    if (!rispostaCorrente) return 'border-gray-200 bg-white text-gray-800 hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer'
    if (lettera === letteraCorretta) return 'border-green-500 bg-green-50 text-green-800 shadow-sm'
    if (lettera === rispostaCorrente && lettera !== letteraCorretta) return 'border-red-400 bg-red-50 text-red-700'
    return 'border-gray-100 bg-gray-50 text-gray-400'
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-500 font-medium">Preparazione domande...</p>
    </div>
  )

  if (domande.length === 0) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-5xl mb-4">😕</p>
        <p className="font-semibold text-gray-900 mb-2">Nessuna domanda trovata</p>
        <button onClick={() => router.back()} className="text-blue-600 text-sm mt-2">← Torna indietro</button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600 text-sm">←</button>
            <span className="text-sm font-semibold text-gray-900">
              {indice + 1} <span className="text-gray-400 font-normal">/ {domande.length}</span>
            </span>
            {modalita === 'esercitazione' && (
              <span className="text-xs text-gray-400">{risposteDate} risposte</span>
            )}
          </div>
          {modalita === 'simulazione' && (
            <span className={`text-sm font-bold font-mono px-3 py-1 rounded-lg ${secondiRimasti < 300 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'}`}>
              ⏱ {formatTime(secondiRimasti)}
            </span>
          )}
          {modalita === 'esercitazione' && (
            <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded-lg">
              {formatTime(secondiImpiegati)}
            </span>
          )}
        </div>
      </div>

      {/* Domanda con animazione */}
      <div className={`flex-1 max-w-2xl mx-auto w-full px-4 py-6 transition-all duration-200 ${
        animazione === 'slide-out' ? 'opacity-0 translate-x-4' :
        animazione === 'slide-in' ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'
      }`}>
        <div className="mb-1">
          <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide">{domandaCorrente?.materia}</span>
        </div>
        <p className="text-gray-900 font-medium text-base leading-relaxed mb-6">
          {domandaCorrente?.testo}
        </p>

        <div className="space-y-3">
          {(domandaCorrente?.opzioniMescolate || []).map(({ lettera, testo }) => (
            <button
              key={lettera}
              onClick={() => rispondi(lettera)}
              disabled={(modalita === 'esercitazione' && !!rispostaCorrente) || (modalita === 'simulazione' && !!rispostaCorrente)}
              className={`w-full flex items-start gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-150 ${getRispostaStyle(lettera)}`}
            >
              <span className="font-bold text-sm flex-shrink-0 w-5 uppercase">{lettera}.</span>
              <span className="text-sm leading-snug flex-1">{testo}</span>
              {rispostaCorrente && lettera === letteraCorretta && (
                <span className="ml-auto text-green-600 font-bold flex-shrink-0 text-base">✓</span>
              )}
              {rispostaCorrente && lettera === rispostaCorrente && lettera !== letteraCorretta && (
                <span className="ml-auto text-red-500 font-bold flex-shrink-0 text-base">✗</span>
              )}
            </button>
          ))}
        </div>

        {/* Nav simulazione */}
        {modalita === 'simulazione' && (
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => navigaConAnimazione(indice - 1)}
              disabled={indice === 0}
              className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-3 rounded-xl disabled:opacity-30 hover:border-gray-300 transition-colors"
            >
              ← Indietro
            </button>
            {indice < domande.length - 1 ? (
              <button
                onClick={() => navigaConAnimazione(indice + 1)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Avanti →
              </button>
            ) : (
              <button
                onClick={termina}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Termina ✓
              </button>
            )}
          </div>
        )}

        {/* Nav esercitazione senza risposta */}
        {modalita === 'esercitazione' && !rispostaCorrente && (
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => navigaConAnimazione(indice - 1)}
              disabled={indice === 0}
              className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-3 rounded-xl disabled:opacity-30"
            >
              ← Indietro
            </button>
            <button
              onClick={() => indice < domande.length - 1 ? navigaConAnimazione(indice + 1) : termina()}
              className="flex-1 border-2 border-blue-600 text-blue-600 font-semibold py-3 rounded-xl hover:bg-blue-50"
            >
              Salta →
            </button>
          </div>
        )}

        <div className="mt-8 text-center">
          <button onClick={termina} className="text-xs text-gray-400 hover:text-gray-600 underline">
            Termina anticipatamente
          </button>
        </div>
      </div>

      {/* Barra progresso in basso */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-3 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-gray-400">{indice + 1} di {domande.length}</span>
            <span className="text-xs font-semibold text-blue-600">{Math.round(progressoPct)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-2 bg-blue-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressoPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <QuizInner />
    </Suspense>
  )
}
