import Link from 'next/link'

import { articoli } from '@/app/data/blog/articoli'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — FormazioneOCF',
  description: "Guide e consigli per superare l'esame OCF: materie, struttura della prova, punteggio e tutto quello che devi sapere.",
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative text-center px-6 py-24"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/55"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            Risorse gratuite
          </span>
          <h1 className="text-4xl font-bold text-white mb-4">Blog FormazioneOCF</h1>
          <p className="text-white/80 text-sm max-w-xl mx-auto leading-relaxed">
            Guide pratiche per prepararti all'esame OCF: struttura della prova, materie, punteggio e consigli per superarlo al primo tentativo.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto py-14 px-6">
        <div className="flex flex-col gap-8">
          {articoli.map(a => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">Guida</span>
                <span className="text-xs text-gray-400">{a.minuti} min di lettura</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{a.titolo}</h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{a.descrizione}</p>
              <span className="text-blue-600 text-sm font-semibold">Leggi l'articolo →</span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="bg-blue-50 border-t border-blue-100 py-8 px-6 mt-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex flex-col gap-2">
            <a href="/" className="flex items-center gap-1">
              <div className="w-4 h-6 bg-blue-500 rounded-sm"></div>
              <div className="w-4 h-6 bg-blue-800 rounded-sm" style={{ marginLeft: '2px' }}></div>
              <span className="text-blue-600 font-bold text-lg ml-2">Formazione</span>
              <span className="text-blue-900 font-bold text-lg">OCF</span>
            </a>
            <p className="text-xs text-gray-400 max-w-xs">
              La piattaforma per prepararsi all'esame OCF con metodo e sicurezza.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Informazioni</p>
            <Link href="/blog" className="text-sm text-gray-500 hover:text-blue-700">Blog</Link>
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
            <p>© 2026 FormazioneOCF — INSURHUB S.r.l. P.IVA 06384170657</p>
          </div>
        </div>
      </footer>
    </div>
  )
}