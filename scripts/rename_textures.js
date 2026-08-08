import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public/texturas');

const files = fs.readdirSync(publicDir);

for (const file of files) {
  // Ignorar archivos que ya estén bien formados (minúsculas y guiones sin espacios) y archivos _base
  if (file.startsWith('_base_')) continue;

  const ext = path.extname(file);
  const baseName = path.basename(file, ext);

  // Normalizar nombre: minúsculas, reemplazar espacios por guiones, eliminar paréntesis y carácteres extraños
  let newBaseName = baseName.toLowerCase()
    .replace(/\s*\(.*?\)\s*/g, '') // Eliminar cosas como (a editar)
    .replace(/\s+/g, '-') // Reemplazar espacios por guiones
    .replace(/[^a-z0-9-]/g, '') // Eliminar caracteres que no sean letras, números o guiones
    .replace(/-+/g, '-') // Reemplazar múltiples guiones por uno solo
    .replace(/^-|-$/g, ''); // Eliminar guiones al principio o al final

  // Forzar la extensión a .jpg para que coincida con la base de datos
  // (los navegadores renderizan PNGs con extensión .jpg sin problema)
  const newName = `${newBaseName}.jpg`;

  if (file !== newName) {
    const oldPath = path.join(publicDir, file);
    const newPath = path.join(publicDir, newName);
    
    try {
      fs.renameSync(oldPath, newPath);
      console.log(`Renombrado: "${file}" -> "${newName}"`);
    } catch (e) {
      console.log(`Error renombrando "${file}": ${e.message}`);
    }
  }
}
console.log("¡Proceso de renombrado completado!");
