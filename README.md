# Real-time Voting App

A simple voting application that displays real-time "Yes" and "No" vote counts using Next.js and Supabase.

## Features

- Real-time vote tracking with Supabase Realtime
- Visual representation of votes using Chart.js
- Responsive design with Tailwind CSS
- Voting interface for submitting "Yes" or "No" votes
- Automatic updates to the results page when new votes are cast

## Pages

- **/** - The main page that displays the current vote results with a pie chart
- **/vote** - The voting page where users can cast their "Yes" or "No" votes

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and create a new project
2. Once your project is created, navigate to the SQL Editor

### 2. Set up the Database

Run the SQL script in the `supabase/setup.sql` file in the Supabase SQL Editor. This script will:

- Create the votes table
- Insert an initial row with zero counts
- Enable Row Level Security (RLS)
- Create policies for both read and update access
- Enable realtime subscriptions

Alternatively, you can run the following SQL manually:

```sql
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
```

### 3. Enable Realtime

1. In your Supabase project, go to Database → Replication
2. Enable replication for the `votes` table by selecting it
3. Make sure the "Insert", "Update", "Delete" events are enabled

### 4. Get Supabase Credentials

1. In your Supabase project, go to Project Settings → API
2. Copy the "URL" and "anon/public" key

### 5. Set Environment Variables

Create a `.env.local` file in the root of your project with the following:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the placeholder values with your actual Supabase URL and anon key.

### 6. Install Dependencies

```bash
npm install
```

### 7. Run the Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see the results page, and http://localhost:3000/vote to cast your vote.

## How It Works

1. The app uses a single row in the Supabase `votes` table to store the count of "Yes" and "No" votes
2. The vote page allows users to increment either the `yes_count` or `no_count` by clicking on the corresponding button
3. The results page displays the current vote counts and automatically updates in real-time using Supabase's realtime subscriptions
4. The pie chart provides a visual representation of the votes

## License

MIT
# vote-app
