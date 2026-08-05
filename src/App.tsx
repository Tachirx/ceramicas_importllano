import React, { useState, useMemo } from 'react';
import { CATALOGO_MATERIALES_MVP } from './datos/catalogo_materiales';
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

export const App: React.FC = () => {
  // Estado global de la simulación
  const [imagenIA, setImagenIA] = useState<string>('/escenas/bano.jpg'); // Por defecto cargamos el baño

  const [materialPiso, setMaterialPiso] = useState<MaterialCeramico>(CATALOGO_MATERIALES_MVP[0]);
  const [formatoPiso, setFormatoPiso] = useState<FormatoPalmeta>(CATALOGO_MATERIALES_MVP[0].formato_predeterminado);

  const [materialPared, setMaterialPared] = useState<MaterialCeramico>(CATALOGO_MATERIALES_MVP[1]);
  const [formatoPared, setFormatoPared] = useState<FormatoPalmeta>(CATALOGO_MATERIALES_MVP[1].formato_predeterminado);

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

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-['Outfit',sans-serif] selection:bg-red-600 selection:text-white">
      {/* Encabezado Principal Importllano */}
      <NavegacionEncabezado alHacerClicEnExportar={() => setModalAbierto(true)} />

      {/* Cuerpo Principal: Renderizado IA + Paneles de Control */}
      <main className="flex-1 p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1750px] w-full mx-auto">
        {/* COLUMNA IZQUIERDA: Visualizador Inteligencia Artificial */}
        <section className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
          {materialPiso.marca === 'Ceramicas Caribe' ? (
            <RoomvoWidget materialPiso={materialPiso} />
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

