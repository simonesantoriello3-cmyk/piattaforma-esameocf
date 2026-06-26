import Link from 'next/link'

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-white">

      <section
        className="relative py-20 px-6 text-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/65"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-3">Cookie Policy</h1>
          <p className="text-white/70 text-sm">Ultimo aggiornamento: giugno 2026</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-16">

        <div className="space-y-10 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Cosa sono i cookie</h2>
            <p>
              I cookie sono piccoli file di testo che i siti web salvano sul dispositivo 
              dell'utente durante la navigazione. Vengono utilizzati per far funzionare 
              correttamente il sito e per raccogliere informazioni sulla navigazione.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Cookie utilizzati da FormazioneRUI</h2>
            
            <h3 className="font-semibold text-gray-800 mb-2 mt-4">Cookie tecnici (necessari)</h3>
            <p>Questi cookie sono indispensabili per il funzionamento della piattaforma:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Cookie di sessione Supabase:</strong> mantengono attiva la sessione di login dell'utente</li>
              <li><strong>Cookie di preferenze:</strong> memorizzano le impostazioni dell'utente</li>
            </ul>
            <p className="mt-2 text-sm text-gray-500">
              Questi cookie non richiedono consenso in quanto necessari al funzionamento del servizio.
            </p>

            <h3 className="font-semibold text-gray-800 mb-2 mt-4">Cookie di terze parti</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Stripe:</strong> cookie tecnici per la gestione sicura dei pagamenti</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Come gestire i cookie</h2>
            <p>
              L'utente può gestire o disabilitare i cookie attraverso le impostazioni del proprio browser. 
              Si avverte che la disabilitazione dei cookie tecnici potrebbe compromettere 
              il corretto funzionamento della piattaforma, incluso il mantenimento della sessione di accesso.
            </p>
            <p className="mt-3">
              Guide per gestire i cookie nei principali browser:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Google Chrome: Impostazioni → Privacy e sicurezza → Cookie</li>
              <li>Mozilla Firefox: Preferenze → Privacy e sicurezza</li>
              <li>Safari: Preferenze → Privacy</li>
              <li>Microsoft Edge: Impostazioni → Cookie e autorizzazioni sito</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Contatti</h2>
            <p>
              Per informazioni sull'uso dei cookie:<br />
              <a href="mailto:info@formazionerui.com" className="text-emerald-600 hover:underline">info@formazionerui.com</a>
            </p>
          </section>

        </div>
      </div>

      <footer className="bg-emerald-50 border-t border-emerald-100 py-6 px-6 text-center">
        <p className="text-xs text-gray-400">© 2026 FormazioneRUI — INSURHUB S.r.l. P.IVA 06384170657</p>
        <Link href="/" className="text-xs text-emerald-600 hover:text-emerald-700 mt-1 block">← Torna alla home</Link>
      </footer>
    </div>
  )
}
