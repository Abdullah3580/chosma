import { createClient } from '@/lib/supabase/server'
import { ShoppingBag, TrendingUp, Users, Clock } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: totalOrders },
    { count: pendingOrders },
    { count: totalProducts },
    { count: totalCustomers },
    { data: recentOrders },
    { data: revenueData },
  ] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('customer_phone', { count: 'exact', head: true }),
    supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('orders').select('total_amount').neq('status', 'cancelled'),
  ])

  const totalRevenue = revenueData?.reduce((s, o) => s + (o.total_amount ?? 0), 0) ?? 0

  const stats = [
    { label: 'মোট অর্ডার', value: totalOrders ?? 0, icon: ShoppingBag, color: 'bg-sky-500', light: 'bg-sky-50 text-sky-600' },
    { label: 'মোট রেভিনিউ', value: `৳${totalRevenue.toLocaleString('bn-BD')}`, icon: TrendingUp, color: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-600' },
    { label: 'মোট পণ্য', value: totalProducts ?? 0, icon: ShoppingBag, color: 'bg-purple-500', light: 'bg-purple-50 text-purple-600' },
    { label: 'পেন্ডিং অর্ডার', value: pendingOrders ?? 0, icon: Clock, color: 'bg-amber-500', light: 'bg-amber-50 text-amber-600' },
  ]

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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">ড্যাশবোর্ড</h1>
        <p className="text-gray-500 text-sm mt-1">Chosma.com এর সার্বিক অবস্থা</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.light}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">সাম্প্রতিক অর্ডার</h2>
          <a href="/admin/orders" className="text-sky-500 text-sm hover:underline">সব দেখুন →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">কাস্টমার</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">পণ্য</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">মূল্য</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">স্ট্যাটাস</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">তারিখ</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders?.length === 0 && (
                <tr><td colSpan={5} className="text-center py-10 text-gray-400">কোনো অর্ডার নেই</td></tr>
              )}
              {recentOrders?.map(order => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-800">{order.customer_name}</div>
                    <div className="text-xs text-gray-400">{order.customer_phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-[180px] truncate">{order.product_name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-sky-600">৳{order.total_amount?.toLocaleString('bn-BD')}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                      {statusLabels[order.status] ?? order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {new Date(order.created_at).toLocaleDateString('bn-BD')}
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
