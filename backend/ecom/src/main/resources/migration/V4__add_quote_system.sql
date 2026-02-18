-- Add new columns for quote system
ALTER TABLE contact_message ADD COLUMN IF NOT EXISTS reference_code VARCHAR(50);
ALTER TABLE contact_message ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
ALTER TABLE contact_message ADD COLUMN IF NOT EXISTS product_ids TEXT;
ALTER TABLE contact_message ADD COLUMN IF NOT EXISTS product_names TEXT;
ALTER TABLE contact_message ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'PENDING';

-- Generate reference codes for existing records
UPDATE contact_message
SET reference_code = 'SE-' || TO_CHAR(created_at, 'YYYYMMDD') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 4))
WHERE reference_code IS NULL;

-- Make reference_code NOT NULL after populating (only if there are records)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM contact_message WHERE reference_code IS NOT NULL) THEN
        ALTER TABLE contact_message ALTER COLUMN reference_code SET NOT NULL;
    END IF;
END $$;

-- Create unique index on reference_code
CREATE UNIQUE INDEX IF NOT EXISTS idx_contact_message_reference_code ON contact_message(reference_code);
