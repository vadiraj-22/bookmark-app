'use client'

import { createClient } from '@/lib/supabaseClient'
import type { Bookmark } from '@/types'
import { useEffect, useState } from 'react'
import BookmarkCard from './BookmarkCard'

interface BookmarkListProps {
  initialBookmarks: Bookmark[]
  userId: string
  onRefresh?: () => void
}

export default function BookmarkList({ initialBookmarks, userId }: BookmarkListProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set())
  const [realtimeStatus, setRealtimeStatus] = useState<string>('connecting')

  // Sync with initial bookmarks and refetch when component remounts
  useEffect(() => {
    const fetchBookmarks = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      if (data) {
        setBookmarks(data)
      }
    }
    
    fetchBookmarks()
  }, [userId])

  // Function to manually refresh bookmarks
  const refreshBookmarks = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (data) {
      setBookmarks(data)
    }
  }

  useEffect(() => {
    const supabase = createClient()

    // Subscribe to realtime changes
    const channel = supabase
      .channel('bookmarks-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log('Realtime INSERT:', payload)
          const newBookmark = payload.new as Bookmark
          setBookmarks((current) => {
            // Prevent duplicates
            if (current.some((b) => b.id === newBookmark.id)) {
              return current
            }
            return [newBookmark, ...current]
          })
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log('Realtime DELETE:', payload)
          const deletedId = payload.old.id as string
          setBookmarks((current) => current.filter((b) => b.id !== deletedId))
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status)
        setRealtimeStatus(status)
        
        // If subscription fails, fall back to polling
        if (status === 'CHANNEL_ERROR') {
          console.warn('Realtime failed, using manual refresh fallback')
        }
      })

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  const handleDelete = async (id: string) => {
    if (deletingIds.has(id)) return

    setDeletingIds((prev) => new Set(prev).add(id))

    try {
      const supabase = createClient()
      const { error } = await supabase.from('bookmarks').delete().eq('id', id)

      if (error) throw error

      // Optimistic update
      setBookmarks((current) => current.filter((b) => b.id !== id))
    } catch (error) {
      console.error('Error deleting bookmark:', error)
      alert('Failed to delete bookmark. Please try again.')
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }
  }

  if (bookmarks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No bookmarks yet
        </h3>
        <p className="text-gray-600">
          Add your first bookmark using the form above
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        All Bookmarks ({bookmarks.length})
      </h2>
      <div className="grid gap-4">
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
            onDelete={handleDelete}
            isDeleting={deletingIds.has(bookmark.id)}
          />
        ))}
      </div>
    </div>
  )
}
