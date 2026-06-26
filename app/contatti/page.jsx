import Link from 'next/link'

export default function ContattiPage() {
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
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 text-lg">✉️</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href="mailto:info@formazionerui.com" className="text-emerald-600 hover:underline text-sm">
                      info@formazionerui.com
                    </a>
                    <p className="text-xs text-gray-400 mt-1">Risposta entro 24-48 ore lavorative</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 text-lg">🏢</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Società</p>
                    <p className="text-sm text-gray-500">INSURHUB S.r.l.</p>
                    <p className="text-sm text-gray-500">P.IVA 06384170657</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 text-lg">🕐</span>
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
            <div className="bg-emerald-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Domande frequenti</h3>
              <div className="space-y-4">
                {[
                  { q: 'Quanto dura l\'accesso?', r: '12 mesi dalla data di acquisto.' },
                  { q: 'Posso cambiare modulo?', r: 'Contattaci via email, valuteremo insieme la soluzione.' },
                  { q: 'I pagamenti sono sicuri?', r: 'Sì, utilizziamo Stripe con crittografia SSL.' },
                  { q: 'Posso avere un rimborso?', r: 'Consulta i nostri Termini e Condizioni per la politica di recesso.' },
                ].map(faq => (
                  <div key={faq.q} className="border-b border-emerald-100 pb-3 last:border-0 last:pb-0">
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
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome e cognome</label>
                <input
                  type="text"
                  placeholder="Mario Rossi"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="mario@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Oggetto</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                  <option>Informazioni sul servizio</option>
                  <option>Problema tecnico</option>
                  <option>Acquisto e pagamenti</option>
                  <option>Altro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Messaggio</label>
                <textarea
                  rows={5}
                  placeholder="Scrivi il tuo messaggio..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white resize-none"
                />
              </div>
              <p className="text-xs text-gray-400">
                Inviando questo modulo accetti la nostra{' '}
                <Link href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>.
              </p>
              <a
                href="mailto:info@formazionerui.com"
                className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors text-center text-sm"
              >
                Invia messaggio →
              </a>
              <p className="text-xs text-gray-400 text-center">
                Il pulsante aprirà il tuo client email predefinito.
              </p>
            </div>
          </div>

        </div>
      </section>

      <footer className="bg-emerald-50 border-t border-emerald-100 py-6 px-6 text-center">
        <p className="text-xs text-gray-400">© 2025 FormazioneRUI — INSURHUB S.r.l. P.IVA 06384170657</p>
        <Link href="/" className="text-xs text-emerald-600 hover:text-emerald-700 mt-1 block">← Torna alla home</Link>
      </footer>
    </div>
  )
}
