/*
  # Fix RLS Policy for Carriers Table

  ## Changes
  - Drop existing restrictive INSERT policy for carriers table
  - Create new permissive INSERT policy allowing anyone to create carriers
  
  This allows transporters to create their own carrier entries when booking appointments
  without requiring authentication.
*/

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Authenticated users can insert carriers" ON carriers;

-- Create new permissive policy for INSERT
CREATE POLICY "Anyone can create carriers"
  ON carriers FOR INSERT
  WITH CHECK (true);