import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Supabase initialization - URL exists:", !!supabaseUrl);
console.log("Supabase initialization - Key exists:", !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Test the client connection
(async () => {
  try {
    const { error } = await supabase.auth.getSession();
    if (error) {
      console.error("Supabase client initialization error:", error);
    } else {
      console.log("Supabase client initialized successfully");
    }
  } catch (err) {
    console.error("Failed to initialize Supabase client:", err);
  }
})();
