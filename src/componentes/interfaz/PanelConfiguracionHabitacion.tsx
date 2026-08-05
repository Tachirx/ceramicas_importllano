import React from 'react';
import { DimensionesHabitacion, TipoEspacio } from '../../tipos/materiales';
import { Percent, Sliders, ImagePlus, ImageIcon } from 'lucide-react';

interface PropiedadesPanelConfiguracionHabitacion {
  dimensiones: DimensionesHabitacion;
  tipo_espacio: TipoEspacio;
  porcentaje_merma: number;
  alCambiarDimensiones: (nuevasDimensiones: DimensionesHabitacion) => void;
  alCambiarTipoEspacio: (nuevoEspacio: TipoEspacio) => void;
  alCambiarMerma: (nuevaMerma: number) => void;
  alSubirFoto?: (urlImagen: string) => void;
}

export const PanelConfiguracionHabitacion: React.FC<PropiedadesPanelConfiguracionHabitacion> = ({
  dimensiones,
  tipo_espacio,
  porcentaje_merma,
  alCambiarDimensiones,
  alCambiarTipoEspacio,
  alCambiarMerma,
  alSubirFoto
}) => {
  const manejarSubidaArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && alSubirFoto) {
      const url = URL.createObjectURL(file);
      alSubirFoto(url);
    }
  };

  return (
    <div className="bg-[#050505] rounded-2xl p-5 border-2 border-[#E51E25] flex flex-col gap-4 shadow-2xl">
      
      {/* Botón Principal: Subir Foto (IA) */}
      <div className="flex flex-col gap-2 border-b border-zinc-800 pb-4">
        <label className="text-xs font-semibold text-white flex items-center gap-1.5">
          <ImagePlus className="w-4 h-4 text-[#E51E25]" /> Segmentación por Inteligencia Artificial
        </label>
        
        <label className="cursor-pointer group">
          <div className="bg-zinc-900 border border-zinc-700 hover:border-[#E51E25] rounded-xl p-3 flex items-center justify-center gap-2 transition-colors">
            <ImagePlus className="w-5 h-5 text-zinc-400 group-hover:text-[#E51E25]" />
            <span className="text-sm font-bold text-zinc-300 group-hover:text-white">Subir Foto de Habitación</span>
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={manejarSubidaArchivo} />
        </label>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-zinc-500 uppercase font-bold">Prueba rápida:</span>
          <button onClick={() => alSubirFoto?.('/escenas/bano.jpg')} className="text-[11px] text-zinc-400 hover:text-white underline">Baño</button>
          <button onClick={() => alSubirFoto?.('/escenas/cocina.jpg')} className="text-[11px] text-zinc-400 hover:text-white underline">Cocina</button>
          <button onClick={() => alSubirFoto?.('/escenas/sala.jpg')} className="text-[11px] text-zinc-400 hover:text-white underline">Sala</button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#E51E25]" />
          Área a Cotizar
        </h2>
        <span className="text-xs text-white font-mono font-bold bg-[#E51E25] px-2 py-0.5 rounded">
          {(dimensiones.ancho * dimensiones.largo).toFixed(2)} m² piso
        </span>
      </div>

      {/* Sliders de Ancho, Largo y Alto */}
      <div className="flex flex-col gap-3">
        {/* ANCHO */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs">
            <span className="text-zinc-300 font-medium">Ancho de la habitación:</span>
            <span className="text-[#E51E25] font-mono font-bold">{dimensiones.ancho.toFixed(2)} m</span>
          </div>
          <input
            type="range"
            min={1.5}
            max={8.0}
            step={0.1}
            value={dimensiones.ancho}
            onChange={e => alCambiarDimensiones({ ...dimensiones, ancho: parseFloat(e.target.value) })}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E51E25]"
          />
        </div>

        {/* LARGO */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs">
            <span className="text-zinc-300 font-medium">Largo de la habitación:</span>
            <span className="text-[#E51E25] font-mono font-bold">{dimensiones.largo.toFixed(2)} m</span>
          </div>
          <input
            type="range"
            min={1.5}
            max={8.0}
            step={0.1}
            value={dimensiones.largo}
            onChange={e => alCambiarDimensiones({ ...dimensiones, largo: parseFloat(e.target.value) })}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E51E25]"
          />
        </div>

        {/* ALTO */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs">
            <span className="text-zinc-300 font-medium">Alto de las paredes:</span>
            <span className="text-[#E51E25] font-mono font-bold">{dimensiones.alto.toFixed(2)} m</span>
          </div>
          <input
            type="range"
            min={2.0}
            max={4.5}
            step={0.1}
            value={dimensiones.alto}
            onChange={e => alCambiarDimensiones({ ...dimensiones, alto: parseFloat(e.target.value) })}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E51E25]"
          />
        </div>
      </div>

      {/* Margen de merma configurable */}
      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <Percent className="w-3.5 h-3.5 text-[#E51E25]" />
          <span>Margen de Merma de Corte:</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            max={25}
            value={porcentaje_merma}
            onChange={e => alCambiarMerma(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-14 bg-zinc-900 border border-zinc-700 text-[#E51E25] font-mono text-xs font-bold px-2 py-1 rounded text-center focus:outline-none focus:border-[#E51E25]"
          />
          <span className="text-xs text-zinc-500">%</span>
        </div>
      </div>
    </div>
  );
};
