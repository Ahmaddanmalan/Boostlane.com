const SUPABASE_URL = "https://whseefadqutdrsachypc.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indoc2VlZmFkcXV0ZHJzYWNoeXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NzYyMjUsImV4cCI6MjEwNTI1MjIyNX0.a0LAPGnV5uOA0x2RdI1cXm7oUtINdpNJUrCSfOexlU0";

const supabase = window.supabase.createClient(

  SUPABASE_URL,

  SUPABASE_KEY

);