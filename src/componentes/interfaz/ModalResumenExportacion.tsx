import React from 'react';
import { EstadoSimulador, ResultadoCotizacionTotal } from '../../tipos/materiales';
import { X, Printer, Layers, MapPin, Package, ShieldCheck } from 'lucide-react';

interface PropiedadesModalResumenExportacion {
  abierto: boolean;
  estado: EstadoSimulador;
  cotizacion: ResultadoCotizacionTotal;
  alCerrar: () => void;
}

export const ModalResumenExportacion: React.FC<PropiedadesModalResumenExportacion> = ({
  abierto,
  estado,
  cotizacion,
  alCerrar
}) => {
  if (!abierto) return null;

  const fechaHoy = new Date().toLocaleDateString('es-VE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const imprimirPresupuesto = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-importllano-blancoFondo/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-importllano-grisPanel border border-importllano-grisBorde w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col my-8">
        {/* Cabecera del Modal */}
        <div className="bg-importllano-blancoFondo p-6 border-b border-importllano-grisBorde flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-importllano-rojo to-importllano-rojoOscuro flex items-center justify-center font-black text-amber-300 text-xl shadow-lg border border-importllano-rojoClaro/40">
              IL
            </div>
            <div>
              <h2 className="text-lg font-bold text-importllano-negro">IMPORTLLANO — Presupuesto de Venta</h2>
              <p className="text-xs text-importllano-grisTexto flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-importllano-rojoClaro" /> Sede Av. Caracas | Fecha: {fechaHoy}
              </p>
            </div>
          </div>
          <button
            onClick={alCerrar}
            className="text-slate-400 hover:text-importllano-negro bg-importllano-blancoFondo p-2 rounded-xl transition-all border border-importllano-grisBorde"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido Imprimible */}
        <div id="seccion-imprimible" className="p-6 flex flex-col gap-6 text-slate-200">
          {/* Detalles del espacio */}
          <div className="grid grid-cols-3 gap-3 bg-importllano-blancoFondo p-4 rounded-xl border border-importllano-grisBorde text-xs">
            <div>
              <span className="text-slate-400 block">Tipo de Espacio:</span>
              <span className="font-bold capitalize text-importllano-rojo">{estado.tipo_espacio}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Dimensiones Habitación:</span>
              <span className="font-mono font-semibold text-slate-200">
                {estado.dimensiones.ancho}m × {estado.dimensiones.largo}m × {estado.dimensiones.alto}m
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Margen de Merma:</span>
              <span className="font-mono font-semibold text-importllano-rojo">+{estado.porcentaje_merma}%</span>
            </div>
          </div>

          {/* Tabla de Detalle de Materiales */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-importllano-blancoFondo border-b border-importllano-grisBorde text-importllano-rojo">
                  <th className="py-2.5 px-3">Superficie</th>
                  <th className="py-2.5 px-3">Producto & Formato</th>
                  <th className="py-2.5 px-3 text-center">Área c/ Merma</th>
                  <th className="py-2.5 px-3 text-center">Palmetas</th>
                  <th className="py-2.5 px-3 text-center">Cajas</th>
                  <th className="py-2.5 px-3 text-right">Subtotal ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-importllano-grisBorde">
                {/* FILA PISO */}
                <tr>
                  <td className="py-3 px-3 font-semibold text-importllano-grisTexto flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-importllano-rojo" /> Piso
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-importllano-negro">{estado.material_piso.nombre}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{estado.formato_piso.etiqueta}</div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono">{cotizacion.cotizacion_piso.area_con_merma_m2} m²</td>
                  <td className="py-3 px-3 text-center font-mono">{cotizacion.cotizacion_piso.cantidad_palmetas} uds</td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-importllano-rojo">
                    {cotizacion.cotizacion_piso.cajas_necesarias} cajas
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-importllano-negro">
                    ${cotizacion.cotizacion_piso.costo_estimado.toFixed(2)}
                  </td>
                </tr>

                {/* FILA PAREDES */}
                <tr>
                  <td className="py-3 px-3 font-semibold text-importllano-grisTexto flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-importllano-rojo" /> Paredes
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-importllano-negro">{estado.material_pared.nombre}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{estado.formato_pared.etiqueta}</div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono">{cotizacion.cotizacion_paredes.area_con_merma_m2} m²</td>
                  <td className="py-3 px-3 text-center font-mono">{cotizacion.cotizacion_paredes.cantidad_palmetas} uds</td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-importllano-rojo">
                    {cotizacion.cotizacion_paredes.cajas_necesarias} cajas
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-importllano-negro">
                    ${cotizacion.cotizacion_paredes.costo_estimado.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Resumen Total y Cajas */}
          <div className="bg-importllano-blancoFondo p-4 rounded-xl border border-importllano-grisBorde flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-importllano-rojo" />
              <div>
                <span className="text-xs text-slate-400 block">Total Cajas de Inventario:</span>
                <span className="text-lg font-bold text-importllano-negro font-mono">
                  {cotizacion.cotizacion_piso.cajas_necesarias + cotizacion.cotizacion_paredes.cajas_necesarias} Cajas
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">Monto Total Estimado:</span>
              <span className="text-2xl font-black text-importllano-rojo font-mono">
                ${cotizacion.costo_total_estimado.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Garantía y Notas Importllano */}
          <div className="text-[11px] text-slate-400 bg-importllano-blancoFondo/50 p-3 rounded-lg border border-importllano-grisBorde flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-importllano-rojoClaro flex-shrink-0 mt-0.5" />
            <p>
              * El margen de merma recomendado (+10%) garantiza la disponibilidad de palmetas para cortes de esquina. Cotización expedida para atención al cliente en Importllano Sede Av. Caracas.
            </p>
          </div>
        </div>

        {/* Pie del Modal con Acciones */}
        <div className="bg-importllano-blancoFondo p-4 border-t border-importllano-grisBorde flex items-center justify-end gap-3">
          <button
            onClick={alCerrar}
            className="px-4 py-2 text-xs font-semibold text-importllano-grisTexto hover:text-importllano-negro bg-importllano-blancoFondo rounded-xl transition-all border border-importllano-grisBorde"
          >
            Cerrar
          </button>
          <button
            onClick={imprimirPresupuesto}
            className="flex items-center gap-2 bg-gradient-to-r from-importllano-rojo to-importllano-rojoOscuro hover:from-importllano-rojoClaro hover:to-importllano-rojo text-importllano-negro font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-importllano-rojo/20 text-xs border border-importllano-rojoClaro/30"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            Imprimir / Exportar PDF
          </button>
        </div>
      </div>
    </div>
  );
};
