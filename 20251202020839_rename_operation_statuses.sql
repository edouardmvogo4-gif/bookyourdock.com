/*
  # Rename Operation Statuses

  1. Changes
    - Update operations.status column to use new French status names:
      - waiting_parking → acces_au_site (accès au site)
      - called_unloading → attente_au_parking (attente au parking)
      - called_loading → quai_dechargement (quai de déchargement)
      - completed → quai_chargement (quai de chargement)
      - Add new final status → fin_des_operations (fin des opérations)
    
  2. Process
    - Create constraint for valid status values
    - Migrate existing data to new status values
*/

-- Update existing operations to new status values
UPDATE operations SET status = 
  CASE 
    WHEN status = 'waiting_parking' THEN 'acces_au_site'
    WHEN status = 'called_unloading' THEN 'attente_au_parking'
    WHEN status = 'called_loading' THEN 'quai_dechargement'
    WHEN status = 'completed' THEN 'fin_des_operations'
    ELSE status
  END;

-- Add constraint for valid status values
ALTER TABLE operations DROP CONSTRAINT IF EXISTS operations_status_check;
ALTER TABLE operations ADD CONSTRAINT operations_status_check 
  CHECK (status IN ('acces_au_site', 'attente_au_parking', 'quai_dechargement', 'quai_chargement', 'fin_des_operations'));