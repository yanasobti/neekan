-- Fix id column type from SERIAL to BIGSERIAL
ALTER TABLE contact_message ALTER COLUMN id TYPE BIGINT;
