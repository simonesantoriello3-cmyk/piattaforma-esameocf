'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

interface GtmPurchaseTrackerProps {
  acquisti: Array<{ modulo: string; importo?: number; created_at?: string }>
}

export default function GtmPurchaseTracker({ acquisti }: GtmPurchaseTrackerProps) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const pagamento = searchParams?.get('pagamento')
    const sessionId = searchParams?.get('session_id') || 'ocf-purchase'

    if (pagamento === 'successo') {
      const storageKey = `gtm_purchase_${sessionId}`
      
      if (!localStorage.getItem(storageKey)) {
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          // Cerca l'importo reale dall'ultimo acquisto o usa 29 come fallback
          const ultimoAcquisto = acquisti && acquisti.length > 0 ? acquisti[0] : null
          const importo: number = ultimoAcquisto?.importo !== undefined && ultimoAcquisto?.importo !== null
            ? Number(ultimoAcquisto.importo)
            : 29

          (window as any).dataLayer.push({
            event: 'purchase',
            value: importo,
            currency: 'EUR',
          })

          localStorage.setItem(storageKey, 'true')
        }
      }
    }
  }, [searchParams, acquisti])

  return null
}
