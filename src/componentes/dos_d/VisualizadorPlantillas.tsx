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
  formatoPiso
}) => {
  // Cálculo de escalas base para simular el tamaño de la palmeta en el espacio 3D
  const escalaBaseX = (formatoPiso.ancho_metros / 1) * 150; // Ajuste arbitrario para que se vea proporcionado
  const escalaBaseY = (formatoPiso.largo_metros / 1) * 150;

  const texturaFondo = useMemo(() => {
    return `url("${materialPiso.url_textura}")`;
  }, [materialPiso]);

  return (
    <div className="w-full h-full min-h-[500px] md:min-h-[600px] relative rounded-2xl overflow-hidden bg-black shadow-2xl border border-zinc-800 flex items-center justify-center group">
      
      {/* Botón flotante para expandir (decorativo por ahora) */}
      <button className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-[#E51E25] text-white p-2.5 rounded-xl backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg">
        <Maximize2 className="w-5 h-5" />
      </button>

      {/* Indicador de IA Activa */}
      <div className="absolute top-4 left-4 z-50 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
        <Sparkles className="w-4 h-4 text-[#E51E25] animate-pulse" />
        <span className="text-xs font-bold text-white tracking-widest uppercase">Motor IA Activo</span>
      </div>

      {/* CONTENEDOR PRINCIPAL DEL RENDER */}
      <div className="relative w-full h-full max-w-[1200px] aspect-video">
        
        {/* Capa 1: Imagen de fondo original de la plantilla */}
        <img 
          src={plantillaActiva.url_imagen_fondo} 
          alt={plantillaActiva.nombre}
          className="absolute inset-0 w-full h-full object-cover z-10"
        />

        {/* Capa 2: Máscara recortada del piso con proyección 3D */}
        <div 
          className="absolute inset-0 z-20 overflow-hidden"
          style={{ clipPath: plantillaActiva.mascara_piso.puntos_clip_path }}
        >
          {/* El plano infinito del piso */}
          <div 
            className="absolute inset-0 w-[200%] h-[200%] -left-[50%] -top-[50%] transition-all duration-700 ease-out"
            style={{
              backgroundImage: texturaFondo,
              backgroundSize: `${escalaBaseX}px ${escalaBaseY}px`,
              backgroundRepeat: 'repeat',
              transform: `perspective(${plantillaActiva.transformacion_piso.perspectiva_px}px) rotateX(${plantillaActiva.transformacion_piso.rotacion_x_grados}deg) scale(${plantillaActiva.transformacion_piso.escala}) translateY(${plantillaActiva.transformacion_piso.ajuste_y_porcentaje}%)`,
              transformOrigin: plantillaActiva.transformacion_piso.origen_transformacion,
              filter: 'contrast(1.1) brightness(0.9) drop-shadow(0 0 10px rgba(0,0,0,0.5))'
            }}
          >
            {/* Overlay sutil para darle realismo a la iluminación (sombras en los bordes) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none mix-blend-overlay"></div>
          </div>
        </div>

        {/* Capa 3: Máscara recortada de la pared (Opcional) */}
        {plantillaActiva.mascara_pared && plantillaActiva.transformacion_pared && materialPared && formatoPared && (
          <div 
            className="absolute inset-0 z-30 overflow-hidden"
            style={{ clipPath: plantillaActiva.mascara_pared.puntos_clip_path }}
          >
            <div 
              className="absolute inset-0 w-[200%] h-[200%] -left-[50%] -top-[50%] transition-all duration-700 ease-out"
              style={{
                backgroundImage: `url("${materialPared.url_textura}")`,
                backgroundSize: `${(formatoPared.ancho_metros / 1) * 150}px ${(formatoPared.largo_metros / 1) * 150}px`,
                backgroundRepeat: 'repeat',
                transform: `perspective(${plantillaActiva.transformacion_pared.perspectiva_px}px) rotateY(${plantillaActiva.transformacion_pared.rotacion_x_grados}deg) scale(${plantillaActiva.transformacion_pared.escala}) translateY(${plantillaActiva.transformacion_pared.ajuste_y_porcentaje}%)`,
                transformOrigin: plantillaActiva.transformacion_pared.origen_transformacion,
                filter: 'contrast(1.05) brightness(0.95)'
              }}
            >
              <div className="absolute inset-0 bg-black/10 pointer-events-none mix-blend-multiply"></div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
