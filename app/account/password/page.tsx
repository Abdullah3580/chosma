'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function PasswordPage() {
  const [form, setForm] = useState({ password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('পাসওয়ার্ড মিলছে না'); return }
    if (form.password.length < 6) { setError('কমপক্ষে ৬ অক্ষর দিন'); return }
    setLoading(true); setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: form.password })
    if (error) setError(error.message)
    else { setSuccess(true); setForm({ password: '', confirm: '' }) }
    setLoading(false)
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/account" className="text-gray-400 hover:text-gray-600">← ফিরে যান</Link>
        <h1 className="font-serif text-2xl font-bold text-gray-900">পাসওয়ার্ড পরিবর্তন</h1>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">নতুন পাসওয়ার্ড *</label>
            <input type="password" required value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="কমপক্ষে ৬ অক্ষর"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">পাসওয়ার্ড নিশ্চিত করুন *</label>
            <input type="password" required value={form.confirm}
              onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
              placeholder="আবার পাসওয়ার্ড দিন"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all" />
          </div>
          {success && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl">✅ পাসওয়ার্ড পরিবর্তন হয়েছে!</div>}
          {error && <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm px-4 py-3 rounded-xl">❌ {error}</div>}
          <button type="submit" disabled={loading} className="w-full btn-primary py-3 disabled:opacity-60">
            {loading ? '⏳ অপেক্ষা করুন...' : '🔐 পাসওয়ার্ড পরিবর্তন করুন'}
          </button>
        </form>
      </div>
    </div>
  )
}
