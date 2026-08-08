const fs = require('fs');
const catalogo = JSON.parse(fs.readFileSync('scratch/catalogo.json'));
let txt = '';
catalogo.filter(c => c.marca !== 'Ceramicas Caribe').forEach(c => {
  txt += `- **${c.nombre}**: ${c.id}.jpg\n`;
});
console.log(txt);
