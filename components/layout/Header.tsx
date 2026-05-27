'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Search, ShoppingCart, User, Heart, Menu, X } from 'lucide-react'
import { useCart } from '@/components/shop/CartProvider'
import { CartDrawer } from '@/components/shop/CartDrawer'

const navLinks = [
  { label: 'সব পণ্য', href: '/shop' },
  { label: 'আইগ্লাস', href: '/shop?category=eyeglasses' },
  { label: 'সানগ্লাস', href: '/shop?category=sunglasses' },
  { label: 'ডিজাইনার', href: '/shop?category=designer', badge: 'NEW' },
  { label: 'ফ্রি ফ্রেম', href: '/shop?category=free-frame' },
  { label: 'অফার', href: '/shop?category=all&offer=true', badge: '৫০%' },
  { label: 'ফটোক্রোমিক', href: '/shop?category=photochromic' },
  { label: 'আনুষাঙ্গিক', href: '/shop?category=accessories' },
  { label: 'যোগাযোগ', href: '/contact' },
]

export function Header() {
  const { totalItems } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')

  return (
    <>
      {/* Topbar */}
      <div className="bg-sky-dark text-white text-center text-xs py-2 px-4 tracking-wide">
        🎉 প্রথম অর্ডারে ৫০% ছাড় &nbsp;|&nbsp; ৳১৫০০+ অর্ডারে ফ্রি ডেলিভারি &nbsp;|&nbsp; সারাদেশে ক্যাশ অন ডেলিভারি
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="font-serif text-2xl font-bold text-gray-900 tracking-tight shrink-0">
              চশমা<span className="text-sky-dark">.</span>
              <span className="text-gray-400 text-sm font-sans font-normal">com</span>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-md relative hidden sm:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="চশমা খুঁজুন..."
                className="w-full h-10 pl-10 pr-4 border border-gray-200 rounded-full text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-auto">
              <Link href="/account" className="hidden sm:flex flex-col items-center gap-0.5 text-gray-500 hover:text-sky-dark transition-colors p-2 rounded-lg hover:bg-gray-50 text-xs">
                <User className="w-5 h-5" />
                <span>অ্যাকাউন্ট</span>
              </Link>
              <button className="hidden sm:flex flex-col items-center gap-0.5 text-gray-500 hover:text-sky-dark transition-colors p-2 rounded-lg hover:bg-gray-50 text-xs">
                <Heart className="w-5 h-5" />
                <span>উইশলিস্ট</span>
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="flex items-center gap-2 bg-sky-dark hover:bg-sky text-white rounded-full px-4 py-2 text-sm font-medium transition-all ml-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">কার্ট</span>
                {totalItems > 0 && (
                  <span className="bg-brown text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-gray-600"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="border-t border-gray-100 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto hide-scrollbar">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-3 text-xs font-medium text-gray-600 hover:text-sky-dark whitespace-nowrap border-b-2 border-transparent hover:border-sky-dark transition-all"
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="চশমা খুঁজুন..."
                className="w-full h-10 pl-9 pr-4 border border-gray-200 rounded-full text-sm bg-gray-50 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-sky-dark hover:bg-sky-light rounded-lg transition-all"
                >
                  {link.label}
                  {link.badge && (
                    <span className="ml-1 bg-rose-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">{link.badge}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
