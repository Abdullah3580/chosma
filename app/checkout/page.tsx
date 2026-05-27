'use client'
import { useState } from 'react'
import { useCart } from '@/components/shop/CartProvider'
import { useRouter } from 'next/navigation'
import { CheckCircle, ShoppingBag } from 'lucide-react'

const districts = [
  'ঢাকা','চট্টগ্রাম','রাজশাহী','সিলেট','খুলনা','বরিশাল','রংপুর','ময়মনসিংহ',
  'কুমিল্লা','গাজীপুর','নারায়ণগঞ্জ','টাঙ্গাইল','ফরিদপুর','যশোর','বগুড়া',
  'দিনাজপুর','পাবনা','নোয়াখালী','ব্রাহ্মণবাড়িয়া','হবিগঞ্জ',
]

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    customer_name: '', customer_phone: '', customer_address: '',
    district: '', note: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const delivery = totalPrice >= 1500 ? 0 : 80
  const grandTotal = totalPrice + delivery

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.customer_name.trim()) e.customer_name = 'নাম দিন'
    if (!/^01[3-9]\d{8}$/.test(form.customer_phone)) e.customer_phone = 'সঠিক মোবাইল নম্বর দিন'
    if (!form.customer_address.trim()) e.customer_address = 'ঠিকানা দিন'
    if (!form.district) e.district = 'জেলা বেছে নিন'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: items.map(i => ({
            product_id: i.product.id,
            product_name: i.product.name,
            product_price: i.product.price,
            quantity: i.quantity,
          })),
          total_amount: grandTotal,
        }),
      })
      if (!res.ok) throw new Error()
      setSuccess(true)
      clearCart()
    } catch {
      alert('কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0 && !success) return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h2 className="font-serif text-2xl font-bold text-gray-800 mb-2">কার্ট খালি</h2>
      <p className="text-gray-500 mb-6">অর্ডার করতে আগে পণ্য কার্টে যোগ করুন।</p>
      <a href="/shop" className="btn-primary">পণ্য দেখুন</a>
    </div>
  )

  if (success) return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-5" />
      <h2 className="font-serif text-3xl font-bold text-gray-900 mb-3">অর্ডার সফল! 🎉</h2>
      <p className="text-gray-500 leading-relaxed mb-2">ধন্যবাদ! আপনার অর্ডার পেয়েছি।</p>
      <p className="text-gray-500 leading-relaxed mb-6">শীঘ্রই আমাদের টিম আপনার সাথে যোগাযোগ করবে।<br /><strong>ডেলিভারি সময়:</strong> ২–৫ কার্যদিবস</p>
      <a href="/" className="btn-primary">হোমে ফিরুন</a>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="section-title mb-8">অর্ডার করুন</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3 space-y-5">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-5 text-base">ডেলিভারি তথ্য</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">আপনার নাম *</label>
                <input
                  value={form.customer_name}
                  onChange={e => setForm(f => ({ ...f, customer_name: e.target.value }))}
                  placeholder="পূর্ণ নাম লিখুন"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all ${errors.customer_name ? 'border-rose-400' : 'border-gray-200'}`}
                />
                {errors.customer_name && <p className="text-rose-500 text-xs mt-1">{errors.customer_name}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">মোবাইল নম্বর *</label>
                <input
                  value={form.customer_phone}
                  onChange={e => setForm(f => ({ ...f, customer_phone: e.target.value }))}
                  placeholder="01XXXXXXXXX"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all ${errors.customer_phone ? 'border-rose-400' : 'border-gray-200'}`}
                />
                {errors.customer_phone && <p className="text-rose-500 text-xs mt-1">{errors.customer_phone}</p>}
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">ডেলিভারি ঠিকানা *</label>
              <textarea
                value={form.customer_address}
                onChange={e => setForm(f => ({ ...f, customer_address: e.target.value }))}
                rows={3}
                placeholder="বাড়ি নম্বর, রাস্তা, এলাকা..."
                className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all resize-none ${errors.customer_address ? 'border-rose-400' : 'border-gray-200'}`}
              />
              {errors.customer_address && <p className="text-rose-500 text-xs mt-1">{errors.customer_address}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">জেলা *</label>
                <select
                  value={form.district}
                  onChange={e => setForm(f => ({ ...f, district: e.target.value }))}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all ${errors.district ? 'border-rose-400' : 'border-gray-200'}`}
                >
                  <option value="">জেলা বেছে নিন</option>
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.district && <p className="text-rose-500 text-xs mt-1">{errors.district}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">বিশেষ নির্দেশনা</label>
                <input
                  value={form.note}
                  onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                  placeholder="রঙ, সাইজ বা অন্য কিছু..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-4 text-base">পেমেন্ট পদ্ধতি</h2>
            <div className="flex items-center gap-3 bg-sky-light border border-sky-mid rounded-xl px-4 py-3">
              <span className="text-2xl">💵</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">ক্যাশ অন ডেলিভারি</p>
                <p className="text-xs text-gray-500">পণ্য হাতে পেয়ে পেমেন্ট করুন</p>
              </div>
              <span className="ml-auto text-sky-dark text-lg">✓</span>
            </div>
            <div className="flex gap-3 mt-3 opacity-50 pointer-events-none">
              {['bKash', 'Nagad', 'Rocket'].map(m => (
                <div key={m} className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-center text-xs font-semibold text-gray-500">
                  {m} <span className="text-[10px] block text-gray-400">শীঘ্রই</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="font-semibold text-gray-800 mb-5 text-base">অর্ডার সারসংক্ষেপ</h2>
            <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 items-center">
                  <div className="w-11 h-11 bg-sky-light rounded-lg flex items-center justify-center text-2xl shrink-0">{product.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700 line-clamp-1">{product.name_bn}</p>
                    <p className="text-xs text-gray-400">× {quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-800 shrink-0">৳{(product.price * quantity).toLocaleString('bn-BD')}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>পণ্যের মূল্য</span>
                <span>৳{totalPrice.toLocaleString('bn-BD')}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>ডেলিভারি চার্জ</span>
                <span className={delivery === 0 ? 'text-emerald-600 font-medium' : ''}>{delivery === 0 ? 'ফ্রি' : `৳${delivery}`}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-lg pt-2 border-t border-gray-100">
                <span>মোট</span>
                <span className="font-serif">৳{grandTotal.toLocaleString('bn-BD')}</span>
              </div>
            </div>
            {delivery > 0 && (
              <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mt-3">
                আরও ৳{(1500 - totalPrice).toLocaleString('bn-BD')} যোগ করলে ফ্রি ডেলিভারি!
              </p>
            )}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full btn-brown mt-5 py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ অপেক্ষা করুন...' : '✅ অর্ডার নিশ্চিত করুন'}
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">🔒 আপনার তথ্য সম্পূর্ণ নিরাপদ</p>
          </div>
        </div>
      </div>
    </div>
  )
}
