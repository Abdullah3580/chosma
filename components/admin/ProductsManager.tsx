'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import type { Product } from '@/lib/types'

const categories = ['eyeglasses', 'sunglasses', 'designer', 'photochromic', 'free-frame', 'accessories']
const categoryLabels: Record<string, string> = {
  eyeglasses: 'আইগ্লাস', sunglasses: 'সানগ্লাস', designer: 'ডিজাইনার',
  photochromic: 'ফটোক্রোমিক', 'free-frame': 'ফ্রি ফ্রেম', accessories: 'আনুষাঙ্গিক',
}

const emptyForm = {
  name: '', name_bn: '', slug: '', category: 'sunglasses',
  price: '', original_price: '', emoji: '🕶️',
  in_stock: true, is_featured: false, is_new_arrival: false,
}

export function ProductsManager({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const router = useRouter()

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowForm(true) }
  const openEdit = (p: Product) => {
    setForm({
      name: p.name, name_bn: p.name_bn, slug: p.slug,
      category: p.category, price: String(p.price),
      original_price: String(p.original_price), emoji: p.emoji,
      in_stock: p.in_stock, is_featured: p.is_featured, is_new_arrival: p.is_new_arrival,
    })
    setEditId(p.id)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/admin/products', {
        method: editId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: editId, price: Number(form.price), original_price: Number(form.original_price) }),
      })
      if (res.ok) { setShowForm(false); router.refresh() }
    } finally { setLoading(false) }
  }

  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      await fetch('/api/admin/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      setProducts(p => p.filter(x => x.id !== id))
      setDeleteId(null)
    } finally { setLoading(false) }
  }

  return (
    <>
      {/* Add Button */}
      <div className="mb-5">
        <button onClick={openAdd} className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
          <Plus className="w-4 h-4" /> নতুন পণ্য যোগ করুন
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">{editId ? 'পণ্য এডিট করুন' : 'নতুন পণ্য যোগ করুন'}</h3>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">English Name *</label>
                  <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">বাংলা নাম *</label>
                  <input required value={form.name_bn} onChange={e => setForm(f => ({ ...f, name_bn: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Slug (URL) *</label>
                  <input required value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                    placeholder="product-name-here"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Emoji</label>
                  <input value={form.emoji} onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-400" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">ক্যাটাগরি *</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-400">
                  {categories.map(c => <option key={c} value={c}>{categoryLabels[c]}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">বিক্রয় মূল্য (৳) *</label>
                  <input required type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">আসল মূল্য (৳) *</label>
                  <input required type="number" value={form.original_price} onChange={e => setForm(f => ({ ...f, original_price: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-400" />
                </div>
              </div>
              <div className="flex gap-5">
                {[
                  { key: 'in_stock', label: 'স্টকে আছে' },
                  { key: 'is_featured', label: 'ফিচার্ড' },
                  { key: 'is_new_arrival', label: 'নতুন আগমন' },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form[key as keyof typeof form] as boolean}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))}
                      className="w-4 h-4 rounded accent-sky-500" />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                {loading ? 'সেভ হচ্ছে...' : editId ? 'আপডেট করুন' : 'যোগ করুন'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="font-bold text-gray-900 mb-2">পণ্য মুছবেন?</h3>
            <p className="text-gray-500 text-sm mb-5">এই কাজটি undo করা যাবে না।</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50">বাতিল</button>
              <button onClick={() => handleDelete(deleteId)} disabled={loading}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60">
                {loading ? '...' : 'হ্যাঁ, মুছুন'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">পণ্য</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">ক্যাটাগরি</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">মূল্য</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">ছাড়</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">স্ট্যাটাস</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr><td colSpan={6} className="text-center py-16 text-gray-400">কোনো পণ্য নেই</td></tr>
              )}
              {products.map(p => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{p.emoji}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-800 max-w-[180px] truncate">{p.name_bn}</div>
                        <div className="text-xs text-gray-400">{p.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                      {categoryLabels[p.category] ?? p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-sky-600">৳{p.price.toLocaleString('bn-BD')}</div>
                    <div className="text-xs text-gray-400 line-through">৳{p.original_price.toLocaleString('bn-BD')}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {p.discount_percent}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {p.in_stock ? <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full w-fit">✅ স্টকে আছে</span> : <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full w-fit">❌ স্টক নেই</span>}
                      {p.is_featured && <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full w-fit">⭐ ফিচার্ড</span>}
                      {p.is_new_arrival && <span className="text-[10px] bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full w-fit">🆕 নতুন</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="w-8 h-8 bg-sky-50 hover:bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteId(p.id)} className="w-8 h-8 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
