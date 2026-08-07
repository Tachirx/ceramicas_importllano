export interface PoligonoMascara {
  // Puntos en formato SVG, ej: "10,20 100,20 90,80 20,80" (coordenadas relativas 0-100 o absolutas, usaremos % para que sea responsive)
  puntos_clip_path: string;
}

export interface Transformacion3D {
  perspectiva_px: number;
  rotacion_x_grados: number;
  escala: number;
  origen_transformacion: string; // ej: "top center"
  ajuste_y_porcentaje: number;
}

export interface PlantillaHabitacion {
  id: string;
  nombre: string;
  descripcion: string;
  url_imagen_fondo: string;
  url_miniatura: string;
  // Parámetros para proyectar la cerámica del piso
  mascara_piso: PoligonoMascara;
  transformacion_piso: Transformacion3D;
  // Parámetros para proyectar la cerámica de la pared (opcional)
  mascara_pared?: PoligonoMascara;
  transformacion_pared?: Transformacion3D;
}
