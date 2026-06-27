import Link from 'next/link'

export default function TerminiPage() {
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
          <h1 className="text-4xl font-bold text-white mb-3">Termini e Condizioni</h1>
          <p className="text-white/70 text-sm">Ultimo aggiornamento: giugno 2026</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-16">

        <div className="space-y-10 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Informazioni sul Titolare</h2>
            <p>
              La piattaforma FormazioneOCF è gestita da <strong>INSURHUB S.r.l.</strong>,
              con sede legale in Italia, P.IVA <strong>06384170657</strong>.<br />
              Contatto: <a href="mailto:info@formazioneocf.com" className="text-blue-600 hover:underline">info@formazioneocf.com</a>
            </p>
            <p className="mt-3">
              I pagamenti effettuati sulla piattaforma sono processati e intestati a <strong>INSURHUB S.r.l.</strong>
              L'utente, completando l'acquisto, accetta che il contratto di vendita sia stipulato con INSURHUB S.r.l.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Oggetto del servizio</h2>
            <p>
              FormazioneOCF è una piattaforma digitale di preparazione all'esame per l'iscrizione
              al Registro Unico degli Intermediari assicurativi e riassicurativi (RUI), gestito da IVASS.
              Il servizio include l'accesso a domande di preparazione, simulazioni d'esame e strumenti
              di monitoraggio dei progressi.
            </p>
            <p className="mt-3">
              Il servizio ha una <strong>validità di 12 mesi</strong> dalla data di acquisto.
              Trascorso tale periodo, l'accesso verrà disattivato automaticamente.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Acquisto e pagamento</h2>
            <p>I piani disponibili sono:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Simulatore OCF Completo</strong> — €29,00 IVA inclusa — validità 12 mesi</li>
            </ul>
            <p className="mt-3">
              I pagamenti vengono processati in modo sicuro tramite <strong>Stripe Inc.</strong>
              INSURHUB S.r.l. non conserva i dati della carta di credito dell'utente.
              Al completamento dell'acquisto verrà inviata conferma via email.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Diritto di recesso</h2>
            <p>
              Ai sensi dell'<strong>art. 59, lett. o) del D.Lgs. 206/2005</strong> (Codice del Consumo),
              il diritto di recesso è <strong>escluso</strong> per i contenuti digitali forniti su supporto
              non materiale la cui esecuzione sia iniziata con il consenso espresso del consumatore e con
              la consapevole rinuncia al diritto di recesso.
            </p>
            <p className="mt-3">
              Pertanto, una volta attivato l'accesso alla piattaforma, non sarà possibile esercitare
              il diritto di recesso né ottenere rimborsi, salvo diversa previsione di legge o
              accordo scritto con INSURHUB S.r.l.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Limitazione di responsabilità</h2>
            <p>
              FormazioneOCF è una piattaforma di preparazione e studio. I contenuti hanno scopo
              esclusivamente didattico e preparatorio. Ai sensi degli <strong>artt. 1218, 1223 e 2050
              del Codice Civile</strong> e nei limiti consentiti dalla legge applicabile:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                INSURHUB S.r.l. <strong>non garantisce il superamento dell'esame RUI</strong>.
                Il risultato dipende esclusivamente dalla preparazione e dalle capacità dell'utente.
                La piattaforma costituisce uno strumento di supporto allo studio e non un servizio
                di consulenza professionale.
              </li>
              <li>
                INSURHUB S.r.l. <strong>non è responsabile di eventuali aggiornamenti normativi</strong>
                OCF successivi alla pubblicazione dei contenuti. Le domande sono periodicamente
                aggiornate, ma l'utente è invitato a verificare sempre le normative vigenti sul
                sito ufficiale OCF.
              </li>
              <li>
                Ai sensi dell'<strong>art. 1256 c.c.</strong>, INSURHUB S.r.l. non è responsabile
                di interruzioni del servizio dovute a cause di forza maggiore, manutenzione
                programmata, guasti tecnici, attacchi informatici o eventi al di fuori del
                ragionevole controllo del fornitore.
              </li>
              <li>
                Ai sensi dell'<strong>art. 1227 c.c.</strong>, INSURHUB S.r.l. non è responsabile
                di danni diretti o indiretti derivanti dall'utilizzo o dalla non disponibilità
                della piattaforma, inclusi danni economici, perdita di dati o mancato guadagno.
              </li>
              <li>
                I contenuti della piattaforma <strong>non costituiscono consulenza legale,
                professionale, fiscale o assicurativa</strong> di alcun tipo ai sensi della
                normativa vigente.
              </li>
              <li>
                INSURHUB S.r.l. <strong>non è in alcun modo affiliata, sponsorizzata o
                approvata da OCF</strong>. Il riferimento all'esame RUI è esclusivamente
                descrittivo della finalità preparatoria del servizio.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Proprietà intellettuale</h2>
            <p>
              Tutti i contenuti presenti sulla piattaforma FormazioneOCF (testi, domande, grafica, codice)
              sono di proprietà di INSURHUB S.r.l. o concessi in licenza ai sensi della
              <strong> L. 633/1941</strong> (Legge sul Diritto d'Autore) e successive modifiche.
              È vietata la riproduzione, distribuzione, modifica o utilizzo commerciale dei contenuti
              senza autorizzazione scritta di INSURHUB S.r.l.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Account utente</h2>
            <p>
              L'utente è responsabile della riservatezza delle proprie credenziali di accesso ai sensi
              dell'<strong>art. 1218 c.c.</strong> L'account è strettamente personale e non cedibile a terzi.
              INSURHUB S.r.l. si riserva il diritto di sospendere o cancellare account che violino
              i presenti Termini e Condizioni, senza obbligo di rimborso.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Modifiche al servizio</h2>
            <p>
              INSURHUB S.r.l. si riserva il diritto di modificare, sospendere o interrompere
              il servizio FormazioneOCF in qualsiasi momento. In caso di modifiche sostanziali,
              gli utenti registrati con abbonamento attivo verranno informati via email con almeno
              30 giorni di anticipo. In caso di interruzione definitiva del servizio durante un
              periodo di abbonamento attivo, sarà riconosciuto un rimborso proporzionale.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">9. Legge applicabile e foro competente</h2>
            <p>
              I presenti Termini e Condizioni sono regolati dalla <strong>legge italiana</strong>.
              Per qualsiasi controversia derivante dall'utilizzo della piattaforma, le parti eleggono
              come foro competente esclusivo il <strong>Tribunale di Salerno</strong>, salvo diversa
              previsione inderogabile di legge a favore del consumatore ai sensi del
              D.Lgs. 206/2005 (Codice del Consumo).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">10. Contatti</h2>
            <p>
              Per informazioni, reclami o assistenza:<br />
              <strong>INSURHUB S.r.l.</strong><br />
              Email: <a href="mailto:info@formazioneocf.com" className="text-blue-600 hover:underline">info@formazioneocf.com</a><br />
              P.IVA: 06384170657
            </p>
          </section>

        </div>
      </div>

      <footer className="bg-blue-50 border-t border-blue-100 py-6 px-6 text-center">
        <p className="text-xs text-gray-400">© 2026 FormazioneOCF — INSURHUB S.r.l. P.IVA 06384170657</p>
        <Link href="/" className="text-xs text-blue-600 hover:text-blue-700 mt-1 block">← Torna alla home</Link>
      </footer>
    </div>
  )
}
