import Link from 'next/link'

export default function ChiSiamoPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero con foto sfondo biblioteca */}
      <section
        className="relative py-24 px-6 text-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/65"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Chi siamo</h1>
          <p className="text-white/80 text-lg">
            Il punto di riferimento per la formazione degli intermediari assicurativi. 
            Dalla preparazione all'esame RUI alla formazione continua obbligatoria IVASS.
          </p>
        </div>
      </section>

      {/* Contenuto */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">La nostra storia</h2>
            <p className="text-gray-500 leading-relaxed">
              FormazioneRUI nasce dall'esperienza diretta nel settore assicurativo con l'obiettivo 
              di offrire agli aspiranti intermediari uno strumento serio ed efficace per prepararsi 
              all'esame RUI. Conosciamo le difficoltà di chi si avvicina a questo esame e abbiamo 
              costruito una piattaforma pensata per rendere lo studio più efficiente e mirato.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">La nostra piattaforma</h2>
            <p className="text-gray-500 leading-relaxed">
              Mettiamo a disposizione oltre 2.292 domande ufficiali, simulazioni d'esame reali con 
              timer e punteggio identici all'esame IVASS, e un sistema di tracciamento dei progressi 
              per aiutarti ad arrivare preparato. Ogni domanda è aggiornata alle ultime normative IVASS.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Il futuro</h2>
            <p className="text-gray-500 leading-relaxed">
              In futuro FormazioneRUI si espanderà per accompagnare gli intermediari anche dopo 
              l'iscrizione al RUI, offrendo i corsi di formazione continua annuale obbligatoria 
              richiesti dalla normativa IVASS. Il nostro obiettivo è diventare il punto di riferimento 
              per la formazione degli intermediari assicurativi italiani.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/#piani" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
            Scopri i piani →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-50 border-t border-emerald-100 py-6 px-6 text-center">
        <p className="text-xs text-gray-400">© 2025 FormazioneRUI. Tutti i diritti riservati.</p>
      </footer>

    </div>
  )
}
