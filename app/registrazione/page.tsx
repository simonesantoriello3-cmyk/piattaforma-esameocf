'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Registrazione() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [errore, setErrore] = useState('')
  const [caricamento, setCaricamento] = useState(false)
  const [registrato, setRegistrato] = useState(false)
  const router = useRouter()

  const handleRegistrazione = async () => {
    setErrore('')

    if (!nome.trim()) {
      setErrore('Il nome è obbligatorio.')
      return
    }
    if (!email.trim()) {
      setErrore('L\'email è obbligatoria.')
      return
    }
    if (password.length < 6) {
      setErrore('La password deve essere di almeno 6 caratteri.')
      return
    }

    setCaricamento(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nome: nome.trim() }
      }
    })

    if (error) {
      setErrore('Errore durante la registrazione. Riprova.')
    } else {
      await supabase.from('profiles').insert({
        id: data.user!.id,
        email,
        nome: nome.trim()
      })

      // Invia il contatto a Brevo per l'email marketing automatica
      try {
        await fetch('/api/brevo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, nome: nome.trim() }),
        })
      } catch (brevoError) {
        console.error('Errore invio a Brevo:', brevoError)
      }

      setRegistrato(true)
    }
    setCaricamento(false)
  }

  if (registrato) return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md text-center">
          <div className="text-5xl mb-4">📧</div>
          <h1 className="text-2xl font-bold text-blue-900 mb-2">Controlla la tua email!</h1>
          <p className="text-gray-500 text-sm mb-6">
            Abbiamo inviato un link di conferma a <strong>{email}</strong>.
            Clicca il link per attivare il tuo account e poi accedi.
          </p>
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors inline-block text-sm">
            Vai al login →
          </Link>
        </div>
      </main>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md">

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-blue-900">FormazioneOCF</h1>
            <p className="text-gray-500 text-sm mt-2">Crea il tuo account</p>
          </div>

          {errore && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
              {errore}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Mario Rossi"
              className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-500 transition-colors ${!nome.trim() && errore ? 'border-red-300' : 'border-gray-200'}`}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tua@email.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimo 6 caratteri"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <button
            onClick={handleRegistrazione}
            disabled={caricamento}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
          >
            {caricamento ? 'Registrazione in corso...' : 'Crea account'}
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Hai già un account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Accedi
            </Link>
          </p>

        </div>
      </main>
    </div>
  )
}
