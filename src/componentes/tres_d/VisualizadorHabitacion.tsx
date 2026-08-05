import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { DimensionesHabitacion, FormatoPalmeta, MaterialCeramico } from '../../tipos/materiales';
import { Habitacion3D } from './Habitacion3D';
import { Loader2, Sparkles } from 'lucide-react';

interface PropiedadesVisualizadorHabitacion {
  dimensiones: DimensionesHabitacion;
  material_piso: MaterialCeramico;
  formato_piso: FormatoPalmeta;
  material_pared: MaterialCeramico;
  formato_pared: FormatoPalmeta;
}

import { ErrorBoundary } from '../utilidades/ErrorBoundary';

const CargadorVisualizador: React.FC = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20 text-black gap-3 border border-gray-200">
    <Loader2 className="w-10 h-10 text-importllano-rojo animate-spin" />
    <span className="text-sm font-bold text-importllano-rojo">Cargando Escena 3D Importllano...</span>
  </div>
);

export const VisualizadorHabitacion: React.FC<PropiedadesVisualizadorHabitacion> = ({
  dimensiones,
  material_piso,
  formato_piso,
  material_pared,
  formato_pared
}) => {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
      {/* Insignia de Calidad y Controles */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-importllano-rojo/40 text-xs font-semibold text-black flex items-center gap-2.5 shadow-xl">
        <span className="w-2.5 h-2.5 rounded-full bg-importllano-rojo animate-ping"></span>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-importllano-rojo" />
          <span className="text-black font-bold">Simulador 3D Importllano:</span>
          <span className="text-gray-600 hidden sm:inline">Renderizado Fotorrealista PBR</span>
        </div>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<CargadorVisualizador />}>
        <Canvas
          shadows
          camera={{ position: [0, 1.2, 4], fov: 45 }}
          gl={{
            preserveDrawingBuffer: true,
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1
          }}
          onCreated={({ gl, scene }) => {
            scene.background = new THREE.Color('#18181b'); // Fondo oscuro neutro
          }}
        >
          {/* ENTORNO HDRI FOTORREALISTA (SOLO ILUMINACIÓN Y REFLEJOS, SIN FONDO) */}
          <Environment preset="apartment" />

          {/* LUZ DE APOYO SUAVE */}
          <ambientLight intensity={0.4} />
          
          <directionalLight
            position={[4.5, 6.5, 3.5]}
            intensity={0.8}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
            color="#fffdf7"
          />

          {/* HABITACIÓN 3D CON TEXTURAS PBR Y DECORACIÓN */}
          <Habitacion3D
            dimensiones={dimensiones}
            material_piso={material_piso}
            formato_piso={formato_piso}
            material_pared={material_pared}
            formato_pared={formato_pared}
          />

          {/* SOMBRAS DE CONTACTO EN PISO */}
          <ContactShadows
            position={[0, 0.002, 0]}
            opacity={0.7}
            scale={12}
            blur={1.6}
            far={5}
          />

          {/* CONTROLES DE CÁMARA */}
          <OrbitControls
            makeDefault
            enableDamping
            dampingFactor={0.05}
            minDistance={1.4}
            maxDistance={8.5}
            maxPolarAngle={Math.PI / 2 - 0.01}
            target={[0, 0.8, 0]}
          />
        </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
