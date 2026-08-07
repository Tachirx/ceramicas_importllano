import { useState, useEffect } from 'react';
import { clienteSupabase } from '../utilidades/supabase';
import { MaterialCeramico } from '../tipos/materiales';
import { construirFormato } from '../utilidades/formatos';

export const useCatalogo = () => {
  const [catalogo, setCatalogo] = useState<MaterialCeramico[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatalogo = async () => {
      try {
        const { data, error } = await clienteSupabase
          .from('catalogo_ceramicas')
          .select('*')
          // Optional: order by name or whatever
          .order('nombre', { ascending: true });

        if (error) {
          throw error;
        }

        if (data) {
          // Transformar los datos de Supabase al tipo MaterialCeramico que espera la UI
          const materialesTransformados: MaterialCeramico[] = data.map((item: any) => ({
            id: item.id,
            nombre: item.nombre,
            marca: item.marca,
            categoria: item.categoria,
            acabado: item.acabado,
            formato_predeterminado: construirFormato(item.formato_predeterminado_ancho, item.formato_predeterminado_largo),
            formatos_disponibles: [construirFormato(item.formato_predeterminado_ancho, item.formato_predeterminado_largo)],
            url_textura: item.url_textura,
            precio_metro_cuadrado: Number(item.precio_metro_cuadrado),
            rendimiento_caja_m2: Number(item.rendimiento_caja_m2),
            unidades_por_caja: Number(item.unidades_por_caja),
            propiedades_pbr: {
              color_hex: item.color_hex,
              rugosidad: Number(item.rugosidad),
              metalicidad: Number(item.metalicidad),
              capa_brillo: Number(item.capa_brillo),
              mapa_normal_intensidad: Number(item.mapa_normal_intensidad)
            }
          }));
          
          setCatalogo(materialesTransformados);
        }
      } catch (err: any) {
        console.error('Error fetching catalogo:', err.message);
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    fetchCatalogo();
  }, []);

  return { catalogo, cargando, error };
};
