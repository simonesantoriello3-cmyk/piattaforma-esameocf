import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, nome } = await req.json()

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        email,
        attributes: { NOME: nome },
        listIds: [5],
        updateEnabled: true,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Errore Brevo:', errorData)
      return NextResponse.json({ error: 'Errore Brevo' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Errore invio a Brevo:', error)
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 })
  }
}