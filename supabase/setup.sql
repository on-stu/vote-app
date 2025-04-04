-- Create the votes table
CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  yes_count INTEGER DEFAULT 0,
  no_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial row (only one row needed for this simple app)
INSERT INTO votes (yes_count, no_count) VALUES (0, 0);

-- Enable row level security
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create policies for read access
CREATE POLICY "Allow anonymous read access" 
  ON votes FOR SELECT 
  USING (true);

-- Create policies for update access (important for the voting functionality)
CREATE POLICY "Allow anonymous update access" 
  ON votes FOR UPDATE
  USING (true);

-- Enable realtime support for the votes table
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime;
COMMIT;

ALTER PUBLICATION supabase_realtime ADD TABLE votes; 