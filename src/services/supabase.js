import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://egdhugtegsuebgkrfjwr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZGh1Z3RlZ3N1ZWJna3JmandyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3NjEzNzksImV4cCI6MjEwMjMzNzM3OX0.DG1GX51xb2wAzSzKQ-IgDM1mKQbr9zTahEgwqMK0XxA'
const supabase = createClient(supabaseUrl, supabaseKey)

window.supabase = supabase;

export default supabase