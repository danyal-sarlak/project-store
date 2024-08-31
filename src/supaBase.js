import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = 'https://pmrlwosnsccflpkcxzbp.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtcmx3b3Nuc2NjZmxwa2N4emJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4Nzc1ODEsImV4cCI6MjAzOTQ1MzU4MX0.aXyZyF1pvYy36nqSR79AgCpg3RigZh_uBubiKf6ycjg'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default supabase
