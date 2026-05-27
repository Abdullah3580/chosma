import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const offer = searchParams.get('offer')

  const supabase = createClient()
  let query = supabase.from('products').select('*').eq('in_stock', true)

  if (category && category !== 'all') query = query.eq('category', category)
  if (offer === 'true') query = query.gte('discount_percent', 25)

  const { data, error } = await query.order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ products: data })
}
