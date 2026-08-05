import React from 'react';
import {
  FormatoPalmeta,
  MaterialCeramico,
  ResultadoCotizacionTotal
} from '../../tipos/materiales';
import { Calculator, Package, Layers, FileText, ChevronRight } from 'lucide-react';

interface PropiedadesPanelCotizacion {
  cotizacion: ResultadoCotizacionTotal;
  material_piso: MaterialCeramico;
  formato_piso: FormatoPalmeta;
  material_pared: MaterialCeramico;
  formato_pared: FormatoPalmeta;
  alHacerClicEnExportar: () => void;
}

export const PanelCotizacion: React.FC<PropiedadesPanelCotizacion> = ({
  cotizacion,
  material_piso,
  formato_piso,
  material_pared,
  formato_pared,
  alHacerClicEnExportar
}) => {
  return (
    <div className="bg-[#050505] rounded-2xl p-5 border-2 border-[#E51E25] flex flex-col gap-4 shadow-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Calculator className="w-5 h-5 text-[#E51E25]" />
          Métrica y Cotización de Cierre
        </h2>
        <span className="bg-[#E51E25]/20 border border-[#E51E25]/40 text-[#E51E25] text-xs px-2.5 py-0.5 rounded-full font-bold">
          Sede Av. Caracas
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* TARJETA PISO */}
        <div className="bg-zinc-900 rounded-xl p-3.5 border border-zinc-800 flex flex-col gap-2">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-xs font-bold text-[#E51E25] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Piso (Porcelanato)
            </span>
            <span className="text-[11px] font-mono text-zinc-400">{formato_piso.etiqueta}</span>
          </div>

          <div className="text-sm font-semibold text-white truncate">{material_piso.nombre}</div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div>
              <span className="text-zinc-500 block text-[10px]">Área con Merma:</span>
              <span className="font-mono text-zinc-300 font-semibold">{cotizacion.cotizacion_piso.area_con_merma_m2} m²</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px]">Palmetas:</span>
              <span className="font-mono text-zinc-300 font-semibold">{cotizacion.cotizacion_piso.cantidad_palmetas} uds</span>
            </div>
            <div className="col-span-2 flex items-center justify-between bg-[#0A0A0A] px-2.5 py-1.5 rounded-lg border border-zinc-800 mt-1">
              <span className="text-zinc-300 font-medium flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-[#E51E25]" /> Cajas Inventario:
              </span>
              <span className="font-mono text-[#E51E25] font-bold">{cotizacion.cotizacion_piso.cajas_necesarias} cajas</span>
            </div>
          </div>
        </div>

        {/* TARJETA PAREDES */}
        <div className="bg-zinc-900 rounded-xl p-3.5 border border-zinc-800 flex flex-col gap-2">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-xs font-bold text-[#E51E25] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Paredes (3 Caras)
            </span>
            <span className="text-[11px] font-mono text-zinc-400">{formato_pared.etiqueta}</span>
          </div>

          <div className="text-sm font-semibold text-white truncate">{material_pared.nombre}</div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div>
              <span className="text-zinc-500 block text-[10px]">Área con Merma:</span>
              <span className="font-mono text-zinc-300 font-semibold">{cotizacion.cotizacion_paredes.area_con_merma_m2} m²</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px]">Palmetas:</span>
              <span className="font-mono text-zinc-300 font-semibold">{cotizacion.cotizacion_paredes.cantidad_palmetas} uds</span>
            </div>
            <div className="col-span-2 flex items-center justify-between bg-[#0A0A0A] px-2.5 py-1.5 rounded-lg border border-zinc-800 mt-1">
              <span className="text-zinc-300 font-medium flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-[#E51E25]" /> Cajas Inventario:
              </span>
              <span className="font-mono text-[#E51E25] font-bold">{cotizacion.cotizacion_paredes.cajas_necesarias} cajas</span>
            </div>
          </div>
        </div>
      </div>

      {/* TOTAL ESTIMADO */}
      <div className="bg-zinc-900 p-4 rounded-xl border border-[#E51E25]/40 flex items-center justify-between">
        <div>
          <span className="text-xs text-zinc-400 block">Total Estimado de Venta:</span>
          <span className="text-2xl font-black text-[#E51E25] font-mono">
            ${cotizacion.costo_total_estimado.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <button
          onClick={alHacerClicEnExportar}
          className="flex items-center gap-1.5 bg-gradient-to-r from-[#E51E25] to-red-800 hover:from-red-500 hover:to-[#E51E25] text-white font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg active:scale-95 text-xs"
        >
          <FileText className="w-4 h-4 text-white" />
          Ficha de Venta
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
