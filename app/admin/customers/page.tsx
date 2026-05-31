import { createClient } from '@/lib/supabase/server'

export const revalidate = 0

export default async function AdminCustomersPage() {
  const supabase = await createClient()
  const { data: orders } = await supabase
    .from('orders')
    .select('customer_name, customer_phone, customer_address, district, total_amount, created_at')
    .order('created_at', { ascending: false })

  // Group by phone number
  const customerMap = new Map<string, {
    name: string; phone: string; district: string;
    totalSpent: number; orderCount: number; lastOrder: string;
  }>()

  orders?.forEach(o => {
    const existing = customerMap.get(o.customer_phone)
    if (existing) {
      existing.orderCount++
      existing.totalSpent += o.total_amount ?? 0
      if (o.created_at > existing.lastOrder) existing.lastOrder = o.created_at
    } else {
      customerMap.set(o.customer_phone, {
        name: o.customer_name,
        phone: o.customer_phone,
        district: o.district,
        totalSpent: o.total_amount ?? 0,
        orderCount: 1,
        lastOrder: o.created_at,
      })
    }
  })

  const customers = Array.from(customerMap.values())
    .sort((a, b) => new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime())

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">কাস্টমার লিস্ট</h1>
        <p className="text-gray-500 text-sm mt-1">মোট {customers.length}জন কাস্টমার</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">কাস্টমার</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">জেলা</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">মোট অর্ডার</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">মোট ব্যয়</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">শেষ অর্ডার</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 && (
                <tr><td colSpan={5} className="text-center py-16 text-gray-400">
                  <div className="text-4xl mb-3">👥</div>
                  <p>কোনো কাস্টমার নেই</p>
                </td></tr>
              )}
              {customers.map(c => (
                <tr key={c.phone} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center font-bold text-sm">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">{c.name}</div>
                        <div className="text-xs text-gray-400">{c.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{c.district}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-800">{c.orderCount}টি</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-sky-600">৳{c.totalSpent.toLocaleString('bn-BD')}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {new Date(c.lastOrder).toLocaleDateString('bn-BD')}
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
