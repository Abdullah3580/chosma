'use client'
import { useState } from 'react'
import { Heart } from 'lucide-react'
import type { Product } from '@/lib/types'
import { useCart } from './CartProvider'

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) return (
    <div className="text-center py-16 text-gray-400">
      <div className="text-5xl mb-4">👓</div>
      <p>কোনো পণ্য পাওয়া যায়নি</p>
    </div>
  )
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}

const bgMap: Record<string, string> = {
  sunglasses: 'bg-sky-light',
  eyeglasses: 'bg-brown-light',
  designer: 'bg-purple-50',
  photochromic: 'bg-blue-50',
  'free-frame': 'bg-green-50',
  accessories: 'bg-gray-100',
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [wished, setWished] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="card overflow-hidden group">
      {/* Image area */}
      <div className={`relative h-44 flex items-center justify-center ${bgMap[product.category] ?? 'bg-gray-50'}`}>
        <span className="text-6xl">{product.emoji}</span>
        <span className="badge-off">{product.discount_percent}% OFF</span>
        <button
          onClick={() => setWished(w => !w)}
          className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full border flex items-center justify-center transition-all ${wished ? 'bg-rose-500 border-rose-500 text-white' : 'bg-white border-gray-200 text-gray-400 hover:text-rose-500 hover:border-rose-300'}`}
        >
          <Heart className="w-3.5 h-3.5" fill={wished ? 'currentColor' : 'none'} />
        </button>
        {product.is_new_arrival && (
          <span className="absolute top-2.5 left-2.5 bg-sky-dark text-white text-[9px] font-bold px-2 py-0.5 rounded-full">NEW</span>
        )}
      </div>

      {/* Info */}
      <div className="p-3.5">
        <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-2 min-h-[40px]">{product.name_bn}</p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-base font-bold text-sky-dark">৳{product.price.toLocaleString('bn-BD')}</span>
          <span className="text-xs text-gray-400 line-through">৳{product.original_price.toLocaleString('bn-BD')}</span>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full font-medium">
            ৳{(product.original_price - product.price).toLocaleString('bn-BD')} সাশ্রয়
          </span>
        </div>
        <button
          onClick={handleAdd}
          className={`mt-3 w-full py-2 rounded-lg text-xs font-semibold transition-all ${added ? 'bg-emerald-500 text-white' : 'bg-sky-dark hover:bg-sky text-white'}`}
        >
          {added ? '✅ কার্টে যোগ হয়েছে' : '🛒 অর্ডার করুন'}
        </button>
      </div>
    </div>
  )
}
