'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

interface Props {
  user: User
  profile: any
}

export function ProfileEditor({ user, profile }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({
    full_name: profile?.full_name ?? '',
    username: profile?.username ?? '',
    phone: profile?.phone ?? '',
    date_of_birth: profile?.date_of_birth ?? '',
    gender: profile?.gender ?? '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setSuccess(true); router.refresh() }
      else { const d = await res.json(); setError(d.error ?? 'সেভ হয়নি') }
    } catch { setError('কিছু একটা ভুল হয়েছে') }
    finally { setLoading(false) }
  }

  const initials = (form.full_name || user.email || 'U').charAt(0).toUpperCase()

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-5">
        <div className="w-20 h-20 bg-sky-dark text-white rounded-full flex items-center justify-center text-3xl font-bold font-serif shrink-0">
          {initials}
        </div>
        <div>
          <h2 className="font-semibold text-gray-900 text-lg">{form.full_name || 'নাম দিন'}</h2>
          <p className="text-gray-400 text-sm">{user.email}</p>
          <p className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">✅ ভেরিফাইড অ্যাকাউন্ট</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-5">ব্যক্তিগত তথ্য</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">পূর্ণ নাম</label>
              <input value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                placeholder="আপনার পূর্ণ নাম"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Username</label>
              <input value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                placeholder="@username"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">ইমেইল</label>
              <input value={user.email} disabled
                className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-sm bg-gray-100 text-gray-400 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">মোবাইল নম্বর</label>
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="01XXXXXXXXX"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">জন্ম তারিখ</label>
              <input type="date" value={form.date_of_birth} onChange={e => setForm(f => ({ ...f, date_of_birth: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">লিঙ্গ</label>
              <select value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all">
                <option value="">বেছে নিন</option>
                <option value="male">পুরুষ</option>
                <option value="female">মহিলা</option>
                <option value="other">অন্যান্য</option>
              </select>
            </div>
          </div>

          {success && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl">✅ প্রোফাইল আপডেট হয়েছে!</div>}
          {error && <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm px-4 py-3 rounded-xl">❌ {error}</div>}

          <button type="submit" disabled={loading} className="btn-primary px-8 py-2.5 disabled:opacity-60">
            {loading ? '⏳ সেভ হচ্ছে...' : 'সেভ করুন'}
          </button>
        </form>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: '/account/orders', emoji: '📦', label: 'অর্ডার হিস্ট্রি' },
          { href: '/account/addresses', emoji: '📍', label: 'ঠিকানা ম্যানেজ' },
          { href: '/account/password', emoji: '🔐', label: 'পাসওয়ার্ড পরিবর্তন' },
        ].map(item => (
          <a key={item.href} href={item.href}
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-3 cursor-pointer">
            <span className="text-2xl">{item.emoji}</span>
            <span className="font-medium text-gray-800 text-sm">{item.label}</span>
            <span className="ml-auto text-gray-400">→</span>
          </a>
        ))}
      </div>

      {/* Logout */}
      <div className="text-center">
        <a href="/api/auth/logout" className="text-sm text-rose-500 hover:underline">Logout করুন</a>
      </div>
    </div>
  )
}
