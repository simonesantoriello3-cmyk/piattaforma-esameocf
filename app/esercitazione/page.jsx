'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function EsercitazionePage() {
  const router = useRouter()
  const supabase = createClient()

  const [materie, setMaterie] = useState([])
  const [selezioni, setSelezioni] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: acquisti } = await supabase.from('acquisti').select('id').eq('user_id', user.id).limit(1)
      if (!acquisti || acquisti.length === 0) { router.push('/acquisto'); return }

      const { data: materieData } = await supabase.from('materie').select('id, nome').order('nome')

      const counts = {}
      await Promise.all((materieData || []).map(async m => {
        const { count } = await supabase
          .from('domande')
          .select('id', { count: 'exact', head: true })
          .eq('materia_id', m.id)
        counts[m.id] = count || 0
      }))

      const materieConCount = (materieData || []).map(m => ({ ...m, count: counts[m.id] }))
      setMaterie(materieConCount)

      const initSelezioni = {}
      materieConCount.forEach(m => {
        initSelezioni[m.id] = { numero: 0, prioritaSbagliate: false }
      })
      setSelezioni(initSelezioni)
      setLoading(false)
    }
    init()
  }, [])

  function aggiorna(materiaId, campo, valore) {
    setSelezioni(prev => ({
      ...prev,
      [materiaId]: { ...prev[materiaId], [campo]: valore },
    }))
  }

  const totale = Object.values(selezioni).reduce((s, v) => s + (v.numero || 0), 0)

  function avvia() {
    const selezioneArray = Object.entries(selezioni)
      .filter(([_, v]) => v.numero > 0)
      .map(([id, v]) => ({ materiaId: id, numero: v.numero, prioritaSbagliate: v.prioritaSbagliate }))

    const params = new URLSearchParams({
      modalita: 'esercitazione',
      selezione: JSON.stringify(selezioneArray),
    })
    router.push(`/quiz?${params.toString()}`)
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <section
        className="relative py-14 px-6 text-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Esercitazione libera</h1>
          <p className="text-white/80 text-sm">Scegli quante domande fare per ogni materia.</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-3">
        {materie.map(m => (
          <CardMateria
            key={m.id}
            materia={m}
            selezione={selezioni[m.id] || { numero: 0, prioritaSbagliate: false }}
            onChange={aggiorna}
          />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-blue-50 border-t border-blue-200 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Totale selezionate</p>
            <p className="text-2xl font-bold text-gray-900">{totale} domande</p>
          </div>
          <button
            onClick={avvia}
            disabled={totale === 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Inizia →
          </button>
        </div>
      </div>
    </div>
  )
}

function CardMateria({ materia, selezione, onChange }) {
  const preset = [5, 10, 20, 50].filter(v => v <= materia.count)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 text-sm flex-1 pr-4 leading-snug">{materia.nome}</h3>
        <span className="text-xs text-gray-400 flex-shrink-0">{materia.count} disponibili</span>
      </div>

      <label className="flex items-center gap-2 text-xs text-gray-500 mb-4 cursor-pointer">
        <input
          type="checkbox"
          checked={selezione.prioritaSbagliate}
          onChange={e => onChange(materia.id, 'prioritaSbagliate', e.target.checked)}
          className="rounded accent-blue-600"
        />
        Dai priorità alle domande sbagliate più spesso
      </label>

      <div className="flex flex-wrap gap-2 mb-3">
        {preset.map(v => (
          <button
            key={v}
            onClick={() => onChange(materia.id, 'numero', selezione.numero === v ? 0 : v)}
            className={`px-4 py-1.5 rounded-xl text-sm font-semibold border-2 transition-colors ${
              selezione.numero === v ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'
            }`}
          >
            {v}
          </button>
        ))}
        <button
          onClick={() => onChange(materia.id, 'numero', selezione.numero === materia.count ? 0 : materia.count)}
          className={`px-4 py-1.5 rounded-xl text-sm font-semibold border-2 transition-colors ${
            selezione.numero === materia.count ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'
          }`}
        >
          Tutte ({materia.count})
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400 w-4">0</span>
        <input
          type="range"
          min={0}
          max={materia.count}
          value={selezione.numero}
          onChange={e => onChange(materia.id, 'numero', Number(e.target.value))}
          className="flex-1 accent-blue-600"
        />
        <span className="text-xs text-gray-400 w-8 text-right">{materia.count}</span>
        <span className="text-sm font-bold text-blue-600 w-8 text-right">{selezione.numero}</span>
      </div>

      {selezione.numero > 0 && (
        <p className="text-xs text-blue-600 font-semibold mt-2">✓ {selezione.numero} domande selezionate</p>
      )}
    </div>
  )
}
