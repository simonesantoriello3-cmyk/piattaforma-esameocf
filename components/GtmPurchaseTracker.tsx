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
    const w = window as any
    if (!w.dataLayer) return
    w.dataLayer.push({
      event: 'purchase',
      value: 29,
      currency: 'EUR',
      transaction_id: sessionId
    })
    localStorage.setItem(key, '1')
  }, [searchParams])

  return null
}
