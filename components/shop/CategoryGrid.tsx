import Link from 'next/link'

const categories = [
  { emoji: '👓', label: 'আইগ্লাস', count: '২০০+', href: '/shop?category=eyeglasses', bg: 'bg-sky-light hover:border-sky-dark' },
  { emoji: '🕶️', label: 'সানগ্লাস', count: '১৫০+', href: '/shop?category=sunglasses', bg: 'bg-brown-light hover:border-brown' },
  { emoji: '💎', label: 'ডিজাইনার', count: '৫০+', href: '/shop?category=designer', bg: 'bg-purple-50 hover:border-purple-300' },
  { emoji: '🔵', label: 'ফটোক্রোমিক', count: '৩০+', href: '/shop?category=photochromic', bg: 'bg-blue-50 hover:border-blue-300' },
  { emoji: '🎁', label: 'ফ্রি ফ্রেম', count: 'বিশেষ', href: '/shop?category=free-frame', bg: 'bg-green-50 hover:border-green-300' },
  { emoji: '🔥', label: '৫০% অফ', count: 'সীমিত', href: '/shop?offer=true', bg: 'bg-rose-50 hover:border-rose-300' },
]

export function CategoryGrid() {
  return (
    <section className="py-12">
      <div className="flex items-end justify-between mb-7">
        <div>
          <h2 className="section-title">ক্যাটাগরি বেছে নিন</h2>
          <p className="text-gray-500 text-sm mt-1">আপনার পছন্দের ধরন অনুযায়ী ব্রাউজ করুন</p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {categories.map(cat => (
          <Link
            key={cat.href}
            href={cat.href}
            className={`${cat.bg} border border-transparent rounded-2xl p-4 text-center cursor-pointer transition-all hover:-translate-y-1 hover:shadow-sm`}
          >
            <span className="text-4xl mb-2.5 block">{cat.emoji}</span>
            <div className="text-xs font-bold text-gray-800 uppercase tracking-wide">{cat.label}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">{cat.count} পণ্য</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
