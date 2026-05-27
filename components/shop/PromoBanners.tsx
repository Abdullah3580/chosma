import Link from 'next/link'

export function PromoBanners() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Link href="/shop?category=sunglasses" className="relative rounded-3xl overflow-hidden min-h-[180px] flex flex-col justify-end p-8 cursor-pointer hover:scale-[1.01] transition-transform bg-gradient-to-br from-sky-dark to-sky">
          <span className="absolute top-5 right-6 text-7xl opacity-50">🕶️</span>
          <h3 className="font-serif text-2xl font-bold text-white mb-1">সানগ্লাস কালেকশন</h3>
          <p className="text-white/80 text-sm mb-4">সেরা UV প্রোটেকশন সহ স্টাইলিশ ফ্রেম</p>
          <span className="inline-block bg-white text-gray-900 text-xs font-semibold px-4 py-2 rounded-full w-fit">কালেকশন দেখুন →</span>
        </Link>
        <Link href="/shop?category=eyeglasses" className="relative rounded-3xl overflow-hidden min-h-[180px] flex flex-col justify-end p-8 cursor-pointer hover:scale-[1.01] transition-transform bg-gradient-to-br from-brown to-brown-dark">
          <span className="absolute top-5 right-6 text-7xl opacity-50">👓</span>
          <h3 className="font-serif text-2xl font-bold text-white mb-1">আইগ্লাস স্পেশাল</h3>
          <p className="text-white/80 text-sm mb-4">হালকা ও টেকসই ফ্রেম — সব বয়সের জন্য</p>
          <span className="inline-block bg-white text-gray-900 text-xs font-semibold px-4 py-2 rounded-full w-fit">এখনই কিনুন →</span>
        </Link>
      </div>
    </div>
  )
}
