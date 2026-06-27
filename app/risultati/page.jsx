'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

function RisultatiInner() {
  const router = useRouter()
  const supabase = createClient()
  const [dati, setDati] = useState(null)
  const [filtro, setFiltro] = useState('tutte')
  const [aperte, setAperte] = useState({})

  useEffect(() => {
    const raw = sessionStorage.getItem('FormazioneOCF_risultati')
    if (!raw) { router.push('/dashboard'); return }
    setDati(JSON.parse(raw))

    async function salvaSessione(parsed) {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const tot = parsed.domande.length
      const corr = parsed.domande.filter(d => d.rispostaUtente === d.letteraCorretta).length
      const salt = parsed.domande.filter(d => !d.rispostaUtente).length
      const err = tot - corr - salt

      // Punteggio reale OCF: domande pratiche = 2pt, teoriche = 1pt
      // Le prime 40 domande da 2 punti, le ultime 20 da 1 punto
      // In realtà usiamo il campo pratico se disponibile, altrimenti stima
      let punteggio = 10 // punteggio base
      parsed.domande.forEach(d => {
        if (d.rispostaUtente === d.letteraCorretta) {
          punteggio += d.pratico ? 2 : 1
        }
        // Nessuna penalità per risposta errata
      })
      punteggio = Math.min(punteggio, 100)

      const sup = parsed.modalita === 'simulazione' ? punteggio >= 80 : null
      await supabase.from('sessioni').insert({
        user_id: user.id,
        modalita: parsed.modalita,
        punteggio: punteggio,
        corrette: corr,
        errate: err,
        omesse: salt,
        totale: tot,
        superata: sup,
        secondi_impiegati: parsed.secondiImpiegati || 0,
      })
    }

    const giaaSalvato = sessionStorage.getItem('FormazioneOCF_sessione_salvata')
    if (!giaaSalvato) {
      sessionStorage.setItem('FormazioneOCF_sessione_salvata', '1')
      salvaSessione(JSON.parse(raw))
    }
  }, [])

  if (!dati) return null

  const { domande, modalita, data, secondiImpiegati } = dati
  const totale = domande.length
  const corrette = domande.filter(d => d.rispostaUtente === d.letteraCorretta).length
  const saltate = domande.filter(d => !d.rispostaUtente).length
  const errate = totale - corrette - saltate

  // Punteggio reale OCF
  let punteggio = 10
  domande.forEach(d => {
    if (d.rispostaUtente === d.letteraCorretta) {
      punteggio += d.pratico ? 2 : 1
    }
  })
  punteggio = Math.min(punteggio, 100)

  const superato = modalita === 'simulazione' ? punteggio >= 80 : null
  const durataFormattata = typeof secondiImpiegati === 'number' && secondiImpiegati > 0
    ? `${Math.floor(secondiImpiegati / 60)}m ${secondiImpiegati % 60}s`
    : null

  const domandeVis = domande.filter(d => {
    if (filtro === 'corrette') return d.rispostaUtente === d.letteraCorretta
    if (filtro === 'errate') return d.rispostaUtente && d.rispostaUtente !== d.letteraCorretta
    if (filtro === 'saltate') return !d.rispostaUtente
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">
            {modalita === 'simulazione' ? 'Risultato simulazione' : 'Risultato esercitazione'}
          </h1>
          <span className="text-xs text-gray-400">
            {new Date(data).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Score card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {modalita === 'simulazione' && (
            <div className="text-center mb-6">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">Risultato Simulazione OCF</p>
              <p className="text-6xl font-bold text-gray-900">{punteggio}<span className="text-2xl text-gray-400">/100</span></p>
              <p className="text-sm text-gray-500 mt-2">{corrette} risposte corrette su {totale}</p>
              <div className="mt-4 flex flex-col items-center gap-2">
                <span className={`inline-flex rounded-full px-5 py-2 text-sm font-bold ${superato ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {superato ? '✓ Esame superato' : '✗ Esame non superato'}
                </span>
                <span className="text-xs text-gray-400">Soglia: 80/100 punti</span>
                {durataFormattata && <span className="text-xs text-gray-400">Tempo impiegato: {durataFormattata}</span>}
              </div>
            </div>
          )}

          {modalita === 'esercitazione' && (
            <div className="text-center mb-6">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">Risultato Esercitazione</p>
              <p className="text-6xl font-bold text-gray-900">{Math.round((corrette/totale)*100)}<span className="text-2xl text-gray-400">%</span></p>
              <p className="text-sm text-gray-500 mt-2">{corrette} corrette su {totale} domande</p>
              {durataFormattata && <p className="text-xs text-gray-400 mt-1">Tempo: {durataFormattata}</p>}
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-green-50 rounded-xl p-3">
              <p className="text-2xl font-bold text-green-600">{corrette}</p>
              <p className="text-xs text-gray-500 mt-0.5">Corrette</p>
            </div>
            <div className="bg-red-50 rounded-xl p-3">
              <p className="text-2xl font-bold text-red-500">{errate}</p>
              <p className="text-xs text-gray-500 mt-0.5">Errate</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-2xl font-bold text-gray-400">{saltate}</p>
              <p className="text-xs text-gray-500 mt-0.5">Saltate</p>
            </div>
          </div>

          {modalita === 'simulazione' && (
            <div className="mt-4 bg-blue-50 rounded-xl p-3 text-xs text-blue-700 text-center">
              <strong>Punteggio OCF:</strong> 10 punti base · +2 per domande pratiche · +1 per domande teoriche · nessuna penalità
            </div>
          )}
        </div>

        {/* Azioni */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <button onClick={() => router.push('/esercitazione')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
              📚 Nuova esercitazione
            </button>
            <button onClick={() => router.push('/simulazione')} className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-xl text-sm transition-colors">
              🎯 Nuova simulazione
            </button>
          </div>
          <button onClick={() => router.push('/dashboard')} className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
            🏠 Torna alla dashboard
          </button>
        </div>

        {/* Revisione domande */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 mb-3">Rivedi le domande</h2>
            <div className="flex gap-2 flex-wrap">
              {[
                { key: 'tutte', label: `Tutte (${totale})` },
                { key: 'corrette', label: `✓ Corrette (${corrette})` },
                { key: 'errate', label: `✗ Errate (${errate})` },
                { key: 'saltate', label: `– Saltate (${saltate})` },
              ].map(f => (
                <button key={f.key} onClick={() => setFiltro(f.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${filtro === f.key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {domandeVis.map(d => {
              const isCorretta = d.rispostaUtente === d.letteraCorretta
              const isSaltata = !d.rispostaUtente
              const isAperta = aperte[d.id]
              return (
                <div key={d.id} className="px-5 py-4">
                  <button onClick={() => setAperte(prev => ({ ...prev, [d.id]: !prev[d.id] }))} className="w-full text-left flex items-start gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${isSaltata ? 'bg-gray-100 text-gray-500' : isCorretta ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {isSaltata ? '–' : isCorretta ? '✓' : '✗'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 leading-snug line-clamp-2">{d.testo}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {d.materia && <span className="text-xs text-gray-400">{d.materia}</span>}
                        {d.pratico && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-semibold">2pt</span>}
                      </div>
                    </div>
                    <span className="text-gray-300 text-sm flex-shrink-0 ml-2">{isAperta ? '▲' : '▼'}</span>
                  </button>
                  {isAperta && (
                    <div className="mt-3 ml-9 space-y-2">
                      {(d.opzioni || []).map(({ lettera, testo }) => {
                        const isGiusta = lettera === d.letteraCorretta
                        const isScelta = lettera === d.rispostaUtente
                        const isErr = isScelta && !isGiusta
                        return (
                          <div key={lettera} className={`flex items-start gap-2 px-3 py-2 rounded-lg text-sm border ${isGiusta ? 'bg-green-50 border-green-300 text-green-800' : isErr ? 'bg-red-50 border-red-300 text-red-700' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                            <span className="font-bold flex-shrink-0 w-4">{lettera}.</span>
                            <span className="flex-1 leading-snug">{testo}</span>
                            {isGiusta && <span className="ml-auto text-green-600 font-bold">✓</span>}
                            {isErr && <span className="ml-auto text-red-500 font-bold">✗</span>}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RisultatiPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <RisultatiInner />
    </Suspense>
  )
}
