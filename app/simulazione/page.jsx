'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function SimulazionePage() {
  const router = useRouter()
  const supabase = createClient()
  const [moduliAcquistati, setModuliAcquistati] = useState({ haAssicurativo: false, haRiassicurativo: false })

  useEffect(() => {
    async function carica() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('acquisti').select('modulo').eq('user_id', user.id)
      const moduli = (data || []).map(a => a.modulo)
      setModuliAcquistati({
        haAssicurativo: moduli.includes('assicurativo') || moduli.includes('completo'),
        haRiassicurativo: moduli.includes('riassicurativo') || moduli.includes('completo'),
      })
    }
    carica()
  }, [])

  const opzioni = [
    {
      tipo: 'assicurativo',
      titolo: 'Modulo Assicurativo',
      emoji: '🏛️',
      domande: 50,
      minuti: 75,
      soglia: 30,
      colore: 'blue',
      descrizione: '6 materie del modulo assicurativo',
    },
    {
      tipo: 'riassicurativo',
      titolo: 'Modulo Riassicurativo',
      emoji: '🔄',
      domande: 20,
      minuti: 30,
      soglia: 12,
      colore: 'purple',
      descrizione: '2 materie del modulo riassicurativo',
    },
    {
      tipo: 'completo',
      titolo: 'Simulazione Completa',
      emoji: '🎯',
      domande: 70,
      minuti: 105,
      soglia: 42,
      colore: 'green',
      descrizione: '50 domande assicurative + 20 riassicurative',
    },
  ]

  const opzioniFiltrate = opzioni.filter(op => {
    if (op.tipo === 'assicurativo') return moduliAcquistati.haAssicurativo
    if (op.tipo === 'riassicurativo') return moduliAcquistati.haRiassicurativo
    if (op.tipo === 'completo') return moduliAcquistati.haAssicurativo && moduliAcquistati.haRiassicurativo
    return false
  })

  const colori = {
    blue:   { border: 'border-blue-200',   badge: 'bg-blue-100 text-blue-700',     btn: 'bg-blue-600 hover:bg-blue-700',     text: 'text-blue-600' },
    purple: { border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700', btn: 'bg-purple-600 hover:bg-purple-700', text: 'text-purple-600' },
    green:  { border: 'border-green-200',  badge: 'bg-green-100 text-green-700',   btn: 'bg-green-600 hover:bg-green-700',   text: 'text-green-600' },
  }

  function inizia(op) {
    const params = new URLSearchParams({
      modalita: 'simulazione',
      tipo: op.tipo,
      numero: String(op.domande),
      minuti: String(op.minuti),
      soglia: String(op.soglia),
    })
    router.push(`/quiz?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => router.push('/dashboard')} className="text-blue-600 text-sm mb-6 block">
          ← Torna alla Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Simulazione Esame RUI</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Scegli il modulo da simulare. Le domande vengono estratte casualmente.
          </p>
        </div>

        <div className="space-y-4">
          {opzioniFiltrate.map(op => {
            const c = colori[op.colore]
            return (
              <div key={op.tipo} className={`bg-white rounded-2xl border-2 ${c.border} p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{op.emoji}</span>
                  <div>
                    <h2 className="font-bold text-gray-900">{op.titolo}</h2>
                    <p className="text-xs text-gray-400 mt-0.5">{op.descrizione}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className={`text-xl font-bold ${c.text}`}>{op.domande}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Domande</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className={`text-xl font-bold ${c.text}`}>{op.minuti}'</p>
                    <p className="text-xs text-gray-500 mt-0.5">Minuti</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className={`text-xl font-bold ${c.text}`}>{op.soglia}/{op.domande}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Soglia 60%</p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-4 text-xs text-amber-800">
                  <strong>Punteggio:</strong> +1 esatta · -0,5 errata · 0 omessa
                </div>

                <button
                  onClick={() => inizia(op)}
                  className={`w-full ${c.btn} text-white font-semibold py-3 rounded-xl transition-colors`}
                >
                  Inizia {op.titolo} →
                </button>
              </div>
            )
          })}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 text-sm text-blue-800">
          <strong>⚠️ Attenzione:</strong> In modalità simulazione non vedrai il feedback immediato sulle risposte. Potrai rivedere tutto alla fine.
        </div>
      </div>
    </div>
  )
}
