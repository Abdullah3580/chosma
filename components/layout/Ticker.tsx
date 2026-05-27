export function Ticker() {
  const items = [
    'ফ্রি ডেলিভারি ৳১৫০০+ অর্ডারে',
    'প্রথম অর্ডারে ৫০% ছাড়',
    'UV400 প্রোটেকশন গ্যারান্টি',
    'অরিজিনাল প্রোডাক্ট',
    '৭ দিনের রিটার্ন পলিসি',
    'সারাদেশে ক্যাশ অন ডেলিভারি',
  ]
  const doubled = [...items, ...items]

  return (
    <div className="bg-brown-light border-b border-brown-mid overflow-hidden py-2">
      <div className="flex gap-12 ticker-animation w-max">
        {doubled.map((item, i) => (
          <span key={i} className="text-xs font-medium text-brown-dark whitespace-nowrap flex items-center gap-2">
            <span className="text-brown opacity-60 text-[8px]">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
