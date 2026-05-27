'use client'
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCart } from './CartProvider'
import { useRouter } from 'next/navigation'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, totalPrice, removeItem, updateQty } = useCart()
  const router = useRouter()

  const handleCheckout = () => {
    onClose()
    router.push('/checkout')
  }

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-serif text-xl font-semibold">🛒 আপনার কার্ট</h3>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
              <ShoppingBag className="w-14 h-14 opacity-30" />
              <p className="text-base">কার্ট এখন খালি</p>
              <button onClick={onClose} className="btn-primary text-sm px-6 py-2.5">পণ্য দেখুন</button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                  <div className="w-16 h-16 bg-sky-light rounded-xl flex items-center justify-center text-3xl shrink-0">
                    {product.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">{product.name_bn}</p>
                    <p className="text-sky-dark font-bold text-base mt-1">৳{(product.price * quantity).toLocaleString('bn-BD')}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(product.id, quantity - 1)}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold w-5 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQty(product.id, quantity + 1)}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-gray-400 hover:text-rose-500 transition-colors self-start mt-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 text-sm">মোট মূল্য</span>
              <span className="font-serif text-2xl font-bold text-gray-900">৳{totalPrice.toLocaleString('bn-BD')}</span>
            </div>
            {totalPrice < 1500 && (
              <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
                আরও ৳{(1500 - totalPrice).toLocaleString('bn-BD')} যোগ করলে ফ্রি ডেলিভারি পাবেন!
              </p>
            )}
            <button onClick={handleCheckout} className="w-full btn-brown text-center py-3.5 text-base">
              অর্ডার করুন →
            </button>
          </div>
        )}
      </div>
    </>
  )
}
