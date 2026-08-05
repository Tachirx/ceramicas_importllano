import {
  DimensionesHabitacion,
  FormatoPalmeta,
  MaterialCeramico,
  ResultadoCotizacionSuperficie,
  ResultadoCotizacionTotal
} from '../tipos/materiales';

export function calcularCotizacionSuperficie(
  area_bruta_m2: number,
  formato: FormatoPalmeta,
  material: MaterialCeramico,
  porcentaje_merma: number = 10
): ResultadoCotizacionSuperficie {
  const factor_merma = 1 + porcentaje_merma / 100;
  const area_con_merma_m2 = area_bruta_m2 * factor_merma;

  const area_palmeta_m2 = formato.ancho_metros * formato.largo_metros;
  const cantidad_palmetas = Math.ceil(area_con_merma_m2 / area_palmeta_m2);

  const cajas_necesarias = Math.ceil(area_con_merma_m2 / (material.rendimiento_caja_m2 || 1.44));
  const costo_estimado = cajas_necesarias * (material.rendimiento_caja_m2 || 1.44) * material.precio_metro_cuadrado;

  return {
    area_bruta_m2: Number(area_bruta_m2.toFixed(2)),
    area_con_merma_m2: Number(area_con_merma_m2.toFixed(2)),
    cantidad_palmetas,
    cajas_necesarias,
    costo_estimado: Number(costo_estimado.toFixed(2))
  };
}

export function calcularCotizacionCompleta(
  dimensiones: DimensionesHabitacion,
  material_piso: MaterialCeramico,
  formato_piso: FormatoPalmeta,
  material_pared: MaterialCeramico,
  formato_pared: FormatoPalmeta,
  porcentaje_merma: number = 10
): ResultadoCotizacionTotal {
  // Área del piso = Ancho * Largo
  const area_piso_m2 = dimensiones.ancho * dimensiones.largo;

  // Área de 3 paredes (Pared trasera + Pared izquierda + Pared derecha)
  // Pared trasera: Ancho * Alto
  // Paredes laterales: 2 * (Largo * Alto)
  const area_paredes_m2 = (dimensiones.ancho * dimensiones.alto) + (2 * dimensiones.largo * dimensiones.alto);

  const cotizacion_piso = calcularCotizacionSuperficie(
    area_piso_m2,
    formato_piso,
    material_piso,
    porcentaje_merma
  );

  const cotizacion_paredes = calcularCotizacionSuperficie(
    area_paredes_m2,
    formato_pared,
    material_pared,
    porcentaje_merma
  );

  const costo_total_estimado = Number((cotizacion_piso.costo_estimado + cotizacion_paredes.costo_estimado).toFixed(2));

  return {
    cotizacion_piso,
    cotizacion_paredes,
    costo_total_estimado
  };
}
