  const SUPABASE_URL = 'https://jtnlmywelpxadvswazvc.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0bmxteXdlbHB4YWR2c3dhenZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NzA4ODQsImV4cCI6MjA4MTU0Njg4NH0.4ykGMQO41FHsiz_TkdZhglXQqfG0BYF4p98XLmkuHm4';

  window.supabase = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
  console.log("Supabase loaded:", window.supabase);