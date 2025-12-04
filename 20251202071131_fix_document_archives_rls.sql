/*
  # Fix Document Archives RLS Policies

  ## Summary
  Update RLS policies to allow service role and edge functions to insert archives

  ## Changes
  - Add policy for service role to insert archives
  - Ensure public can read archives but not modify
  - Add policy for authenticated users to manage archives if needed
*/

-- Drop existing restrictive policies if any
DROP POLICY IF EXISTS "Anyone can view document archives" ON document_archives;

-- Public can read archives
CREATE POLICY "Public can view document archives"
  ON document_archives FOR SELECT
  TO public
  USING (true);

-- Service role (edge functions) can insert archives
CREATE POLICY "Service role can insert archives"
  ON document_archives FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Service role can update archives
CREATE POLICY "Service role can update archives"
  ON document_archives FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Authenticated users can manage archives (optional, for admin)
CREATE POLICY "Authenticated can manage archives"
  ON document_archives FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
