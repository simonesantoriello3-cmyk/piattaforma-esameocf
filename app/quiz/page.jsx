'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'

function QuizInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const modalita = searchParams.get('modalita') // 'simulazione' | 'esercitazione'
  const minuti = parseInt(searchParams.get('minuti') || '85')
  const soglia = parseInt(searchParams.get('soglia') || '48')

  const [domande, setDomande] = useState([])
  const [indice, setIndice] = useState(0)
  const [risposte, setRisposte] = useState({})
  const [loading, setLoading] = useState(true)
  const [secondiRimasti, setSecondiRimasti] = useState(minuti * 60)
  const [iniziato, setIniziato] = useState(false)
  const [finito, setFinito] = useState(false)
  const [secondiImpiegati, setSecondiImpiegati] = useState(0)

  useEffect(() => {
    async function caricaDomande() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      let tuttiDomande = []

      if (modalita === 'simulazione') {
        // Distribuzione proporzionale OCF
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
            .select('id, testo, risposta_a, risposta_b, risposta_c, risposta_d, risposta_corretta, materia_id')
            .eq('materia_id', materia.id)
            .limit(d.n * 10) // prende più domande e ne sceglie random
          if (data) {
            const shuffled = data.sort(() => Math.random() - 0.5).slice(0, d.n)
            shuffled.forEach(dom => tuttiDomande.push({ ...dom, materia: materia.nome }))
          }
        }))

      } else {
        // Esercitazione
        const selezione = JSON.parse(searchParams.get('selezione') || '[]')
        await Promise.all(selezione.map(async ({ materiaId, numero }) => {
          const { data: materia } = await supabase.from('materie').select('nome').eq('id', materiaId).single()
          const { data } = await supabase
            .from('domande')
            .select('id, testo, risposta_a, risposta_b, risposta_c, risposta_d, risposta_corretta, materia_id')
            .eq('materia_id', materiaId)
            .limit(numero * 10)
          if (data) {
            const shuffled = data.sort(() => Math.random() - 0.5).slice(0, numero)
            shuffled.forEach(dom => tuttiDomande.push({ ...dom, materia: materia?.nome || '' }))
          }
        }))
      }

      // Shuffle finale
      tuttiDomande = tuttiDomande.sort(() => Math.random() - 0.5)
      setDomande(tuttiDomande)
      setLoading(false)
      setIniziato(true)
    }
    caricaDomande()
  }, [])

  // Timer
  useEffect(() => {
    if (!iniziato || finito || modalita !== 'simulazione') return
    const interval = setInterval(() => {
      setSecondiRimasti(prev => {
        if (prev <= 1) { clearInterval(interval); termina(); return 0 }
        return prev - 1
      })
      setSecondiImpiegati(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [iniziato, finito])

  useEffect(() => {
    if (!iniziato || finito || modalita === 'simulazione') return
    const interval = setInterval(() => setSecondiImpiegati(prev => prev + 1), 1000)
    return () => clearInterval(interval)
  }, [iniziato, finito])

  const termina = useCallback(() => {
    setFinito(true)
    const risultati = {
      modalita,
      soglia: modalita === 'simulazione' ? soglia : null,
      data: new Date().toISOString(),
      secondiImpiegati,
      domande: domande.map(d => ({
        id: d.id,
        testo: d.testo,
        materia: d.materia,
        letteraCorretta: d.risposta_corretta,
        rispostaUtente: risposte[d.id] || null,
        opzioni: [
          { lettera: 'a', testo: d.risposta_a },
          { lettera: 'b', testo: d.risposta_b },
          { lettera: 'c', testo: d.risposta_c },
          { lettera: 'd', testo: d.risposta_d },
        ],
      })),
    }
    sessionStorage.setItem('FormazioneOCF_risultati', JSON.stringify(risultati))
    sessionStorage.removeItem('FormazioneOCF_sessione_salvata')
    router.push('/risultati')
  }, [domande, risposte, secondiImpiegati, modalita, soglia])

  function rispondi(lettera) {
    if (modalita === 'simulazione' && risposte[domande[indice].id]) return
    setRisposte(prev => ({ ...prev, [domande[indice].id]: lettera }))
    if (modalita === 'esercitazione') {
      // feedback immediato — avanza dopo 800ms
      setTimeout(() => {
        if (indice < domande.length - 1) setIndice(i => i + 1)
        else termina()
      }, 800)
    }
  }

  function avanti() {
    if (indice < domande.length - 1) setIndice(i => i + 1)
    else termina()
  }

  function indietro() {
    if (indice > 0) setIndice(i => i - 1)
  }

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`
  const risposteDate = Object.keys(risposte).length
  const domandaCorrente = domande[indice]
  const rispostaCorrente = domandaCorrente ? risposte[domandaCorrente.id] : null
  const letteraCorretta = domandaCorrente?.risposta_corretta

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-3">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-500">Caricamento domande...</p>
    </div>
  )

  if (domande.length === 0) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-4xl mb-4">😕</p>
        <p className="font-semibold text-gray-900 mb-2">Nessuna domanda trovata</p>
        <button onClick={() => router.back()} className="text-blue-600 text-sm">← Torna indietro</button>
      </div>
    </div>
  )

  const getRispostaStyle = (lettera) => {
    if (modalita === 'simulazione') {
      return rispostaCorrente === lettera
        ? 'border-blue-600 bg-blue-50 text-blue-800'
        : 'border-gray-200 bg-white text-gray-800 hover:border-blue-300'
    }
    // Esercitazione: feedback immediato
    if (!rispostaCorrente) return 'border-gray-200 bg-white text-gray-800 hover:border-blue-300'
    if (lettera === letteraCorretta) return 'border-green-500 bg-green-50 text-green-800'
    if (lettera === rispostaCorrente && lettera !== letteraCorretta) return 'border-red-400 bg-red-50 text-red-700'
    return 'border-gray-200 bg-white text-gray-400'
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-900">
              {indice + 1} / {domande.length}
            </span>
            <span className="text-xs text-gray-400">
              {risposteDate} risposte date
            </span>
          </div>
          {modalita === 'simulazione' && (
            <span className={`text-sm font-bold font-mono ${secondiRimasti < 300 ? 'text-red-600' : 'text-gray-700'}`}>
              ⏱ {formatTime(secondiRimasti)}
            </span>
          )}
          {modalita === 'esercitazione' && (
            <span className="text-xs text-gray-400 font-mono">
              {formatTime(secondiImpiegati)}
            </span>
          )}
        </div>
        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mt-2">
          <div className="h-1.5 bg-gray-100 rounded-full">
            <div
              className="h-1.5 bg-blue-600 rounded-full transition-all"
              style={{ width: `${((indice + 1) / domande.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Domanda */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        <div className="mb-2">
          <span className="text-xs text-blue-600 font-semibold">{domandaCorrente?.materia}</span>
        </div>
        <p className="text-gray-900 font-medium text-base leading-relaxed mb-6">
          {domandaCorrente?.testo}
        </p>

        <div className="space-y-3">
          {['a', 'b', 'c', 'd'].map(lettera => (
            <button
              key={lettera}
              onClick={() => rispondi(lettera)}
              disabled={modalita === 'esercitazione' && !!rispostaCorrente}
              className={`w-full flex items-start gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all ${getRispostaStyle(lettera)}`}
            >
              <span className="font-bold text-sm flex-shrink-0 w-5 uppercase">{lettera}.</span>
              <span className="text-sm leading-snug">
                {domandaCorrente?.[`risposta_${lettera}`]}
              </span>
              {modalita === 'esercitazione' && rispostaCorrente && lettera === letteraCorretta && (
                <span className="ml-auto text-green-600 font-bold flex-shrink-0">✓</span>
              )}
              {modalita === 'esercitazione' && rispostaCorrente && lettera === rispostaCorrente && lettera !== letteraCorretta && (
                <span className="ml-auto text-red-500 font-bold flex-shrink-0">✗</span>
              )}
            </button>
          ))}
        </div>

        {/* Nav simulazione */}
        {modalita === 'simulazione' && (
          <div className="flex gap-3 mt-6">
            <button
              onClick={indietro}
              disabled={indice === 0}
              className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-3 rounded-xl disabled:opacity-30 hover:border-gray-300 transition-colors"
            >
              ← Indietro
            </button>
            {indice < domande.length - 1 ? (
              <button
                onClick={avanti}
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
              onClick={indietro}
              disabled={indice === 0}
              className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-3 rounded-xl disabled:opacity-30"
            >
              ← Indietro
            </button>
            <button
              onClick={avanti}
              className="flex-1 border-2 border-blue-600 text-blue-600 font-semibold py-3 rounded-xl hover:bg-blue-50"
            >
              Salta →
            </button>
          </div>
        )}

        {/* Termina anticipato */}
        <div className="mt-8 text-center">
          <button onClick={termina} className="text-xs text-gray-400 hover:text-gray-600 underline">
            Termina quiz anticipatamente
          </button>
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
