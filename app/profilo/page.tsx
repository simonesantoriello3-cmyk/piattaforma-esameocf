'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function ProfiloPage() {
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = useState<any>(null)
  const [acquisti, setAcquisti] = useState<any[]>([])
  const [sessioni, setSessioni] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [nuovoNome, setNuovoNome] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [toastOk, setToastOk] = useState(true)

  const [nuovaPassword, setNuovaPassword] = useState('')
  const [confermaPassword, setConfermaPassword] = useState('')
  const [mostraPassword, setMostraPassword] = useState(false)
  const [salvandoPassword, setSalvandoPassword] = useState(false)
  const [errorePassword, setErrorePassword] = useState('')

  useEffect(() => {
    async function carica() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
      setNuovoNome(user.user_metadata?.nome || user.email?.split('@')[0] || '')

      const { data: acquistiData } = await supabase
        .from('acquisti')
        .select('importo, created_at')
        .eq('user_id', user.id)

      const { data: sessioniData } = await supabase
        .from('sessioni')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setAcquisti(acquistiData || [])
      setSessioni(sessioniData || [])
      setLoading(false)
    }
    carica()
  }, [])

  function mostraToast(msg: string, ok = true) {
    setToastMsg(msg)
    setToastOk(ok)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  async function salvaNome() {
    setSalvando(true)
    const { error } = await supabase.auth.updateUser({ data: { nome: nuovoNome } })
    if (!error) mostraToast('Nome aggiornato con successo!')
    else mostraToast('Errore durante il salvataggio', false)
    setSalvando(false)
  }

  async function salvaPassword() {
    setErrorePassword('')
    if (nuovaPassword.length < 8) { setErrorePassword('La password deve essere di almeno 8 caratteri'); return }
    if (nuovaPassword !== confermaPassword) { setErrorePassword('Le password non coincidono'); return }
    setSalvandoPassword(true)
    const { error } = await supabase.auth.updateUser({ password: nuovaPassword })
    if (!error) {
      mostraToast('Password aggiornata con successo!')
      setNuovaPassword('')
      setConfermaPassword('')
    } else {
      mostraToast('Errore durante l\'aggiornamento', false)
    }
    setSalvandoPassword(false)
  }

  const nomeUtente = user?.user_metadata?.nome || user?.email?.split('@')[0] || ''
  const email = user?.email || ''
  const dataRegistrazione = user?.created_at ? new Date(user.created_at).toLocaleDateString('it-IT') : ''

  const totaleSessioni = sessioni.length
  const simulazioni = sessioni.filter(s => s.modalita === 'simulazione')
  const simulate = simulazioni.length
  const superate = simulazioni.filter(s => s.superata).length
  const mediaCorrette = totaleSessioni > 0
    ? Math.round(sessioni.reduce((acc, s) => acc + (s.corrette / s.totale) * 100, 0) / totaleSessioni)
    : 0

  const acquisto = acquisti[0]
  const dataAcquisto = acquisto ? new Date(acquisto.created_at) : null
  const dataScadenza = dataAcquisto ? new Date(new Date(dataAcquisto).setFullYear(dataAcquisto.getFullYear() + 1)) : null

  const forzaPassword = nuovaPassword.length === 0 ? 0
    : nuovaPassword.length < 6 ? 1
    : nuovaPassword.length < 10 ? 2
    : 3

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <>
      {showToast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2 ${toastOk ? 'bg-gray-900' : 'bg-red-600'}`}>
          <span>{toastOk ? '✓' : '✗'}</span>
          {toastMsg}
        </div>
      )}

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
          <div className="absolute inset-0 bg-blue-900/70" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
              {nomeUtente.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-2xl font-bold text-white">{nomeUtente}</h1>
            <p className="text-white/60 text-sm mt-1">{email}</p>
            <p className="text-white/40 text-xs mt-1">Iscritto il {dataRegistrazione}</p>
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

          {/* Statistiche */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">📊 Le tue statistiche</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { val: totaleSessioni, label: 'Sessioni totali' },
                { val: simulate, label: 'Simulazioni' },
                { val: superate, label: 'Superate' },
                { val: `${mediaCorrette}%`, label: 'Media corrette' },
              ].map((s, i) => (
                <div key={i} className="text-center p-3 bg-blue-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600">{s.val}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Piano acquistato */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">🎓 Il tuo piano</h2>
            {acquisto ? (
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div>
                  <p className="font-bold text-gray-900">Simulatore OCF Completo</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Acquistato il {dataAcquisto?.toLocaleDateString('it-IT')}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Valido fino al {dataScadenza?.toLocaleDateString('it-IT')}
                  </p>
                </div>
                <div className="text-right">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full block mb-1">Attivo ✓</span>
                  <span className="text-xs text-gray-400">€29</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-400 text-sm mb-3">Nessun piano attivo</p>
                <a href="/acquisto" className="text-blue-600 font-semibold text-sm hover:underline">Acquista ora →</a>
              </div>
            )}
          </div>

          {/* Ultime sessioni */}
          {sessioni.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 mb-4">📈 Ultime sessioni</h2>
              <div className="space-y-2">
                {sessioni.slice(0, 5).map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{s.modalita === 'simulazione' ? '🎯' : '📚'}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 capitalize">{s.modalita}</p>
                        <p className="text-xs text-gray-400">{new Date(s.created_at).toLocaleDateString('it-IT')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{s.corrette}/{s.totale}</p>
                      {s.modalita === 'simulazione' && (
                        <span className={`text-xs font-semibold ${s.superata ? 'text-green-600' : 'text-red-500'}`}>
                          {s.superata ? '✓ Superata' : '✗ Non superata'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modifica nome */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">✏️ Modifica nome</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={nuovoNome}
                onChange={e => setNuovoNome(e.target.value)}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Il tuo nome"
              />
              <button
                onClick={salvaNome}
                disabled={salvando}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors disabled:opacity-40"
              >
                {salvando ? '...' : 'Salva'}
              </button>
            </div>
          </div>

          {/* Cambia password */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-1">🔒 Cambia password</h2>
            <p className="text-xs text-gray-400 mb-4">Almeno 8 caratteri</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Nuova password</label>
                <div className="relative">
                  <input
                    type={mostraPassword ? 'text' : 'password'}
                    value={nuovaPassword}
                    onChange={e => setNuovaPassword(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition-colors pr-16"
                    placeholder="Nuova password"
                  />
                  <button type="button" onClick={() => setMostraPassword(!mostraPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-medium">
                    {mostraPassword ? 'Nascondi' : 'Mostra'}
                  </button>
                </div>
                {nuovaPassword.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${forzaPassword >= i
                          ? i === 1 ? 'bg-red-400' : i === 2 ? 'bg-yellow-400' : 'bg-blue-500'
                          : 'bg-gray-100'}`} />
                      ))}
                    </div>
                    <p className={`text-xs ${forzaPassword === 1 ? 'text-red-500' : forzaPassword === 2 ? 'text-yellow-600' : 'text-blue-600'}`}>
                      {forzaPassword === 1 ? 'Password debole' : forzaPassword === 2 ? 'Password media' : 'Password sicura'}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Conferma password</label>
                <input
                  type={mostraPassword ? 'text' : 'password'}
                  value={confermaPassword}
                  onChange={e => setConfermaPassword(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${
                    confermaPassword.length > 0 && confermaPassword !== nuovaPassword
                      ? 'border-red-300' : 'border-gray-200 focus:border-blue-400'
                  }`}
                  placeholder="Ripeti la password"
                />
                {confermaPassword.length > 0 && confermaPassword !== nuovaPassword && (
                  <p className="text-xs text-red-500 mt-1">Le password non coincidono</p>
                )}
                {confermaPassword.length > 0 && confermaPassword === nuovaPassword && (
                  <p className="text-xs text-blue-600 mt-1">✓ Le password coincidono</p>
                )}
              </div>

              {errorePassword && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
                  {errorePassword}
                </div>
              )}

              <button
                onClick={salvaPassword}
                disabled={salvandoPassword || nuovaPassword.length < 8 || nuovaPassword !== confermaPassword}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-xl text-sm transition-colors disabled:opacity-40"
              >
                {salvandoPassword ? 'Aggiornamento...' : 'Aggiorna password'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
