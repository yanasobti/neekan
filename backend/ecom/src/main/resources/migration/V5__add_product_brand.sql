-- Add brand column to product table
ALTER TABLE product ADD COLUMN IF NOT EXISTS brand VARCHAR(100);

