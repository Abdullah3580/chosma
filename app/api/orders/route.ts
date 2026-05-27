import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { customer_name, customer_phone, customer_address, district, note, items, total_amount } = body

    if (!customer_name || !customer_phone || !customer_address || !district || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createClient()

    // Insert one order row per cart item
    const orderRows = items.map((item: {
      product_id: string
      product_name: string
      product_price: number
      quantity: number
    }) => ({
      customer_name,
      customer_phone,
      customer_address,
      district,
      note: note || null,
      product_id: item.product_id,
      product_name: item.product_name,
      product_price: item.product_price,
      quantity: item.quantity,
      total_amount: item.product_price * item.quantity,
      status: 'pending',
    }))

    const { data, error } = await supabase.from('orders').insert(orderRows).select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, orders: data }, { status: 201 })
  } catch (err) {
    console.error('Order error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const phone = searchParams.get('phone')

  const supabase = createClient()
  let query = supabase.from('orders').select('*').order('created_at', { ascending: false })
  if (phone) query = query.eq('customer_phone', phone)
  else query = query.limit(100)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ orders: data })
}
