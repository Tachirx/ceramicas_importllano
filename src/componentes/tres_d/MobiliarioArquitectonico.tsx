import React from 'react';
import { DimensionesHabitacion } from '../../tipos/materiales';

interface PropiedadesMobiliario {
  dimensiones: DimensionesHabitacion;
}

export const MobiliarioArquitectonico: React.FC<PropiedadesMobiliario> = ({ dimensiones }) => {
  // Posiciones calculadas según las dimensiones del espacio
  const posicionVanityY = 0.5;
  const posicionVanityZ = -dimensiones.largo / 2 + 0.35;

  return (
    <group>
      {/* 1. MUEBLE LAVAMANOS FLOTANTE (ESTILO MODERNO NOGAL / NEGRO MATE) */}
      <group position={[0, posicionVanityY, posicionVanityZ]}>
        {/* Cuerpo del mueble de madera noble */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.45, 0.5]} />
          <meshStandardMaterial color="#1f1813" roughness={0.4} metalness={0.1} />
        </mesh>

        {/* Encimera de porcelanato esmaltado negro */}
        <mesh position={[0, 0.23, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.42, 0.04, 0.52]} />
          <meshPhysicalMaterial
            color="#0d0d11"
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            reflectivity={0.9}
          />
        </mesh>

        {/* Lavamanos de porcelana blanca estilo bol sobre encimera */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.26, 0.22, 0.16, 32]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.05}
            clearcoat={1.0}
            reflectivity={0.95}
          />
        </mesh>

        {/* Grifería monomando dorada/bronce cepillado */}
        <group position={[0, 0.46, -0.16]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.015, 0.018, 0.2, 16]} />
            <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.85} />
          </mesh>
          <mesh position={[0, 0.09, 0.04]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.012, 0.012, 0.1, 16]} />
            <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.85} />
          </mesh>
        </group>
      </group>

      {/* 2. ESPEJO CIRCULAR RETROILUMINADO CON LUZ LED CÁLIDA */}
      <group position={[0, 1.45, -dimensiones.largo / 2 + 0.04]}>
        {/* Aro LED trasero emisor de luz cálida */}
        <mesh position={[0, 0, -0.01]}>
          <ringGeometry args={[0.42, 0.47, 64]} />
          <meshBasicMaterial color="#ffeaaf" />
        </mesh>
        {/* Cristal del espejo fotorrealista */}
        <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.02, 64]} />
          <meshPhysicalMaterial
            color="#e2e8f0"
            roughness={0.02}
            metalness={0.98}
            reflectivity={1.0}
            clearcoat={1.0}
          />
        </mesh>

        {/* Luz puntual suave detrás del espejo */}
        <pointLight position={[0, 0, 0.05]} intensity={1.8} color="#ffeaaf" distance={2.5} />
      </group>

      {/* 3. MAMPARA DE DUCHA DE CRISTAL TEMPLADO EN PARED LATERAL */}
      <group position={[dimensiones.ancho / 2 - 0.9, dimensiones.alto / 2, 0]}>
        {/* Perfil de acero inoxidable */}
        <mesh position={[-0.45, 0, 0]} castShadow>
          <boxGeometry args={[0.03, dimensiones.alto, 0.03]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Cristal transparente con reflejos */}
        <mesh receiveShadow>
          <boxGeometry args={[0.015, dimensiones.alto - 0.1, dimensiones.largo * 0.55]} />
          <meshPhysicalMaterial
            color="#e2e8f0"
            transparent
            opacity={0.3}
            roughness={0.05}
            transmission={0.9}
            ior={1.5}
            reflectivity={0.9}
          />
        </mesh>
      </group>
    </group>
  );
};
