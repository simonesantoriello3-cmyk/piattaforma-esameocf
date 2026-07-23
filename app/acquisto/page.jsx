'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function AcquistoPage() {
  const router = useRouter()
  const supabase = createClient()
  const [consenso, setConsenso] = useState(false)
  const [loading, setLoading] = useState(false)

  async function procediPagamento() {
    if (!consenso) return
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        modulo: 'ocf',
        userId: user.id,
        email: user.email,
      }),
    })

    const { url } = await res.json()
    if (url) window.location.href = url
    else setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inizia la preparazione</h1>
          <p className="text-gray-500">Acquisto una tantum · IVA inclusa · Validità 12 mesi</p>
        </div>

        {/* Piano unico */}
        <div className="bg-blue-600 rounded-2xl p-8 text-center relative mb-8">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
            OFFERTA LANCIO
          </span>
          <h3 className="font-bold text-white text-xl mb-1">Simulatore OCF Completo</h3>
          <p className="text-blue-200 text-sm mb-6">5.000+ domande · 5 materie · Aggiornato gennaio 2026</p>
          <p className="text-5xl font-bold text-white mb-1">€29</p>
          <p className="text-blue-200 text-sm mb-8">IVA inclusa · validità 12 mesi</p>
          <ul className="space-y-3 mb-8 text-left">
            {[
              '5.000+ domande OCF',
              'Simulazione 60 domande · 85 minuti',
              'Soglia 80/100 come l\'esame reale',
              'Tutte e 5 le materie del bando',
              'Aggiornato a gennaio 2026',
              'Accesso illimitato per 12 mesi',
            ].map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-blue-100">
                <span className="text-yellow-400">✓</span> {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Garanzia */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 mb-6">
          <div className="flex items-center justify-center gap-3 text-center">
            <span className="text-xl" aria-hidden="true">🛡️</span>
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Garanzia Promosso o Riprovi Gratis:</span> se non superi la prova, rinnoviamo l'accesso per altri 12 mesi gratis
            </p>
          </div>
        </div>

        {/* Checkbox consenso */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consenso}
              onChange={e => setConsenso(e.target.checked)}
              className="mt-1 accent-blue-600 w-4 h-4"
            />
            <span className="text-sm text-gray-600 leading-relaxed">
              Confermo di aver letto e accettato i{' '}
              <Link href="/termini" className="text-blue-600 hover:underline">Termini e Condizioni</Link>
              {' '}e la{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
              {' '}di FormazioneOCF.
            </span>
          </label>
        </div>

        {/* Bottone pagamento */}
        <button
          onClick={procediPagamento}
          disabled={!consenso || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-xl transition-colors text-lg"
        >
          {loading ? 'Reindirizzamento...' : 'Acquista Simulatore OCF — €29'}
        </button>

        <div className="text-center mt-4 space-y-1">
          <p className="text-xs text-gray-400">🔒 Pagamento sicuro tramite Stripe · Nessun dato della carta salvato</p>
          <p className="text-xs text-gray-400">I pagamenti sono gestiti da INSURHUB S.r.l. — P.IVA 06384170657</p>
        </div>
      </div>

      <footer className="bg-blue-50 border-t border-blue-100 py-6 px-6 text-center mt-10">
        <p className="text-xs text-gray-400">© 2026 FormazioneOCF — INSURHUB S.r.l. P.IVA 06384170657</p>
      </footer>
    </div>
  )
}
