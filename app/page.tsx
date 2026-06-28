import Link from 'next/link'
import BotoneAcquista from '@/components/BotoneAcquista'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section
        className="relative text-center px-6 py-28"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/65"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            Preparazione Esame OCF 2026
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Preparati all'Esame OCF<br />con quiz e simulazioni
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            La piattaforma di riferimento per chi vuole superare la prova valutativa OCF e iscriversi all'Albo unico dei Consulenti Finanziari.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/registrazione" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base">
              Inizia la preparazione →
            </Link>
            <Link href="#piani" className="border border-white/50 hover:border-white text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base">
              Scopri il piano
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-12 px-6 border-y border-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-600">5.000+</p>
            <p className="text-sm text-gray-500 mt-1">Domande</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">5</p>
            <p className="text-sm text-gray-500 mt-1">Materie coperte</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">10</p>
            <p className="text-sm text-gray-500 mt-1">Appelli l'anno</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Tutto quello che ti serve per superare l'esame OCF
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: '📚', titolo: 'Domande', desc: 'Oltre 5.000 domande aggiornate a gennaio 2026, divise per materia e argomento. Copre tutte le 5 aree del bando OCF.' },
              { emoji: '⏱', titolo: 'Simulazione reale', desc: "Simula l'esame con 60 domande in 85 minuti, punteggio 80/100 per superarlo, esattamente come la prova valutativa ufficiale." },
              { emoji: '📊', titolo: 'Tracciamento progressi', desc: 'Monitora i tuoi errori per materia e concentrati dove sei più debole. La matematica e il diritto valgono il 72% dell\'esame.' },
            ].map(f => (
              <div key={f.titolo} className="bg-gray-50 rounded-2xl p-6">
                <div className="text-3xl mb-3">{f.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.titolo}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                <p className="text-sm text-gray-500 leading-relaxed mt-4">Validità 12 mesi</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIE */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            Le 5 materie dell'esame OCF
          </h2>
          <p className="text-gray-500 text-center text-sm mb-10">
            La distribuzione ufficiale delle 60 domande secondo il bando OCF 2026
          </p>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { lettera: 'A', nome: 'Diritto del mercato finanziario e degli intermediari', domande: '2.000', colore: 'bg-blue-600' },
              { lettera: 'B', nome: 'Matematica finanziaria, mercati e strumenti', domande: '1.600', colore: 'bg-blue-500' },
              { lettera: 'C', nome: 'Nozioni di diritto tributario', domande: '500', colore: 'bg-blue-400' },
              { lettera: 'D', nome: 'Nozioni di diritto previdenziale e assicurativo', domande: '500', colore: 'bg-blue-300' },
              { lettera: 'E', nome: 'Nozioni di diritto privato', domande: '400', colore: 'bg-blue-200' },
            ].map(m => (
              <div key={m.lettera} className="bg-white rounded-2xl p-5 text-center border border-gray-100 shadow-sm">
                <div className={`w-10 h-10 ${m.colore} rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3`}>
                  {m.lettera}
                </div>
                <p className="text-2xl font-bold text-gray-900">{m.domande}</p>
                <p className="text-xs text-gray-400 mt-1">domande</p>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{m.nome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">Come funziona</h2>
          <p className="text-gray-500 text-center text-sm mb-10">
            Un metodo di studio efficace, pensato per superare l'esame OCF al primo tentativo.
          </p>
          <div className="space-y-6 max-w-2xl mx-auto">
            {[
              { n: '1', titolo: 'Scegli la materia', desc: 'Seleziona quante domande fare per ogni materia. Inizia dal diritto finanziario che vale il 40% dell\'esame.' },
              { n: '2', titolo: 'Rispondi alle domande', desc: '4 opzioni di risposta A/B/C/D, feedback immediato dopo ogni risposta con la spiegazione corretta.' },
              { n: '3', titolo: 'Analizza i risultati', desc: 'Vedi dove sbagli di più per materia e argomento. Concentra lo studio dove sei più debole.' },
              { n: '4', titolo: 'Simula l\'esame', desc: '60 domande in 85 minuti con punteggio reale. Devi raggiungere 80/100 per superarlo.' },
            ].map(s => (
              <div key={s.n} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">{s.n}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{s.titolo}</h3>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 max-w-sm mx-auto">
            <img 
              src="/quiz-screenshot.png" 
              alt="Screenshot quiz OCF" 
              className="rounded-2xl shadow-xl border border-gray-100 w-full"
            />
          </div>
        </div>
      </section>

      {/* PIANO */}
      <section id="piani" className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Inizia subito la preparazione
          </h2>
          <p className="text-gray-500 text-center mb-10 text-sm">
            Acquisto una tantum · IVA inclusa · Validità 12 mesi
          </p>
          <div className="max-w-sm mx-auto">
            <div className="bg-blue-600 rounded-2xl p-8 text-center relative">
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
              <BotoneAcquista className="block w-full text-center bg-white text-blue-600 hover:bg-blue-50 font-bold py-3.5 rounded-xl transition-colors text-base">
                Acquista ora →
              </BotoneAcquista>
            </div>
          </div>
        </div>
      </section>

      {/* RECENSIONI */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            Cosa dicono i nostri utenti
          </h2>
          <p className="text-gray-500 text-center text-sm mb-10">
            Chi si è preparato con FormazioneOCF ha superato l'esame.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { nome: 'Marco R.', stelle: 5, testo: 'Ho superato l\'esame OCF al primo tentativo grazie alle simulazioni. Le domande sono identiche a quelle della prova ufficiale.', data: 'Marzo 2026' },
              { nome: 'Giulia T.', stelle: 5, testo: 'Piattaforma intuitiva e completa. Le 5.000 domande coprono tutto il programma. Ho studiato 4 settimane e passato con 88/100.', data: 'Gennaio 2026' },
              { nome: 'Alessandro M.', stelle: 5, testo: 'La simulazione con timer mi ha aiutato a gestire il tempo. 85 minuti per 60 domande non sono molti. Risultato: promosso!', data: 'Aprile 2026' },
            ].map(r => (
              <div key={r.nome} className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(r.stelle)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">"{r.testo}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900 text-sm">{r.nome}</span>
                  <span className="text-xs text-gray-400">{r.data}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-50 border-t border-blue-100 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <div className="w-4 h-6 bg-blue-500 rounded-sm"></div>
              <div className="w-4 h-6 bg-blue-800 rounded-sm" style={{ marginLeft: '2px' }}></div>
              <span className="text-blue-600 font-bold text-lg ml-2">Formazione</span>
              <span className="text-blue-900 font-bold text-lg">OCF</span>
            </div>
            <p className="text-xs text-gray-400 max-w-xs">
              La piattaforma per prepararsi all'esame OCF con metodo e sicurezza.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Informazioni</p>
            <Link href="/chi-siamo" className="text-sm text-gray-500 hover:text-blue-700">Chi siamo</Link>
            <Link href="/contatti" className="text-sm text-gray-500 hover:text-blue-700">Contatti</Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Legale</p>
            <Link href="/termini" className="text-sm text-gray-500 hover:text-blue-700">Termini e condizioni</Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-blue-700">Privacy Policy</Link>
            <Link href="/cookie" className="text-sm text-gray-500 hover:text-blue-700">Cookie Policy</Link>
          </div>
          <div className="text-xs text-gray-400 md:text-right">
            <p>© 2026 FormazioneOCF — INSURHUB S.r.l. P.IVA 06384170657. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
