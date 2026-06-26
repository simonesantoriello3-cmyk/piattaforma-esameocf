'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errore, setErrore] = useState('')
  const [caricamento, setCaricamento] = useState(false)
  const [recupero, setRecupero] = useState(false)
  const [recuperoEmail, setRecuperoEmail] = useState('')
  const [recuperoInviato, setRecuperoInviato] = useState(false)
  const router = useRouter()

  const handleRecupero = async () => {
    setCaricamento(true)
    const { error } = await supabase.auth.resetPasswordForEmail(recuperoEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (!error) setRecuperoInviato(true)
    setCaricamento(false)
  }

  const handleLogin = async () => {
    setCaricamento(true)
    setErrore('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setErrore('Email o password errati')
    } else {
      router.push('/dashboard')
    }
    setCaricamento(false)
  }

  if (recupero) return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-emerald-900">Recupera password</h1>
            <p className="text-gray-500 text-sm mt-2">Ti invieremo un link per reimpostare la password</p>
          </div>
          {recuperoInviato ? (
            <div className="bg-emerald-50 text-emerald-700 text-sm px-4 py-3 rounded-lg text-center">
              ✓ Email inviata! Controlla la tua casella di posta.
            </div>
          ) : (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={recuperoEmail}
                  onChange={e => setRecuperoEmail(e.target.value)}
                  placeholder="tua@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
              <button
                onClick={handleRecupero}
                disabled={caricamento || !recuperoEmail}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                {caricamento ? 'Invio in corso...' : 'Invia link di recupero'}
              </button>
            </>
          )}
          <p className="text-center text-sm text-gray-500 mt-6">
            <button onClick={() => setRecupero(false)} className="text-emerald-600 hover:text-emerald-700">
              ← Torna al login
            </button>
          </p>
        </div>
      </main>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-emerald-900">FormazioneRUI</h1>
          <p className="text-gray-500 text-sm mt-2">Accedi al tuo account</p>
        </div>

        {errore && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
            {errore}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tua@email.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={caricamento}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          {caricamento ? 'Accesso in corso...' : 'Accedi'}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Non hai un account?{' '}
          <a href="/registrazione" className="text-emerald-600 hover:text-emerald-700">
            Registrati
          </a>
        </p>

        <p className="text-center text-sm text-gray-500 mt-3">
          <button onClick={() => setRecupero(true)} className="text-emerald-600 hover:text-emerald-700">
            Password dimenticata?
          </button>
        </p>

      </div>
      </main>
    </div>
  )
}