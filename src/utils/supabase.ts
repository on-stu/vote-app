import { createClient } from "@supabase/supabase-js";

// These values should be replaced with actual values from your Supabase project
// In a production environment, these should be environment variables
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://udsjiylldtkiislhgrfm.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkc2ppeWxsZHRraWlzbGhncmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NTU3NDAsImV4cCI6MjA1OTMzMTc0MH0.YlnIgqMLm-uP7GW6Nt29GCcVBGVw3a-DS1b7D2a6RRg";

export const supabase = createClient(supabaseUrl, supabaseKey, {});

// Define the vote structure
export interface VoteCount {
  yes: number;
  no: number;
}
