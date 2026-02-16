'use client'

import { useState } from 'react'
import type { Bookmark } from '@/types'
import BookmarkList from './BookmarkList'
import AddBookmarkForm from './AddBookmarkForm'

interface DashboardClientProps {
  initialBookmarks: Bookmark[]
  userId: string
}

export default function DashboardClient({ initialBookmarks, userId }: DashboardClientProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleBookmarkAdded = () => {
    // Trigger a refresh by updating the key
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <>
      <div className="mb-8">
        <AddBookmarkForm userId={userId} onBookmarkAdded={handleBookmarkAdded} />
      </div>

      <BookmarkList 
        key={refreshTrigger} 
        initialBookmarks={initialBookmarks} 
        userId={userId} 
      />
    </>
  )
}
