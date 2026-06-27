import Link from 'next/link'

export default function ChiSiamoPage() {
  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative py-24 px-6 text-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/65"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Chi siamo</h1>
          <p className="text-white/80 text-lg">
            Il punto di riferimento per la preparazione alla prova valutativa OCF
            e l'iscrizione all'Albo unico dei Consulenti Finanziari.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-3xl mx-auto">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">La nostra storia</h2>
            <p className="text-gray-500 leading-relaxed">
              FormazioneOCF nasce dall'esperienza diretta nel settore finanziario con l'obiettivo
              di offrire agli aspiranti consulenti finanziari uno strumento serio ed efficace per
              prepararsi alla prova valutativa OCF. Conosciamo le difficoltà di chi si avvicina
              a questo esame — cinque materie molto diverse tra loro, 60 domande in 85 minuti,
              soglia dell'80% — e abbiamo costruito una piattaforma pensata per rendere lo studio
              più efficiente e mirato.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">La nostra piattaforma</h2>
            <p className="text-gray-500 leading-relaxed">
              Mettiamo a disposizione oltre 5.000 domande aggiornate a gennaio 2026, simulazioni
              d'esame reali con 60 domande in 85 minuti e punteggio identico alla prova ufficiale
              OCF, e un sistema di tracciamento dei progressi per materia per aiutarti ad arrivare
              preparato. Il diritto del mercato finanziario e la matematica coprono il 72% dell'esame:
              la nostra piattaforma ti aiuta a concentrarti dove conta di più.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Il nostro obiettivo</h2>
            <p className="text-gray-500 leading-relaxed">
              Diventare il punto di riferimento per chi vuole superare la prova valutativa OCF
              al primo tentativo. L'esame si svolge interamente a distanza con modalità telematica:
              10 appelli l'anno, da febbraio a dicembre. Non restare impreparato — inizia oggi
              con FormazioneOCF.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link href="/#piani" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
            Scopri il piano →
          </Link>
        </div>
      </section>

      <footer className="bg-blue-50 border-t border-blue-100 py-6 px-6 text-center">
        <p className="text-xs text-gray-400">© 2026 FormazioneOCF — INSURHUB S.r.l. P.IVA 06384170657</p>
        <Link href="/" className="text-xs text-blue-600 hover:text-blue-700 mt-1 block">← Torna alla home</Link>
      </footer>

    </div>
  )
}
