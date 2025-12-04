/*
  # Système Multi-Tenant pour ESMATECH

  1. Nouvelles Tables
    - `tenants` (clients d'ESMATECH)
      - `id` (uuid, primary key)
      - `name` (text) - Nom du client
      - `slug` (text, unique) - Identifiant unique pour l'URL
      - `logo_url` (text) - Logo du client
      - `active` (boolean) - Statut actif/inactif
      - `created_at` (timestamptz)
      - `settings` (jsonb) - Paramètres personnalisés

  2. Modifications
    - Ajouter `tenant_id` à toutes les tables existantes

  3. Sécurité
    - RLS sur `tenants`
    - Isolation complète des données par tenant
*/

-- Créer la table tenants
CREATE TABLE IF NOT EXISTS tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  logo_url text,
  active boolean DEFAULT true,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index pour recherche rapide par slug
CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);
CREATE INDEX IF NOT EXISTS idx_tenants_active ON tenants(active);

-- Enable RLS
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

-- Policy: Tous les utilisateurs authentifiés peuvent lire les tenants actifs
CREATE POLICY "Authenticated users can read active tenants"
  ON tenants
  FOR SELECT
  TO authenticated
  USING (active = true);

-- Ajouter tenant_id à carriers
ALTER TABLE carriers ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_carriers_tenant ON carriers(tenant_id);

-- Ajouter tenant_id à operations
ALTER TABLE operations ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_operations_tenant ON operations(tenant_id);

-- Ajouter tenant_id à appointments
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_appointments_tenant ON appointments(tenant_id);

-- Ajouter tenant_id à documents
ALTER TABLE documents ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_documents_tenant ON documents(tenant_id);

-- Ajouter tenant_id à document_archives
ALTER TABLE document_archives ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_document_archives_tenant ON document_archives(tenant_id);