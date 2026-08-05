export type TipoCategoriaMaterial = 'piso' | 'pared';

export type AcabadoSuperficie = 'brillante' | 'pulido' | 'mate' | 'satinado';

export interface FormatoPalmeta {
  ancho_metros: number;
  largo_metros: number;
  etiqueta: string;
}

export interface PropiedadesPBR {
  rugosidad: number;
  capa_brillo: number;
  metalicidad: number;
  color_hex: string;
  mapa_normal_intensidad: number;
}

export type TipoPatronTextura = 'marquina' | 'karisma' | 'carrara' | 'gris_neutro';

export interface MaterialCeramico {
  id: string;
  nombre: string;
  marca: string;
  categoria: TipoCategoriaMaterial;
  acabado: AcabadoSuperficie;
  formato_predeterminado: FormatoPalmeta;
  formatos_disponibles?: FormatoPalmeta[];
  propiedades_pbr: PropiedadesPBR;
  rendimiento_caja_m2?: number;
  unidades_por_caja?: number;
  precio_metro_cuadrado: number;
  descripcion?: string;
  patron_textura?: TipoPatronTextura;
  url_textura?: string;
}

export interface DimensionesHabitacion {
  ancho: number; // en metros
  largo: number; // en metros
  alto: number;  // en metros
}

export type TipoEspacio = 'bano' | 'cocina' | 'sala' | 'comercial';

export interface ResultadoCotizacionSuperficie {
  area_bruta_m2: number;
  area_con_merma_m2: number;
  cantidad_palmetas: number;
  cajas_necesarias: number;
  costo_estimado: number;
}

export interface ResultadoCotizacionTotal {
  cotizacion_piso: ResultadoCotizacionSuperficie;
  cotizacion_paredes: ResultadoCotizacionSuperficie;
  costo_total_estimado: number;
}

export interface EstadoSimulador {
  material_piso: MaterialCeramico;
  formato_piso: FormatoPalmeta;
  material_pared: MaterialCeramico;
  formato_pared: FormatoPalmeta;
  dimensiones: DimensionesHabitacion;
  tipo_espacio: TipoEspacio;
  porcentaje_merma: number;
}
