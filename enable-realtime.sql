-- Enable Realtime for bookmarks table
-- Run this in Supabase SQL Editor

-- First, check if the table is already in the publication
SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'bookmarks';

-- If the above returns no rows, add the table to the publication
DO $$ 
BEGIN
  -- Try to add the table (will error if already exists)
  ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;
  RAISE NOTICE 'Realtime enabled for bookmarks table';
EXCEPTION
  WHEN duplicate_object THEN 
    RAISE NOTICE 'Bookmarks table already has realtime enabled';
END $$;

-- Verify it's enabled
SELECT 
  schemaname,
  tablename,
  'Realtime enabled' as status
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime' AND tablename = 'bookmarks';
