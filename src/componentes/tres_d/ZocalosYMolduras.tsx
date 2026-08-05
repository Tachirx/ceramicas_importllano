import React from 'react';
import { DimensionesHabitacion } from '../../tipos/materiales';

interface PropiedadesZocalos {
  dimensiones: DimensionesHabitacion;
}

export const ZocalosYMolduras: React.FC<PropiedadesZocalos> = ({ dimensiones }) => {
  const altoZocalo = 0.12; // 12 cm de alto
  const grosorZocalo = 0.02; // 2 cm de grosor

  return (
    <group>
      {/* 1. ZÓCALO PARED TRASERA */}
      <mesh
        position={[0, altoZocalo / 2, -dimensiones.largo / 2 + grosorZocalo / 2]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[dimensiones.ancho, altoZocalo, grosorZocalo]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* 2. ZÓCALO PARED IZQUIERDA */}
      <mesh
        position={[-dimensiones.ancho / 2 + grosorZocalo / 2, altoZocalo / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[grosorZocalo, altoZocalo, dimensiones.largo]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* 3. ZÓCALO PARED DERECHA */}
      <mesh
        position={[dimensiones.ancho / 2 - grosorZocalo / 2, altoZocalo / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[grosorZocalo, altoZocalo, dimensiones.largo]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* 4. TECHO ARQUITECTÓNICO CON FOCOS LED EMPOTRADOS */}
      <mesh
        position={[0, dimensiones.alto, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[dimensiones.ancho, dimensiones.largo]} />
        <meshStandardMaterial color="#0b1120" roughness={0.8} />
      </mesh>

      {/* FOCOS DICROICOS LED EN EL TECHO */}
      <group position={[0, dimensiones.alto - 0.02, 0]}>
        {/* Foco 1 */}
        <mesh position={[-dimensiones.ancho / 4, 0, -dimensiones.largo / 4]}>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 32]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffeaaf" emissiveIntensity={0.8} />
        </mesh>
        <spotLight
          position={[-dimensiones.ancho / 4, 0, -dimensiones.largo / 4]}
          target-position={[-dimensiones.ancho / 4, 0, 0]}
          intensity={2.5}
          angle={0.6}
          penumbra={0.5}
          color="#ffeaaf"
          castShadow
        />

        {/* Foco 2 */}
        <mesh position={[dimensiones.ancho / 4, 0, -dimensiones.largo / 4]}>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 32]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffeaaf" emissiveIntensity={0.8} />
        </mesh>
        <spotLight
          position={[dimensiones.ancho / 4, 0, -dimensiones.largo / 4]}
          target-position={[dimensiones.ancho / 4, 0, 0]}
          intensity={2.5}
          angle={0.6}
          penumbra={0.5}
          color="#ffeaaf"
          castShadow
        />
      </group>

      {/* 5. PERFILES METÁLICOS DE ESQUINA */}
      <mesh position={[-dimensiones.ancho / 2 + 0.01, dimensiones.alto / 2, -dimensiones.largo / 2 + 0.01]}>
        <boxGeometry args={[0.02, dimensiones.alto, 0.02]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[dimensiones.ancho / 2 - 0.01, dimensiones.alto / 2, -dimensiones.largo / 2 + 0.01]}>
        <boxGeometry args={[0.02, dimensiones.alto, 0.02]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
};
