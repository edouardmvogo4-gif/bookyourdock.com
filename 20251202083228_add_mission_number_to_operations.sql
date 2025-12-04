/*
  # Add Mission Number to Operations

  ## Summary
  Add unique mission number generation for operations with format: MISS-YYYYMMDD-XXXX

  ## 1. Changes to Operations Table
  
  - Add `mission_number` (text, unique) - Unique mission identifier
  - Add index for fast lookups
  
  ## 2. Mission Number Generation
  
  - Create function to generate mission numbers automatically
  - Format: MISS-YYYYMMDD-XXXX where XXXX is a sequential number for the day
  - Trigger to automatically assign mission number on insert
  
  ## 3. Important Notes
  
  - Mission numbers are unique and immutable
  - Sequential counter resets daily
  - Format ensures easy sorting and identification by date
*/

-- Add mission_number column to operations
ALTER TABLE operations 
ADD COLUMN IF NOT EXISTS mission_number text UNIQUE;

-- Create index for mission_number
CREATE INDEX IF NOT EXISTS idx_operations_mission_number 
  ON operations(mission_number);

-- Function to generate next mission number for today
CREATE OR REPLACE FUNCTION generate_mission_number()
RETURNS TEXT AS $$
DECLARE
  today_date TEXT;
  next_seq INTEGER;
  mission_num TEXT;
BEGIN
  -- Get today's date in YYYYMMDD format
  today_date := to_char(CURRENT_DATE, 'YYYYMMDD');
  
  -- Find the highest sequence number for today
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
  
  -- Generate mission number with format MISS-YYYYMMDD-XXXX
  mission_num := 'MISS-' || today_date || '-' || lpad(next_seq::TEXT, 4, '0');
  
  RETURN mission_num;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to auto-assign mission number on insert
CREATE OR REPLACE FUNCTION assign_mission_number()
RETURNS TRIGGER AS $$
BEGIN
  -- Only assign if mission_number is NULL
  IF NEW.mission_number IS NULL THEN
    NEW.mission_number := generate_mission_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_assign_mission_number ON operations;
CREATE TRIGGER trigger_assign_mission_number
  BEFORE INSERT ON operations
  FOR EACH ROW
  EXECUTE FUNCTION assign_mission_number();

-- Backfill existing operations with mission numbers
DO $$
DECLARE
  op_record RECORD;
  mission_num TEXT;
BEGIN
  FOR op_record IN 
    SELECT id, created_at 
    FROM operations 
    WHERE mission_number IS NULL
    ORDER BY created_at
  LOOP
    -- Generate mission number based on creation date
    SELECT 'MISS-' || 
           to_char(op_record.created_at, 'YYYYMMDD') || '-' || 
           lpad(
             (COALESCE(
               MAX(
                 CAST(
                   substring(mission_number from 'MISS-[0-9]{8}-([0-9]{4})') 
                   AS INTEGER
                 )
               ), 0
             ) + 1)::TEXT, 
             4, 
             '0'
           )
    INTO mission_num
    FROM operations
    WHERE mission_number LIKE 'MISS-' || to_char(op_record.created_at, 'YYYYMMDD') || '-%';
    
    -- Update the operation
    UPDATE operations 
    SET mission_number = mission_num 
    WHERE id = op_record.id;
  END LOOP;
END $$;
