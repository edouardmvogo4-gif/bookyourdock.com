/*
  # Create Storage Bucket for Documents

  ## Summary
  Create the yard-documents storage bucket with proper policies

  ## Changes
  - Create yard-documents bucket if not exists
  - Set bucket as public
  - Add storage policies for upload and download
*/

-- Create the bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'yard-documents',
  'yard-documents',
  true,
  52428800, -- 50MB limit
  ARRAY[
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'application/json'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY[
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'application/json'
  ];

-- Allow public to upload files
DROP POLICY IF EXISTS "Public can upload documents to bucket" ON storage.objects;
CREATE POLICY "Public can upload documents to bucket"
  ON storage.objects FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'yard-documents');

-- Allow public to read files
DROP POLICY IF EXISTS "Public can read documents from bucket" ON storage.objects;
CREATE POLICY "Public can read documents from bucket"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'yard-documents');

-- Allow public to update files (for upserts)
DROP POLICY IF EXISTS "Public can update documents in bucket" ON storage.objects;
CREATE POLICY "Public can update documents in bucket"
  ON storage.objects FOR UPDATE
  TO public
  USING (bucket_id = 'yard-documents')
  WITH CHECK (bucket_id = 'yard-documents');

-- Allow authenticated to delete files
DROP POLICY IF EXISTS "Authenticated can delete documents from bucket" ON storage.objects;
CREATE POLICY "Authenticated can delete documents from bucket"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'yard-documents');
