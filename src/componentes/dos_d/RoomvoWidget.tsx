import React, { useEffect } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { MaterialCeramico } from '../../tipos/materiales';

interface RoomvoWidgetProps {
  materialPiso: MaterialCeramico;
}

const RoomvoWidget: React.FC<RoomvoWidgetProps> = ({ materialPiso }) => {
  useEffect(() => {
    // Si la URL contiene la redirección de Roomvo, forzamos manualmente su inicialización
    const params = new URLSearchParams(window.location.search);
    if (params.get('roomvoStartVisualizer') === 'True') {
      const checkRoomvo = setInterval(() => {
        // @ts-ignore
        if (window.roomvo && typeof window.roomvo.startVisualizer === 'function') {
          clearInterval(checkRoomvo);
          // @ts-ignore
          window.roomvo.startVisualizer();
        }
      }, 500);
      return () => clearInterval(checkRoomvo);
    }
  }, []);
  const lanzarRoomvo = () => {
    const vendorId = 'eod5g26v';
    const sku = materialPiso.id.toUpperCase();
    const roomvoUrl = `https://www.roomvo.com/share/${vendorId}?sku=${sku}`;
    
    // Abrimos el enlace compartido oficial. Como la web en Vercel ya existe,
    // Roomvo autorizará la sesión y redirigirá de vuelta a la página abriendo el visualizador.
    window.open(roomvoUrl, '_blank');
  };

  return (
    <div className="w-full h-full min-h-[500px] rounded-2xl bg-gradient-to-br from-zinc-900 to-black p-8 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden group">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-importllano-rojo rounded-full blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
      
      {/* Logo/Badge Roomvo */}
      <div className="z-10 mb-8 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-importllano-rojo" />
        <span className="text-white font-medium tracking-wide uppercase text-sm">Powered by Roomvo</span>
      </div>

      <h2 className="z-10 text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
        Visualiza <span className="text-transparent bg-clip-text bg-gradient-to-r from-importllano-rojo to-orange-500">{materialPiso.nombre}</span> <br/>en tu propia casa
      </h2>
      
      <p className="z-10 text-gray-400 max-w-lg mb-10 text-lg">
        Utiliza el motor de Inteligencia Artificial de Roomvo líder en la industria para ver este producto en tu habitación con precisión milimétrica.
      </p>

      {/* Botón nativo de Roomvo controlado por los atributos data-roomvo */}
      <button 
        onClick={lanzarRoomvo}
        data-roomvo-action="startVisualizer"
        data-roomvo-sku={materialPiso.id.toUpperCase()}
        className="z-10 bg-importllano-rojo hover:bg-red-700 text-white font-bold py-4 px-10 rounded-xl flex items-center gap-3 transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(227,6,19,0.4)]"
      >
        <ExternalLink className="w-6 h-6" />
        Abrir Visualizador Inteligente
      </button>

      {/* Nota legal para el prototipo */}
      <div className="absolute bottom-6 text-xs text-gray-600 uppercase tracking-widest z-10">
        Requiere suscripción B2B activa con fabricantes (ITACA, Caribe, Palo Rosa)
      </div>
    </div>
  );
};

export default RoomvoWidget;
