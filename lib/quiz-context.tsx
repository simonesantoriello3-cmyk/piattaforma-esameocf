'use client'

import React, { createContext, useContext, useState } from 'react'

interface Materia {
  id: string
  nome: string
}

interface Domanda {
  id: string
  materia_id: string
  testo: string
  risposta_a: string
  risposta_b: string
  risposta_c: string
  risposta_corretta: 'A' | 'B' | 'C'
}

interface RispostaUtente {
  domanda_id: string
  risposta_scelta: 'A' | 'B' | 'C' | null
  corretta: boolean
}

interface QuizConfig {
  [materiaId: string]: number
}

interface QuizContextType {
  config: QuizConfig
  setConfig: (config: QuizConfig) => void
  domande: Domanda[]
  setDomande: (domande: Domanda[]) => void
  risposte: RispostaUtente[]
  aggiudiRisposta: (domandaId: string, risposta: 'A' | 'B' | 'C', corretta: boolean) => void
  indiceCorrente: number
  setIndiceCorrente: (indice: number) => void
  resetQuiz: () => void
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<QuizConfig>({})
  const [domande, setDomande] = useState<Domanda[]>([])
  const [risposte, setRisposte] = useState<RispostaUtente[]>([])
  const [indiceCorrente, setIndiceCorrente] = useState(0)

  const aggiudiRisposta = (domandaId: string, risposta: 'A' | 'B' | 'C', corretta: boolean) => {
    setRisposte(prev => {
      const existing = prev.find(r => r.domanda_id === domandaId)
      if (existing) {
        return prev.map(r =>
          r.domanda_id === domandaId
            ? { ...r, risposta_scelta: risposta, corretta }
            : r
        )
      }
      return [...prev, { domanda_id: domandaId, risposta_scelta: risposta, corretta }]
    })
  }

  const resetQuiz = () => {
    setConfig({})
    setDomande([])
    setRisposte([])
    setIndiceCorrente(0)
  }

  return (
    <QuizContext.Provider
      value={{
        config,
        setConfig,
        domande,
        setDomande,
        risposte,
        aggiudiRisposta,
        indiceCorrente,
        setIndiceCorrente,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error('useQuiz deve essere usato dentro QuizProvider')
  }
  return context
}
