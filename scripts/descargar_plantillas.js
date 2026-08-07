import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urls = {
  // Baño moderno y limpio con piso claro
  bano: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop',
  // Sala de estar moderna
  sala: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
  // Cocina moderna
  cocina: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop'
};

async function download(url, filepath) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
}

async function main() {
  const publicDir = path.join(__dirname, '../public/plantillas');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log("Descargando imágenes base de alta calidad para plantillas...");
  for (const [key, url] of Object.entries(urls)) {
    await download(url, path.join(publicDir, `${key}.jpg`));
    console.log(`Descargada plantilla: ${key}.jpg`);
  }
}

main().catch(console.error);
