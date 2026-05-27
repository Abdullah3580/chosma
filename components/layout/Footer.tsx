import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-14 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="font-serif text-2xl font-bold text-white tracking-tight">
              চশমা<span className="text-sky-dark">.</span>
              <span className="text-gray-500 text-sm font-sans font-normal">com</span>
            </Link>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-xs">
              বাংলাদেশের সেরা অনলাইন আইওয়্যার শপ। প্রিমিয়াম সানগ্লাস ও আইগ্লাস — সাশ্রয়ী মূল্যে। UV400 প্রোটেকশন সহ হাজারো কালেকশন।
            </p>
            <div className="flex gap-3 mt-5">
              {['📘', '📸', '▶️', '📱'].map((icon, i) => (
                <a key={i} href="#" className="w-9 h-9 border border-gray-700 rounded-lg flex items-center justify-center text-base hover:border-sky-dark hover:text-sky-mid transition-all">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-4">শপ</h4>
            {[
              ['সানগ্লাস', '/shop?category=sunglasses'],
              ['আইগ্লাস', '/shop?category=eyeglasses'],
              ['ডিজাইনার', '/shop?category=designer'],
              ['ফটোক্রোমিক', '/shop?category=photochromic'],
              ['ফ্রি ফ্রেম', '/shop?category=free-frame'],
              ['অফার', '/shop?offer=true'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="block text-sm text-gray-500 hover:text-sky-mid mb-2 transition-colors">
                {label}
              </Link>
            ))}
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-4">সাপোর্ট</h4>
            {[
              ['যোগাযোগ', '/contact'],
              ['আমাদের সম্পর্কে', '/about'],
              ['অর্ডার ট্র্যাক', '/orders'],
              ['রিটার্ন পলিসি', '/returns'],
              ['FAQ', '/faq'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="block text-sm text-gray-500 hover:text-sky-mid mb-2 transition-colors">
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-4">যোগাযোগ</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <p>📞 01XXXXXXXXX</p>
              <p>✉️ info@chosma.com</p>
              <p>🕐 শনি–বৃহস্পতি, ১০টা–৮টা</p>
            </div>
            <div className="mt-5">
              <h5 className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-3">নিউজলেটার</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="ইমেইল দিন"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-sky-dark"
                />
                <button className="bg-sky-dark hover:bg-sky text-white px-3 py-2 rounded-lg text-sm transition-colors">→</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <span>© ২০২৬ Chosma.com — সর্বস্বত্ব সংরক্ষিত</span>
          <div className="flex gap-2">
            {['bKash', 'Nagad', 'Rocket', 'COD'].map(m => (
              <span key={m} className="bg-gray-800 text-gray-400 px-2.5 py-1 rounded text-[11px] font-medium">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
