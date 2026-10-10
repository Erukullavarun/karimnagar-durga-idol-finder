// Supabase configuration
const SUPABASE_URL = "https://jrnjrsjhgwdydiqwnxo.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_hx64EjJrIXq2QRhV5l4ZOQ_XbKNnnxb";

// Create Supabase client
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
