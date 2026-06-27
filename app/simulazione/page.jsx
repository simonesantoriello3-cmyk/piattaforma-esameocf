'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function SimulazionePage() {
  const router = useRouter()
  const supabase = createClient()
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carica() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('acquisti').select('id').eq('user_id', user.id).limit(1)
      setHasAccess((data || []).length > 0)
      setLoading(false)
    }
    carica()
  }, [])

  function inizia() {
    const params = new URLSearchParams({
      modalita: 'simulazione',
      numero: '60',
      minuti: '85',
      soglia: '48',
    })
    router.push(`/quiz?${params.toString()}`)
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!hasAccess) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 text-center max-w-sm shadow-sm border border-gray-100">
        <p className="text-4xl mb-4">🔒</p>
        <h2 className="font-bold text-gray-900 mb-2">Accesso richiesto</h2>
        <p className="text-gray-500 text-sm mb-6">Acquista il piano per accedere alle simulazioni.</p>
        <button onClick={() => router.push('/acquisto')} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl">
          Acquista ora →
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => router.push('/dashboard')} className="text-blue-600 text-sm mb-6 block">
          ← Torna alla Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Simulazione Esame OCF</h1>
          <p className="text-gray-500 mt-1 text-sm">
            60 domande casuali da tutte le materie · 85 minuti · Soglia 80/100
          </p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎯</span>
            <div>
              <h2 className="font-bold text-gray-900">Simulazione Completa OCF</h2>
              <p className="text-xs text-gray-400 mt-0.5">Tutte e 5 le materie · distribuzione proporzionale</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">60</p>
              <p className="text-xs text-gray-500 mt-0.5">Domande</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">85'</p>
              <p className="text-xs text-gray-500 mt-0.5">Minuti</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">80%</p>
              <p className="text-xs text-gray-500 mt-0.5">Soglia</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
            <p className="text-xs font-semibold text-gray-600 mb-3">Distribuzione domande:</p>
            {[
              { nome: 'Diritto del mercato finanziario', n: 24 },
              { nome: 'Matematica finanziaria', n: 19 },
              { nome: 'Diritto tributario', n: 6 },
              { nome: 'Diritto previdenziale', n: 6 },
              { nome: 'Diritto privato', n: 5 },
            ].map(m => (
              <div key={m.nome} className="flex justify-between items-center text-xs">
                <span className="text-gray-600">{m.nome}</span>
                <span className="font-semibold text-blue-600">{m.n} dom.</span>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-6 text-xs text-amber-800">
            <strong>⚠️ Modalità esame:</strong> non vedrai il feedback durante la simulazione. Potrai rivedere tutto alla fine.
          </div>

          <button
            onClick={inizia}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Inizia Simulazione →
          </button>
        </div>
      </div>
    </div>
  )
}
