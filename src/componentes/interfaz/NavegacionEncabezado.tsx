import React from 'react';
import { Layers, MapPin, Calculator, Sparkles, Building2 } from 'lucide-react';

interface PropiedadesNavegacionEncabezado {
  alHacerClicEnExportar: () => void;
}

export const NavegacionEncabezado: React.FC<PropiedadesNavegacionEncabezado> = ({ alHacerClicEnExportar }) => {
  return (
    <header className="w-full bg-importllano-blancoFondo/95 backdrop-blur-md border-b border-importllano-grisBorde px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-3.5">
        <img src="/logo.jpg" alt="Logo Importllano" className="h-10 w-auto object-contain" />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] bg-red-100 text-importllano-rojo border border-red-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide">
              Simulador 3D
            </span>
          </div>
          <p className="text-xs text-importllano-grisTexto flex items-center gap-1.5 font-medium mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-importllano-rojo inline" />
            <span>Sede Av. Caracas, San Fernando de Apure</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 text-xs bg-white border border-importllano-grisBorde px-3.5 py-2 rounded-xl">
          <Building2 className="w-4 h-4 text-importllano-rojo" />
          <span className="font-semibold text-importllano-grisTexto">Catálogo Cerámicas y Porcelanatos PBR</span>
        </div>
        <button
          onClick={alHacerClicEnExportar}
          className="flex items-center gap-2 bg-gradient-to-r from-importllano-rojo to-importllano-rojoOscuro hover:from-importllano-rojoClaro hover:to-importllano-rojo text-white font-bold px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95 text-xs"
        >
          <Calculator className="w-4 h-4 text-white" />
          Ficha de Cotización
        </button>
      </div>
    </header>
  );
};
