import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
const nodemailer = require('nodemailer')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const transporter = nodemailer.createTransport({
  host: 'smtps.aruba.it',
  port: 465,
  secure: true,
  auth: {
    user: 'info@formazioneocf.com',
    pass: process.env.EMAIL_PASSWORD,
  },
})

const NOMI_MODULI: Record<string, string> = {
  ocf: 'Simulatore OCF Completo',
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error('Webhook signature error:', err.message)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId
    const modulo = session.metadata?.modulo
    const importo = (session.amount_total || 0) / 100
    const email = session.customer_email

    const { error } = await supabase.from('acquisti').insert({
      user_id: userId,
      modulo,
      importo,
    })

    if (error) {
      console.error('Supabase error:', error)
    } else {
      if (email && modulo) {
        const nomeModulo = NOMI_MODULI[modulo] || modulo
        const oggi = new Date().toLocaleDateString('it-IT')
        const scadenza = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('it-IT')

        try {
          await transporter.sendMail({
            from: '"FormazioneOCF" <info@formazioneocf.com>',
            to: email,
            subject: 'Conferma acquisto — FormazioneOCF',
            html: `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr><td style="background-color:#ffffff;border-radius:16px 16px 0 0;padding:32px;text-align:center;border-bottom:1px solid #e5e7eb;">
          <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
            <tr>
              <td style="width:12px;height:18px;background-color:#3b82f6;border-radius:3px;"></td>
              <td style="width:4px;"></td>
              <td style="width:12px;height:18px;background-color:#1e3a8a;border-radius:3px;"></td>
              <td style="padding-left:10px;">
                <span style="font-size:20px;font-weight:700;color:#2563eb;">Formazione</span><span style="font-size:20px;font-weight:700;color:#111827;">OCF</span>
              </td>
            </tr>
          </table>
        </td></tr>

        <tr><td style="background-color:#ffffff;padding:40px 40px 32px;">
          <div style="text-align:center;margin-bottom:24px;">
            <div style="display:inline-block;width:56px;height:56px;background-color:#dbeafe;border-radius:50%;line-height:56px;font-size:28px;text-align:center;">✓</div>
          </div>

          <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;text-align:center;">Acquisto confermato!</h1>
          <p style="margin:0 0 32px;color:#6b7280;font-size:15px;text-align:center;line-height:1.6;">
            Grazie per aver scelto FormazioneOCF.<br>Il tuo accesso è ora attivo e puoi iniziare subito a studiare.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;border-radius:12px;border:1px solid #e5e7eb;margin-bottom:32px;">
            <tr><td style="padding:20px 24px;border-bottom:1px solid #e5e7eb;">
              <p style="margin:0;font-size:13px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Riepilogo ordine</p>
            </td></tr>
            <tr><td style="padding:16px 24px;border-bottom:1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:14px;color:#6b7280;">Prodotto</td>
                  <td style="font-size:14px;color:#111827;font-weight:600;text-align:right;">${nomeModulo}</td>
                </tr>
              </table>
            </td></tr>
            <tr><td style="padding:16px 24px;border-bottom:1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:14px;color:#6b7280;">Importo pagato</td>
                  <td style="font-size:14px;color:#111827;font-weight:600;text-align:right;">€${importo.toFixed(2)} IVA inclusa</td>
                </tr>
              </table>
            </td></tr>
            <tr><td style="padding:16px 24px;border-bottom:1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:14px;color:#6b7280;">Data acquisto</td>
                  <td style="font-size:14px;color:#111827;font-weight:600;text-align:right;">${oggi}</td>
                </tr>
              </table>
            </td></tr>
            <tr><td style="padding:16px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:14px;color:#6b7280;">Valido fino al</td>
                  <td style="font-size:14px;color:#2563eb;font-weight:600;text-align:right;">${scadenza}</td>
                </tr>
              </table>
            </td></tr>
          </table>

          <div style="text-align:center;margin-bottom:32px;">
            <a href="https://formazioneocf.com/dashboard"
               style="display:inline-block;background-color:#2563eb;color:#ffffff;padding:14px 36px;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px;">
              Vai alla dashboard →
            </a>
          </div>

          <div style="background-color:#eff6ff;border-radius:10px;padding:16px 20px;text-align:center;">
            <p style="margin:0;font-size:13px;color:#1e40af;line-height:1.6;">
              Hai bisogno di aiuto? Scrivici a
              <a href="mailto:info@formazioneocf.com" style="color:#2563eb;font-weight:600;">info@formazioneocf.com</a>
            </p>
          </div>

          <!-- Trustpilot -->
          <div style="margin-top:24px;background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:24px;text-align:center;">
            <p style="margin:0 0 6px;font-size:15px;font-weight:700;color:#111827;">Ti è piaciuto il simulatore?</p>
            <p style="margin:0 0 16px;font-size:13px;color:#6b7280;line-height:1.6;">Lascia una recensione su Trustpilot — ci aiuta tanto e richiede solo un minuto.</p>
            <a href="https://www.trustpilot.com/review/formazioneocf.com"
               style="display:inline-block;background-color:#00b67a;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
              ⭐ Lascia una recensione
            </a>
          </div>
        </td></tr>

        <tr><td style="background-color:#f9fafb;border-radius:0 0 16px 16px;padding:20px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="margin:0;font-size:12px;color:#9ca3af;">
            © 2026 FormazioneOCF — INSURHUB S.r.l. P.IVA 06384170657
          </p>
          <p style="margin:6px 0 0;font-size:12px;color:#d1d5db;">
            Hai ricevuto questa email perché hai effettuato un acquisto su formazioneocf.com
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
            `,
          })
        } catch (emailError) {
          console.error('Errore invio email:', emailError)
        }
      }
    }
  }

  return NextResponse.json({ received: true })
}
