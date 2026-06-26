'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function BotoneAcquista({ className, children }: { className?: string, children: React.ReactNode }) {
  const router = useRouter()
  const supabase = createClient()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }: { data: { user: any } }) => {
      setLoggedIn(!!user)
    })
  }, [])

  function handleClick() {
    router.push(loggedIn ? '/acquisto' : '/registrazione')
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
