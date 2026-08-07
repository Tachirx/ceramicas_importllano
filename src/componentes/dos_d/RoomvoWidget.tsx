import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { MaterialCeramico } from '../../tipos/materiales';

interface RoomvoWidgetProps {
  materialPiso: MaterialCeramico;
}

const RoomvoWidget: React.FC<RoomvoWidgetProps> = ({ materialPiso }) => {
  const sku = materialPiso.id.toUpperCase();

  const lanzarRoomvo = () => {
    // Si es un producto de Cerámicas Caribe, usamos su visualizador oficial directo
    // Esto garantiza que siempre funcione sin problemas de integración B2B en Vercel
    if (materialPiso.nombre.includes("Caribe")) {
      window.open(`https://www.ceramicascaribe.com/roomvo/?roomvoStartVisualizer=true&sku=${sku}`, '_blank');
    } else {
      // Para otros fabricantes, usamos el enlace de distribuidor de Importllano
      const vendorId = 'eod5g26v';
      window.open(`https://www.roomvo.com/share/${vendorId}?sku=${sku}`, '_blank');
    }
  };

  return (
    <div className="bg-black/90 rounded-2xl p-6 lg:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group min-h-[400px] border border-red-900/30">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-50" />
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-xs font-semibold tracking-widest uppercase mb-4">
        <Sparkles className="w-4 h-4 text-red-500" />
        <span>Powered by Roomvo</span>
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 mt-8 max-w-lg">
        <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Visualiza <span className="text-red-500">{materialPiso.nombre}</span> en tu propia casa
        </h3>
        
        <p className="text-gray-400 mb-8 text-sm lg:text-base max-w-md mx-auto">
          Utiliza el motor de Inteligencia Artificial de Roomvo líder en la industria para ver este producto en tu habitación con precisión milimétrica.
        </p>

        {/* Botón Principal */}
        <button
          onClick={lanzarRoomvo}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl w-full sm:w-auto shadow-lg shadow-red-900/20 flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105"
        >
          <ExternalLink className="w-5 h-5" />
          Abrir Visualizador Inteligente
        </button>

        <p className="mt-6 text-xs text-white/30 tracking-widest uppercase">
          REQUIERE SUSCRIPCIÓN B2B ACTIVA CON FABRICANTES (CARIBE)
        </p>
      </div>
    </div>
  );
};

export default RoomvoWidget;
