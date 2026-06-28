import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_EMAIL = 'simonesantoriello3@gmail.com'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: { user }, error } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
  if (error || !user || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const [{ data: profiles }, { data: acquisti }, { data: sessioni }] = await Promise.all([
    supabase.from('profiles').select('*').order('created_at', { ascending: false }),
    supabase.from('acquisti').select('*').order('created_at', { ascending: false }),
    supabase.from('sessioni').select('*').order('created_at', { ascending: false }).limit(100),
  ])

  const profileMap: Record<string, any> = {}
  profiles?.forEach(p => { profileMap[p.id] = p })

  const acquistiConProfilo = acquisti?.map(a => ({
    ...a,
    profiles: profileMap[a.user_id] || null
  }))

  const sessioniConProfilo = sessioni?.map(s => ({
    ...s,
    profiles: profileMap[s.user_id] || null
  }))

  return NextResponse.json({ profiles, acquisti: acquistiConProfilo, sessioni: sessioniConProfilo })
}
