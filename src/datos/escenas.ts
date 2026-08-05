export interface CoordenadaHotspot {
  x: number;
  y: number;
}

export interface EscenaInteractiva {
  id: string;
  nombre: string;
  url_imagen: string;
  hotspots: {
    piso?: CoordenadaHotspot;
    pared?: CoordenadaHotspot;
  }
}

export const CATALOGO_ESCENAS: EscenaInteractiva[] = [
  {
    id: "sala-minimalista",
    nombre: "Sala de Estar Minimalista",
    url_imagen: "/escenas/sala2.png",
    hotspots: {
      piso: { x: 0.5, y: 0.8 }, // Centro inferior para el piso
      pared: { x: 0.5, y: 0.4 } // Centro medio para la pared trasera
    }
  },
  {
    id: "bano-minimalista",
    nombre: "Baño Minimalista",
    url_imagen: "/escenas/bano2.png",
    hotspots: {
      piso: { x: 0.5, y: 0.85 }, // Piso del baño
      pared: { x: 0.2, y: 0.5 }  // Pared lateral izquierda
    }
  }
];
