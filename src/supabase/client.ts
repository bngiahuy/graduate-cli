import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL; // thay bằng URL của bạn
const SUPABASE_PUBLIC = import.meta.env.VITE_SUPABASE_PUBLIC; // thay bằng key của bạn
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC);
