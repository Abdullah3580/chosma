import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-sky-100 text-sky-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-rose-100 text-rose-700',
}
const statusLabels: Record<string, string> = {
  pending: 'পেন্ডিং', confirmed: 'নিশ্চিত', processing: 'প্রক্রিয়াধীন',
  shipped: 'পাঠানো হয়েছে', delivered: 'ডেলিভারি হয়েছে', cancelled: 'বাতিল',
}

export default async function OrderHistoryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_phone', (await supabase.from('profiles').select('phone').eq('id', user.id).single()).data?.phone ?? '')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/account" className="text-gray-400 hover:text-gray-600 transition-colors">← ফিরে যান</Link>
        <h1 className="font-serif text-2xl font-bold text-gray-900">অর্ডার হিস্ট্রি</h1>
      </div>

      {!orders?.length ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-lg">কোনো অর্ডার নেই</p>
          <Link href="/shop" className="btn-primary inline-block mt-5">পণ্য কিনুন</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-sky-light rounded-xl flex items-center justify-center text-2xl">👓</div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{order.product_name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(order.created_at).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${statusColors[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                  {statusLabels[order.status] ?? order.status}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-sm">
                <span className="text-gray-500">পরিমাণ: {order.quantity}টি</span>
                <span className="font-bold text-sky-dark text-base">৳{order.total_amount?.toLocaleString('bn-BD')}</span>
              </div>
              {order.note && (
                <p className="text-xs text-amber-600 mt-2 bg-amber-50 px-3 py-1.5 rounded-lg">📝 {order.note}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
