import { createClient } from '@/lib/supabase/server'
import { OrderStatusUpdater } from '@/components/admin/OrderStatusUpdater'

export const revalidate = 0

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-sky-100 text-sky-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-rose-100 text-rose-700',
}
const statusLabels: Record<string, string> = {
  pending: 'পেন্ডিং',
  confirmed: 'নিশ্চিত',
  processing: 'প্রক্রিয়াধীন',
  shipped: 'পাঠানো হয়েছে',
  delivered: 'ডেলিভারি হয়েছে',
  cancelled: 'বাতিল',
}

export default async function AdminOrdersPage() {
  const supabase = await createClient()
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">অর্ডার ম্যানেজমেন্ট</h1>
          <p className="text-gray-500 text-sm mt-1">মোট {orders?.length ?? 0}টি অর্ডার</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">কাস্টমার</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">পণ্য</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">পরিমাণ</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">মূল্য</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">ঠিকানা</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">স্ট্যাটাস</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">তারিখ</th>
              </tr>
            </thead>
            <tbody>
              {!orders?.length && (
                <tr><td colSpan={7} className="text-center py-16 text-gray-400">
                  <div className="text-4xl mb-3">📦</div>
                  <p>কোনো অর্ডার নেই</p>
                </td></tr>
              )}
              {orders?.map(order => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-800">{order.customer_name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{order.customer_phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700 max-w-[200px] line-clamp-2">{order.product_name}</div>
                    {order.note && <div className="text-xs text-amber-600 mt-0.5">📝 {order.note}</div>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.quantity}টি</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-sky-600">৳{order.total_amount?.toLocaleString('bn-BD')}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-gray-600 max-w-[150px]">{order.customer_address}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{order.district}</div>
                  </td>
                  <td className="px-6 py-4">
                    <OrderStatusUpdater
                      orderId={order.id}
                      currentStatus={order.status}
                      statusColors={statusColors}
                      statusLabels={statusLabels}
                    />
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
                    {new Date(order.created_at).toLocaleDateString('bn-BD')}
                    <div className="mt-0.5">{new Date(order.created_at).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
