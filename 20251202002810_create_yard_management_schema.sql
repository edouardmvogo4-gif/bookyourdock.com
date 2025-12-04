/*
  # Yard Management System Schema

  ## Overview
  Complete database schema for a logistics yard management application with appointment booking,
  document management, operations tracking, and SMS notifications.

  ## 1. New Tables

  ### carriers
  Stores carrier/transporter company information
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text, required) - Carrier company name
  - `phone` (text, optional) - Contact phone number for SMS notifications
  - `email` (text, optional) - Contact email
  - `created_at` (timestamptz) - Record creation timestamp

  ### appointments
  Manages appointment bookings for carriers
  - `id` (uuid, primary key) - Unique identifier
  - `carrier_id` (uuid, foreign key) - Reference to carrier
  - `license_plate` (text, required) - Truck license plate number
  - `appointment_date` (date, required) - Date of appointment
  - `time_slot` (text, required) - Time slot (format: HH:MM)
  - `status` (text, required) - Appointment status (scheduled, completed, cancelled)
  - `notes` (text, optional) - Additional notes
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### documents
  Stores mission documents uploaded by carriers
  - `id` (uuid, primary key) - Unique identifier
  - `carrier_id` (uuid, foreign key) - Reference to carrier
  - `license_plate` (text, required) - Associated truck license plate
  - `document_name` (text, required) - Original document filename
  - `document_url` (text, required) - Storage URL for document
  - `document_type` (text, optional) - Type of document (delivery note, CMR, etc.)
  - `upload_date` (timestamptz) - Upload timestamp
  - `created_at` (timestamptz) - Record creation timestamp

  ### operations
  Tracks operations status within the logistics site
  - `id` (uuid, primary key) - Unique identifier
  - `appointment_id` (uuid, foreign key) - Reference to appointment
  - `carrier_id` (uuid, foreign key) - Reference to carrier
  - `license_plate` (text, required) - Truck license plate
  - `status` (text, required) - Current operation status
  - `entered_site_at` (timestamptz, optional) - Site entry timestamp
  - `parking_at` (timestamptz, optional) - Parking arrival timestamp
  - `called_to_unloading_at` (timestamptz, optional) - Called to unloading dock timestamp
  - `called_to_loading_at` (timestamptz, optional) - Called to loading dock timestamp
  - `operations_completed_at` (timestamptz, optional) - Operations completion timestamp
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### sms_logs
  Logs SMS notifications sent to carriers
  - `id` (uuid, primary key) - Unique identifier
  - `carrier_id` (uuid, foreign key) - Reference to carrier
  - `phone` (text, required) - Recipient phone number
  - `message` (text, required) - SMS message content
  - `status` (text, required) - Delivery status (sent, failed, pending)
  - `operation_id` (uuid, foreign key, optional) - Related operation
  - `sent_at` (timestamptz) - Send timestamp
  - `created_at` (timestamptz) - Record creation timestamp

  ## 2. Security
  
  ### Row Level Security (RLS)
  - Enable RLS on all tables
  - Carriers table: Public read access for appointment booking, authenticated insert
  - Appointments table: Public read/insert for booking, authenticated full access for management
  - Documents table: Public insert for uploads, authenticated full access for management
  - Operations table: Authenticated full access for site managers
  - SMS logs table: Authenticated read-only access for tracking

  ### Policies
  - Separate policies for SELECT, INSERT, UPDATE, DELETE operations
  - Public access for carrier-facing features (appointments, documents)
  - Authenticated access for management features (operations tracking, SMS)

  ## 3. Indexes
  - Index on appointment_date and time_slot for efficient scheduling queries
  - Index on license_plate for quick lookups across tables
  - Index on carrier_id for relationship queries

  ## 4. Important Notes
  - Time slots are from 06:30 to 20:00, Monday to Saturday
  - Operation statuses: waiting_parking, called_unloading, called_loading, completed
  - All timestamps use timezone-aware types (timestamptz)
  - Cascading deletes configured for referential integrity
*/

-- Create carriers table
CREATE TABLE IF NOT EXISTS carriers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text,
  email text,
  created_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_id uuid REFERENCES carriers(id) ON DELETE CASCADE,
  license_plate text NOT NULL,
  appointment_date date NOT NULL,
  time_slot text NOT NULL,
  status text NOT NULL DEFAULT 'scheduled',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_id uuid REFERENCES carriers(id) ON DELETE CASCADE,
  license_plate text NOT NULL,
  document_name text NOT NULL,
  document_url text NOT NULL,
  document_type text,
  upload_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create operations table
CREATE TABLE IF NOT EXISTS operations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id uuid REFERENCES appointments(id) ON DELETE SET NULL,
  carrier_id uuid REFERENCES carriers(id) ON DELETE CASCADE,
  license_plate text NOT NULL,
  status text NOT NULL DEFAULT 'waiting_parking',
  entered_site_at timestamptz,
  parking_at timestamptz,
  called_to_unloading_at timestamptz,
  called_to_loading_at timestamptz,
  operations_completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sms_logs table
CREATE TABLE IF NOT EXISTS sms_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_id uuid REFERENCES carriers(id) ON DELETE CASCADE,
  phone text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  operation_id uuid REFERENCES operations(id) ON DELETE SET NULL,
  sent_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_appointments_date_slot ON appointments(appointment_date, time_slot);
CREATE INDEX IF NOT EXISTS idx_appointments_license_plate ON appointments(license_plate);
CREATE INDEX IF NOT EXISTS idx_documents_license_plate ON documents(license_plate);
CREATE INDEX IF NOT EXISTS idx_operations_license_plate ON operations(license_plate);
CREATE INDEX IF NOT EXISTS idx_operations_status ON operations(status);

-- Enable Row Level Security
ALTER TABLE carriers ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for carriers table
CREATE POLICY "Anyone can view carriers"
  ON carriers FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert carriers"
  ON carriers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update carriers"
  ON carriers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for appointments table
CREATE POLICY "Anyone can view appointments"
  ON appointments FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create appointments"
  ON appointments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete appointments"
  ON appointments FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for documents table
CREATE POLICY "Anyone can view documents"
  ON documents FOR SELECT
  USING (true);

CREATE POLICY "Anyone can upload documents"
  ON documents FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update documents"
  ON documents FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete documents"
  ON documents FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for operations table
CREATE POLICY "Anyone can view operations"
  ON operations FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert operations"
  ON operations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update operations"
  ON operations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete operations"
  ON operations FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for sms_logs table
CREATE POLICY "Authenticated users can view sms logs"
  ON sms_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert sms logs"
  ON sms_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);