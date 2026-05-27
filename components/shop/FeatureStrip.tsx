const features = [
  { icon: '🚚', title: 'ফ্রি ডেলিভারি', sub: '৳১৫০০+ অর্ডারে সারাদেশ' },
  { icon: '✅', title: 'অরিজিনাল গ্যারান্টি', sub: '১০০% অথেনটিক পণ্য' },
  { icon: '🔄', title: '৭ দিন রিটার্ন', sub: 'সহজ রিটার্ন পলিসি' },
  { icon: '💳', title: 'ক্যাশ অন ডেলিভারি', sub: 'পণ্য পেয়ে পেমেন্ট' },
]

export function FeatureStrip() {
  return (
    <div className="bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map(f => (
          <div key={f.title} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-light rounded-xl flex items-center justify-center text-xl shrink-0">{f.icon}</div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{f.title}</p>
              <p className="text-xs text-gray-400">{f.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
