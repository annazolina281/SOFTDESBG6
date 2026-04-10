const { createClient } = require('@supabase/supabase-js');
// This ensures dotenv is loaded locally even if the terminal tool fails
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Check if variables are actually loading
if (!supabaseUrl || !supabaseKey) {
    console.error("❌ ERROR: Supabase variables are missing from .env!");
    console.log("Current URL:", supabaseUrl);
    process.exit(1); // Stop the server early with a clear message
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;