import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const catalogoPath = path.join(__dirname, '../scratch/catalogo.json');
const catalogo = JSON.parse(fs.readFileSync(catalogoPath, 'utf8'));

const publicDir = path.join(__dirname, '../public/texturas');

async function download(url, filepath) {
  try {
    const res = await fetch(url);
    if (!res.ok) return false;
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
    return true;
  } catch (e) {
    return false;
  }
}

async function scrapeImages() {
  console.log("Iniciando navegador web scraper...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  let count = 0;
  for (const prod of catalogo) {
    // Si es Cerámicas Caribe no necesitamos descargar porque usa Roomvo
    if (prod.marca.toLowerCase() === 'ceramicas caribe') {
      continue;
    }

    const filepath = path.join(publicDir, `${prod.id}.jpg`);
    const query = `${prod.marca} ceramica porcelanato ${prod.nombre} textura tile`;
    console.log(`\nBuscando: ${query}`);

    try {
      await page.goto(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, { waitUntil: 'domcontentloaded' });
      
      // Intentar encontrar enlaces de imágenes
      const imgLinks = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a'));
        return anchors
          .map(a => a.href)
          .filter(href => href.includes('.jpg') || href.includes('.png'));
      });

      if (imgLinks.length > 0) {
        console.log(`URL encontrada: ${imgLinks[0]}`);
        const success = await download(imgLinks[0], filepath);
        if (success) {
          console.log(`✅ Textura guardada para ${prod.nombre}`);
          count++;
        } else {
          console.log(`❌ Falló la descarga de la imagen para ${prod.nombre}`);
        }
      } else {
        // Fallback a Bing Images scraper
        await page.goto(`https://www.bing.com/images/search?q=${encodeURIComponent(query)}`, { waitUntil: 'domcontentloaded' });
        const bingSrc = await page.evaluate(() => {
          const img = document.querySelector('.mimg');
          return img ? (img.getAttribute('src') || img.getAttribute('data-src')) : null;
        });

        if (bingSrc) {
          const success = await download(bingSrc, filepath);
          if (success) {
            console.log(`✅ Textura (Bing) guardada para ${prod.nombre}`);
            count++;
          }
        } else {
          console.log(`⚠️ No se encontraron imágenes para ${prod.nombre}`);
        }
      }
    } catch (e) {
      console.log(`Error al procesar ${prod.nombre}:`, e.message);
    }
  }

  await browser.close();
  console.log(`\n¡Búsqueda automática finalizada! Se obtuvieron ${count} texturas reales aproximadas.`);
}

scrapeImages().catch(console.error);
