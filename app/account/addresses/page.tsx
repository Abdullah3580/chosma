import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { AddressManager } from '@/components/account/AddressManager'

export default async function AddressesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: addresses } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', user.id)
    .order('is_default', { ascending: false })

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/account" className="text-gray-400 hover:text-gray-600 transition-colors">← ফিরে যান</Link>
        <h1 className="font-serif text-2xl font-bold text-gray-900">ঠিকানা ম্যানেজমেন্ট</h1>
      </div>
      <AddressManager initialAddresses={addresses ?? []} userId={user.id} />
    </div>
  )
}
