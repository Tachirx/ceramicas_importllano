import { PlantillaHabitacion } from '../tipos/plantillas';

export const PLANTILLAS_BASE: PlantillaHabitacion[] = [
  {
    id: 'sala-moderna',
    nombre: 'Sala de Estar Moderna',
    descripcion: 'Ambiente amplio y luminoso, ideal para porcelanatos de gran formato.',
    url_imagen_fondo: '/plantillas/sala.jpg',
    url_miniatura: '/plantillas/sala.jpg',
    mascara_piso: {
      // Un trapecio ajustado para la parte inferior, evitando tapar los muebles principales
      puntos_clip_path: 'polygon(0% 100%, 100% 100%, 90% 85%, 10% 85%)'
    },
    transformacion_piso: {
      perspectiva_px: 800,
      rotacion_x_grados: 65,
      escala: 2.5,
      origen_transformacion: 'top center',
      ajuste_y_porcentaje: -10
    },
    mascara_pared: {
      puntos_clip_path: 'polygon(75% 0%, 100% 0%, 100% 85%, 75% 55%)' // Pared derecha (ventana)
    },
    transformacion_pared: {
      perspectiva_px: 800,
      rotacion_x_grados: -30,
      escala: 1.5,
      origen_transformacion: 'center left',
      ajuste_y_porcentaje: 0
    }
  },
  {
    id: 'bano-lujo',
    nombre: 'Baño de Lujo',
    descripcion: 'Espacio íntimo perfecto para texturas limpias y cerámicas detalladas.',
    url_imagen_fondo: '/plantillas/bano.jpg',
    url_miniatura: '/plantillas/bano.jpg',
    mascara_piso: {
      puntos_clip_path: 'polygon(0% 100%, 100% 100%, 75% 65%, 25% 65%)'
    },
    transformacion_piso: {
      perspectiva_px: 600,
      rotacion_x_grados: 55,
      escala: 1.8,
      origen_transformacion: 'top center',
      ajuste_y_porcentaje: 0
    },
    mascara_pared: {
      puntos_clip_path: 'polygon(0% 0%, 25% 65%, 0% 100%)' // Pared izquierda aproximada
    },
    transformacion_pared: {
      perspectiva_px: 800,
      rotacion_x_grados: 45, // Usado como rotateY en el código
      escala: 2.0,
      origen_transformacion: 'center right',
      ajuste_y_porcentaje: -10
    }
  },
  {
    id: 'cocina-minimalista',
    nombre: 'Cocina Minimalista',
    descripcion: 'Diseño pulcro que resalta cerámicas de colores neutros y maderas.',
    url_imagen_fondo: '/plantillas/cocina.jpg',
    url_miniatura: '/plantillas/cocina.jpg',
    mascara_piso: {
      puntos_clip_path: 'polygon(0% 100%, 100% 100%, 80% 80%, 20% 80%)'
    },
    transformacion_piso: {
      perspectiva_px: 700,
      rotacion_x_grados: 60,
      escala: 2.2,
      origen_transformacion: 'top center',
      ajuste_y_porcentaje: -5
    },
    mascara_pared: {
      puntos_clip_path: 'polygon(0% 0%, 30% 0%, 30% 60%, 0% 80%)' // Pared izquierda
    },
    transformacion_pared: {
      perspectiva_px: 700,
      rotacion_x_grados: 40,
      escala: 1.8,
      origen_transformacion: 'center right',
      ajuste_y_porcentaje: -5
    }
  }
];
