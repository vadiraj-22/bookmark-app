import { z } from 'zod'

export const bookmarkSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  url: z.string().url('Please enter a valid URL'),
  description: z.string().max(500, 'Description is too long').optional(),
})

export type BookmarkInput = z.infer<typeof bookmarkSchema>
