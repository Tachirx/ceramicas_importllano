import React, { useMemo } from 'react';
import { FormatoPalmeta, MaterialCeramico } from '../../tipos/materiales';
import { PlantillaHabitacion } from '../../tipos/plantillas';
import { Maximize2, Sparkles } from 'lucide-react';

interface PropiedadesVisualizador {
  plantillaActiva: PlantillaHabitacion;
  materialPiso: MaterialCeramico;
  formatoPiso: FormatoPalmeta;
  materialPared?: MaterialCeramico;
  formatoPared?: FormatoPalmeta;
}

export const VisualizadorPlantillas: React.FC<PropiedadesVisualizador> = ({
  plantillaActiva,
  materialPiso,
  formatoPiso,
  materialPared,
  formatoPared
}) => {
  // Cálculo de escalas base para simular el tamaño de la palmeta en el espacio 3D
  // Reducimos el factor a 100 para que el mosaico sea más denso (alta resolución)
  const escalaBaseX = (formatoPiso.ancho_metros / 1) * 100; 
  const escalaBaseY = (formatoPiso.largo_metros / 1) * 100;

  const escalaPiso = plantillaActiva.transformacion_piso.escala || 1;
  const anchoPisoPct = 200 * escalaPiso;
  const offsetPisoPct = (anchoPisoPct - 100) / 2;

  const texturaFondo = useMemo(() => {
    return `url("${materialPiso.url_textura}")`;
  }, [materialPiso]);

  // Mapeo de Renders IA Generativos Fotorrealistas (0ms latency, ArchViz Quality)
  const renderIaFotorrealista = useMemo(() => {
    const ambienteId = plantillaActiva.id.split('-')[0]; // 'sala', 'bano', 'cocina'
    const pisoId = materialPiso.id;
    const paredId = materialPared?.id;
    if (paredId) {
      return `/renders_ia/${ambienteId}_piso-${pisoId}_pared-${paredId}.jpg`;
    }
    return `/renders_ia/${ambienteId}_${pisoId}.jpg`;
  }, [plantillaActiva.id, materialPiso.id, materialPared?.id]);

  const [tieneRenderIa, setTieneRenderIa] = React.useState<boolean>(true);

  React.useEffect(() => {
    // Comprobar si existe el render IA pre-calculado
    const img = new Image();
    img.src = renderIaFotorrealista;
    img.onload = () => setTieneRenderIa(true);
    img.onerror = () => setTieneRenderIa(false);
  }, [renderIaFotorrealista]);

  return (
    <div className="w-full h-full min-h-[500px] md:min-h-[600px] relative rounded-2xl overflow-hidden bg-black shadow-2xl border border-zinc-800 flex items-center justify-center group">
      
      {/* Botón flotante para expandir (decorativo por ahora) */}
      <button className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-[#E51E25] text-white p-2.5 rounded-xl backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg">
        <Maximize2 className="w-5 h-5" />
      </button>

      {/* Indicador de IA Activa */}
      <div className="absolute top-4 left-4 z-50 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
        <Sparkles className="w-4 h-4 text-[#E51E25] animate-pulse" />
        <span className="text-xs font-bold text-white tracking-widest uppercase">
          {tieneRenderIa ? 'Motor IA Generativo 8K' : 'Motor IA Activo'}
        </span>
      </div>

      {/* CONTENEDOR PRINCIPAL DEL RENDER */}
      <div className="relative w-full h-full max-w-[1200px] aspect-video">
        
        {/* MODO 1: Render de IA Generativa Prompteable (Calidad ArchViz / Fotorrealismo Absoluto) */}
        {tieneRenderIa ? (
          <img 
            src={renderIaFotorrealista} 
            alt={`${materialPiso.nombre} en ${plantillaActiva.nombre}`}
            className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-500"
          />
        ) : (
          <>
            {/* Capa 1: Imagen de fondo original de la plantilla */}
            <img 
              src={plantillaActiva.url_imagen_fondo} 
              alt={plantillaActiva.nombre}
              className="absolute inset-0 w-full h-full object-cover z-10"
            />

        {/* Capa 2: Cerámica del piso en Modo Normal (Color Puro 100% Real) */}
        <div 
          className="absolute inset-0 z-20 overflow-hidden"
          style={{ 
            ...(plantillaActiva.url_mascara_piso ? {
              WebkitMaskImage: `url('${plantillaActiva.url_mascara_piso}')`,
              WebkitMaskSize: 'cover',
              WebkitMaskPosition: 'center',
              maskImage: `url('${plantillaActiva.url_mascara_piso}')`,
              maskSize: 'cover',
              maskPosition: 'center',
            } : {
              clipPath: plantillaActiva.mascara_piso?.puntos_clip_path
            })
          }}
        >
          {/* El plano infinito del piso */}
          <div 
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{
              width: `${anchoPisoPct}%`,
              height: `${anchoPisoPct}%`,
              left: `-${offsetPisoPct}%`,
              top: `-${offsetPisoPct}%`,
              backgroundImage: texturaFondo,
              backgroundSize: `${escalaBaseX * escalaPiso}px ${escalaBaseY * escalaPiso}px`,
              backgroundRepeat: 'repeat',
              transform: `perspective(${plantillaActiva.transformacion_piso.perspectiva_px}px) rotateX(${plantillaActiva.transformacion_piso.rotacion_x_grados}deg) translateY(${plantillaActiva.transformacion_piso.ajuste_y_porcentaje}%)`,
              transformOrigin: plantillaActiva.transformacion_piso.origen_transformacion,
              filter: 'contrast(1.05) brightness(1.02)',
              imageRendering: 'high-quality' as any
            }}
          />
        </div>

        {/* Capa 2B: Sombras fotográficas reales sobre la cerámica */}
        {plantillaActiva.url_mascara_piso && (
          <div 
            className="absolute inset-0 z-25 overflow-hidden mix-blend-multiply opacity-40 pointer-events-none"
            style={{ 
              WebkitMaskImage: `url('${plantillaActiva.url_mascara_piso}')`,
              WebkitMaskSize: 'cover',
              WebkitMaskPosition: 'center',
              maskImage: `url('${plantillaActiva.url_mascara_piso}')`,
              maskSize: 'cover',
              maskPosition: 'center',
            }}
          >
            <img 
              src={plantillaActiva.url_imagen_fondo} 
              alt="Sombras piso"
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-150 brightness-110"
            />
          </div>
        )}

        {/* Capa 3: Cerámica de la pared en Modo Normal (Opcional) */}
        {(plantillaActiva.url_mascara_pared || plantillaActiva.mascara_pared) && plantillaActiva.transformacion_pared && materialPared && formatoPared && (
          <>
            <div 
              className="absolute inset-0 z-30 overflow-hidden"
              style={{ 
                ...(plantillaActiva.url_mascara_pared ? {
                  WebkitMaskImage: `url('${plantillaActiva.url_mascara_pared}')`,
                  WebkitMaskSize: 'cover',
                  WebkitMaskPosition: 'center',
                  maskImage: `url('${plantillaActiva.url_mascara_pared}')`,
                  maskSize: 'cover',
                  maskPosition: 'center',
                } : {
                  clipPath: plantillaActiva.mascara_pared?.puntos_clip_path
                })
              }}
            >
              <div 
                className="absolute inset-0 transition-all duration-700 ease-out"
                style={{
                  width: `${200 * (plantillaActiva.transformacion_pared.escala || 1)}%`,
                  height: `${200 * (plantillaActiva.transformacion_pared.escala || 1)}%`,
                  left: `-${(200 * (plantillaActiva.transformacion_pared.escala || 1) - 100) / 2}%`,
                  top: `-${(200 * (plantillaActiva.transformacion_pared.escala || 1) - 100) / 2}%`,
                  backgroundImage: `url("${materialPared.url_textura}")`,
                  backgroundSize: `${(formatoPared.ancho_metros / 1) * 100 * (plantillaActiva.transformacion_pared.escala || 1)}px ${(formatoPared.largo_metros / 1) * 100 * (plantillaActiva.transformacion_pared.escala || 1)}px`,
                  backgroundRepeat: 'repeat',
                  transform: `perspective(${plantillaActiva.transformacion_pared.perspectiva_px}px) rotateY(${plantillaActiva.transformacion_pared.rotacion_x_grados}deg) translateY(${plantillaActiva.transformacion_pared.ajuste_y_porcentaje}%)`,
                  transformOrigin: plantillaActiva.transformacion_pared.origen_transformacion,
                  filter: 'contrast(1.05) brightness(1.02)',
                  imageRendering: 'high-quality' as any
                }}
              />
            </div>

            {/* Capa 3B: Sombras fotográficas sobre la pared */}
            {plantillaActiva.url_mascara_pared && (
              <div 
                className="absolute inset-0 z-35 overflow-hidden mix-blend-multiply opacity-40 pointer-events-none"
                style={{ 
                  WebkitMaskImage: `url('${plantillaActiva.url_mascara_pared}')`,
                  WebkitMaskSize: 'cover',
                  WebkitMaskPosition: 'center',
                  maskImage: `url('${plantillaActiva.url_mascara_pared}')`,
                  maskSize: 'cover',
                  maskPosition: 'center',
                }}
              >
                <img 
                  src={plantillaActiva.url_imagen_fondo} 
                  alt="Sombras pared"
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-150 brightness-110"
                />
              </div>
            )}
          </>
        )}
          </>
        )}
      </div>
    </div>
  );
};
