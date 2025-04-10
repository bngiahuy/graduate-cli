import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL; // thay bằng URL của bạn
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY; // thay bằng key của bạn
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
