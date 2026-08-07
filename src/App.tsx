import React, { useState, useMemo, useEffect } from 'react';
import { useCatalogo } from './hooks/useCatalogo';
import {
  DimensionesHabitacion,
  FormatoPalmeta,
  MaterialCeramico,
  TipoEspacio
} from './tipos/materiales';
import { calcularCotizacionCompleta } from './utilidades/calculador_cotizacion';
import { NavegacionEncabezado } from './componentes/interfaz/NavegacionEncabezado';
import RoomvoWidget from './componentes/dos_d/RoomvoWidget';
import { VisualizadorIA } from './componentes/dos_d/VisualizadorIA';
import { PanelCatalogo } from './componentes/interfaz/PanelCatalogo';
import { PanelConfiguracionHabitacion } from './componentes/interfaz/PanelConfiguracionHabitacion';
import { PanelCotizacion } from './componentes/interfaz/PanelCotizacion';
import { ModalResumenExportacion } from './componentes/interfaz/ModalResumenExportacion';
import { Loader2 } from 'lucide-react';

export const App: React.FC = () => {
  const { catalogo, cargando, error } = useCatalogo();

  // Estado global de la simulación
  const [imagenIA, setImagenIA] = useState<string>('/escenas/bano.jpg');

  const [materialPiso, setMaterialPiso] = useState<MaterialCeramico | null>(null);
  const [formatoPiso, setFormatoPiso] = useState<FormatoPalmeta | null>(null);

  const [materialPared, setMaterialPared] = useState<MaterialCeramico | null>(null);
  const [formatoPared, setFormatoPared] = useState<FormatoPalmeta | null>(null);

  // Inicializar los materiales una vez que el catálogo carga
  useEffect(() => {
    if (catalogo.length > 0 && !materialPiso && !materialPared) {
      const pisos = catalogo.filter(c => c.categoria === 'piso');
      const paredes = catalogo.filter(c => c.categoria === 'pared');
      
      if (pisos.length > 0) {
        setMaterialPiso(pisos[0]);
        setFormatoPiso(pisos[0].formato_predeterminado);
      }
      if (paredes.length > 0) {
        setMaterialPared(paredes[0]);
        setFormatoPared(paredes[0].formato_predeterminado);
      }
    }
  }, [catalogo, materialPiso, materialPared]);

  const [dimensiones, setDimensiones] = useState<DimensionesHabitacion>({
    ancho: 3.0,
    largo: 2.5,
    alto: 2.5
  });

  const [tipoEspacio, setTipoEspacio] = useState<TipoEspacio>('bano');
  const [porcentajeMerma, setPorcentajeMerma] = useState<number>(10);
  const [modalAbierto, setModalAbierto] = useState<boolean>(false);

  // Recálculo automático de la cotización completa
  const cotizacionTotal = useMemo(() => {
    if (!materialPiso || !formatoPiso || !materialPared || !formatoPared) return null;
    return calcularCotizacionCompleta(
      dimensiones,
      materialPiso,
      formatoPiso,
      materialPared,
      formatoPared,
      porcentajeMerma
    );
  }, [dimensiones, materialPiso, formatoPiso, materialPared, formatoPared, porcentajeMerma]);

  const seleccionarMaterialPiso = (material: MaterialCeramico, formato: FormatoPalmeta) => {
    setMaterialPiso(material);
    setFormatoPiso(formato);
  };

  const seleccionarMaterialPared = (material: MaterialCeramico, formato: FormatoPalmeta) => {
    setMaterialPared(material);
    setFormatoPared(formato);
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin mb-4" />
        <h2 className="text-xl font-bold">Cargando catálogo desde la Base de Datos...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h2 className="text-xl font-bold text-red-500 mb-2">Error de Conexión</h2>
        <p className="text-gray-400">{error}</p>
        <p className="text-sm mt-4">Por favor verifica tus credenciales de Supabase en el archivo .env</p>
      </div>
    );
  }

  // Fallback si no hay materiales
  if (!materialPiso || !formatoPiso || !materialPared || !formatoPared || !cotizacionTotal) {
    return null; 
  }

  // Determinar si debemos mostrar el widget de Roomvo basado en las marcas con licencia
  const marcasRoomvo = ['Ceramicas Caribe', 'Itaca', 'Palo Rosa'];
  const pisoRequiereRoomvo = marcasRoomvo.includes(materialPiso.marca);
  const paredRequiereRoomvo = marcasRoomvo.includes(materialPared.marca);
  const mostrarRoomvo = pisoRequiereRoomvo || paredRequiereRoomvo;
  // Pasamos el material que originó la activación de Roomvo
  const materialParaRoomvo = pisoRequiereRoomvo ? materialPiso : materialPared;

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-['Outfit',sans-serif] selection:bg-red-600 selection:text-white">
      {/* Encabezado Principal Importllano */}
      <NavegacionEncabezado alHacerClicEnExportar={() => setModalAbierto(true)} />

      {/* Cuerpo Principal: Renderizado IA + Paneles de Control */}
      <main className="flex-1 p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1750px] w-full mx-auto">
        {/* COLUMNA IZQUIERDA: Visualizador Inteligencia Artificial */}
        <section className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
          {mostrarRoomvo ? (
            <RoomvoWidget materialPiso={materialParaRoomvo} />
          ) : (
            <VisualizadorIA 
              imagenOriginal={imagenIA}
              materialPiso={materialPiso}
              formatoPiso={formatoPiso}
              materialPared={materialPared}
              formatoPared={formatoPared}
              dimensiones={dimensiones}
            />
          )}
          <PanelCotizacion
            cotizacion={cotizacionTotal}
            material_piso={materialPiso}
            formato_piso={formatoPiso}
            material_pared={materialPared}
            formato_pared={formatoPared}
            alHacerClicEnExportar={() => setModalAbierto(true)}
          />
        </section>

        {/* COLUMNA DERECHA: Controles de Configuración y Catálogo */}
        <section className="lg:col-span-5 xl:col-span-4 flex flex-col gap-5">
          <PanelConfiguracionHabitacion
            dimensiones={dimensiones}
            tipo_espacio={tipoEspacio}
            porcentaje_merma={porcentajeMerma}
            alCambiarDimensiones={setDimensiones}
            alCambiarTipoEspacio={setTipoEspacio}
            alCambiarMerma={setPorcentajeMerma}
            alSubirFoto={(url) => setImagenIA(url)}
          />

          <PanelCatalogo
            catalogo_completo={catalogo}
            material_piso_activo={materialPiso}
            formato_piso_activo={formatoPiso}
            material_pared_activo={materialPared}
            formato_pared_activo={formatoPared}
            alSeleccionarMaterialPiso={seleccionarMaterialPiso}
            alSeleccionarMaterialPared={seleccionarMaterialPared}
          />
        </section>
      </main>

      {/* Modal Presupuesto */}
      <ModalResumenExportacion
        abierto={modalAbierto}
        estado={{
          material_piso: materialPiso,
          formato_piso: formatoPiso,
          material_pared: materialPared,
          formato_pared: formatoPared,
          dimensiones,
          tipo_espacio: tipoEspacio,
          porcentaje_merma: porcentajeMerma
        }}
        cotizacion={cotizacionTotal}
        alCerrar={() => setModalAbierto(false)}
      />
    </div>
  );
};

export default App;


