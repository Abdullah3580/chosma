import { createClient } from '@/lib/supabase/server'
import { ProductsManager } from '@/components/admin/ProductsManager'

export const revalidate = 0

export default async function AdminProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">পণ্য ম্যানেজমেন্ট</h1>
        <p className="text-gray-500 text-sm mt-1">মোট {products?.length ?? 0}টি পণ্য</p>
      </div>
      <ProductsManager initialProducts={products ?? []} />
    </div>
  )
}
