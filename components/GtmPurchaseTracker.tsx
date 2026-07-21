'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function GtmPurchaseTracker() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (!sessionId) return
    const key = 'gtm_purchase_' + sessionId
    if (localStorage.getItem(key)) return

    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const pushPurchase = (attempt: number) => {
      if (localStorage.getItem(key)) return

      const w = window as any
      if (!w.dataLayer) {
        if (attempt < 3) {
          timeoutId = setTimeout(() => pushPurchase(attempt + 1), 500)
        }
        return
      }

      w.dataLayer.push({
        event: 'purchase',
        value: 29,
        currency: 'EUR',
        transaction_id: sessionId
      })
      localStorage.setItem(key, '1')
    }

    pushPurchase(1)

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [searchParams])

  return null
}
