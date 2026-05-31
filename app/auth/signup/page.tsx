'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ full_name: '', email: '', password: '', confirm_password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm_password) { setError('পাসওয়ার্ড মিলছে না'); return }
    if (form.password.length < 6) { setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে'); return }
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { full_name: form.full_name } },
    })
    if (error) {
      setError(error.message === 'User already registered' ? 'এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট আছে' : error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) return (
    <div className="min-h-screen bg-gradient-to-br from-sky-light to-brown-light flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">অ্যাকাউন্ট তৈরি হয়েছে!</h2>
        <p className="text-gray-500 text-sm mb-6">আপনার ইমেইলে একটি confirmation link পাঠানো হয়েছে। Link এ ক্লিক করে confirm করুন।</p>
        <Link href="/auth/login" className="btn-primary">Login করুন →</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-light to-brown-light flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-3xl font-bold text-gray-900">
            চশমা<span className="text-sky-dark">.</span>
            <span className="text-gray-400 text-base font-sans font-normal">com</span>
          </Link>
          <p className="text-gray-500 text-sm mt-2">নতুন অ্যাকাউন্ট তৈরি করুন</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">পূর্ণ নাম *</label>
            <input type="text" required value={form.full_name}
              onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
              placeholder="আপনার পূর্ণ নাম"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">ইমেইল *</label>
            <input type="email" required value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="your@email.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">পাসওয়ার্ড *</label>
            <input type="password" required value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="কমপক্ষে ৬ অক্ষর"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">পাসওয়ার্ড নিশ্চিত করুন *</label>
            <input type="password" required value={form.confirm_password}
              onChange={e => setForm(f => ({ ...f, confirm_password: e.target.value }))}
              placeholder="আবার পাসওয়ার্ড দিন"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all" />
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm px-4 py-3 rounded-xl">❌ {error}</div>
          )}

          <button type="submit" disabled={loading}
            className="w-full btn-primary py-3 text-base disabled:opacity-60">
            {loading ? '⏳ অপেক্ষা করুন...' : 'Sign Up করুন →'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          আগেই অ্যাকাউন্ট আছে?{' '}
          <Link href="/auth/login" className="text-sky-dark font-semibold hover:underline">Login করুন</Link>
        </p>
      </div>
    </div>
  )
}
