interface RespuestaSegmentacion {
  mascara: string;       // data:image/png;base64,...
  target: string;
  dimensiones: { ancho: number; alto: number };
  homografia?: number[]; // [h11, h12, h13, h21, h22, h23, h31, h32, h33]
  esquinas?: number[];   // [x1, y1, x2, y2, x3, y3, x4, y4]
}

class MotorIA {
  /**
   * Verifica que el servidor FastAPI esté corriendo.
   */
  static async obtenerSegmentador(): Promise<boolean> {
    try {
      return true;
    } catch (e) {
      console.warn("No se pudo conectar al Servidor IA. ¿Está encendido FastAPI?");
      throw e;
    }
  }

  /**
   * Envía la foto al servidor Python y retorna la máscara + homografía.
   */
  private static async segmentar(imageSource: string, target: "piso" | "pared", x_pct: number = -1, y_pct: number = -1): Promise<RespuestaSegmentacion | null> {
    try {
      // 1. Obtener la imagen como Blob
      const respuestaImagen = await fetch(imageSource);
      const blobImagen = await respuestaImagen.blob();

      // 2. Preparar los datos multipart con coordenadas
      const formData = new FormData();
      formData.append("file", blobImagen, "habitacion.jpg");
      formData.append("target", target);
      formData.append("coord_x", x_pct.toString());
      formData.append("coord_y", y_pct.toString());

      // 3. Consultar a nuestro Microservicio de IA
      const respuestaServidor = await fetch("http://127.0.0.1:8000/segmentar", {
        method: "POST",
        body: formData,
      });

      if (!respuestaServidor.ok) {
        const errorBody = await respuestaServidor.text();
        throw new Error(`Error servidor Python (${respuestaServidor.status}): ${errorBody}`);
      }

      const datos: RespuestaSegmentacion = await respuestaServidor.json();

      if (!datos.mascara) {
        throw new Error("El servidor no devolvió una máscara válida.");
      }

      return datos;

    } catch (err) {
      console.error(`Error segmentando ${target}:`, err);
      return null;
    }
  }

  /**
   * Segmenta el piso de la habitación.
   * Retorna { dataURL, homografia, esquinas } o null.
   */
  static async segmentarPiso(imageSource: string, x_pct: number = -1, y_pct: number = -1): Promise<{
    dataURL: string;
    homografia: number[] | null;
    esquinas: number[] | null;
  } | null> {
    const resultado = await MotorIA.segmentar(imageSource, "piso", x_pct, y_pct);
    if (!resultado) return null;

    return {
      dataURL: resultado.mascara,
      homografia: resultado.homografia ?? null,
      esquinas: resultado.esquinas ?? null,
    };
  }

  /**
   * Segmenta la(s) pared(es) de la habitación.
   * Retorna { dataURL, homografia, esquinas } o null.
   */
  static async segmentarPared(imageSource: string, x_pct: number = -1, y_pct: number = -1): Promise<{
    dataURL: string;
    homografia: number[] | null;
    esquinas: number[] | null;
  } | null> {
    const resultado = await MotorIA.segmentar(imageSource, "pared", x_pct, y_pct);
    if (!resultado) return null;

    return {
      dataURL: resultado.mascara,
      homografia: resultado.homografia ?? null,
      esquinas: resultado.esquinas ?? null,
    };
  }
}

export default MotorIA;
