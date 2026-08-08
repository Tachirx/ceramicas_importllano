const fs = require('fs');

const products = [
  // ═══ ITACA 60x60 ═══
  {id:"sal-soluble-plain-ivory",nombre:"Sal Soluble Plain Ivory",fab:"ITACA",m2:23.90,caja:34.42,med:"60×60 cm",pzas:4,cubre:1.44,foto:false},
  {id:"sal-soluble-siena",nombre:"Sal Soluble Siena",fab:"ITACA",m2:23.90,caja:34.42,med:"60×60 cm",pzas:4,cubre:1.44,foto:false},
  {id:"florim-gold",nombre:"Florim Gold",fab:"ITACA",m2:29.00,caja:41.76,med:"60×60 cm",pzas:4,cubre:1.44,foto:false},
  {id:"mexima-onyx",nombre:"Mexima Onyx",fab:"ITACA",m2:29.00,caja:41.76,med:"60×60 cm",pzas:4,cubre:1.44,foto:false},
  {id:"hexa-onyx-gold",nombre:"Hexa Onyx Gold",fab:"ITACA",m2:37.00,caja:53.28,med:"60×60 cm",pzas:4,cubre:1.44,foto:false},
  {id:"xtreme-negro",nombre:"Xtreme Negro",fab:"ITACA",m2:37.00,caja:53.28,med:"60×60 cm",pzas:4,cubre:1.44,foto:false},
  {id:"saint-laurent",nombre:"Saint Laurent",fab:"ITACA",m2:37.00,caja:53.28,med:"60×60 cm",pzas:4,cubre:1.44,foto:false},
  {id:"nero-marquina",nombre:"Nero Marquina",fab:"ITACA",m2:37.00,caja:53.28,med:"60×60 cm",pzas:4,cubre:1.44,foto:true,fotoAlt:"negro-marquina"},
  // ═══ PALO ROSA 60x60 ═══
  {id:"hera-dune",nombre:"Hera Dune",fab:"Palo Rosa",m2:29.00,caja:41.76,med:"60×60 cm",pzas:4,cubre:1.44,foto:true},
  {id:"belfast-gris",nombre:"Belfast Gris",fab:"Palo Rosa",m2:29.00,caja:41.76,med:"60×60 cm",pzas:4,cubre:1.44,foto:false},
  {id:"block-blanco",nombre:"Block Blanco",fab:"Palo Rosa",m2:29.00,caja:41.76,med:"60×60 cm",pzas:4,cubre:1.44,foto:true},
  {id:"block-beige",nombre:"Block Beige",fab:"Palo Rosa",m2:29.00,caja:41.76,med:"60×60 cm",pzas:4,cubre:1.44,foto:true},
  // ═══ ITACA 60x120 ═══
  {id:"black-onyx-beauty",nombre:"Black Onyx Beauty",fab:"ITACA",m2:39.00,caja:56.16,med:"60×120 cm",pzas:2,cubre:1.44,foto:true},
  {id:"marquina-gold",nombre:"Marquina Gold",fab:"ITACA",m2:39.00,caja:56.16,med:"60×120 cm",pzas:2,cubre:1.44,foto:true},
  {id:"eagele-nero",nombre:"Eagele Nero",fab:"ITACA",m2:39.00,caja:56.16,med:"60×120 cm",pzas:2,cubre:1.44,foto:true},
  {id:"marquina-black",nombre:"Marquina Black",fab:"ITACA",m2:39.00,caja:56.16,med:"60×120 cm",pzas:2,cubre:1.44,foto:true},
  {id:"body-basald-stone-white",nombre:"Body Basald Stone White",fab:"ITACA",m2:39.00,caja:null,med:"60×120 cm",pzas:2,cubre:1.44,foto:true},
  {id:"ghr-body-archie-bianco",nombre:"GHR Body Archie Bianco",fab:"ITACA",m2:39.00,caja:56.16,med:"60×120 cm",pzas:2,cubre:1.44,foto:false},
  {id:"calacatta-green-endles",nombre:"Calacatta Green Endles",fab:"ITACA",m2:29.00,caja:41.76,med:"60×120 cm",pzas:2,cubre:1.44,foto:true},
  {id:"kachori-gold",nombre:"Kachori Gold",fab:"ITACA",m2:39.00,caja:56.16,med:"60×120 cm",pzas:2,cubre:1.44,foto:true},
  {id:"smoke-gold",nombre:"Smoke Gold",fab:"ITACA",m2:39.00,caja:56.16,med:"60×120 cm",pzas:2,cubre:1.44,foto:true},
  {id:"macline-art-green",nombre:"Macline Art Green",fab:"ITACA",m2:39.00,caja:56.16,med:"60×120 cm",pzas:2,cubre:1.44,foto:false},
  {id:"falconer-aqua",nombre:"Falconer Aqua",fab:"ITACA",m2:39.00,caja:56.16,med:"60×120 cm",pzas:2,cubre:1.44,foto:true},
  {id:"taica-art-aqua",nombre:"Taica Art Aqua",fab:"ITACA",m2:39.00,caja:56.16,med:"60×120 cm",pzas:2,cubre:1.44,foto:false},
  {id:"smoke-aqua",nombre:"Smoke Aqua",fab:"ITACA",m2:39.00,caja:56.16,med:"60×120 cm",pzas:2,cubre:1.44,foto:true},
  {id:"torso-bianco",nombre:"Torso Bianco",fab:"ITACA",m2:29.00,caja:41.76,med:"60×120 cm",pzas:2,cubre:1.44,foto:true},
  {id:"statuario-sipani",nombre:"Statuario Sipani",fab:"ITACA",m2:29.00,caja:41.76,med:"60×120 cm",pzas:2,cubre:1.44,foto:true},
  {id:"carrara-grey",nombre:"Carrara Grey",fab:"ITACA",m2:29.00,caja:41.76,med:"60×120 cm",pzas:2,cubre:1.44,foto:false},
  {id:"plain-white",nombre:"Plain White",fab:"ITACA",m2:29.00,caja:41.76,med:"60×120 cm",pzas:2,cubre:1.44,foto:false},
  // ═══ PALO ROSA 60x120 ═══
  {id:"negro-marquina-xl",nombre:"Negro Marquina XL",fab:"Palo Rosa",m2:49.00,caja:70.56,med:"60×120 cm",pzas:2,cubre:1.44,foto:true,fotoAlt:"negro-marquina"},
  {id:"verona-beige",nombre:"Verona Beige",fab:"Palo Rosa",m2:35.00,caja:75.60,med:"60×120 cm",pzas:3,cubre:2.16,foto:true},
  {id:"siena-gold",nombre:"Siena Gold",fab:"Palo Rosa",m2:35.00,caja:50.40,med:"60×120 cm",pzas:2,cubre:1.44,foto:true},
  {id:"medici-gris",nombre:"Medici Gris",fab:"Palo Rosa",m2:35.00,caja:50.40,med:"60×120 cm",pzas:2,cubre:1.44,foto:true},
  // ═══ CARABOBO ═══
  {id:"mallorca-gris",nombre:"Mallorca Gris",fab:"Carabobo",m2:23.00,caja:32.66,med:"59.4×119.4 cm",pzas:2,cubre:1.42,foto:true},
  // ═══ DOMOSA ═══
  {id:"loira-olivo",nombre:"Loira Olivo",fab:"Domosa",m2:35.00,caja:56.16,med:"60×120 cm",pzas:2,cubre:1.44,foto:false},
  // ═══ BALGRES ═══
  {id:"genova-gris",nombre:"Genova Gris",fab:"Balgres",m2:21.11,caja:43.70,med:"36×48 cm",pzas:12,cubre:2.07,foto:true},
  {id:"genova-rosa",nombre:"Genova Rosa",fab:"Balgres",m2:19.00,caja:39.33,med:"36×48 cm",pzas:12,cubre:2.07,foto:true},
  // ═══ CARIBE 43x43 ═══
  {id:"marble-blue",nombre:"Marble Blue",fab:"Caribe",m2:21.00,caja:38.85,med:"43×43 cm",pzas:10,cubre:1.85,foto:true},
  {id:"carrara-marques",nombre:"Carrara Marquez",fab:"Caribe",m2:23.00,caja:42.55,med:"43×43 cm",pzas:10,cubre:1.85,foto:true},
  {id:"calacatta",nombre:"Calacatta",fab:"Caribe",m2:23.00,caja:42.55,med:"43×43 cm",pzas:10,cubre:1.85,foto:true},
  {id:"anela",nombre:"Anela",fab:"Caribe",m2:23.00,caja:42.55,med:"43×43 cm",pzas:10,cubre:1.85,foto:true},
  {id:"lys-horse",nombre:"Lys Horse",fab:"Caribe",m2:21.00,caja:38.85,med:"43×43 cm",pzas:10,cubre:1.85,foto:true},
  {id:"marmol-brandt-beige",nombre:"Mármol Brandt Beige",fab:"Caribe",m2:23.00,caja:null,med:"43×43 cm",pzas:10,cubre:1.85,foto:true},
  {id:"madera-teca-2da",nombre:"Madera Teca (2ᵈᵃ)",fab:"Caribe",m2:16.00,caja:29.60,med:"43×43 cm",pzas:10,cubre:1.85,foto:true,fotoAlt:"madera-teca"},
  {id:"patagonia",nombre:"Patagonia",fab:"Caribe",m2:23.00,caja:42.55,med:"43×43 cm",pzas:10,cubre:1.85,foto:false},
  {id:"madera-teca-1era",nombre:"Madera Teca (1ᵉʳᵃ)",fab:"Caribe",m2:18.00,caja:33.30,med:"43×43 cm",pzas:10,cubre:1.85,foto:true,fotoAlt:"madera-teca"},
  {id:"choroni-miel",nombre:"Choroní Miel",fab:"Caribe",m2:16.00,caja:29.60,med:"43×43 cm",pzas:10,cubre:1.85,foto:true},
  {id:"atenas-beige",nombre:"Atenas Beige",fab:"Caribe",m2:21.00,caja:38.85,med:"43×43 cm",pzas:10,cubre:1.85,foto:true},
];

let out = 'const PRODUCTOS = [\n';
products.forEach(p => {
  out += `  {\n`;
  out += `    id: "${p.id}",\n`;
  out += `    nombre: "${p.nombre}",\n`;
  out += `    fabricante: "${p.fab}",\n`;
  out += `    precioM2: ${p.m2},\n`;
  out += `    precioCaja: ${p.caja},\n`;
  out += `    medidas: "${p.med}",\n`;
  out += `    piezasPorCaja: ${p.pzas},\n`;
  out += `    cubreM2: ${p.cubre},\n`;
  out += `    tieneFoto: ${p.foto}`;
  if (p.fotoAlt) out += `,\n    fotoAlt: "${p.fotoAlt}"`;
  out += `\n  },\n`;
});
out += '];\n';

fs.writeFileSync('catalogo/datos.js', out, 'utf8');
console.log('OK:', products.length, 'productos');

