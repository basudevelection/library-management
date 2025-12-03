import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
const SUPABASE_URL = 'https://qtxgwoekpqcnngliywdw.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0eGd3b2VrcHFjbm5nbGl5d2R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NTkyNzAsImV4cCI6MjA4MDMzNTI3MH0.ntH4XoGRtz_FlYeH-C1nf4yk3F9KsMcYZa2IyZj4rKQ'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
