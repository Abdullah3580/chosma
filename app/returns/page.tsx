export default function ReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="font-serif text-3xl font-bold text-gray-900 mb-4">রিটার্ন পলিসি</h1>
      <p className="text-gray-500 text-sm mb-10">আমরা আপনার সন্তুষ্টি নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ।</p>
      <div className="space-y-8">
        {[
          { title: "৭ দিনের রিটার্ন গ্যারান্টি", body: "পণ্য পাওয়ার ৭ দিনের মধ্যে রিটার্ন করতে পারবেন। পণ্যটি অবশ্যই অব্যবহৃত ও মূল প্যাকেজিংয়ে থাকতে হবে।" },
          { title: "রিটার্ন করবেন কখন?", body: "পণ্য ক্ষতিগ্রস্ত হলে, ভুল পণ্য পেলে, বা বিবরণের সাথে না মিললে রিটার্ন করতে পারবেন।" },
          { title: "রিটার্ন প্রক্রিয়া", body: "আমাদের সাথে যোগাযোগ করুন → পণ্য ফেরত পাঠান → রিফান্ড বা রিপ্লেসমেন্ট পাবেন।" },
          { title: "রিফান্ড", body: "রিটার্ন নিশ্চিত হওয়ার ৩-৫ কার্যদিবসের মধ্যে রিফান্ড দেওয়া হবে।" },
        ].map(item => (
          <div key={item.title} className="bg-sky-light border border-sky-mid rounded-2xl p-6">
            <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
