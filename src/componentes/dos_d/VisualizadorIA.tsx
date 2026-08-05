import React, { useState, useEffect } from 'react';
import { MaterialCeramico, FormatoPalmeta, DimensionesHabitacion } from '../../tipos/materiales';
import MotorIA from '../../utilidades/motor_ia';
import catalogoEscenas from '../../datos/catalogo_escenas.json';
import { BrainCircuit, Loader2 } from 'lucide-react';

interface PropiedadesVisualizadorIA {
  imagenOriginal: string;
  materialPiso: MaterialCeramico;
  formatoPiso: FormatoPalmeta;
  materialPared: MaterialCeramico;
  formatoPared: FormatoPalmeta;
  dimensiones: DimensionesHabitacion;
}

/**
 * Convierte una matriz de homografia 3x3 en notacion CSS matrix3d().
 * La homografia mapea el rectangulo unitario [0,0]-[1,1] a las esquinas
 * del piso en pixeles de la foto.
 *
 * Homografia 3x3:         CSS matrix3d() 4x4:
 * [h11 h12 h13]           [ h11, h12, 0, h13,
 * [h21 h22 h23]    -->     h21, h22, 0, h23,
 * [h31 h32  1 ]             0,   0,   1,  0,
 *                           h31, h32, 0,   1 ]
 */
function homografiaAMatrix3d(H: number[]): string {
  if (H.length !== 9) return 'none';
  const [h11, h12, h13, h21, h22, h23, h31, h32, h33] = H;
  // Normalizar por h33 para asegurar el ultimo elemento = 1
  if (h33 === 0) return 'none';
  const s = 1.0 / h33;
  return `matrix3d(
    ${h11 * s}, ${h12 * s}, 0, ${h13 * s},
    ${h21 * s}, ${h22 * s}, 0, ${h23 * s},
    0, 0, 1, 0,
    ${h31 * s}, ${h32 * s}, 0, 1
  )`;
}

