'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visibile, setVisibile] = useState(false)

  useEffect(() => {
    const consenso = localStorage.getItem('cookieConsent')
    if (!consenso) {
      setTimeout(() => setVisibile(true), 800)
    }
  }, [])

  function accettaTutti() {
    localStorage.setItem('cookieConsent', 'all')
    setVisibile(false)
  }

  function soloNecessari() {
    localStorage.setItem('cookieConsent', 'necessary')
    setVisibile(false)
  }

  if (!visibile) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          
          {/* Testo */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🍪</span>
              <p className="font-semibold text-gray-900 text-sm">Utilizziamo i cookie</p>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Usiamo cookie tecnici necessari al funzionamento della piattaforma e cookie di terze parti (Stripe) per i pagamenti. 
              Leggi la nostra{' '}
              <Link href="/cookie" className="text-emerald-600 hover:underline font-medium">Cookie Policy</Link>
              {' '}e la{' '}
              <Link href="/privacy" className="text-emerald-600 hover:underline font-medium">Privacy Policy</Link>.
            </p>
          </div>

          {/* Bottoni */}
          <div className="flex flex-col sm:flex-row gap-2 md:flex-shrink-0">
            <button
              onClick={soloNecessari}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Solo necessari
            </button>
            <button
              onClick={accettaTutti}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-colors whitespace-nowrap"
            >
              Accetta tutti ✓
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
