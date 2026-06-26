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
    const raw = sessionStorage.getItem('FormazioneRUI_risultati')
    if (!raw) { router.push('/dashboard'); return }
    setDati(JSON.parse(raw))
    const giaaSalvato = sessionStorage.getItem('FormazioneRUI_sessione_salvata')

    async function salvaSessione(datiRaw) {
      const parsed = JSON.parse(datiRaw)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const tot = parsed.domande.length
      const corr = parsed.domande.filter(d => d.rispostaUtente === d.letteraCorretta).length
      const salt = parsed.domande.filter(d => !d.rispostaUtente).length
      const err = tot - corr - salt
      const punt = parsed.domande.reduce((acc, d) => {
        if (d.rispostaUtente === d.letteraCorretta) return acc + 1
        if (d.rispostaUtente && d.rispostaUtente !== d.letteraCorretta) return acc - 0.5
        return acc
      }, 0)
      const sup = (parsed.modalita === 'simulazione' && parsed.soglia != null) ? punt >= parsed.soglia : null
      await supabase.from('sessioni').insert({
        user_id: user.id,
        modalita: parsed.modalita,
        tipo: parsed.tipo || null,
        punteggio: punt,
        corrette: corr,
        errate: err,
        omesse: salt,
        totale: tot,
        superata: sup,
        secondi_impiegati: parsed.secondiImpiegati || 0,
      })
    }
    if (!giaaSalvato) {
      sessionStorage.setItem('FormazioneRUI_sessione_salvata', '1')
      salvaSessione(raw)
    }
  }, [])

  if (!dati) return null

  const { domande, modalita, data, soglia, secondiImpiegati } = dati
  const totale = domande.length
  const corrette = domande.filter(d => d.rispostaUtente === d.letteraCorretta).length
  const saltate = domande.filter(d => !d.rispostaUtente).length
  const errate = totale - corrette - saltate
  const pct = Math.round((corrette / totale) * 100)
  const punteggio = domande.reduce((acc, d) => {
    if (d.rispostaUtente === d.letteraCorretta) return acc + 1
    if (d.rispostaUtente && d.rispostaUtente !== d.letteraCorretta) return acc - 0.5
    return acc
  }, 0)
  const punteggioMax = totale
  const superato = soglia != null ? punteggio >= soglia : null
  const durataFormattata = typeof secondiImpiegati === 'number'
    ? `${Math.floor(secondiImpiegati / 60)}m ${secondiImpiegati % 60}s`
    : null

  const domandeVis = domande.filter(d => {
    if (filtro === 'corrette') return d.rispostaUtente === d.letteraCorretta
    if (filtro === 'errate') return d.rispostaUtente && d.rispostaUtente !== d.letteraCorretta
    if (filtro === 'saltate') return !d.rispostaUtente
    return true
  })

  const r = 44
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ

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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="space-y-6">
            {modalita === 'simulazione' && (
              <div className="rounded-3xl border border-gray-200 bg-blue-50 p-5 text-center">
                <p className="text-sm font-semibold text-blue-700 uppercase tracking-[0.2em] mb-3">Risultato simulazione</p>
                <p className="text-4xl font-bold text-slate-900">{punteggio.toFixed(1)} / {punteggioMax}</p>
                <div className="mt-3 flex flex-col items-center gap-2">
                  <span className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${superato ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                    {superato ? '✓ Superato' : '✗ Non superato'}
                  </span>
                  {durataFormattata && (
                    <span className="text-sm text-gray-600">Tempo impiegato: {durataFormattata}</span>
                  )}
                </div>
              </div>
            )}

            {modalita === 'esercitazione' && (
              <div className="rounded-3xl border border-gray-200 bg-white p-5">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">Risultato esercitazione</p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div><p className="text-2xl font-bold text-green-600">{corrette}</p><p className="text-xs text-gray-500">Corrette</p></div>
                  <div><p className="text-2xl font-bold text-red-500">{errate}</p><p className="text-xs text-gray-500">Errate</p></div>
                  <div><p className="text-2xl font-bold text-gray-400">{saltate}</p><p className="text-xs text-gray-500">Saltate</p></div>
                </div>
              </div>
            )}

            {modalita === 'simulazione' && (
              <div className="rounded-3xl border border-gray-200 bg-white p-5">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div><p className="text-2xl font-bold text-green-600">{corrette}</p><p className="text-xs text-gray-500">Corrette</p></div>
                  <div><p className="text-2xl font-bold text-red-500">{errate}</p><p className="text-xs text-gray-500">Errate</p></div>
                  <div><p className="text-2xl font-bold text-gray-400">{saltate}</p><p className="text-xs text-gray-500">Saltate</p></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex gap-3">
            <button onClick={() => router.push('/esercitazione')} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors">📚 Nuova esercitazione</button>
            <button onClick={() => router.push('/simulazione')} className="flex-1 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold py-3 rounded-xl text-sm transition-colors">🎯 Simulazione esame</button>
          </div>
          <button onClick={() => router.push('/dashboard')} className="w-full bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-sm">
            🏠 Torna alla dashboard
          </button>
        </div>

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
                      {d.materia && <span className="text-xs text-gray-400 mt-0.5 block">{d.materia}</span>}
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
