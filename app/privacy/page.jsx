import Link from 'next/link'

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-white/70 text-sm">Ultimo aggiornamento: giugno 2026</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-16">

        <div className="space-y-10 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Titolare del trattamento</h2>
            <p>
              Il Titolare del trattamento dei dati personali è <strong>INSURHUB S.r.l.</strong>,
              con sede legale in Italia, P.IVA <strong>06384170657</strong>, che gestisce la piattaforma FormazioneRUI.<br />
              Contatto: <a href="mailto:info@formazionerui.com" className="text-emerald-600 hover:underline">info@formazionerui.com</a>
            </p>
            <p className="mt-3">
              Il trattamento dei dati personali avviene nel rispetto del <strong>Regolamento UE 2016/679 (GDPR)</strong> e del
              D.Lgs. 196/2003 (Codice Privacy) come modificato dal D.Lgs. 101/2018.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Dati raccolti</h2>
            <p>Raccogliamo i seguenti dati personali:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Dati di registrazione:</strong> nome, indirizzo email, password (cifrata con algoritmo bcrypt)</li>
              <li><strong>Dati di acquisto:</strong> storico pagamenti (i dati della carta sono gestiti esclusivamente da Stripe Inc. e non vengono mai trasmessi ai nostri server)</li>
              <li><strong>Dati di utilizzo:</strong> progressi nei quiz, risposte alle domande, risultati simulazioni, sessioni completate</li>
              <li><strong>Dati tecnici:</strong> indirizzo IP, tipo di browser, sistema operativo, pagine visitate, data e ora di accesso</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Finalità e basi giuridiche del trattamento</h2>
            <p>I dati vengono trattati per le seguenti finalità:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Erogazione del servizio</strong> — base legale: esecuzione del contratto (art. 6, par. 1, lett. b GDPR)</li>
              <li><strong>Gestione pagamenti tramite Stripe</strong> — base legale: esecuzione del contratto (art. 6, par. 1, lett. b GDPR)</li>
              <li><strong>Comunicazioni relative al servizio</strong> (email di conferma, aggiornamenti) — base legale: legittimo interesse (art. 6, par. 1, lett. f GDPR)</li>
              <li><strong>Adempimento obblighi legali e fiscali</strong> — base legale: obbligo di legge (art. 6, par. 1, lett. c GDPR)</li>
              <li><strong>Miglioramento della piattaforma</strong> mediante analisi aggregata e anonimizzata — base legale: legittimo interesse (art. 6, par. 1, lett. f GDPR)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Conservazione dei dati</h2>
            <p>I dati personali sono conservati per il tempo strettamente necessario:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Dati di account:</strong> fino alla cancellazione dell'account o per 5 anni dall'ultima attività</li>
              <li><strong>Dati di acquisto:</strong> 10 anni per obblighi fiscali e contabili ai sensi del D.P.R. 633/1972</li>
              <li><strong>Dati tecnici di navigazione:</strong> 12 mesi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Destinatari dei dati e responsabili del trattamento</h2>
            <p className="mb-3">
              I dati sono trattati dal Titolare e dai seguenti fornitori esterni designati
              responsabili del trattamento ai sensi dell'art. 28 GDPR:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Vercel Inc.</strong> (340 S Lemon Ave #4133, Walnut CA 91789, USA) —
                hosting sito, CDN e infrastruttura. Trasferimento dati extra-UE coperto da
                Standard Contractual Clauses (SCC) approvate dalla Commissione Europea.
              </li>
              <li>
                <strong>Supabase Inc.</strong> (970 Toa Payoh North #07-04, Singapore 318992 —
                data center UE regione "eu-west-1", Irlanda) — database, autenticazione,
                storage email e storico quiz degli utenti registrati. I dati sono archiviati
                all'interno dell'Unione Europea.
              </li>
              <li>
                <strong>Stripe Inc.</strong> (354 Oyster Point Blvd, South San Francisco, CA 94080, USA) —
                elaborazione sicura dei pagamenti. Non conserviamo dati della carta di credito.
                Trasferimento dati extra-UE coperto da SCC. Privacy policy: stripe.com/it/privacy.
              </li>
              <li>
                <strong>Aruba S.p.A.</strong> (Via San Clemente 53, 24036 Ponte San Pietro BG, Italia) —
                servizio email transazionale e registrazione dominio. Dati trattati in Italia.
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              I dati non vengono mai venduti a terzi né utilizzati per scopi pubblicitari.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Trasferimento dati extra-UE</h2>
            <p>
              Alcuni fornitori (Vercel, Stripe) hanno sede negli Stati Uniti. Il trasferimento dei dati
              avviene nel rispetto delle garanzie previste dal Capo V del GDPR, mediante l'adozione
              delle <strong>Clausole Contrattuali Standard (SCC)</strong> approvate dalla Commissione
              Europea con Decisione 2021/914/UE, che garantiscono un livello di protezione equivalente
              a quello previsto nell'Unione Europea.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Diritti dell'interessato (artt. 15-22 GDPR)</h2>
            <p>Ai sensi del Regolamento UE 2016/679, l'utente ha diritto a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Art. 15</strong> — Accedere ai propri dati personali</li>
              <li><strong>Art. 16</strong> — Rettificare dati inesatti o incompleti</li>
              <li><strong>Art. 17</strong> — Richiedere la cancellazione dei propri dati ("diritto all'oblio")</li>
              <li><strong>Art. 18</strong> — Ottenere la limitazione del trattamento</li>
              <li><strong>Art. 20</strong> — Richiedere la portabilità dei dati</li>
              <li><strong>Art. 21</strong> — Opporsi al trattamento dei propri dati</li>
              <li><strong>Art. 7, par. 3</strong> — Revocare il consenso in qualsiasi momento</li>
              <li>Proporre reclamo al <strong>Garante per la Protezione dei Dati Personali</strong> (<a href="https://www.garanteprivacy.it" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a>)</li>
            </ul>
            <p className="mt-3">
              Per esercitare questi diritti: <a href="mailto:info@formazionerui.com" className="text-emerald-600 hover:underline">info@formazionerui.com</a>.
              Il Titolare risponderà entro 30 giorni dalla ricezione della richiesta, come previsto dall'art. 12 GDPR.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Sicurezza dei dati</h2>
            <p>
              INSURHUB S.r.l. adotta misure tecniche e organizzative adeguate ai sensi dell'art. 32 GDPR
              per proteggere i dati personali da accessi non autorizzati, perdita, distruzione o
              divulgazione non autorizzata. Le misure includono:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Cifratura delle password con algoritmo bcrypt</li>
              <li>Trasmissione dati tramite protocollo HTTPS/TLS</li>
              <li>Accesso ai dati limitato al personale autorizzato</li>
              <li>Row Level Security (RLS) sul database per l'isolamento dei dati utente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">9. Modifiche alla Privacy Policy</h2>
            <p>
              Il Titolare si riserva il diritto di modificare la presente Privacy Policy in qualsiasi momento.
              Le modifiche sostanziali saranno comunicate agli utenti registrati via email con almeno
              15 giorni di anticipo. La versione aggiornata sarà sempre disponibile su questa pagina.
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
