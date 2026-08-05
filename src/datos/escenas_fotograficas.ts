export interface Escena2D {
  id: string;
  nombre: string;
  url_imagen: string;
  clipPathPiso: string;
  transformPiso: string;
  escalaTextura: number;
}

export const ESCENAS_PREDEFINIDAS: Escena2D[] = [
  {
    id: 'bano-moderno',
    nombre: 'Baño Moderno',
    url_imagen: '/escenas/bano.jpg',
    // Un polígono de ejemplo para un piso que ocupa la mitad inferior de la imagen
    clipPathPiso: 'polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)',
    // Transformación para acostar la textura en el suelo
    transformPiso: 'perspective(1000px) rotateX(65deg) scale(1.5)',
    escalaTextura: 1.0,
  },
  {
    id: 'cocina-lujo',
    nombre: 'Cocina de Lujo',
    url_imagen: '/escenas/cocina.jpg',
    // Polígono de ejemplo, asumiendo muebles a los lados
    clipPathPiso: 'polygon(15% 60%, 85% 60%, 100% 100%, 0% 100%)',
    transformPiso: 'perspective(1000px) rotateX(70deg) scale(2)',
    escalaTextura: 1.2,
  },
  {
    id: 'sala-minimalista',
    nombre: 'Sala Minimalista',
    url_imagen: '/escenas/sala.jpg',
    // Polígono de ejemplo
    clipPathPiso: 'polygon(0% 65%, 100% 65%, 100% 100%, 0% 100%)',
    transformPiso: 'perspective(1000px) rotateX(75deg) scale(2.5)',
    escalaTextura: 1.5,
  }
];
