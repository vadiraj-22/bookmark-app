-- ============================================
-- LinkLedger - Complete Database Setup
-- ============================================
-- Run this entire script in your Supabase SQL Editor
-- This will set up everything needed for the bookmark app
--
-- Features included:
-- ✓ Bookmarks table with all fields
-- ✓ Row Level Security (RLS) policies
-- ✓ Performance indexes
-- ✓ Realtime subscriptions
-- ✓ Automatic cleanup on user deletion
-- ============================================

-- ============================================
-- 1. DROP EXISTING OBJECTS (Clean slate)
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own bookmarks" ON bookmarks;
DROP POLICY IF EXISTS "Users can insert own bookmarks" ON bookmarks;
DROP POLICY IF EXISTS "Users can delete own bookmarks" ON bookmarks;
DROP POLICY IF EXISTS "Users can update own bookmarks" ON bookmarks;

-- Drop existing indexes
DROP INDEX IF EXISTS bookmarks_user_id_idx;
DROP INDEX IF EXISTS bookmarks_created_at_idx;
DROP INDEX IF EXISTS bookmarks_url_idx;

-- Drop existing table
DROP TABLE IF EXISTS bookmarks CASCADE;

-- ============================================
-- 2. CREATE BOOKMARKS TABLE
-- ============================================

CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK (char_length(title) > 0 AND char_length(title) <= 200),
  url TEXT NOT NULL CHECK (char_length(url) > 0 AND char_length(url) <= 2048),
  description TEXT CHECK (description IS NULL OR char_length(description) <= 1000),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add table comment
COMMENT ON TABLE bookmarks IS 'User bookmarks with title, URL, and optional description';

-- Add column comments
COMMENT ON COLUMN bookmarks.id IS 'Unique bookmark identifier';
COMMENT ON COLUMN bookmarks.user_id IS 'Reference to the user who owns this bookmark';
COMMENT ON COLUMN bookmarks.title IS 'Bookmark title (1-200 characters)';
COMMENT ON COLUMN bookmarks.url IS 'Bookmark URL (1-2048 characters)';
COMMENT ON COLUMN bookmarks.description IS 'Optional description (max 1000 characters)';
COMMENT ON COLUMN bookmarks.created_at IS 'Timestamp when bookmark was created';
COMMENT ON COLUMN bookmarks.updated_at IS 'Timestamp when bookmark was last updated';

-- ============================================
-- 3. CREATE INDEXES FOR PERFORMANCE
-- ============================================

-- Index for filtering by user (most common query)
CREATE INDEX bookmarks_user_id_idx ON bookmarks(user_id);

-- Index for sorting by creation date (descending - newest first)
CREATE INDEX bookmarks_created_at_idx ON bookmarks(created_at DESC);

-- Index for URL lookups (useful for duplicate detection)
CREATE INDEX bookmarks_url_idx ON bookmarks(url);

-- Composite index for user + created_at (optimizes dashboard queries)
CREATE INDEX bookmarks_user_created_idx ON bookmarks(user_id, created_at DESC);

-- ============================================
-- 4. ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. CREATE RLS POLICIES
-- ============================================

-- Policy: Users can view only their own bookmarks
CREATE POLICY "Users can view own bookmarks"
  ON bookmarks
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert only their own bookmarks
CREATE POLICY "Users can insert own bookmarks"
  ON bookmarks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update only their own bookmarks
CREATE POLICY "Users can update own bookmarks"
  ON bookmarks
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete only their own bookmarks
CREATE POLICY "Users can delete own bookmarks"
  ON bookmarks
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 6. CREATE TRIGGER FOR UPDATED_AT
-- ============================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before any update
CREATE TRIGGER update_bookmarks_updated_at
  BEFORE UPDATE ON bookmarks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 7. ENABLE REALTIME SUBSCRIPTIONS
-- ============================================

-- Remove table from publication if it exists (ignore errors if not present)
DO $$ 
BEGIN
  ALTER PUBLICATION supabase_realtime DROP TABLE bookmarks;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Enable realtime for live updates in the app
ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;

-- ============================================
-- 8. VERIFICATION & SUMMARY
-- ============================================

-- Display setup summary
DO $$
DECLARE
  table_count INTEGER;
  policy_count INTEGER;
  index_count INTEGER;
BEGIN
  -- Count tables
  SELECT COUNT(*) INTO table_count
  FROM information_schema.tables
  WHERE table_schema = 'public' AND table_name = 'bookmarks';
  
  -- Count policies
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies
  WHERE tablename = 'bookmarks';
  
  -- Count indexes
  SELECT COUNT(*) INTO index_count
  FROM pg_indexes
  WHERE tablename = 'bookmarks';
  
  -- Display results
  RAISE NOTICE '============================================';
  RAISE NOTICE 'LinkLedger Database Setup Complete!';
  RAISE NOTICE '============================================';
  RAISE NOTICE 'Tables created: %', table_count;
  RAISE NOTICE 'RLS policies created: %', policy_count;
  RAISE NOTICE 'Indexes created: %', index_count;
  RAISE NOTICE '============================================';
  RAISE NOTICE 'You can now use the app!';
  RAISE NOTICE '============================================';
END $$;

-- Final verification query
SELECT 
  'bookmarks' as table_name,
  (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'bookmarks') as policies,
  (SELECT COUNT(*) FROM pg_indexes WHERE tablename = 'bookmarks') as indexes,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'bookmarks') as columns,
  pg_size_pretty(pg_total_relation_size('bookmarks')) as table_size;
