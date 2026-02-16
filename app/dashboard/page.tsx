import { createServerSupabaseClient } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'
import Header from './Header'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch initial bookmarks
  const { data: bookmarks, error } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching bookmarks:', error)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header user={user} />
      
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Bookmarks
          </h1>
          <p className="text-lg text-gray-600">
            Save and organize your favorite links
          </p>
        </div>

        <DashboardClient initialBookmarks={bookmarks || []} userId={user.id} />
      </main>
    </div>
  )
}
