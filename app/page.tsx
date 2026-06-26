import Link from 'next/link'
import BotoneAcquista from '@/components/BotoneAcquista'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section
        className="relative text-center px-6 py-28"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            Preparazione Esame RUI
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Preparati all'Esame RUI<br />con quiz ufficiali e simulazioni
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            La piattaforma di riferimento per chi vuole superare l'esame di iscrizione al Registro Unico degli Intermediari assicurativi e riassicurativi.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/registrazione" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base">
              Inizia la preparazione →
            </Link>
            <Link href="#piani" className="border border-white/50 hover:border-white text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base">
              Scopri i piani
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-12 px-6 border-y border-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-emerald-600">2.292</p>
            <p className="text-sm text-gray-500 mt-1">Domande ufficiali</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-emerald-600">8</p>
            <p className="text-sm text-gray-500 mt-1">Materie coperte</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-emerald-600">3</p>
            <p className="text-sm text-gray-500 mt-1">Modalità di simulazione</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Tutto quello che ti serve per superare l'esame
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: '📚', titolo: 'Domande ufficiali', desc: 'Oltre 2.292 domande aggiornate alle ultime normative IVASS, divise per materia.' },
              { emoji: '⏱', titolo: 'Simulazione reale', desc: "Simula l'esame con timer, punteggio +1/-0,5 e soglia del 60%, esattamente come il giorno dell'esame." },
              { emoji: '📊', titolo: 'Tracciamento progressi', desc: 'Monitora i tuoi errori e dai priorità alle domande che sbagli più spesso.' },
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

      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            Come funziona
          </h2>
          <p className="text-gray-500 text-center text-sm mb-10">
            Un'interfaccia semplice e intuitiva, pensata per farti studiare in modo efficace.
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="/quiz-screenshot.png"
                alt="Schermata quiz FormazioneRUI"
                className="rounded-2xl shadow-lg w-full border border-gray-100"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Scegli la materia</h3>
                  <p className="text-sm text-gray-500">Seleziona quante domande fare per ogni materia con uno slider intuitivo.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Rispondi alle domande</h3>
                  <p className="text-sm text-gray-500">3 opzioni di risposta, feedback immediato in verde o rosso dopo ogni risposta.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Analizza i risultati</h3>
                  <p className="text-sm text-gray-500">Vedi il punteggio finale, rivedi le domande sbagliate e monitora i tuoi progressi.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Simula l'esame</h3>
                  <p className="text-sm text-gray-500">Affronta la simulazione completa con timer reale e punteggio +1/-0,5 come l'esame IVASS.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PIANI */}
      <section id="piani" className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Scegli il tuo modulo
          </h2>
          <p className="text-gray-500 text-center mb-10 text-sm">
            Acquisto una tantum, accesso illimitato.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-1">Modulo Assicurativo</h3>
              <p className="text-xs text-gray-400 mb-4">6 materie · 1.758 domande</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">€79</p>
              <p className="text-xs text-gray-400 mb-6">IVA inclusa · validità 12 mesi</p>
              <ul className="space-y-2 mb-6">
                {['1.758 domande', 'Simulazione 50 domande', '75 minuti · soglia 60%', 'Accesso illimitato'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              <BotoneAcquista className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
                Acquista
              </BotoneAcquista>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-1">Modulo Riassicurativo</h3>
              <p className="text-xs text-gray-400 mb-4">2 materie · 534 domande</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">€39</p>
              <p className="text-xs text-gray-400 mb-6">IVA inclusa · validità 12 mesi</p>
              <ul className="space-y-2 mb-6">
                {['534 domande', 'Simulazione 20 domande', '30 minuti · soglia 60%', 'Accesso illimitato'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              <BotoneAcquista className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
                Acquista
              </BotoneAcquista>
            </div>

            <div className="bg-blue-600 rounded-2xl p-6 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                CONVENIENTE
              </span>
              <h3 className="font-bold text-white mb-1">Entrambi i Moduli (Assicurativo + Riassicurativo)</h3>
              <p className="text-xs text-blue-200 mb-4">8 materie · 2.292 domande</p>
              <p className="text-3xl font-bold text-white mb-1">€99</p>
              <p className="text-xs text-blue-200 mb-6">IVA inclusa · validità 12 mesi</p>
              <ul className="space-y-2 mb-6">
                {['2.292 domande', 'Tutte le simulazioni', 'Simulazione completa 70 dom.', 'Accesso illimitato'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-blue-100">
                    <span className="text-yellow-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <BotoneAcquista className="block w-full text-center bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2.5 rounded-xl transition-colors text-sm">
                Acquista
              </BotoneAcquista>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            Cosa dicono i nostri utenti
          </h2>
          <p className="text-gray-500 text-center text-sm mb-10">
            Chi ha usato FormazioneRUI ha superato l'esame RUI.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                nome: 'Marco R.',
                stelle: 5,
                testo: 'Ho superato l\'esame al primo tentativo grazie a FormazioneRUI. Le simulazioni sono identiche all\'esame reale. Lo consiglio a tutti!',
                data: 'Marzo 2025'
              },
              {
                nome: 'Giulia T.',
                stelle: 5,
                testo: 'Piattaforma intuitiva e completa. Le 2.292 domande coprono tutto il programma. Ho studiato 3 settimane e ho passato con ottimo punteggio.',
                data: 'Gennaio 2025'
              },
              {
                nome: 'Alessandro M.',
                stelle: 5,
                testo: 'La funzione di simulazione con timer mi ha permesso di gestire meglio l\'ansia da esame. Risultato: promosso! Grazie FormazioneRUI.',
                data: 'Aprile 2025'
              },
            ].map(r => (
              <div key={r.nome} className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100">
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
      <footer className="bg-emerald-50 border-t border-emerald-100 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start justify-between gap-6">
          
          {/* Logo + descrizione */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <div className="w-4 h-6 bg-emerald-500 rounded-sm"></div>
              <div className="w-4 h-6 bg-emerald-800 rounded-sm" style={{ marginLeft: '2px' }}></div>
              <span className="text-emerald-600 font-bold text-lg ml-2">Formazione</span>
              <span className="text-emerald-900 font-bold text-lg">RUI</span>
            </div>
            <p className="text-xs text-gray-400 max-w-xs">
              La piattaforma per prepararsi all'esame RUI con metodo e sicurezza.
            </p>
          </div>

          {/* Link */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Informazioni</p>
            <Link href="/chi-siamo" className="text-sm text-gray-500 hover:text-emerald-700">Chi siamo</Link>
            <Link href="/formazione-continua" className="text-sm text-gray-500 hover:text-emerald-700">Formazione continua</Link>
            <Link href="/contatti" className="text-sm text-gray-500 hover:text-emerald-700">Contatti</Link>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Legale</p>
            <Link href="/termini" className="text-sm text-gray-500 hover:text-emerald-700">Termini e condizioni</Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-emerald-700">Privacy Policy</Link>
            <Link href="/cookie" className="text-sm text-gray-500 hover:text-emerald-700">Cookie Policy</Link>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-400 md:text-right">
            <p>© 2025 FormazioneRUI — INSURHUB S.r.l. P.IVA 06384170657. Tutti i diritti riservati.</p>
          </div>

        </div>
      </footer>

    </div>
  )
}
