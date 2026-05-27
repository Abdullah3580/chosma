'use client'
import { useState } from 'react'
import { Phone, Mail, Clock, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="section-title mb-2">যোগাযোগ করুন</h1>
      <p className="text-gray-500 text-sm mb-10">যেকোনো প্রশ্ন বা সমস্যায় আমরা সাহায্য করতে প্রস্তুত।</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Info */}
        <div className="space-y-5">
          {[
            { icon: <Phone className="w-5 h-5" />, title: 'ফোন', value: '01XXXXXXXXX', sub: 'শনি–বৃহস্পতি, সকাল ১০টা – রাত ৮টা' },
            { icon: <Mail className="w-5 h-5" />, title: 'ইমেইল', value: 'info@chosma.com', sub: '২৪ ঘণ্টার মধ্যে উত্তর দেওয়া হয়' },
            { icon: <Clock className="w-5 h-5" />, title: 'কার্যসময়', value: 'শনি – বৃহস্পতিবার', sub: 'সকাল ১০:০০ – রাত ৮:০০' },
            { icon: <MapPin className="w-5 h-5" />, title: 'ঠিকানা', value: 'ঢাকা, বাংলাদেশ', sub: 'অনলাইনে অর্ডার করুন — সারাদেশে ডেলিভারি' },
          ].map(item => (
            <div key={item.title} className="flex gap-4 items-start bg-sky-light border border-sky-mid rounded-2xl px-5 py-4">
              <div className="w-10 h-10 bg-sky-dark text-white rounded-xl flex items-center justify-center shrink-0">{item.icon}</div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{item.title}</p>
                <p className="font-semibold text-gray-900 mt-0.5">{item.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
          {sent ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-serif text-xl font-bold mb-2">বার্তা পাঠানো হয়েছে!</h3>
              <p className="text-gray-500 text-sm">শীঘ্রই আমরা আপনার সাথে যোগাযোগ করবো।</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-semibold text-gray-800 mb-5">বার্তা পাঠান</h2>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">আপনার নাম *</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="পূর্ণ নাম"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">মোবাইল নম্বর *</label>
                <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="01XXXXXXXXX"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">বার্তা *</label>
                <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={5} placeholder="আপনার প্রশ্ন বা সমস্যা লিখুন..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-sky-dark focus:bg-white transition-all resize-none" />
              </div>
              <button type="submit" className="w-full btn-primary py-3">বার্তা পাঠান →</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
