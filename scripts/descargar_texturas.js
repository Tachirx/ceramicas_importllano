import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urls = {
  white: 'https://images.unsplash.com/photo-1590059346613-2d17462a39bc?q=80&w=500&crop=entropy&auto=format&fit=crop',
  black: 'https://images.unsplash.com/photo-1590494451000-0e1ce5bfbc39?q=80&w=500&crop=entropy&auto=format&fit=crop',
  beige: 'https://images.unsplash.com/photo-1598506198964-b0ec63b651bc?q=80&w=500&crop=entropy&auto=format&fit=crop',
  grey: 'https://images.unsplash.com/photo-1550505193-4155b410fb59?q=80&w=500&crop=entropy&auto=format&fit=crop',
  wood: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=500&crop=entropy&auto=format&fit=crop'
};

async function download(url, filepath) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
}

async function main() {
  const publicDir = path.join(__dirname, '../public/texturas');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log("Descargando texturas genéricas base...");
  for (const [key, url] of Object.entries(urls)) {
    await download(url, path.join(publicDir, `_base_${key}.jpg`));
    console.log(`Descargada: _base_${key}.jpg`);
  }

  const catalogoPath = path.join(__dirname, '../scratch/catalogo.json');
  const catalogo = JSON.parse(fs.readFileSync(catalogoPath, 'utf8'));

  console.log("Asignando texturas a los 47 productos...");
  for (const prod of catalogo) {
    const nombre = prod.nombre.toLowerCase();
    let base = 'white';

    if (nombre.includes('negro') || nombre.includes('black') || nombre.includes('nero') || nombre.includes('saint laurent')) {
      base = 'black';
    } else if (nombre.includes('beige') || nombre.includes('ivory') || nombre.includes('siena') || nombre.includes('gold') || nombre.includes('dune')) {
      base = 'beige';
    } else if (nombre.includes('gris') || nombre.includes('grey') || nombre.includes('cemento') || nombre.includes('aqua') || nombre.includes('green') || nombre.includes('olivo')) {
      base = 'grey';
    } else if (nombre.includes('madera') || nombre.includes('teca')) {
      base = 'wood';
    }

    const source = path.join(publicDir, `_base_${base}.jpg`);
    const target = path.join(publicDir, `${prod.id}.jpg`);
    fs.copyFileSync(source, target);
  }

  console.log("¡Proceso completado con éxito! Se han generado las 47 texturas.");
}

main().catch(console.error);
