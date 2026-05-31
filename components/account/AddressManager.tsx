'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, X, Check, MapPin } from 'lucide-react'

const districts = ['ঢাকা','চট্টগ্রাম','রাজশাহী','সিলেট','খুলনা','বরিশাল','রংপুর','ময়মনসিংহ','কুমিল্লা','গাজীপুর','নারায়ণগঞ্জ','টাঙ্গাইল','ফরিদপুর','যশোর','বগুড়া']
const labels = ['Home', 'Office', 'Other']

const emptyForm = { label: 'Home', full_name: '', phone: '', address: '', district: 'ঢাকা', is_default: false }

export function AddressManager({ initialAddresses, userId }: { initialAddresses: any[]; userId: string }) {
  const [addresses, setAddresses] = useState(initialAddresses)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowForm(true) }
  const openEdit = (a: any) => {
    setForm({ label: a.label, full_name: a.full_name, phone: a.phone, address: a.address, district: a.district, is_default: a.is_default })
    setEditId(a.id); setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/addresses', {
        method: editId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: editId, user_id: userId }),
      })
      if (res.ok) { setShowForm(false); router.refresh() }
    } finally { setLoading(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('এই ঠিকানা মুছবেন?')) return
    await fetch('/api/addresses', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setAddresses(a => a.filter(x => x.id !== id))
  }

  return (
    <>
      <div className="mb-5">
        <button onClick={openAdd} className="flex items-center gap-2 bg-sky-dark hover:bg-sky text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
          <Plus className="w-4 h-4" /> নতুন ঠিকানা যোগ করুন
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">{editId ? 'ঠিকানা এডিট করুন' : 'নতুন ঠিকানা'}</h3>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">লেবেল</label>
                <div className="flex gap-2">
                  {labels.map(l => (
                    <button key={l} type="button" onClick={() => setForm(f => ({ ...f, label: l }))}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${form.label === l ? 'bg-sky-dark text-white border-sky-dark' : 'border-gray-200 text-gray-600 hover:border-sky-dark'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">পূর্ণ নাম *</label>
                  <input required value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">মোবাইল *</label>
                  <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">ঠিকানা *</label>
                <textarea required value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  rows={2} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">জেলা *</label>
                <select required value={form.district} onChange={e => setForm(f => ({ ...f, district: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark">
                  {districts.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_default} onChange={e => setForm(f => ({ ...f, is_default: e.target.checked }))}
                  className="w-4 h-4 accent-sky-500" />
                <span className="text-sm text-gray-700">ডিফল্ট ঠিকানা হিসেবে সেট করুন</span>
              </label>
              <button type="submit" disabled={loading}
                className="w-full bg-sky-dark hover:bg-sky text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                {loading ? 'সেভ হচ্ছে...' : editId ? 'আপডেট করুন' : 'যোগ করুন'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>কোনো ঠিকানা নেই</p>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map(a => (
            <div key={a.id} className={`bg-white border rounded-2xl p-5 shadow-sm ${a.is_default ? 'border-sky-dark' : 'border-gray-100'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold bg-sky-light text-sky-dark px-2.5 py-1 rounded-full">{a.label}</span>
                  {a.is_default && <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">✅ ডিফল্ট</span>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(a)} className="w-8 h-8 bg-sky-50 hover:bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(a.id)} className="w-8 h-8 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-lg flex items-center justify-center">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="font-semibold text-gray-800 text-sm">{a.full_name}</p>
              <p className="text-sm text-gray-500 mt-0.5">{a.phone}</p>
              <p className="text-sm text-gray-500">{a.address}, {a.district}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
