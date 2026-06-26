import Link from 'next/link'

export default function FormazioneContinuaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero con foto */}
      <section
        className="relative py-24 px-6 text-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/65"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            🔜 Prossimamente
          </span>
          <h1 className="text-4xl font-bold text-white mb-4">Formazione Continua</h1>
          <p className="text-white/80 text-lg">
            Stiamo lavorando per portarti i migliori corsi di aggiornamento professionale 
            obbligatorio per gli intermediari iscritti al RUI.
          </p>
        </div>
      </section>

      {/* Contenuto */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center">
        
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-10 mb-10">
          <div className="text-5xl mb-4">🚧</div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Stiamo costruendo qualcosa di importante
          </h2>
          <p className="text-gray-500 leading-relaxed mb-3">
            Il nostro team sta lavorando per offrire agli intermediari già iscritti al RUI 
            un percorso di formazione continua annuale completo, aggiornato e conforme 
            alle disposizioni IVASS.
          </p>
          <p className="text-gray-500 leading-relaxed">
            Vogliamo che FormazioneRUI sia il tuo compagno professionale non solo il giorno 
            dell'esame, ma per tutta la tua carriera nel settore assicurativo.
          </p>
        </div>

        {/* Cosa includerà */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
          {[
            { emoji: '📋', titolo: 'Corsi obbligatori IVASS', desc: 'Ore di formazione annuale richieste dalla normativa per mantenere l\'iscrizione al RUI.' },
            { emoji: '🎓', titolo: 'Attestati ufficiali', desc: 'Certificazioni valide per l\'aggiornamento del registro e riconosciute dagli enti competenti.' },
            { emoji: '📱', titolo: 'Formazione flessibile', desc: 'Studia quando vuoi, dal tuo dispositivo, senza vincoli di orario o sede.' },
          ].map(f => (
            <div key={f.titolo} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="text-3xl mb-3">{f.emoji}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.titolo}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA notifica */}
        <div className="bg-gray-900 rounded-2xl p-8 text-center">
          <h3 className="text-white font-bold text-lg mb-2">
            Vuoi essere avvisato quando sarà disponibile?
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Registrati ora e sarai il primo a sapere quando lanceremo i corsi di formazione continua.
          </p>
          <Link href="/registrazione" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors inline-block">
            Registrati gratuitamente →
          </Link>
        </div>

      </section>

      {/* Footer */}
      <footer className="bg-emerald-50 border-t border-emerald-100 py-6 px-6 text-center">
        <p className="text-xs text-gray-400">© 2025 FormazioneRUI. Tutti i diritti riservati.</p>
        <Link href="/" className="text-xs text-emerald-600 hover:text-emerald-700 mt-1 block">← Torna alla home</Link>
      </footer>

    </div>
  )
}
