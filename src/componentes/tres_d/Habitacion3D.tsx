import React from 'react';
import * as THREE from 'three';
import { DimensionesHabitacion, FormatoPalmeta, MaterialCeramico } from '../../tipos/materiales';
import { MeshReflectorMaterial } from '@react-three/drei';

interface PropiedadesHabitacion3D {
  dimensiones: DimensionesHabitacion;
  material_piso: MaterialCeramico;
  formato_piso: FormatoPalmeta;
  material_pared: MaterialCeramico;
  formato_pared: FormatoPalmeta;
}

const useTexturaSegura = (url: string | undefined, repeatX: number, repeatY: number) => {
  const [textura, setTextura] = React.useState<THREE.Texture | null>(null);

  React.useEffect(() => {
    if (!url) return;
    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (t) => {
        t.wrapS = THREE.RepeatWrapping;
        t.wrapT = THREE.RepeatWrapping;
        t.repeat.set(repeatX, repeatY);
        t.needsUpdate = true;
        setTextura(t);
      },
      undefined,
      (error) => {
        console.warn(`No se pudo cargar la textura: ${url}. Usando color sólido.`, error);
        setTextura(null);
      }
    );
  }, [url, repeatX, repeatY]);

  return textura;
};

const MaterialPisoReflectante = ({ material, formato, dimensiones }: { material: MaterialCeramico, formato: FormatoPalmeta, dimensiones: DimensionesHabitacion }) => {
  const repeatX = dimensiones.ancho / formato.ancho_metros;
  const repeatY = dimensiones.largo / formato.largo_metros;
  const texturaSegura = useTexturaSegura(material.url_textura, repeatX, repeatY);

  return (
    <MeshReflectorMaterial
      blur={[300, 100]}
      resolution={2048} 
      mixBlur={1}
      mixStrength={80} 
      roughness={material.propiedades_pbr.rugosidad} 
      depthScale={1.2}
      minDepthThreshold={0.4}
      maxDepthThreshold={1.4}
      color={material.propiedades_pbr.color_hex} 
      metalness={material.propiedades_pbr.metalicidad}
      map={texturaSegura || undefined}
      mirror={0.8}
    />
  );
};

const MaterialPared = ({ material, formato, anchoPared, altoPared }: { material: MaterialCeramico, formato: FormatoPalmeta, anchoPared: number, altoPared: number }) => {
  const repeatX = anchoPared / formato.ancho_metros;
  const repeatY = altoPared / formato.largo_metros;
  const texturaSegura = useTexturaSegura(material.url_textura, repeatX, repeatY);

  return (
    <meshStandardMaterial
      map={texturaSegura || undefined}
      color={material.propiedades_pbr.color_hex}
      roughness={material.propiedades_pbr.rugosidad}
      metalness={material.propiedades_pbr.metalicidad}
    />
  );
};

export const Habitacion3D: React.FC<PropiedadesHabitacion3D> = ({
  dimensiones,
  material_piso,
  formato_piso,
  material_pared,
  formato_pared
}) => {
  const altura = dimensiones.alto;
  const ancho = dimensiones.ancho;
  const largo = dimensiones.largo;

  return (
    <group position={[0, 0, 0]}>
      {/* PISO */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[ancho, largo]} />
        <MaterialPisoReflectante material={material_piso} formato={formato_piso} dimensiones={dimensiones} />
      </mesh>

      {/* PARED TRASERA */}
      <mesh
        position={[0, altura / 2, -largo / 2]}
        rotation={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[ancho, altura]} />
        <MaterialPared material={material_pared} formato={formato_pared} anchoPared={ancho} altoPared={altura} />
      </mesh>

      {/* PARED IZQUIERDA */}
      <mesh
        position={[-ancho / 2, altura / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[largo, altura]} />
        <MaterialPared material={material_pared} formato={formato_pared} anchoPared={largo} altoPared={altura} />
      </mesh>
    </group>
  );
};
