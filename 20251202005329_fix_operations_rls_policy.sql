/*
  # Fix RLS Policy for Operations Table

  ## Changes
  - Drop existing restrictive INSERT, UPDATE, DELETE policies for operations table
  - Create new permissive policies allowing anyone to manage operations
  
  This allows the application to create and update operations without requiring authentication.
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can insert operations" ON operations;
DROP POLICY IF EXISTS "Authenticated users can update operations" ON operations;
DROP POLICY IF EXISTS "Authenticated users can delete operations" ON operations;

-- Create new permissive policies
CREATE POLICY "Anyone can create operations"
  ON operations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update operations"
  ON operations FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete operations"
  ON operations FOR DELETE
  USING (true);