import { createClient } from '@supabase/supabase-js';

const urlSupabase = import.meta.env.VITE_SUPABASE_URL || '';
const claveAnonimaSupabase = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!urlSupabase || !claveAnonimaSupabase) {
  console.warn('Advertencia: Faltan credenciales de Supabase en el archivo .env');
}

export const clienteSupabase = createClient(urlSupabase, claveAnonimaSupabase);
