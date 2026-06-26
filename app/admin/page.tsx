'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const ADMIN_EMAIL = 'simonesantoriello3@gmail.com'

export default function AdminPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [autenticato, setAutenticato] = useState(false)
  const [utenti, setUtenti] = useState<any[]>([])
  const [acquisti, setAcquisti] = useState<any[]>([])
  const [sessioni, setSessioni] = useState<any[]>([])
  const [apriUtenti, setApriUtenti] = useState(false)
  const [apriAcquisti, setApriAcquisti] = useState(true)
  const [apriSessioni, setApriSessioni] = useState(false)
  const [apriFunnel, setApriFunnel] = useState(true)

  useEffect(() => {
    async function carica() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || user.email !== ADMIN_EMAIL) {
        router.push('/')
        return
      }
      setAutenticato(true)

      const { data: profilesData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      const { data: acquistiData } = await supabase
        .from('acquisti')
        .select('*, profiles(email, nome)')
        .order('created_at', { ascending: false })

      const { data: sessioniData } = await supabase
        .from('sessioni')
        .select('*, profiles(email, nome)')
        .order('created_at', { ascending: false })
        .limit(100)

      setUtenti(profilesData || [])
      setAcquisti(acquistiData || [])
      setSessioni(sessioniData || [])
      setLoading(false)
    }
    carica()
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!autenticato) return null

  const totaleIncassi = acquisti.reduce((acc, a) => acc + (a.importo || 0), 0)
  const utentiPaganti = new Set(acquisti.map(a => a.user_id))
  const utentiNonPaganti = utenti.filter(u => !utentiPaganti.has(u.id))
  const tassoConversione = utenti.length > 0 ? Math.round((utentiPaganti.size / utenti.length) * 100) : 0
  const mediaIncasso = utentiPaganti.size > 0 ? (totaleIncassi / utentiPaganti.size).toFixed(0) : 0

  const perModulo: Record<string, number> = {}
  acquisti.forEach(a => {
    perModulo[a.modulo] = (perModulo[a.modulo] || 0) + 1
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-white font-bold text-xl">🔐 Pannello Admin</h1>
        <button onClick={() => router.push('/')} className="text-emerald-200 text-sm hover:text-white">← Sito</button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

        {/* Stats principali */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-emerald-600">{utenti.length}</p>
            <p className="text-sm text-gray-500 mt-1">Registrati</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-emerald-600">{utentiPaganti.size}</p>
            <p className="text-sm text-gray-500 mt-1">Paganti</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-emerald-600">{sessioni.length}</p>
            <p className="text-sm text-gray-500 mt-1">Sessioni</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-emerald-600">€{totaleIncassi.toFixed(0)}</p>
            <p className="text-sm text-gray-500 mt-1">Incassi totali</p>
          </div>
        </div>

        {/* Funnel conversione */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button
            onClick={() => setApriFunnel(!apriFunnel)}
            className="w-full px-6 py-4 flex items-center justify-between bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <h2 className="font-bold text-blue-900">📈 Funnel di conversione</h2>
            <span className="text-blue-600">{apriFunnel ? '▲' : '▼'}</span>
          </button>
          {apriFunnel && (
            <div className="p-6 space-y-5">

              {/* Barre funnel */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 font-medium">👥 Registrati</span>
                    <span className="font-bold text-gray-900">{utenti.length}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 font-medium">💳 Paganti</span>
                    <span className="font-bold text-emerald-600">{utentiPaganti.size}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div className="bg-emerald-500 h-3 rounded-full transition-all" style={{ width: `${utenti.length > 0 ? (utentiPaganti.size / utenti.length) * 100 : 0}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 font-medium">📚 Con sessioni</span>
                    <span className="font-bold text-gray-900">{new Set(sessioni.map(s => s.user_id)).size}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div className="bg-purple-500 h-3 rounded-full transition-all" style={{ width: `${utenti.length > 0 ? (new Set(sessioni.map(s => s.user_id)).size / utenti.length) * 100 : 0}%` }} />
                  </div>
                </div>
              </div>

              {/* KPI */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-gray-100">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-emerald-600">{tassoConversione}%</p>
                  <p className="text-xs text-gray-500 mt-0.5">Tasso conversione</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-gray-900">{utentiNonPaganti.length}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Non paganti</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-gray-900">€{mediaIncasso}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Medio per utente</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-gray-900">{acquisti.length > 0 ? Math.round(sessioni.length / new Set(sessioni.map(s => s.user_id)).size) : 0}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Sessioni/utente</p>
                </div>
              </div>

              {/* Moduli venduti */}
              {Object.keys(perModulo).length > 0 && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Moduli venduti</p>
                  <div className="flex gap-3 flex-wrap">
                    {Object.entries(perModulo).map(([modulo, count]) => (
                      <div key={modulo} className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2 text-center">
                        <p className="font-bold text-emerald-700 text-lg">{count}</p>
                        <p className="text-xs text-emerald-600 capitalize">{modulo}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Utenti non paganti */}
              {utentiNonPaganti.length > 0 && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Registrati ma non paganti</p>
                  <div className="space-y-2">
                    {utentiNonPaganti.map((u, i) => (
                      <div key={i} className="flex items-center justify-between bg-amber-50 border border-amber-100 rounded-xl px-4 py-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{u.nome || '—'}</p>
                          <p className="text-xs text-gray-500">{u.email}</p>
                        </div>
                        <div className="text-right">
                          <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-1 rounded-full">Non pagante</span>
                          <p className="text-xs text-gray-400 mt-1">{new Date(u.created_at).toLocaleDateString('it-IT')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Acquisti */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button
            onClick={() => setApriAcquisti(!apriAcquisti)}
            className="w-full px-6 py-4 flex items-center justify-between bg-emerald-50 hover:bg-emerald-100 transition-colors"
          >
            <h2 className="font-bold text-emerald-900">💳 Acquisti ({acquisti.length})</h2>
            <span className="text-emerald-600">{apriAcquisti ? '▲' : '▼'}</span>
          </button>
          {apriAcquisti && (
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100 sticky top-0">
                  <tr>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Utente</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Modulo</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Importo</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Data</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Scadenza</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {acquisti.map((a, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{a.profiles?.nome || '—'}</p>
                        <p className="text-gray-400 text-xs">{a.profiles?.email || '—'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full capitalize">{a.modulo}</span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">€{a.importo}</td>
                      <td className="px-6 py-4 text-gray-500">{new Date(a.created_at).toLocaleDateString('it-IT')}</td>
                      <td className="px-6 py-4 text-gray-500">{new Date(new Date(a.created_at).setFullYear(new Date(a.created_at).getFullYear() + 1)).toLocaleDateString('it-IT')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Utenti */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button
            onClick={() => setApriUtenti(!apriUtenti)}
            className="w-full px-6 py-4 flex items-center justify-between bg-emerald-50 hover:bg-emerald-100 transition-colors"
          >
            <h2 className="font-bold text-emerald-900">👥 Utenti ({utenti.length})</h2>
            <span className="text-emerald-600">{apriUtenti ? '▲' : '▼'}</span>
          </button>
          {apriUtenti && (
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100 sticky top-0">
                  <tr>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Nome</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Email</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Stato</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Registrato il</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {utenti.map((u, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{u.nome || '—'}</td>
                      <td className="px-6 py-4 text-gray-500">{u.email}</td>
                      <td className="px-6 py-4">
                        {utentiPaganti.has(u.id)
                          ? <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full">✓ Pagante</span>
                          : <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-1 rounded-full">Non pagante</span>
                        }
                      </td>
                      <td className="px-6 py-4 text-gray-500">{new Date(u.created_at).toLocaleDateString('it-IT')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Sessioni */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button
            onClick={() => setApriSessioni(!apriSessioni)}
            className="w-full px-6 py-4 flex items-center justify-between bg-emerald-50 hover:bg-emerald-100 transition-colors"
          >
            <h2 className="font-bold text-emerald-900">📊 Sessioni ({sessioni.length})</h2>
            <span className="text-emerald-600">{apriSessioni ? '▲' : '▼'}</span>
          </button>
          {apriSessioni && (
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100 sticky top-0">
                  <tr>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Utente</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Modalità</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Punteggio</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Risultato</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sessioni.map((s, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{s.profiles?.nome || '—'}</p>
                        <p className="text-gray-400 text-xs">{s.profiles?.email || '—'}</p>
                      </td>
                      <td className="px-6 py-4 capitalize text-gray-500">{s.modalita}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{s.corrette}/{s.totale}</td>
                      <td className="px-6 py-4">
                        {s.superata === null ? (
                          <span className="text-gray-400 text-xs">—</span>
                        ) : s.superata ? (
                          <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full">✓ Superata</span>
                        ) : (
                          <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">✗ Non superata</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-500">{new Date(s.created_at).toLocaleDateString('it-IT')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
