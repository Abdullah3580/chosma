export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="font-serif text-3xl font-bold text-gray-900 mb-4">আমাদের সম্পর্কে</h1>
      <p className="text-gray-500 text-sm mb-10">চশমা.com — বাংলাদেশের বিশ্বস্ত আইওয়্যার শপ</p>
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>
          <strong className="text-gray-900">চশমা.com</strong> বাংলাদেশের একটি বিশ্বস্ত অনলাইন আইওয়্যার শপ।
          আমরা বিশ্বাস করি সেরা মানের চশমা সবার জন্য সহজলভ্য হওয়া উচিত।
        </p>
        <p>আমাদের কালেকশনে রয়েছে সানগ্লাস, আইগ্লাস, ডিজাইনার ফ্রেম, ফটোক্রোমিক লেন্স সহ আরও অনেক কিছু।</p>
        <div className="grid grid-cols-3 gap-6 py-8 border-y border-gray-100">
          <div className="text-center"><div className="font-serif text-3xl font-bold text-sky-dark">500+</div><div className="text-sm text-gray-400 mt-1">পণ্য</div></div>
          <div className="text-center"><div className="font-serif text-3xl font-bold text-sky-dark">50%</div><div className="text-sm text-gray-400 mt-1">পর্যন্ত ছাড়</div></div>
          <div className="text-center"><div className="font-serif text-3xl font-bold text-sky-dark">4.9★</div><div className="text-sm text-gray-400 mt-1">গড় রেটিং</div></div>
        </div>
        <h2 className="font-serif text-xl font-bold text-gray-900 mt-8">আমাদের প্রতিশ্রুতি</h2>
        <ul className="space-y-3">
          {["✅ ১০০% অরিজিনাল পণ্য গ্যারান্টি","🚚 সারাদেশে দ্রুত ডেলিভারি","💳 ক্যাশ অন ডেলিভারি সুবিধা","🔄 ৭ দিনের রিটার্ন পলিসি","☎️ বিক্রয়োত্তর সেবা"].map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
