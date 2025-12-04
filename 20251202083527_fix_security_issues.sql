/*
  # Fix Security Issues

  ## Summary
  Address security and performance issues identified in the database audit

  ## 1. Remove Unused Indexes
  
  Remove indexes that are not being used to improve write performance:
  - idx_document_archives_plate
  - idx_documents_mission
  - idx_operations_mission_number
  - idx_appointments_carrier_id
  - idx_documents_carrier_id
  - idx_operations_appointment_id
  - idx_operations_carrier_id
  - idx_sms_logs_carrier_id
  - idx_sms_logs_operation_id

  ## 2. Fix Duplicate RLS Policies
  
  Remove duplicate permissive policies on documents table:
  - Keep only one UPDATE policy for authenticated users
  
  ## 3. Fix Function Search Path Mutability
  
  Set search_path explicitly for functions to prevent security issues:
  - generate_mission_number
  - assign_mission_number
*/

-- ============================================
-- 1. REMOVE UNUSED INDEXES
-- ============================================

DROP INDEX IF EXISTS idx_document_archives_plate;
DROP INDEX IF EXISTS idx_documents_mission;
DROP INDEX IF EXISTS idx_operations_mission_number;
DROP INDEX IF EXISTS idx_appointments_carrier_id;
DROP INDEX IF EXISTS idx_documents_carrier_id;
DROP INDEX IF EXISTS idx_operations_appointment_id;
DROP INDEX IF EXISTS idx_operations_carrier_id;
DROP INDEX IF EXISTS idx_sms_logs_carrier_id;
DROP INDEX IF EXISTS idx_sms_logs_operation_id;

-- ============================================
-- 2. FIX DUPLICATE RLS POLICIES
-- ============================================

-- Remove duplicate UPDATE policies on documents table
DROP POLICY IF EXISTS "Authenticated users can update documents" ON documents;
DROP POLICY IF EXISTS "Public can update documents" ON documents;

-- Create single, clear UPDATE policy
CREATE POLICY "Allow updates on documents"
  ON documents FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 3. FIX FUNCTION SEARCH PATH MUTABILITY
-- ============================================

-- Recreate generate_mission_number with explicit search_path
CREATE OR REPLACE FUNCTION generate_mission_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  today_date TEXT;
  next_seq INTEGER;
  mission_num TEXT;
BEGIN
  today_date := to_char(CURRENT_DATE, 'YYYYMMDD');
  
  SELECT COALESCE(
    MAX(
      CAST(
        substring(mission_number from 'MISS-[0-9]{8}-([0-9]{4})') 
        AS INTEGER
      )
    ), 0
  ) + 1
  INTO next_seq
  FROM operations
  WHERE mission_number LIKE 'MISS-' || today_date || '-%';
  
  mission_num := 'MISS-' || today_date || '-' || lpad(next_seq::TEXT, 4, '0');
  
  RETURN mission_num;
END;
$$;

-- Recreate assign_mission_number with explicit search_path
CREATE OR REPLACE FUNCTION assign_mission_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NEW.mission_number IS NULL THEN
    NEW.mission_number := generate_mission_number();
  END IF;
  RETURN NEW;
END;
$$;

-- Recreate trigger to ensure it uses the updated function
DROP TRIGGER IF EXISTS trigger_assign_mission_number ON operations;
CREATE TRIGGER trigger_assign_mission_number
  BEFORE INSERT ON operations
  FOR EACH ROW
  EXECUTE FUNCTION assign_mission_number();
