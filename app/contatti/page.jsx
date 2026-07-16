"use client"

import { useState } from 'react'
import Link from 'next/link'

const OGGETTI = [
  'Informazioni sul servizio',
  'Richiesta fattura',
  'Problema tecnico',
  'Acquisto e pagamenti',
  'Altro',
]

export default function ContattiPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    oggetto: OGGETTI[0],
    messaggio: '',
    honeypot: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData(current => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setIsSubmitting(true)
    setFeedback({ type: '', message: '' })

    try {
      const response = await fetch('/api/contatti', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Invio non riuscito. Riprova più tardi.')
      }

      setFeedback({
        type: 'success',
        message: 'Messaggio inviato! Ti risponderemo entro 24-48 ore',
      })
      setFormData({
        nome: '',
        email: '',
        oggetto: OGGETTI[0],
        messaggio: '',
        honeypot: '',
      })
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'Si è verificato un errore durante l\'invio.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero con foto */}
      <section
        className="relative py-20 px-6 text-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Contattaci</h1>
          <p className="text-white/80 text-lg">
            Siamo a tua disposizione per qualsiasi informazione sul servizio.
          </p>
        </div>
      </section>

      {/* Contenuto */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Info contatto */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Informazioni di contatto</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-lg">✉️</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href="mailto:info@formazioneocf.com" className="text-blue-600 hover:underline text-sm">
                      info@formazioneocf.com
                    </a>
                    <p className="text-xs text-gray-400 mt-1">Risposta entro 24-48 ore lavorative</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-lg">🏢</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Società</p>
                    <p className="text-sm text-gray-500">INSURHUB S.r.l.</p>
                    <p className="text-sm text-gray-500">P.IVA 06384170657</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-lg">🕐</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Orari di risposta</p>
                    <p className="text-sm text-gray-500">Lunedì – Venerdì</p>
                    <p className="text-sm text-gray-500">9:00 – 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ rapide */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Domande frequenti</h3>
              <div className="space-y-4">
                {[
                  { q: 'Quanto dura l\'accesso?', r: '12 mesi dalla data di acquisto.' },
                  { q: 'Posso cambiare modulo?', r: 'Contattaci via email, valuteremo insieme la soluzione.' },
                  { q: 'I pagamenti sono sicuri?', r: 'Sì, utilizziamo Stripe con crittografia SSL.' },
                  {
                    q: 'Come posso richiedere la fattura?',
                    r: <>
                      Puoi richiedere la fattura entro 24 ore dall&apos;acquisto, scrivendo a <a href="mailto:info@formazioneocf.com" className="text-blue-600 hover:underline">info@formazioneocf.com</a> o tramite il form in questa pagina selezionando &apos;Richiesta fattura&apos; come oggetto. Indica nel messaggio: nome e cognome, codice fiscale e indirizzo completo. Se sei un&apos;azienda: ragione sociale, P.IVA e codice SDI o PEC.
                    </>,
                  },
                  { q: 'Posso avere un rimborso?', r: 'Consulta i nostri Termini e Condizioni per la politica di recesso.' },
                ].map(faq => (
                  <div key={faq.q} className="border-b border-blue-100 pb-3 last:border-0 last:pb-0">
                    <p className="font-medium text-gray-900 text-sm">{faq.q}</p>
                    <p className="text-gray-500 text-sm mt-1">{faq.r}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form contatto */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Inviaci un messaggio</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome e cognome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Mario Rossi"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="mario@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Oggetto</label>
                <select
                  name="oggetto"
                  value={formData.oggetto}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  required
                >
                  {OGGETTI.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Messaggio</label>
                <textarea
                  rows={5}
                  name="messaggio"
                  value={formData.messaggio}
                  onChange={handleChange}
                  placeholder="Scrivi il tuo messaggio..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
                  required
                />
              </div>
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <p className="text-xs text-gray-400">
                Inviando questo modulo accetti la nostra{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="block w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-center text-sm"
              >
                {isSubmitting ? 'Invio in corso...' : 'Invia messaggio →'}
              </button>
              {feedback.message ? (
                <p
                  className={`text-sm text-center ${feedback.type === 'success' ? 'text-green-600' : 'text-red-600'}`}
                  role="status"
                >
                  {feedback.message}
                </p>
              ) : null}
            </form>
          </div>

        </div>
      </section>

      <footer className="bg-blue-50 border-t border-blue-100 py-6 px-6 text-center">
        <p className="text-xs text-gray-400">© 2026 FormazioneOCF — INSURHUB S.r.l. P.IVA 06384170657</p>
        <Link href="/" className="text-xs text-blue-600 hover:text-blue-700 mt-1 block">← Torna alla home</Link>
      </footer>
    </div>
  )
}
