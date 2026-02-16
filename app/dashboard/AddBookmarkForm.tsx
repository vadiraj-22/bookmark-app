'use client'

import { createClient } from '@/lib/supabaseClient'
import { bookmarkSchema } from '@/lib/validations'
import { useState } from 'react'
import { z } from 'zod'

interface AddBookmarkFormProps {
  userId: string
  onBookmarkAdded?: () => void
}

export default function AddBookmarkForm({ userId, onBookmarkAdded }: AddBookmarkFormProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset messages
    setErrors({})
    setSuccessMessage('')

    // Validate input
    try {
      bookmarkSchema.parse({ title, url, description })
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message
          }
        })
        setErrors(fieldErrors)
        return
      }
    }

    setIsSubmitting(true)

    try {
      const supabase = createClient()

      // Insert bookmark
      const { error } = await supabase.from('bookmarks').insert({
        user_id: userId,
        title: title.trim(),
        url: url.trim(),
        description: description.trim() || null,
      })

      if (error) throw error

      // Reset form
      setTitle('')
      setUrl('')
      setDescription('')
      setSuccessMessage('Bookmark added successfully!')
      
      // Notify parent component
      onBookmarkAdded?.()
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error adding bookmark:', error)
      setErrors({ submit: 'Failed to add bookmark. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Add New Bookmark
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400 bg-white"
            placeholder="My Favorite Website"
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400 bg-white"
            placeholder="https://example.com"
            disabled={isSubmitting}
          />
          {errors.url && (
            <p className="mt-1 text-sm text-red-600">{errors.url}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-900 placeholder:text-gray-400 bg-white"
            placeholder="Optional description..."
            disabled={isSubmitting}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        {errors.submit && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600">{successMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Adding...' : 'Add Bookmark'}
        </button>
      </form>
    </div>
  )
}
