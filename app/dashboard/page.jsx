'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = useState(null)
  const [acquisti, setAcquisti] = useState([])
  const [sessioni, setSessioni] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carica() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)

      const { data: acquistiData } = await supabase
        .from('acquisti')
        .select('modulo, importo, created_at')
        .eq('user_id', user.id)
        .limit(5)

      const { data: sessioniData } = await supabase
        .from('sessioni')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      setAcquisti(acquistiData || [])
      setSessioni(sessioniData || [])
      setLoading(false)
    }
    carica()
  }, [])

  const nomeUtente = user?.user_metadata?.nome || user?.email?.split('@')[0] || 'utente'

  // Calcola moduli attivi senza duplicati
  const moduliAcquistati = acquisti.map(a => a.modulo)
  const haCompleto = moduliAcquistati.includes('completo')
  const haAssicurativo = moduliAcquistati.includes('assicurativo')
  const haRiassicurativo = moduliAcquistati.includes('riassicurativo')

  // Costruisce lista card da mostrare senza duplicati
  const cardDaMostrare = []
  if (haCompleto) {
    const acquistatoCompleto = acquisti.find(a => a.modulo === 'completo')
    cardDaMostrare.push({ ...acquistatoCompleto, titolo: 'Entrambi i Moduli (Assicurativo + Riassicurativo)' })
  } else {
    if (haAssicurativo) {
      const a = acquisti.find(a => a.modulo === 'assicurativo')
      cardDaMostrare.push({ ...a, titolo: 'Modulo Assicurativo' })
    }
    if (haRiassicurativo) {
      const a = acquisti.find(a => a.modulo === 'riassicurativo')
      cardDaMostrare.push({ ...a, titolo: 'Modulo Riassicurativo' })
    }
  }

  const haAcquistato = cardDaMostrare.length > 0

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section
        className="relative px-6 py-16 text-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10">
          <p className="text-white/70 text-sm mb-1">Bentornato</p>
          <h1 className="text-3xl font-bold text-white">{nomeUtente} 👋</h1>
          {haAcquistato && (
            <p className="text-white/70 text-sm mt-2">
              {sessioni.length} sessioni completate
            </p>
          )}
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Moduli acquistati */}
        {haAcquistato ? (
          <div className="space-y-4">
            {cardDaMostrare.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {a.titolo}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Acquistato il {new Date(a.created_at).toLocaleDateString('it-IT')}
                      {' · '}
                      Valido fino al {new Date(new Date(a.created_at).setFullYear(new Date(a.created_at).getFullYear() + 1)).toLocaleDateString('it-IT')}
                    </p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">Attivo</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/esercitazione" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl text-center text-sm transition-colors">
                    📚 Esercitazione
                  </Link>
                  <Link
                    href={(() => {
                      const tipo = a.modulo === 'completo' ? 'completo' : a.modulo === 'assicurativo' ? 'assicurativo' : 'riassicurativo'
                      const domande = tipo === 'completo' ? 70 : tipo === 'assicurativo' ? 50 : 20
                      const minuti = tipo === 'completo' ? 105 : tipo === 'assicurativo' ? 75 : 30
                      const soglia = tipo === 'completo' ? 42 : tipo === 'assicurativo' ? 30 : 12
                      return `/quiz?modalita=simulazione&tipo=${tipo}&numero=${domande}&minuti=${minuti}&soglia=${soglia}`
                    })()}
                    className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold py-3 rounded-xl text-center text-sm transition-colors"
                  >
                    🎯 Simulazione
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <div className="text-4xl mb-4">📋</div>
            <h2 className="font-bold text-gray-900 mb-2">Nessun modulo attivo</h2>
            <p className="text-gray-500 text-sm mb-6">Acquista un modulo per iniziare la preparazione all'esame RUI.</p>
            <Link href="/acquisto" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors inline-block text-sm">
              Scopri i piani →
            </Link>
          </div>
        )}

        {/* Storico sessioni */}
        {sessioni.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Storico sessioni</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {sessioni.map((s, i) => {
                const pct = Math.round((s.corrette / s.totale) * 100)
                return (
                  <div key={i} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 capitalize">
                        {s.modalita === 'simulazione' ? '🎯 Simulazione' : '📚 Esercitazione'}
                        {s.tipo && s.tipo !== 'undefined' && ` · ${s.tipo}`}
                      </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {new Date(s.created_at).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                  {' · '}{s.corrette}/{s.totale} corrette
                                  {s.modalita === 'simulazione' && ` · Punteggio: ${s.punteggio?.toFixed(1)}`}
                                </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${pct >= 60 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {pct}%
                      </p>
                      {s.superata !== null && (
                        <p className={`text-xs font-semibold ${s.superata ? 'text-emerald-600' : 'text-red-500'}`}>
                          {s.superata ? '✓ Superata' : '✗ Non superata'}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
