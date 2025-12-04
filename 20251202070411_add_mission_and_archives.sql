/*
  # Add Mission Tracking and Document Archives

  ## Summary
  This migration adds support for mission tracking and daily document archiving.

  ## 1. Changes to Existing Tables
    
  ### Documents Table
  - Add `mission_name` (text) - Mission identifier for grouping documents
  
  ## 2. New Tables
  
  ### Document Archives Table
  - `id` (uuid, primary key) - Unique identifier
  - `archive_date` (date) - Date of the archive
  - `license_plate` (text) - Vehicle license plate
  - `mission_name` (text) - Mission identifier
  - `archive_url` (text) - URL to the archived ZIP file
  - `document_count` (integer) - Number of documents in archive
  - `created_at` (timestamptz) - Record creation timestamp

  ## 3. Security
  
  - Enable RLS on document_archives table
  - Public read access for downloading archives
  - Only system can insert/update archives (via edge function)

  ## 4. Important Notes
  - Archives are created daily at midnight
  - Documents are grouped by license_plate and mission_name
  - Archive files are stored in Supabase Storage
*/

-- Add mission_name to documents table
ALTER TABLE documents 
ADD COLUMN IF NOT EXISTS mission_name text;

-- Create document_archives table
CREATE TABLE IF NOT EXISTS document_archives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  archive_date date NOT NULL,
  license_plate text NOT NULL,
  mission_name text NOT NULL,
  archive_url text NOT NULL,
  document_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(archive_date, license_plate, mission_name)
);

-- Enable RLS
ALTER TABLE document_archives ENABLE ROW LEVEL SECURITY;

-- Public can read archives
CREATE POLICY "Anyone can view document archives"
  ON document_archives FOR SELECT
  TO public
  USING (true);

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS idx_document_archives_date 
  ON document_archives(archive_date DESC);

CREATE INDEX IF NOT EXISTS idx_document_archives_plate 
  ON document_archives(license_plate);

CREATE INDEX IF NOT EXISTS idx_documents_mission 
  ON documents(mission_name);
