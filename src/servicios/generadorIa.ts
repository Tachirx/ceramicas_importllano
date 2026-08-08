// Servicio de Generación de IA en Tiempo Real para el Visualizador

interface OpcionesGeneracionIa {
  ambiente: string; // 'sala', 'bano', 'cocina'
  nombrePiso: string;
  detallesPiso: string;
  nombrePared?: string;
  detallesPared?: string;
}

/**
 * Genera un render fotorrealista en tiempo real llamando a la API de IA Generativa.
 * Si el producto no está pre-renderizado, este servicio construye el prompt exacto
 * y obtiene la imagen fotorrealista 8K sobre la marcha.
 */
export const solicitarRenderIaEnTiempoReal = async (
  opciones: OpcionesGeneracionIa
): Promise<string> => {
  const { ambiente, nombrePiso, detallesPiso, nombrePared, detallesPared } = opciones;

  let prompt = `Fotografía de arquitectura de interiores hiperrealista en 8k de un ${ambiente}. `;
  prompt += `El piso está revestido de palmetas cerámicas/porcelanato '${nombrePiso}' (${detallesPiso}) con acabado pulido. `;
  
  if (nombrePared) {
    prompt += `Las paredes están revestidas de cerámica de pared '${nombrePared}' (${detallesPared || 'diseño elegante'}). `;
  }

  prompt += `Iluminación fotográfica de estudio neutra de día, sombras suaves equilibradas, reflejos mate realistas, sin sobre-saturar. Rápido render de arquitectura.`;

  console.log('🤖 Generando Render IA en Tiempo Real con Prompt:', prompt);

  try {
    const promptCodificado = encodeURIComponent(prompt);
    // Usamos el servicio de generación rápida de Pollinations AI (100% gratuito y dinámico en tiempo real)
    const urlImagenIa = `https://image.pollinations.ai/prompt/${promptCodificado}?width=1280&height=720&seed=${Math.floor(Math.random() * 100000)}&nologo=true`;
    
    // Precargar la imagen antes de resolver
    await new Promise((resolve, reject) => {
      const img = new Image();
      img.src = urlImagenIa;
      img.onload = resolve;
      img.onerror = reject;
    });

    return urlImagenIa;
  } catch (error) {
    console.error('Error al generar render IA en tiempo real:', error);
    throw error;
  }
};
