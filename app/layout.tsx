import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/components/shop/CartProvider'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Chosma — বাংলাদেশের সেরা আইওয়্যার শপ',
  description: 'প্রিমিয়াম সানগ্লাস ও আইগ্লাস — সাশ্রয়ী মূল্যে। UV400 প্রোটেকশন সহ হাজারো কালেকশন।',
  keywords: 'সানগ্লাস, আইগ্লাস, চশমা, eyeglasses, sunglasses, Bangladesh',
  openGraph: {
    title: 'Chosma — বাংলাদেশের সেরা আইওয়্যার শপ',
    description: 'প্রিমিয়াম সানগ্লাস ও আইগ্লাস — সাশ্রয়ী মূল্যে।',
    url: 'https://chosma.com',
    siteName: 'Chosma',
    locale: 'bn_BD',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans bg-white text-gray-900 antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
