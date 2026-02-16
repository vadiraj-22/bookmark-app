export interface Bookmark {
  id: string
  user_id: string
  title: string
  url: string
  description: string | null
  created_at: string
}

export interface BookmarkFormData {
  title: string
  url: string
  description?: string
}
