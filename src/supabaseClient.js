import { createClient } from '@supabase/supabase-js';

// To be more secure: .env file. 
const supabaseURL = "https://nkaaidlbasgbsgvkomkc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rYWFpZGxiYXNnYnNndmtvbWtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNzAwNTksImV4cCI6MjA1NTY0NjA1OX0.uX1_SW1HQx9pEBYlajjD9cH6H8iqy_xcSbtutzjrZTs";

export const supabase = createClient(supabaseURL, supabaseAnonKey);