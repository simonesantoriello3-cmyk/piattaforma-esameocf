import { NextResponse } from 'next/server'

const DESTINATARIO = 'info@formazioneocf.com'
const OGGETTI_VALIDI = new Set([
  'Informazioni sul servizio',
  'Richiesta fattura',
  'Problema tecnico',
  'Acquisto e pagamenti',
  'Altro',
])

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request) {
  try {
    const body = await request.json()
    const nome = typeof body.nome === 'string' ? body.nome.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const oggetto = typeof body.oggetto === 'string' ? body.oggetto.trim() : ''
    const messaggio = typeof body.messaggio === 'string' ? body.messaggio.trim() : ''
    const honeypot = typeof body.honeypot === 'string' ? body.honeypot.trim() : ''

    if (honeypot) {
      return NextResponse.json({ success: true })
    }

    if (!nome || !email || !oggetto || !messaggio) {
      return NextResponse.json({ error: 'Tutti i campi sono obbligatori.' }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'L\'indirizzo email non è valido.' }, { status: 400 })
    }

    if (!OGGETTI_VALIDI.has(oggetto)) {
      return NextResponse.json({ error: 'L\'oggetto selezionato non è valido.' }, { status: 400 })
    }

    if (!process.env.BREVO_API_KEY) {
      return NextResponse.json({ error: 'Configurazione email mancante.' }, { status: 500 })
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'FormazioneOCF',
          email: DESTINATARIO,
        },
        to: [
          {
            email: DESTINATARIO,
            name: 'FormazioneOCF',
          },
        ],
        replyTo: {
          email,
          name: nome,
        },
        subject: `[Contatti] ${oggetto}`,
        textContent: `Nome: ${nome}\nEmail: ${email}\nOggetto: ${oggetto}\n\nMessaggio:\n${messaggio}`,
        htmlContent: `
          <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#111827;">
            <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Oggetto:</strong> ${escapeHtml(oggetto)}</p>
            <p><strong>Messaggio:</strong></p>
            <div style="white-space:pre-wrap;">${escapeHtml(messaggio)}</div>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Errore Brevo contatti:', errorData)
      return NextResponse.json({ error: 'Impossibile inviare il messaggio.' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Errore API contatti:', error)
    return NextResponse.json({ error: 'Errore interno del server.' }, { status: 500 })
  }
}
