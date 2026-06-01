'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword(form)
    if (error) {
      setError('ভুল ইমেইল বা পাসওয়ার্ড')
      setLoading(false)
    } else {
      router.refresh()
      window.location.href = '/account'
      
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-light to-brown-light flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-3xl font-bold text-gray-900">
            চশমা<span className="text-sky-dark">.</span>
            <span className="text-gray-400 text-base font-sans font-normal">com</span>
          </Link>
          <p className="text-gray-500 text-sm mt-2">আপনার অ্যাকাউন্টে Login করুন</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">ইমেইল *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="your@email.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">পাসওয়ার্ড *</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all"
            />
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm px-4 py-3 rounded-xl">
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 text-base disabled:opacity-60"
          >
            {loading ? '⏳ অপেক্ষা করুন...' : 'Login করুন →'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          অ্যাকাউন্ট নেই?{' '}
          <Link href="/auth/signup" className="text-sky-dark font-semibold hover:underline">
            এখানে Sign Up করুন
          </Link>
        </p>
      </div>
    </div>
  )
}
