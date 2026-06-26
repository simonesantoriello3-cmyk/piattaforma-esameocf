'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [conferma, setConferma] = useState('')
  const [errore, setErrore] = useState('')
  const [successo, setSuccesso] = useState(false)
  const [caricamento, setCaricamento] = useState(false)
  const router = useRouter()

  const handleReset = async () => {
    if (password !== conferma) {
      setErrore('Le password non coincidono')
      return
    }
    if (password.length < 6) {
      setErrore('La password deve essere di almeno 6 caratteri')
      return
    }
    setCaricamento(true)
    setErrore('')
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setErrore('Errore durante il reset. Riprova.')
    } else {
      setSuccesso(true)
      setTimeout(() => router.push('/dashboard'), 2000)
    }
    setCaricamento(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-emerald-900">Nuova password</h1>
            <p className="text-gray-500 text-sm mt-2">Inserisci la tua nuova password</p>
          </div>
          {successo ? (
            <div className="bg-emerald-50 text-emerald-700 text-sm px-4 py-3 rounded-lg text-center">
              ✓ Password aggiornata! Reindirizzamento...
            </div>
          ) : (
            <>
              {errore && (
                <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
                  {errore}
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nuova password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimo 6 caratteri"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Conferma password</label>
                <input
                  type="password"
                  value={conferma}
                  onChange={e => setConferma(e.target.value)}
                  placeholder="Ripeti la password"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
              <button
                onClick={handleReset}
                disabled={caricamento || !password || !conferma}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                {caricamento ? 'Aggiornamento...' : 'Aggiorna password'}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
