import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno desde la raíz del proyecto
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const urlSupabase = process.env.VITE_SUPABASE_URL;
const claveSupabase = process.env.VITE_SUPABASE_ANON_KEY;

if (!urlSupabase || !claveSupabase) {
  console.error('ERROR: Faltan las credenciales VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env');
  process.exit(1);
}

const supabase = createClient(urlSupabase, claveSupabase);

async function migrarDatos() {
  console.log('Iniciando migración de datos a Supabase...');
  
  const rutaJson = path.resolve(__dirname, '../scratch/catalogo.json');
  if (!fs.existsSync(rutaJson)) {
    console.error('ERROR: No se encuentra el archivo scratch/catalogo.json');
    process.exit(1);
  }

  const datosCrudos = fs.readFileSync(rutaJson, 'utf-8');
  const catalogo = JSON.parse(datosCrudos);

  console.log(`Leídos ${catalogo.length} productos. Comenzando la inserción...`);

  // Supabase (PostgreSQL) puede hacer upsert (insertar o actualizar si existe)
  const { data, error } = await supabase
    .from('catalogo_ceramicas')
    .upsert(catalogo, { onConflict: 'id' })
    .select();

  if (error) {
    console.error('Error al insertar en la base de datos:', error.message);
    console.error('Asegúrate de haber creado la tabla "catalogo_ceramicas" con las columnas correspondientes.');
  } else {
    console.log(`¡Éxito! ${data?.length || 0} productos insertados/actualizados en Supabase.`);
  }
}

migrarDatos();
