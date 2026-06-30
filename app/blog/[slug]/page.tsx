import Link from 'next/link'

import { notFound } from 'next/navigation'

import type { Metadata } from 'next'

import type { ReactNode } from 'react'

import { articoli } from '@/app/data/blog/articoli'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const articolo = articoli.find(a => a.slug === slug)

  if (!articolo) return {}

  return {
    title: `${articolo.titolo} — FormazioneOCF`,
    description: articolo.descrizione,
  }
}

function renderContenuto(testo: string) {
  const righe = testo.trim().split('\n')
  const elementi: ReactNode[] = []

  let i = 0

  while (i < righe.length) {
    const riga = righe[i].trim()

    if (!riga) {
      i++
      continue
    }

    if (riga.startsWith('## ')) {
      elementi.push(<h2 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-4">{riga.replace('## ', '')}</h2>)
    } else if (riga.startsWith('### ')) {
      elementi.push(<h3 key={i} className="text-lg font-bold text-blue-700 mt-6 mb-2">{riga.replace('### ', '')}</h3>)
    } else if (riga.startsWith('| ')) {
      const rows: string[][] = []
      let j = i

      while (j < righe.length && righe[j].trim().startsWith('|')) {
        if (!righe[j].includes('---')) {
          rows.push(righe[j].trim().split('|').filter(c => c.trim() !== '').map(c => c.trim()))
        }
        j++
      }

      elementi.push(
        <div key={i} className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-blue-50">
              <tr>{rows[0]?.map((c, ci) => <th key={ci} className="text-left px-4 py-3 font-semibold text-blue-800">{c}</th>)}</tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, ri) => (
                <tr key={ri} className="border-t border-gray-100 hover:bg-gray-50">
                  {row.map((c, ci) => <td key={ci} className="px-4 py-3 text-gray-700">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      i = j
      continue
    } else if (riga.startsWith('- ') || riga.startsWith('* ')) {
      const items: string[] = []
      let j = i

      while (j < righe.length && (righe[j].trim().startsWith('- ') || righe[j].trim().startsWith('* '))) {
        items.push(righe[j].trim().replace(/^[-*] /, ''))
        j++
      }

      elementi.push(
        <ul key={i} className="list-none space-y-2 my-4">
          {items.map((item, ii) => (
            <li key={ii} className="flex items-start gap-2 text-gray-600 text-sm">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </li>
          ))}
        </ul>
      )
      i = j
      continue
    } else if (/^\d+\./.test(riga)) {
      const items: string[] = []
      let j = i

      while (j < righe.length && /^\d+\./.test(righe[j].trim())) {
        items.push(righe[j].trim().replace(/^\d+\.\s*/, ''))
        j++
      }

      elementi.push(
        <ol key={i} className="space-y-2 my-4">
          {items.map((item, ii) => (
            <li key={ii} className="flex items-start gap-3 text-gray-600 text-sm">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{ii + 1}</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </li>
          ))}
        </ol>
      )
      i = j
      continue
    } else {
      elementi.push(
        <p key={i} className="text-gray-600 text-sm leading-relaxed my-3"
          dangerouslySetInnerHTML={{ __html: riga.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
      )
    }

    i++
  }

  return elementi
}

export default async function ArticoloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const articolo = articoli.find(a => a.slug === slug)

  if (!articolo) notFound()

  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative px-6 py-20"
        style={{
          backgroundImage: `url(${articolo.immagine})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <Link href="/blog" className="text-white/80 text-sm font-medium hover:text-white mb-6 inline-block">← Torna al blog</Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-white font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Guida</span>
            <span className="text-xs text-white/70">{articolo.minuti} min di lettura</span>
          </div>
          <h1 className="text-3xl font-bold text-white leading-tight mb-4">{articolo.titolo}</h1>
          <p className="text-white/80 text-sm leading-relaxed">{articolo.descrizione}</p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-12">
        <div>{renderContenuto(articolo.contenuto)}</div>

        <div className="mt-12 border-t border-gray-100 pt-8 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <span className="text-blue-700 text-lg">✍️</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">FormazioneOCF</p>
            <p className="text-xs text-gray-400">Contenuto redatto sulla base del bando ufficiale OCF e delle delibere n. 2835 e n. 2836 del 2025</p>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="text-3xl">⭐</div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm mb-1">Hai già usato FormazioneOCF?</p>
            <p className="text-xs text-gray-500">Lascia una recensione su Trustpilot e aiuta altri candidati a scegliere la preparazione giusta.</p>
          </div>
          <a href="https://www.trustpilot.com/review/formazioneocf.com" target="_blank" rel="noopener noreferrer"
            className="bg-[#00b67a] hover:bg-[#00a066] text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap flex-shrink-0">
            Scrivi una recensione
          </a>
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