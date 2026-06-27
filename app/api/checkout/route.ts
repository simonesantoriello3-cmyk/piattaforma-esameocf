import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const PRICE_MAP: Record<string, string> = {
  ocf: process.env.STRIPE_PRICE_OCF!,
}

export async function POST(req: NextRequest) {
  try {
    const { modulo, userId, email } = await req.json()

    const priceId = PRICE_MAP[modulo]
    if (!priceId) return NextResponse.json({ error: 'Modulo non valido' }, { status: 400 })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { userId, modulo },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?pagamento=successo`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/acquisto?pagamento=annullato`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Stripe error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
