import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Carrier = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  created_at: string;
};

export type Appointment = {
  id: string;
  carrier_id: string;
  license_plate: string;
  appointment_date: string;
  time_slot: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Document = {
  id: string;
  carrier_id: string;
  license_plate: string;
  document_name: string;
  document_url: string;
  document_type: string | null;
  upload_date: string;
  created_at: string;
};

export type Operation = {
  id: string;
  mission_number: string;
  appointment_id: string | null;
  carrier_id: string;
  license_plate: string;
  status: 'acces_au_site' | 'attente_au_parking' | 'quai_dechargement' | 'quai_chargement' | 'fin_des_operations';
  entered_site_at: string | null;
  parking_at: string | null;
  called_to_unloading_at: string | null;
  called_to_loading_at: string | null;
  operations_completed_at: string | null;
  created_at: string;
  updated_at: string;
};
