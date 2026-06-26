'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [menuAperto, setMenuAperto] = useState(false)
  const [dropdownAperto, setDropdownAperto] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Chiudi dropdown cliccando fuori
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownAperto(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    setMenuAperto(false)
    setDropdownAperto(false)
    router.push('/')
  }

  const nomeUtente = user?.user_metadata?.nome || user?.email?.split('@')[0] || ''

  if (pathname?.startsWith('/quiz')) return null

  return (
    <nav className="bg-blue-50 border-b border-blue-100 px-6 py-4 relative">
      <div className="max-w-5xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <div className="w-5 h-7 bg-emerald-500 rounded-sm"></div>
          <div className="w-5 h-7 bg-emerald-800 rounded-sm" style={{ marginLeft: '2px' }}></div>
          <span className="text-blue-600 font-bold text-xl ml-2">Formazione</span>
          <span className="text-blue-900 font-bold text-xl">OCF</span>
        </Link>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Desktop: click sul nome apre dropdown */}
              <div className="relative hidden md:flex items-center gap-2" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownAperto(!dropdownAperto)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                    {nomeUtente.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-emerald-800 text-sm font-medium">Ciao, {nomeUtente} 👋</span>
                  <span className="text-emerald-500 text-xs ml-1">{dropdownAperto ? '▲' : '▼'}</span>
                </button>
                <button
                  onClick={logout}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Esci
                </button>

                {/* Dropdown desktop */}
                {dropdownAperto && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-lg border border-gray-100 z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-emerald-900 font-semibold text-sm">{nomeUtente}</p>
                      <p className="text-emerald-500 text-xs">Account attivo</p>
                    </div>
                    <Link
                      href="/profilo"
                      onClick={() => setDropdownAperto(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-colors"
                    >
                      <span>👤</span>
                      <span className="text-emerald-900 font-semibold text-sm">Profilo</span>
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownAperto(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-colors"
                    >
                      <span>📊</span>
                      <span className="text-emerald-900 font-semibold text-sm">Dashboard</span>
                    </Link>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <span>🚪</span>
                      <span className="text-red-500 font-semibold text-sm">Esci</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile: hamburger */}
              <button
                onClick={() => setMenuAperto(!menuAperto)}
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
                aria-label="Menu"
              >
                <span className={`block w-6 h-0.5 bg-emerald-800 transition-all duration-200 ${menuAperto ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-emerald-800 transition-all duration-200 ${menuAperto ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-emerald-800 transition-all duration-200 ${menuAperto ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-emerald-800 hover:text-emerald-900 text-sm font-medium md:hidden">
                Accedi
              </Link>
              <Link href="/login" className="text-emerald-800 hover:text-emerald-900 text-sm font-medium hidden md:inline">
                Accedi
              </Link>
              <Link href="/registrazione" className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors hidden md:inline-flex">
                Registrati
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Menu mobile dropdown — solo utenti loggati */}
      {user && menuAperto && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-emerald-100 shadow-lg z-50">
          <div className="flex flex-col px-6 py-5 gap-1">
            <div className="flex items-center gap-3 pb-4 mb-2 border-b border-emerald-100">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-base">
                {nomeUtente.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-emerald-900 font-semibold text-sm">{nomeUtente}</p>
                <p className="text-emerald-500 text-xs">Account attivo</p>
              </div>
            </div>
            <Link
              href="/profilo"
              onClick={() => setMenuAperto(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              <span className="text-xl">👤</span>
              <span className="text-emerald-900 font-semibold text-sm">Profilo</span>
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMenuAperto(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              <span className="text-xl">📊</span>
              <span className="text-emerald-900 font-semibold text-sm">Dashboard</span>
            </Link>
            <div className="border-t border-gray-100 my-1"></div>
            <button
              onClick={logout}
              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50 transition-colors w-full text-left"
            >
              <span className="text-xl">🚪</span>
              <span className="text-red-500 font-semibold text-sm">Esci</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
