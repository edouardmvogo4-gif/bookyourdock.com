/*
  # Fix Security and Performance Issues

  1. Indexes
    - Add indexes for all foreign keys to improve query performance
    - Remove unused indexes that are not being utilized
  
  2. RLS Policy Optimization
    - Update user_profiles policies to use (select auth.uid()) for better performance
  
  3. Function Security
    - Fix handle_new_user function search path
  
  4. Changes
    - Add index on appointments.carrier_id
    - Add index on documents.carrier_id
    - Add index on operations.appointment_id
    - Add index on operations.carrier_id
    - Add index on sms_logs.carrier_id
    - Add index on sms_logs.operation_id
    - Drop unused indexes
    - Update RLS policies
    - Update function security
*/

-- Add indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_appointments_carrier_id ON appointments(carrier_id);
CREATE INDEX IF NOT EXISTS idx_documents_carrier_id ON documents(carrier_id);
CREATE INDEX IF NOT EXISTS idx_operations_appointment_id ON operations(appointment_id);
CREATE INDEX IF NOT EXISTS idx_operations_carrier_id ON operations(carrier_id);
CREATE INDEX IF NOT EXISTS idx_sms_logs_carrier_id ON sms_logs(carrier_id);
CREATE INDEX IF NOT EXISTS idx_sms_logs_operation_id ON sms_logs(operation_id);

-- Drop unused indexes
DROP INDEX IF EXISTS idx_documents_license_plate;
DROP INDEX IF EXISTS idx_operations_license_plate;
DROP INDEX IF EXISTS idx_operations_status;

-- Drop existing policies on user_profiles
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

-- Recreate policies with optimized auth function calls
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

-- Fix handle_new_user function with proper search path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'role', 'visitor')
  );
  RETURN new;
END;
$$;