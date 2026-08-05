import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

export const EfectosPostProcesado: React.FC = () => {
  return (
    <EffectComposer multisampling={4}>
      {/* Bloom sutil para luces LED y reflejos especulares de porcelanatos */}
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        mipmapBlur
      />

      {/* Viñetado de lente de cámara arquitectónica */}
      <Vignette
        eskil={false}
        offset={0.25}
        darkness={0.65}
      />
    </EffectComposer>
  );
};
