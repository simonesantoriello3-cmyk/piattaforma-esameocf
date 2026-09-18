import Link from 'next/link'
import BotoneAcquista from '@/components/BotoneAcquista'
import { articoli } from '@/app/data/blog/articoli'

export default function HomePage() {
  const articoliRecenti = [...articoli]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 3)

  const serif = { fontFamily: "var(--font-playfair), Georgia, serif" }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F0E8' }}>

      {/* HERO */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-6 flex items-center gap-2">
              <span className="block w-6 h-px bg-blue-600" />
              Preparazione OCF · Prova Valutativa
            </p>
            <h1
              className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.1] mb-6"
              style={serif}
            >
              Non solo quiz.<br />
              Un metodo che{' '}
              <em className="text-blue-600 italic">funziona.</em>
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Oltre 5.000 domande aggiornate, simulazioni reali e tracciamento degli errori.
              Preparati come ti verrà chiesto davvero.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/registrazione"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full transition-colors text-base text-center"
              >
                Inizia gratis →
              </Link>
              <Link
                href="#piani"
                className="border-2 border-slate-900/25 hover:border-slate-900/60 text-slate-900 font-bold px-8 py-4 rounded-full transition-colors text-base text-center"
              >
                Scopri il piano
              </Link>
            </div>
            <p className="text-xs text-gray-400 mt-5">Pagamento unico · Nessun abbonamento · Validità 12 mesi</p>
          </div>

          {/* Mock quiz card */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-5">
              Simulazione guidata della preparazione
            </p>
            <p className="text-base font-semibold text-white mb-6 leading-snug">
              «Il consulente finanziario può ricevere incentivi da soggetti diversi dal cliente?»
            </p>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                { label: 'Sì, sempre', correct: false },
                { label: 'No, mai', correct: false },
                { label: 'Sì, con condizioni', correct: true },
                { label: 'Solo su prodotti assicurativi', correct: false },
              ].map((opt, i) => (
                <div
                  key={i}
                  className={`text-sm px-4 py-3 rounded-xl font-medium ${
                    opt.correct
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {opt.label}
                </div>
              ))}
            </div>
            <div className="border-t border-slate-700/60 pt-5">
              <p className="text-blue-400 text-sm font-bold mb-1">✓ Risposta corretta</p>
              <p className="text-slate-400 text-xs leading-relaxed">
                Sì, con condizioni — art. 52 Reg. Intermediari Consob.{' '}
                Le due sessioni annuali:{' '}
                <span className="text-white font-semibold">giugno · dicembre</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white/50 py-12 px-6 border-y border-white/80">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-slate-900" style={serif}>5.000+</p>
            <p className="text-sm text-gray-500 mt-1">Domande aggiornate</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-slate-900" style={serif}>5</p>
            <p className="text-sm text-gray-500 mt-1">Materie coperte</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-slate-900" style={serif}>10</p>
            <p className="text-sm text-gray-500 mt-1">Appelli l'anno</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-4 flex items-center gap-2">
            <span className="block w-6 h-px bg-blue-600" />
            La piattaforma
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12" style={serif}>
            Tutto quello che ti serve<br />
            per <em className="text-blue-600 italic">superare l'esame OCF.</em>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: '📚',
                titolo: 'Domande',
                desc: 'Oltre 5.000 domande aggiornate a gennaio 2026, divise per materia e argomento. Copre tutte le 5 aree del bando OCF.',
              },
              {
                emoji: '⏱',
                titolo: 'Simulazione reale',
                desc: "Simula l'esame con 60 domande in 85 minuti, punteggio 80/100 per superarlo, esattamente come la prova valutativa ufficiale.",
              },
              {
                emoji: '📊',
                titolo: 'Tracciamento progressi',
                desc: 'Monitora i tuoi errori per materia e concentrati dove sei più debole. La matematica e il diritto valgono il 72% dell’esame.',
              },
            ].map(f => (
              <div key={f.titolo} className="bg-white/70 rounded-2xl p-7 border border-white shadow-sm">
                <div className="text-3xl mb-4">{f.emoji}</div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">{f.titolo}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                <p className="text-sm text-gray-400 mt-4">Validità 12 mesi</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIE */}
      <section className="bg-slate-900 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-4 flex items-center gap-2">
            <span className="block w-6 h-px bg-blue-400" />
            Il programma
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={serif}>
            Le 5 materie dell'esame OCF
          </h2>
          <p className="text-slate-400 text-sm mb-12">
            La distribuzione ufficiale delle 60 domande secondo il bando OCF 2026
          </p>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { lettera: 'A', nome: 'Diritto del mercato finanziario e degli intermediari', domande: '2.000' },
              { lettera: 'B', nome: 'Matematica finanziaria, mercati e strumenti', domande: '1.600' },
              { lettera: 'C', nome: 'Nozioni di diritto tributario', domande: '500' },
              { lettera: 'D', nome: 'Nozioni di diritto previdenziale e assicurativo', domande: '500' },
              { lettera: 'E', nome: 'Nozioni di diritto privato', domande: '400' },
            ].map(m => (
              <div key={m.lettera} className="bg-slate-800 rounded-2xl p-5 text-center border border-slate-700">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                  {m.lettera}
                </div>
                <p className="text-2xl font-bold text-white" style={serif}>{m.domande}</p>
                <p className="text-xs text-slate-500 mt-1">domande</p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{m.nome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-4 flex items-center gap-2">
            <span className="block w-6 h-px bg-blue-600" />
            Come funziona
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12" style={serif}>
            Un'interfaccia semplice,{' '}
            <em className="text-blue-600 italic">pensata per chi ha poco tempo.</em>
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <img
                src="/quiz-screenshot.png"
                alt="Screenshot quiz OCF"
                className="rounded-2xl shadow-xl border border-gray-100 w-full"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-7">
              {[
                { n: '1', titolo: 'Scegli la materia', desc: 'Seleziona quante domande fare per ogni materia con uno slider intuitivo.' },
                { n: '2', titolo: 'Rispondi alle domande', desc: '4 opzioni di risposta, feedback immediato in verde o rosso dopo ogni risposta.' },
                { n: '3', titolo: 'Analizza i risultati', desc: 'Vedi il punteggio finale, rivedi le domande sbagliate e monitora i tuoi progressi.' },
                { n: '4', titolo: 'Simula l’esame', desc: '60 domande in 85 minuti con punteggio reale. Devi raggiungere 80/100 per superarlo.' },
              ].map(s => (
                <div key={s.n} className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{s.n}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{s.titolo}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PIANO */}
      <section id="piani" className="bg-white/50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-4 flex items-center gap-2 justify-center">
            <span className="block w-6 h-px bg-blue-600" />
            Prezzo
            <span className="block w-6 h-px bg-blue-600" />
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-3" style={serif}>
            Inizia subito la preparazione.
          </h2>
          <p className="text-gray-500 text-center mb-12 text-sm">
            Acquisto una tantum · IVA inclusa · Validità 12 mesi
          </p>
          <div className="max-w-sm mx-auto">
            <div className="bg-slate-900 rounded-3xl p-8 text-center relative shadow-2xl">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1.5 rounded-full">
                OFFERTA LANCIO
              </span>
              <h3 className="font-bold text-white text-xl mb-1" style={serif}>Simulatore OCF Completo</h3>
              <p className="text-slate-400 text-sm mb-8">5.000+ domande · 5 materie · Aggiornato gennaio 2026</p>
              <p className="text-6xl font-bold text-white mb-1" style={serif}>€29</p>
              <p className="text-slate-400 text-sm mb-8">IVA inclusa · validità 12 mesi</p>
              <ul className="space-y-3 mb-8 text-left">
                {[
                  '5.000+ domande OCF',
                  'Simulazione 60 domande · 85 minuti',
                  'Soglia 80/100 come l’esame reale',
                  'Tutte e 5 le materie del bando',
                  'Aggiornato a gennaio 2026',
                  'Accesso illimitato per 12 mesi',
                ].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-blue-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <div className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-base" aria-hidden="true">🛡️</span>
                  <div>
                    <p className="text-sm font-semibold text-white">Garanzia Promosso o Riprovi Gratis</p>
                    <p className="text-xs text-slate-400 mt-0.5">Se non superi la prova, rinnoviamo l'accesso per altri 12 mesi gratis</p>
                  </div>
                </div>
              </div>
              <BotoneAcquista className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-full transition-colors text-base">
                Acquista ora →
              </BotoneAcquista>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-4 flex items-center gap-2">
            <span className="block w-6 h-px bg-blue-600" />
            Dal blog
          </p>
          <h2 className="text-3xl font-bold text-slate-900 mb-12" style={serif}>
            Guide pratiche per{' '}
            <em className="text-blue-600 italic">prepararti al meglio.</em>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {articoliRecenti.map(a => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group bg-white/70 rounded-2xl p-6 border border-white hover:shadow-md hover:border-blue-200 transition-all"
              >
                <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">{a.minuti} min</span>
                <h3 className="font-bold text-gray-900 mt-3 mb-2 group-hover:text-blue-700 transition-colors text-sm leading-snug">{a.titolo}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{a.descrizione}</p>
                <span className="text-blue-600 text-xs font-semibold">Leggi →</span>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/blog" className="text-blue-700 hover:text-blue-900 text-sm font-semibold underline underline-offset-4">
              Vedi tutti gli articoli →
            </Link>
          </div>
        </div>
      </section>

      {/* RECENSIONI */}
      <section className="bg-slate-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-4 flex items-center gap-2 justify-center">
            <span className="block w-6 h-px bg-blue-400" />
            Recensioni
            <span className="block w-6 h-px bg-blue-400" />
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={serif}>
            Le recensioni dei nostri utenti
          </h2>
          <p className="text-slate-400 text-sm mb-10">
            Recensioni verificate e indipendenti su Trustpilot
          </p>
          <div className="max-w-xl mx-auto rounded-3xl border border-slate-700 bg-slate-800 p-8">
            <div className="flex items-center justify-center gap-1 mb-5" aria-label="5 stelle Trustpilot">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#00B67A] text-2xl leading-none">★</span>
              ))}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Scopri cosa dicono gli utenti che hanno già provato la piattaforma.
            </p>
            <a
              href="https://it.trustpilot.com/review/formazioneocf.com"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-500"
            >
              Leggi le recensioni su Trustpilot →
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <div className="w-4 h-6 bg-blue-500 rounded-sm" />
              <div className="w-4 h-6 bg-blue-800 rounded-sm" style={{ marginLeft: '2px' }} />
              <span className="text-blue-400 font-bold text-lg ml-2">Formazione</span>
              <span className="text-white font-bold text-lg">OCF</span>
            </div>
            <p className="text-xs text-slate-500 max-w-xs">
              La piattaforma per prepararsi all'esame OCF con metodo e sicurezza.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Informazioni</p>
            <Link href="/blog" className="text-sm text-slate-500 hover:text-white transition-colors">Blog</Link>
            <Link href="/chi-siamo" className="text-sm text-slate-500 hover:text-white transition-colors">Chi siamo</Link>
            <Link href="/contatti" className="text-sm text-slate-500 hover:text-white transition-colors">Contatti</Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Legale</p>
            <Link href="/termini" className="text-sm text-slate-500 hover:text-white transition-colors">Termini e condizioni</Link>
            <Link href="/privacy" className="text-sm text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/cookie" className="text-sm text-slate-500 hover:text-white transition-colors">Cookie Policy</Link>
          </div>
          <div className="text-xs text-slate-600 md:text-right">
            <p>© 2026 FormazioneOCF — INSURHUB S.r.l. P.IVA 06384170657. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}