export const VisualizadorIA: React.FC<PropiedadesVisualizadorIA> = ({
  imagenOriginal,
  materialPiso,
  formatoPiso,
  materialPared,
  formatoPared,
  dimensiones,
}) => {
  const [urlMascaraPiso, setUrlMascaraPiso] = useState<string | null>(null);
  const [urlMascaraPared, setUrlMascaraPared] = useState<string | null>(null);
  const [matrix3dPiso, setMatrix3dPiso] = useState<string>('none');
  const [matrix3dPared, setMatrix3dPared] = useState<string>('none');
  const [estaCargandoIA, setEstaCargandoIA] = useState<boolean>(true);
  const [estadoIA, setEstadoIA] = useState<string>(
    "Inicializando Motor de IA..."
  );

  // Procesar piso y pared simultaneamente cuando cambie la imagen
  useEffect(() => {
    let cancelado = false;

    const procesarImagen = async () => {
      if (!imagenOriginal) return;

      setEstaCargandoIA(true);
      setUrlMascaraPiso(null);
      setUrlMascaraPared(null);
      setMatrix3dPiso('none');

      try {
        setEstadoIA("Cargando modelo de segmentacion...");
        await MotorIA.obtenerSegmentador();

        setEstadoIA("Analizando habitacion (piso + pared en paralelo)...");
        if (cancelado) return;

        let x_pct_piso = -1, y_pct_piso = -1;
        let x_pct_pared = -1, y_pct_pared = -1;

        // Buscar escena actual en el catálogo para extraer puntos semilla
        const escenaActual = catalogoEscenas.escenas.find(e => e.url_imagen === imagenOriginal);
        if (escenaActual) {
          const zonaPiso = escenaActual.zonas.find(z => z.target_ia === 'piso');
          if (zonaPiso) {
            x_pct_piso = zonaPiso.coordenada_x_pct;
            y_pct_piso = zonaPiso.coordenada_y_pct;
          }
          const zonaPared = escenaActual.zonas.find(z => z.target_ia === 'pared');
          if (zonaPared) {
            x_pct_pared = zonaPared.coordenada_x_pct;
            y_pct_pared = zonaPared.coordenada_y_pct;
          }
        }

        const [resultadoPiso, resultadoPared] = await Promise.all([
          MotorIA.segmentarPiso(imagenOriginal, x_pct_piso, y_pct_piso),
          MotorIA.segmentarPared(imagenOriginal, x_pct_pared, y_pct_pared),
        ]);

        if (cancelado) return;

        if (resultadoPiso) {
          setUrlMascaraPiso(resultadoPiso.dataURL);

          // Aplicar homografia si esta disponible
          if (resultadoPiso.homografia && resultadoPiso.homografia.length === 9) {
            setMatrix3dPiso(homografiaAMatrix3d(resultadoPiso.homografia));
          }
        } else {
          setEstadoIA("No se detecto un piso claramente.");
        }

        if (resultadoPared) {
          setUrlMascaraPared(resultadoPared.dataURL);

          if (resultadoPared.homografia && resultadoPared.homografia.length === 9) {
            setMatrix3dPared(homografiaAMatrix3d(resultadoPared.homografia));
          }
        }
      } catch (err) {
        console.error(err);
        if (!cancelado) setEstadoIA("Error al ejecutar la IA.");
      } finally {
        if (!cancelado) setEstaCargandoIA(false);
      }
    };

    procesarImagen();

    return () => {
      cancelado = true;
    };
  }, [imagenOriginal]);

  // Calcular cuantas palmetas caben segun dimensiones reales
  // tileWidthPiso = ancho de palmeta en px para el espacio unitario [0,1]
  // Queremos que cada palmeta ocupe (formato / dimensiones) del espacio unitario
  // => 100% / palmetasAncho = backgroundSize
  const palmetasAnchoPiso = dimensiones.ancho / formatoPiso.ancho_metros;
  const palmetasLargoPiso = dimensiones.largo / formatoPiso.largo_metros;
  const bgSizeXPiso = 100 / palmetasAnchoPiso;
  const bgSizeYPiso = 100 / palmetasLargoPiso;

  const palmetasAnchoPared = dimensiones.ancho / formatoPared.ancho_metros;
  const palmetasAltoPared = dimensiones.alto / formatoPared.largo_metros;
  const bgSizeXPared = 100 / palmetasAnchoPared;
  const bgSizeYPared = 100 / palmetasAltoPared;

  const tieneHomografiaValida = matrix3dPiso !== 'none' || matrix3dPared !== 'none';

  return (
    <div className="relative w-full h-[500px] lg:h-[600px] bg-[#18181b] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">

      {/* Insignia de Calidad */}
      <div className="absolute top-4 left-4 z-40 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-importllano-rojo/40 text-xs font-semibold text-black flex items-center gap-2.5 shadow-xl">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            estaCargandoIA
              ? 'bg-orange-500 animate-pulse'
              : tieneHomografiaValida
                ? 'bg-green-500 animate-ping'
                : 'bg-importllano-rojo animate-ping'
          }`}
        ></span>
        <div className="flex items-center gap-1.5">
          <BrainCircuit
            className={`w-4 h-4 ${
              estaCargandoIA ? 'text-orange-500' : 'text-importllano-rojo'
            }`}
          />
          <span className="text-black font-bold">Client-Side AI:</span>
          <span className="text-gray-600 hidden sm:inline">
            {tieneHomografiaValida ? 'Homografía Real' : 'Segmentación Dual'}
          </span>
        </div>
      </div>

      {/* OVERLAY DE CARGA IA */}
      {estaCargandoIA && (
        <div className="absolute inset-0 z-30 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-white">
          <Loader2 className="w-12 h-12 text-importllano-rojo animate-spin mb-4" />
          <h3 className="text-lg font-bold">Motor de Inteligencia Artificial</h3>
          <p className="text-sm text-gray-300 mt-2">{estadoIA}</p>
        </div>
      )}

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative w-full h-full flex items-center justify-center bg-gray-900 overflow-hidden">

        {/* Capa 1: Fotografia Original (Background) */}
        {imagenOriginal && (
          <img
            src={imagenOriginal}
            alt="Habitacion"
            className="absolute inset-0 w-full h-full object-cover z-0"
            crossOrigin="anonymous"
          />
        )}

        {/* Capa 4: PARED con Mascara de IA (detras del piso, z-5) */}
        {urlMascaraPared && !estaCargandoIA && (
          <div
            className="absolute inset-0 w-full h-full z-5 pointer-events-none"
            style={{
              WebkitMaskImage: `url(${urlMascaraPared})`,
              maskImage: `url(${urlMascaraPared})`,
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              mixBlendMode: 'multiply',
            }}
          >
            <div
              className="absolute w-full h-full"
              style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: materialPared.propiedades_pbr.color_hex,
                backgroundImage: materialPared.url_textura
                  ? `url(${materialPared.url_textura})`
                  : 'none',
                backgroundSize: `${bgSizeXPared}% ${bgSizeYPared}%`,
                backgroundRepeat: 'repeat',
                transformOrigin: '0 0',
                transform: matrix3dPared !== 'none' ? matrix3dPared : 'none',
                imageRendering: 'auto',
              }}
            />
          </div>
        )}

        {/* Fallback: si no hay mascara pero ya terminó de cargar, mostrar textura semi-transparente */}
        {!urlMascaraPiso && !estaCargandoIA && (
          <div
            className="absolute inset-0 w-full h-full z-10 pointer-events-none"
            style={{
              opacity: 0.4,
              mixBlendMode: 'multiply',
            }}
          >
            <div
              className="absolute w-full h-full"
              style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: materialPiso.propiedades_pbr.color_hex,
                backgroundImage: materialPiso.url_textura
                  ? `url(${materialPiso.url_textura})`
                  : 'none',
                backgroundSize: `${bgSizeXPiso}% ${bgSizeYPiso}%`,
                backgroundRepeat: 'repeat',
                imageRendering: 'auto',
              }}
            />
          </div>
        )}

        {/* Banner de advertencia si el servidor IA no responde */}
        {!urlMascaraPiso && !estaCargandoIA && (
          <div className="absolute top-14 left-4 z-50 bg-red-600/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-red-400 text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            ⚠️ Servidor IA no disponible — mostrando vista previa
          </div>
        )}

        {/* Capa 2: PISO con Homografia y Mascara de IA (z-10) */}
        {urlMascaraPiso && !estaCargandoIA && (
          <>
            <div
              className="absolute inset-0 w-full h-full z-10 pointer-events-none"
              style={{
                WebkitMaskImage: `url(${urlMascaraPiso})`,
                maskImage: `url(${urlMascaraPiso})`,
                WebkitMaskSize: '100% 100%',
                maskSize: '100% 100%',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                mixBlendMode: 'multiply',
              }}
            >
              <div
                className="absolute w-full h-full"
                style={{
                  // El div cubre exactamente el espacio unitario [0,0] -> [1,1]
                  // usando width/height = 100% del contenedor (la foto)
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: materialPiso.propiedades_pbr.color_hex,
                  backgroundImage: materialPiso.url_textura
                    ? `url(${materialPiso.url_textura})`
                    : 'none',
                  backgroundSize: `${bgSizeXPiso}% ${bgSizeYPiso}%`,
                  backgroundRepeat: 'repeat',
                  // La homografia mapea el espacio unitario a las esquinas del piso
                  transformOrigin: '0 0',
                  transform: matrix3dPiso,
                  filter:
                    materialPiso.acabado === 'pulido'
                      ? 'contrast(1.2) brightness(1.1)'
                      : 'none',
                  imageRendering: 'auto',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>

            {/* Capa 3: SPECULAR HIGHLIGHTS con misma homografia */}
            <div
              className="absolute inset-0 w-full h-full z-20 pointer-events-none"
              style={{
                WebkitMaskImage: `url(${urlMascaraPiso})`,
                maskImage: `url(${urlMascaraPiso})`,
                WebkitMaskSize: '100% 100%',
                maskSize: '100% 100%',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                mixBlendMode: 'screen',
                filter: 'grayscale(100%) brightness(30%) contrast(500%)',
                transformOrigin: '0 0',
                transform: matrix3dPiso,
              }}
            >
              <img
                src={imagenOriginal}
                alt="Brillos"
                className="absolute inset-0 w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
          </>
        )}

      </div>
    </div>
  );
};
