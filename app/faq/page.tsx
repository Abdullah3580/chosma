"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  { q: "ডেলিভারি কতদিনে হয়?", a: "সাধারণত ২-৫ কার্যদিবসের মধ্যে সারাদেশে ডেলিভারি দেওয়া হয়।" },
  { q: "ফ্রি ডেলিভারি কখন পাবো?", a: "৳১৫০০ বা তার বেশি অর্ডারে সারাদেশে ফ্রি ডেলিভারি।" },
  { q: "ক্যাশ অন ডেলিভারি কি আছে?", a: "হ্যাঁ। পণ্য হাতে পেয়ে পেমেন্ট করতে পারবেন।" },
  { q: "পণ্য কি অরিজিনাল?", a: "হ্যাঁ, আমাদের সকল পণ্য ১০০% অথেনটিক।" },
  { q: "অর্ডার ট্র্যাক করবো কিভাবে?", a: "অর্ডার ট্র্যাক পেজে আপনার মোবাইল নম্বর দিয়ে অর্ডারের অবস্থা জানতে পারবেন।" },
  { q: "পণ্য রিটার্ন করা যাবে?", a: "হ্যাঁ। পণ্য পাওয়ার ৭ দিনের মধ্যে রিটার্ন করতে পারবেন।" },
  { q: "UV400 মানে কি?", a: "UV400 মানে পণ্যটি ক্ষতিকর UVA ও UVB রশ্মি ১০০% ব্লক করে।" },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="font-serif text-3xl font-bold text-gray-900 mb-4">সাধারণ জিজ্ঞাসা</h1>
      <p className="text-gray-500 text-sm mb-10">আপনার যেকোনো প্রশ্নের উত্তর এখানে পাবেন।</p>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800 text-sm">{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ml-3 ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 bg-gray-50">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
