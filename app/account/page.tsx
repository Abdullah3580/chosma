import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileEditor } from '@/components/account/ProfileEditor'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  // Don't fetch profile - just pass user for now
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-serif text-2xl font-bold text-gray-900 mb-8">আমার প্রোফাইল</h1>
      <ProfileEditor user={user} profile={null} />
    </div>
  )
}