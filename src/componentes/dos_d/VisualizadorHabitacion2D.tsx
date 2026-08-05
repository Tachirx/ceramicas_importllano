import React from 'react';
import { Escena2D } from '../../datos/escenas_fotograficas';
import { MaterialCeramico, FormatoPalmeta } from '../../tipos/materiales';
import { Sparkles } from 'lucide-react';

interface PropiedadesVisualizador2D {
  escena: Escena2D;
  material_piso: MaterialCeramico;
  formato_piso: FormatoPalmeta;
}

export const VisualizadorHabitacion2D: React.FC<PropiedadesVisualizador2D> = ({
  escena,
  material_piso,
  formato_piso
}) => {
  // Calculamos el tamaño del azulejo para el background-size.
  // 1 metro = approx 100px en este sistema (ajustable por escalaTextura de la escena).
  const factorEscala = 100 * escena.escalaTextura;
  const tileWidth = formato_piso.ancho_metros * factorEscala;
  const tileHeight = formato_piso.largo_metros * factorEscala;

  const urlFondo = escena.url_imagen;
  // Fallback a color si la textura falla, aunque ahora le pediremos al usuario que coloque archivos locales
  const urlTexturaPiso = material_piso.url_textura || '';

  return (
    <div className="relative w-full h-[500px] lg:h-[600px] bg-[#18181b] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
      
      {/* Insignia de Calidad */}
      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-importllano-rojo/40 text-xs font-semibold text-black flex items-center gap-2.5 shadow-xl">
        <span className="w-2.5 h-2.5 rounded-full bg-importllano-rojo animate-ping"></span>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-importllano-rojo" />
          <span className="text-black font-bold">Simulador 2D Importllano:</span>
          <span className="text-gray-600 hidden sm:inline">Perspectiva Fotográfica</span>
        </div>
      </div>

      {/* CONTENEDOR PRINCIPAL DE LA ESCENA */}
      <div className="relative w-full h-full flex items-center justify-center bg-gray-900 overflow-hidden">
        
        {/* Imagen de Fondo (La Foto Original del Cuarto) */}
        <div 
          className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${urlFondo})` }}
        />

        {/* Capa Base para la Perspectiva y Textura del Piso */}
        <div 
          className="absolute inset-0 w-full h-full z-10"
          style={{ clipPath: escena.clipPathPiso }}
        >
          {/* Contenedor que rota y se hunde en 3D simulado usando CSS */}
          <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center pointer-events-none">
            
            {/* El plano gigantesco que contiene la textura repetida */}
            <div 
              className="w-[200%] h-[200%] origin-center"
              style={{
                backgroundColor: material_piso.propiedades_pbr.color_hex,
                backgroundImage: urlTexturaPiso ? `url(${urlTexturaPiso})` : 'none',
                backgroundSize: `${tileWidth}px ${tileHeight}px`,
                backgroundRepeat: 'repeat',
                transform: escena.transformPiso,
                // Si el piso es pulido, podemos añadir brillo o efectos de filtro
                filter: material_piso.acabado === 'pulido' ? 'contrast(1.1) brightness(1.1)' : 'none',
              }}
            />
            
            {/* Opcional: Una pequeña gradiente para oscurecer la textura a la distancia simulando luz/sombra de la foto original */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10 mix-blend-screen" />
          </div>
        </div>

        {/* Si la imagen de fondo no existe en el disco, mostramos una advertencia suave */}
        <div className="absolute bottom-4 left-4 z-20 text-[10px] text-white/50">
          Nota: Si el fondo se ve oscuro, debes colocar las fotos ({escena.id}.jpg) en public/escenas/.
        </div>

      </div>
    </div>
  );
};
