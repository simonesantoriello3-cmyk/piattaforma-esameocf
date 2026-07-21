'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import GtmPurchaseTracker from '@/components/GtmPurchaseTracker'

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

  const moduliAcquistati = acquisti.map(a => a.modulo)
  const haOCF = moduliAcquistati.includes('ocf')

  const cardDaMostrare = []
  if (haOCF) {
    const a = acquisti.find(a => a.modulo === 'ocf')
    cardDaMostrare.push({ ...a, titolo: 'Simulatore OCF Completo' })
  }

  const haAcquistato = cardDaMostrare.length > 0

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <GtmPurchaseTracker />

      {/* Hero */}
      <section
        className="relative px-6 py-16 text-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&q=80)',
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

        {haAcquistato ? (
          <div className="space-y-4">
            {cardDaMostrare.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">{a.titolo}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Acquistato il {new Date(a.created_at).toLocaleDateString('it-IT')}
                      {' · '}
                      Valido fino al {new Date(new Date(a.created_at).setFullYear(new Date(a.created_at).getFullYear() + 1)).toLocaleDateString('it-IT')}
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">Attivo</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/esercitazione" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-center text-sm transition-colors">
                    📚 Esercitazione
                  </Link>
                  <Link
                    href="/quiz?modalita=simulazione&tipo=ocf&numero=60&minuti=85&soglia=48"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-xl text-center text-sm transition-colors"
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
            <h2 className="font-bold text-gray-900 mb-2">Nessun piano attivo</h2>
            <p className="text-gray-500 text-sm mb-6">Acquista il Simulatore OCF per iniziare la preparazione all'esame.</p>
            <Link href="/acquisto" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors inline-block text-sm">
              Scopri il piano →
            </Link>
          </div>
        )}

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
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(s.created_at).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        {' · '}{s.corrette}/{s.totale} corrette
                        {s.modalita === 'simulazione' && ` · Punteggio: ${s.punteggio?.toFixed(1)}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${pct >= 80 ? 'text-blue-600' : 'text-red-500'}`}>
                        {pct}%
                      </p>
                      {s.superata !== null && (
                        <p className={`text-xs font-semibold ${s.superata ? 'text-blue-600' : 'text-red-500'}`}>
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
