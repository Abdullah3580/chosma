import { createClient } from '@/lib/supabase/server'
import { HeroBanner } from '@/components/shop/HeroBanner'
import { CategoryGrid } from '@/components/shop/CategoryGrid'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { PromoBanners } from '@/components/shop/PromoBanners'
import { FeatureStrip } from '@/components/shop/FeatureStrip'
import { Ticker } from '@/components/layout/Ticker'

export const revalidate = 60

export default async function HomePage() {
  const supabase = await createClient()

  const [{ data: featured }, { data: newArrivals }, { data: eyeglasses }, { data: sunglasses }, { data: designer }] =
    await Promise.all([
      supabase.from('products').select('*').eq('is_featured', true).eq('in_stock', true).order('created_at', { ascending: false }).limit(8),
      supabase.from('products').select('*').eq('is_new_arrival', true).eq('in_stock', true).order('created_at', { ascending: false }).limit(8),
      supabase.from('products').select('*').eq('category', 'eyeglasses').eq('in_stock', true).limit(8),
      supabase.from('products').select('*').eq('category', 'sunglasses').eq('in_stock', true).limit(8),
      supabase.from('products').select('*').eq('category', 'designer').eq('in_stock', true).limit(8),
    ])

  return (
    <>
      <Ticker />
      <HeroBanner featured={featured ?? []} />
      <FeatureStrip />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryGrid />

        <section className="py-12">
          <div className="flex items-end justify-between mb-7">
            <div>
              <h2 className="section-title">সাপ্তাহিক ডিল 🔥</h2>
              <p className="text-gray-500 text-sm mt-1">সীমিত সময়ের অফার — এখনই নিন</p>
            </div>
            <a href="/shop?category=all" className="text-sky-dark text-sm font-medium hover:underline underline-offset-2">
              সব দেখুন →
            </a>
          </div>
          <ProductGrid products={featured ?? []} />
        </section>
      </div>

      <PromoBanners />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-12">
          <div className="flex items-end justify-between mb-7">
            <div>
              <h2 className="section-title">নতুন আগমন ✨</h2>
              <p className="text-gray-500 text-sm mt-1">সর্বশেষ কালেকশন</p>
            </div>
            <a href="/shop?category=all" className="text-sky-dark text-sm font-medium hover:underline underline-offset-2">সব দেখুন →</a>
          </div>
          <ProductGrid products={newArrivals ?? []} />
        </section>

        <section className="py-12">
          <div className="flex items-end justify-between mb-7">
            <div>
              <h2 className="section-title">আইগ্লাস কালেকশন</h2>
              <p className="text-gray-500 text-sm mt-1">প্রিমিয়াম ফ্রেম — সব বয়সের জন্য</p>
            </div>
            <a href="/shop?category=eyeglasses" className="text-sky-dark text-sm font-medium hover:underline underline-offset-2">সব দেখুন →</a>
          </div>
          <ProductGrid products={eyeglasses ?? []} />
        </section>

        <section className="py-12">
          <div className="flex items-end justify-between mb-7">
            <div>
              <h2 className="section-title">সানগ্লাস কালেকশন</h2>
              <p className="text-gray-500 text-sm mt-1">UV400 প্রোটেকশন সহ স্টাইলিশ ফ্রেম</p>
            </div>
            <a href="/shop?category=sunglasses" className="text-sky-dark text-sm font-medium hover:underline underline-offset-2">সব দেখুন →</a>
          </div>
          <ProductGrid products={sunglasses ?? []} />
        </section>

        <section className="py-12">
          <div className="flex items-end justify-between mb-7">
            <div>
              <h2 className="section-title">ডিজাইনার আইওয়্যার 💎</h2>
              <p className="text-gray-500 text-sm mt-1">লাক্সারি কালেকশন</p>
            </div>
            <a href="/shop?category=designer" className="text-sky-dark text-sm font-medium hover:underline underline-offset-2">সব দেখুন →</a>
          </div>
          <ProductGrid products={designer ?? []} />
        </section>
      </div>
    </>
  )
}
