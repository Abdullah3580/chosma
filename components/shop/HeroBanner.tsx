'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Product } from '@/lib/types'
import { useCart } from './CartProvider'

const slides = [
  {
    tag: 'নতুন কালেকশন ২০২৬',
    title: 'আপনার চোখে দিন',
    highlight: 'স্টাইলের ছোঁয়া',
    sub: 'প্রিমিয়াম মানের সানগ্লাস ও আইগ্লাস — UV400 প্রোটেকশন সহ।',
    bg: 'from-sky-light via-white to-brown-light',
    cta: 'এখনই কিনুন',
    href: '/shop',
  },
  {
    tag: 'ঈদ স্পেশাল অফার',
    title: 'ডিজাইনার আইওয়্যার',
    highlight: 'লুক আইকনিক',
    sub: 'পোলারাইজড লেন্স। হাতে তৈরি ফ্রেম। স্টাইল মিটস ফাংশন।',
    bg: 'from-brown-light via-white to-sky-light',
    cta: 'ডিজাইনার দেখুন',
    href: '/shop?category=designer',
  },
  {
    tag: 'সীমিত সময়ের অফার',
    title: 'প্রথম অর্ডারে',
    highlight: '৫০% ছাড়!',
    sub: 'হাজারো কালেকশন। সব ক্যাটাগরিতে বিশাল ছাড়। মিস করবেন না।',
    bg: 'from-sky-light via-sky-light to-brown-light',
    cta: 'অফার নিন',
    href: '/shop?offer=true',
  },
]

export function HeroBanner({ featured }: { featured: Product[] }) {
  const [cur, setCur] = useState(0)
  const { addItem } = useCart()

  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  const slide = slides[cur]

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${slide.bg} transition-all duration-700`} style={{ minHeight: 480 }}>
      {/* Decorative circles */}
      <div className="absolute -top-24 -right-16 w-96 h-96 bg-sky rounded-full opacity-10 pointer-events-none" />
      <div className="absolute -bottom-16 left-[8%] w-64 h-64 bg-brown rounded-full opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text */}
        <div>
          <span className="inline-flex items-center gap-2 bg-white border border-sky-mid text-sky-dark text-[11px] font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase mb-5">
            ✦ {slide.tag}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {slide.title}
            <span className="block text-sky-dark">{slide.highlight}</span>
          </h1>
          <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">{slide.sub}</p>
          <div className="flex gap-3 flex-wrap">
            <a href={slide.href} className="btn-primary">{slide.cta} →</a>
            <a href="/shop" className="btn-outline">সব কালেকশন</a>
          </div>
          {/* Stats */}
          <div className="flex gap-8 mt-10 pt-8 border-t border-brown-mid">
            {[['৫০০+', 'পণ্য'], ['৫০%', 'পর্যন্ত ছাড়'], ['৪.৯★', 'রেটিং']].map(([n, l]) => (
              <div key={l}>
                <div className="font-serif text-2xl font-bold text-gray-900">{n}</div>
                <div className="text-xs text-gray-400 mt-0.5 tracking-wide">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 gap-4">
          {(featured.slice(0, 3)).map((p, i) => (
            <div
              key={p.id}
              onClick={() => addItem(p)}
              className={`bg-white rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer relative ${i === 2 ? 'col-span-2 flex items-center gap-5' : ''}`}
            >
              <span className="absolute top-2.5 right-2.5 bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                {p.discount_percent}% OFF
              </span>
              <div className={`flex items-center justify-center text-5xl ${i === 2 ? 'shrink-0 w-16' : 'mb-3'}`}>
                {p.emoji}
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2">{p.name_bn}</div>
                <div className="text-sky-dark font-bold text-sm mt-1">৳{p.price.toLocaleString('bn-BD')}</div>
              </div>
            </div>
          ))}
          {featured.length === 0 && [
            { emoji: '🕶️', name: 'ট্রেন্ডি সানগ্লাস', price: 400, off: 58 },
            { emoji: '👓', name: 'প্রিমিয়াম আইগ্লাস', price: 675, off: 50 },
            { emoji: '💎', name: 'লাক্সারি ডিজাইনার ফ্রেম', price: 14175, off: 25 },
          ].map((p, i) => (
            <div key={i} className={`bg-white rounded-2xl p-5 shadow-sm relative ${i === 2 ? 'col-span-2 flex items-center gap-5' : ''}`}>
              <span className="absolute top-2.5 right-2.5 bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{p.off}% OFF</span>
              <div className={`text-5xl flex items-center justify-center ${i === 2 ? 'shrink-0 w-16' : 'mb-3'}`}>{p.emoji}</div>
              <div>
                <div className="text-xs font-semibold text-gray-800">{p.name}</div>
                <div className="text-sky-dark font-bold text-sm mt-1">৳{p.price.toLocaleString('bn-BD')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide controls */}
      <button onClick={() => setCur(c => (c - 1 + slides.length) % slides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white w-9 h-9 rounded-full flex items-center justify-center shadow transition-all z-20">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button onClick={() => setCur(c => (c + 1) % slides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white w-9 h-9 rounded-full flex items-center justify-center shadow transition-all z-20">
        <ChevronRight className="w-4 h-4" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCur(i)} className={`h-2 rounded-full transition-all ${i === cur ? 'w-6 bg-sky-dark' : 'w-2 bg-gray-300'}`} />
        ))}
      </div>
    </section>
  )
}
