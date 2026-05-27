'use client'
import { useState } from 'react'
import { Search } from 'lucide-react'

const statusMap: Record<string, { label: string; color: string }> = {
  pending:    { label: 'অপেক্ষমান',   color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  confirmed:  { label: 'নিশ্চিত',      color: 'bg-blue-100 text-blue-700 border-blue-200' },
  processing: { label: 'প্রক্রিয়াধীন', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  shipped:    { label: 'পাঠানো হয়েছে', color: 'bg-sky-100 text-sky-700 border-sky-200' },
  delivered:  { label: 'ডেলিভারি হয়েছে', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  cancelled:  { label: 'বাতিল',         color: 'bg-rose-100 text-rose-700 border-rose-200' },
}

export default function OrdersPage() {
  const [phone, setPhone] = useState('')
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const searchOrders = async () => {
    if (!phone.trim()) return
    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch(`/api/orders?phone=${encodeURIComponent(phone)}`)
      const data = await res.json()
      setOrders(data.orders ?? [])
    } catch {
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-14">
      <h1 className="section-title mb-2">অর্ডার ট্র্যাক করুন</h1>
      <p className="text-gray-500 text-sm mb-8">আপনার মোবাইল নম্বর দিয়ে অর্ডারের অবস্থা জানুন।</p>

      <div className="flex gap-3 mb-8">
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && searchOrders()}
          placeholder="01XXXXXXXXX"
          className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all"
        />
        <button onClick={searchOrders} disabled={loading} className="btn-primary px-6 flex items-center gap-2">
          <Search className="w-4 h-4" />
          {loading ? 'খুঁজছি...' : 'খুঁজুন'}
        </button>
      </div>

      {searched && !loading && orders.length === 0 && (
        <div className="text-center py-14 text-gray-400">
          <div className="text-5xl mb-4">📦</div>
          <p>এই নম্বরে কোনো অর্ডার পাওয়া যায়নি।</p>
        </div>
      )}

      <div className="space-y-4">
        {orders.map((order: any) => {
          const st = statusMap[order.status] ?? statusMap.pending
          return (
            <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{order.product_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(order.created_at).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border shrink-0 ${st.color}`}>{st.label}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 pt-3 border-t border-gray-100">
                <span>পরিমাণ: {order.quantity}টি</span>
                <span className="font-bold text-sky-dark">৳{order.total_amount.toLocaleString('bn-BD')}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
