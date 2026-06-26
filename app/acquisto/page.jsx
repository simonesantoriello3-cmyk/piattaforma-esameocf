'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

const PIANI = [
  {
    id: 'assicurativo',
    titolo: 'Modulo Assicurativo',
    prezzo: 79,
    materie: '6 materie',
    domande: '1.758 domande',
    simulazione: '50 domande · 75 minuti',
    soglia: 'Soglia 60% · 30/50',
    features: ['1.758 domande ufficiali', 'Simulazione 50 domande', '75 minuti · soglia 60%', 'Validita 12 mesi'],
    colore: 'emerald',
    consigliato: false,
  },
  {
    id: 'riassicurativo',
    titolo: 'Modulo Riassicurativo',
    prezzo: 39,
    materie: '2 materie',
    domande: '534 domande',
    simulazione: '20 domande · 30 minuti',
    soglia: 'Soglia 60% · 12/20',
    features: ['534 domande ufficiali', 'Simulazione 20 domande', '30 minuti · soglia 60%', 'Validita 12 mesi'],
    colore: 'emerald',
    consigliato: false,
  },
  {
    id: 'completo',
    titolo: 'Entrambi i Moduli (Assicurativo + Riassicurativo)',
    prezzo: 99,
    materie: '8 materie',
    domande: '2.292 domande',
    simulazione: '70 domande · 105 minuti',
    soglia: 'Soglia 60% · 42/70',
    features: ['2.292 domande ufficiali', 'Tutte le simulazioni', 'Simulazione completa 70 dom.', 'Validita 12 mesi'],
    colore: 'blue',
    consigliato: true,
  },
]

export default function AcquistoPage() {
  const router = useRouter()
  const supabase = createClient()
  const [selectedPiano, setSelectedPiano] = useState(null)
  const [consenso, setConsenso] = useState(false)
  const [loading, setLoading] = useState(false)

  async function procediPagamento() {
    if (!selectedPiano || !consenso) return
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
        modulo: selectedPiano,
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

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Scegli il tuo modulo</h1>
          <p className="text-gray-500">Acquisto una tantum · IVA inclusa · Validita 12 mesi</p>
        </div>

        {/* Piani */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {PIANI.map(piano => (
            <div
              key={piano.id}
              onClick={() => setSelectedPiano(piano.id)}
              className={`relative rounded-2xl p-6 cursor-pointer transition-all border-2 ${
                selectedPiano === piano.id
                  ? piano.consigliato
                    ? 'border-blue-500 bg-blue-600 text-white'
                    : 'border-emerald-500 bg-emerald-50'
                  : piano.consigliato
                  ? 'border-blue-200 bg-blue-600 text-white'
                  : 'border-gray-200 bg-white hover:border-emerald-300'
              }`}
            >
              {piano.consigliato && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                  CONVENIENTE
                </span>
              )}

              {selectedPiano === piano.id && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}

              <h3 className={`font-bold mb-1 ${piano.consigliato ? 'text-white' : 'text-gray-900'}`}>
                {piano.titolo}
              </h3>
              <p className={`text-xs mb-4 ${piano.consigliato ? 'text-blue-200' : 'text-gray-400'}`}>
                {piano.materie} · {piano.domande}
              </p>

              <p className={`text-3xl font-bold mb-1 ${piano.consigliato ? 'text-white' : 'text-gray-900'}`}>
                €{piano.prezzo}
              </p>
              <p className={`text-xs mb-4 ${piano.consigliato ? 'text-blue-200' : 'text-gray-400'}`}>
                IVA inclusa · validita 12 mesi
              </p>

              <ul className="space-y-2">
                {piano.features.map(f => (
                  <li key={f} className={`flex items-center gap-2 text-sm ${piano.consigliato ? 'text-blue-100' : 'text-gray-600'}`}>
                    <span className={piano.consigliato ? 'text-yellow-400' : 'text-emerald-500'}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Checkbox consenso */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consenso}
              onChange={e => setConsenso(e.target.checked)}
              className="mt-1 accent-emerald-600 w-4 h-4"
            />
            <span className="text-sm text-gray-600 leading-relaxed">
              Confermo di aver letto e accettato i{' '}
              <Link href="/termini" className="text-emerald-600 hover:underline">Termini e Condizioni</Link>
              {' '}e la{' '}
              <Link href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>
              {' '}di FormazioneRUI.
            </span>
          </label>
        </div>

        {/* Bottone pagamento */}
        <button
          onClick={procediPagamento}
          disabled={!selectedPiano || !consenso || loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-xl transition-colors text-lg"
        >
          {loading
            ? 'Reindirizzamento...'
            : selectedPiano
            ? `Acquista ${PIANI.find(p => p.id === selectedPiano)?.titolo} — €${PIANI.find(p => p.id === selectedPiano)?.prezzo}`
            : 'Seleziona un piano per continuare'}
        </button>

        <div className="text-center mt-4 space-y-1">
          <p className="text-xs text-gray-400">🔒 Pagamento sicuro tramite Stripe · Nessun dato della carta salvato</p>
          <p className="text-xs text-gray-400">I pagamenti sono gestiti da INSURHUB S.r.l. — P.IVA 06384170657</p>
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-emerald-50 border-t border-emerald-100 py-6 px-6 text-center mt-10">
        <p className="text-xs text-gray-400">© 2025 FormazioneRUI — INSURHUB S.r.l. P.IVA 06384170657</p>
      </footer>

    </div>
  )
}