import { createClient } from '@/lib/supabase/server'
import { ProductGrid } from '@/components/shop/ProductGrid'

export const revalidate = 60

const categoryLabels: Record<string, string> = {
  all: 'সব পণ্য',
  eyeglasses: 'আইগ্লাস',
  sunglasses: 'সানগ্লাস',
  designer: 'ডিজাইনার',
  photochromic: 'ফটোক্রোমিক',
  'free-frame': 'ফ্রি ফ্রেম',
  accessories: 'আনুষাঙ্গিক',
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; offer?: string }>
}) {
  const supabase = await createClient()
  const params = await searchParams
  const category = params.category ?? 'all'
  const offerOnly = params.offer === 'true'

  let query = supabase.from('products').select('*').eq('in_stock', true)
  if (category !== 'all') query = query.eq('category', category)
  if (offerOnly) query = query.gte('discount_percent', 25)
  query = query.order('created_at', { ascending: false })

  const { data: products } = await query

  const tabs = ['all', 'eyeglasses', 'sunglasses', 'designer', 'photochromic', 'free-frame', 'accessories']

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="section-title mb-2">{categoryLabels[category] ?? 'সব পণ্য'}</h1>
      <p className="text-gray-500 text-sm mb-8">{products?.length ?? 0}টি পণ্য পাওয়া গেছে</p>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-8">
        {tabs.map(tab => (
          <a
            key={tab}
            href={`/shop?category=${tab}`}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
              category === tab
                ? 'bg-sky-dark text-white border-sky-dark'
                : 'bg-white text-gray-600 border-gray-200 hover:border-sky-dark hover:text-sky-dark'
            }`}
          >
            {categoryLabels[tab]}
          </a>
        ))}
        <a
          href="/shop?offer=true"
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
            offerOnly ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-gray-600 border-gray-200 hover:border-rose-400 hover:text-rose-500'
          }`}
        >
          🔥 অফার
        </a>
      </div>

      <ProductGrid products={products ?? []} />
    </div>
  )
}
