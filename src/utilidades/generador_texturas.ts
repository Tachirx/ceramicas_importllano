import * as THREE from 'three';
import { TipoPatronTextura } from '../tipos/materiales';

interface OpcionesTextura {
  ancho_canvas?: number;
  alto_canvas?: number;
  color_grout?: string;
  grosor_grout?: number;
}

export interface JuegoTexturasPBR {
  mapa_difuso: THREE.CanvasTexture;
  mapa_normales: THREE.CanvasTexture;
  mapa_rugosidad: THREE.CanvasTexture;
}

export function generarJuegoTexturasProcedimentales(
  patron: TipoPatronTextura,
  rugosidad_base: number,
  opciones: OpcionesTextura = {}
): JuegoTexturasPBR {
  const ancho = opciones.ancho_canvas || 1024;
  const alto = opciones.alto_canvas || 1024;
  const grosor = opciones.grosor_grout || 4;

  // 1. CANVAS DIFUSO (ALBEDO)
  const canvasDifuso = document.createElement('canvas');
  canvasDifuso.width = ancho;
  canvasDifuso.height = alto;
  const ctxDifuso = canvasDifuso.getContext('2d')!;

  // 2. CANVAS NORMALES (RELIEVE DE FRAGUADO Y VETAS)
  const canvasNormales = document.createElement('canvas');
  canvasNormales.width = ancho;
  canvasNormales.height = alto;
  const ctxNormales = canvasNormales.getContext('2d')!;

  // 3. CANVAS RUGOSIDAD (BRICK BRILLE / GROUT MATE)
  const canvasRugosidad = document.createElement('canvas');
  canvasRugosidad.width = ancho;
  canvasRugosidad.height = alto;
  const ctxRugosidad = canvasRugosidad.getContext('2d')!;

  // Dibujar patrones según tipo
  switch (patron) {
    case 'marquina':
      dibujarMarquinaBlack(ctxDifuso, ctxNormales, ctxRugosidad, ancho, alto, rugosidad_base);
      break;
    case 'karisma':
      dibujarKarismaAzul(ctxDifuso, ctxNormales, ctxRugosidad, ancho, alto, rugosidad_base);
      break;
    case 'carrara':
      dibujarCarraraWhite(ctxDifuso, ctxNormales, ctxRugosidad, ancho, alto, rugosidad_base);
      break;
    case 'gris_neutro':
      dibujarGrisNeutro(ctxDifuso, ctxNormales, ctxRugosidad, ancho, alto, rugosidad_base);
      break;
  }

  // Dibujar franja de junta / fraguado en las tres texturas para lograr profundidad real
  dibujarJuntasEspeciales(
    ctxDifuso,
    ctxNormales,
    ctxRugosidad,
    ancho,
    alto,
    opciones.color_grout || '#1e293b',
    grosor
  );

  const mapa_difuso = new THREE.CanvasTexture(canvasDifuso);
  mapa_difuso.wrapS = THREE.RepeatWrapping;
  mapa_difuso.wrapT = THREE.RepeatWrapping;
  mapa_difuso.needsUpdate = true;

  const mapa_normales = new THREE.CanvasTexture(canvasNormales);
  mapa_normales.wrapS = THREE.RepeatWrapping;
  mapa_normales.wrapT = THREE.RepeatWrapping;
  mapa_normales.needsUpdate = true;

  const mapa_rugosidad = new THREE.CanvasTexture(canvasRugosidad);
  mapa_rugosidad.wrapS = THREE.RepeatWrapping;
  mapa_rugosidad.wrapT = THREE.RepeatWrapping;
  mapa_rugosidad.needsUpdate = true;

  return {
    mapa_difuso,
    mapa_normales,
    mapa_rugosidad
  };
}

function dibujarMarquinaBlack(
  ctxD: CanvasRenderingContext2D,
  ctxN: CanvasRenderingContext2D,
  ctxR: CanvasRenderingContext2D,
  ancho: number,
  alto: number,
  rugosidad: number
): void {
  // Fondo albedo negro profundo
  const grad = ctxD.createRadialGradient(ancho / 2, alto / 2, 50, ancho / 2, alto / 2, ancho * 0.75);
  grad.addColorStop(0, '#15151a');
  grad.addColorStop(1, '#08080b');
  ctxD.fillStyle = grad;
  ctxD.fillRect(0, 0, ancho, alto);

  // Normal plana base (128, 128, 255)
  ctxN.fillStyle = 'rgb(128, 128, 255)';
  ctxN.fillRect(0, 0, ancho, alto);

  // Rugosidad baja (alta reflectividad en porcelanato)
  const valR = Math.floor(rugosidad * 255);
  ctxR.fillStyle = `rgb(${valR}, ${valR}, ${valR})`;
  ctxR.fillRect(0, 0, ancho, alto);

  // Vetas blancas fotorrealistas
  ctxD.strokeStyle = 'rgba(245, 248, 255, 0.85)';
  ctxD.lineWidth = 3;
  ctxD.lineCap = 'round';

  const vetas = [
    { x1: 40, y1: 80, x2: 450, y2: 380, cx: 220, cy: 140 },
    { x1: 380, y1: 320, x2: 980, y2: 920, cx: 620, cy: 580 },
    { x1: 850, y1: 60, x2: 150, y2: 950, cx: 480, cy: 420 }
  ];

  vetas.forEach(v => {
    ctxD.beginPath();
    ctxD.moveTo(v.x1, v.y1);
    ctxD.quadraticCurveTo(v.cx, v.cy, v.x2, v.y2);
    ctxD.stroke();

    // Veta secundaria fina
    ctxD.lineWidth = 1;
    ctxD.strokeStyle = 'rgba(210, 225, 240, 0.5)';
    ctxD.beginPath();
    ctxD.moveTo(v.cx, v.cy);
    ctxD.lineTo(v.cx + 90, v.cy - 70);
    ctxD.stroke();
  });
}

function dibujarKarismaAzul(
  ctxD: CanvasRenderingContext2D,
  ctxN: CanvasRenderingContext2D,
  ctxR: CanvasRenderingContext2D,
  ancho: number,
  alto: number,
  rugosidad: number
): void {
  // Albedo Azul marino cerámico esmaltado
  const grad = ctxD.createLinearGradient(0, 0, ancho, alto);
  grad.addColorStop(0, '#004c8c');
  grad.addColorStop(0.5, '#003366');
  grad.addColorStop(1, '#001a35');
  ctxD.fillStyle = grad;
  ctxD.fillRect(0, 0, ancho, alto);

  // Destellos de esmalte brillante
  for (let i = 0; i < 40; i++) {
    const rx = Math.random() * ancho;
    const ry = Math.random() * alto;
    const rad = Math.random() * 50 + 10;
    const gEsmalte = ctxD.createRadialGradient(rx, ry, 0, rx, ry, rad);
    gEsmalte.addColorStop(0, 'rgba(0, 180, 255, 0.25)');
    gEsmalte.addColorStop(1, 'rgba(0, 51, 102, 0)');
    ctxD.fillStyle = gEsmalte;
    ctxD.beginPath();
    ctxD.arc(rx, ry, rad, 0, Math.PI * 2);
    ctxD.fill();
  }

  ctxN.fillStyle = 'rgb(128, 128, 255)';
  ctxN.fillRect(0, 0, ancho, alto);

  const valR = Math.floor(rugosidad * 255);
  ctxR.fillStyle = `rgb(${valR}, ${valR}, ${valR})`;
  ctxR.fillRect(0, 0, ancho, alto);
}

function dibujarCarraraWhite(
  ctxD: CanvasRenderingContext2D,
  ctxN: CanvasRenderingContext2D,
  ctxR: CanvasRenderingContext2D,
  ancho: number,
  alto: number,
  rugosidad: number
): void {
  // Albedo Mármol Carrara Blanco
  ctxD.fillStyle = '#f8f9fc';
  ctxD.fillRect(0, 0, ancho, alto);

  // Vetas suaves grisáceas y doradas
  const vetas = [
    { x1: 0, y1: 150, x2: 850, y2: 1024, cx: 450, cy: 520, col: 'rgba(150, 155, 165, 0.22)', lw: 4 },
    { x1: 250, y1: 0, x2: 1024, y2: 750, cx: 720, cy: 320, col: 'rgba(170, 175, 185, 0.18)', lw: 3 },
    { x1: 80, y1: 450, x2: 950, y2: 250, cx: 520, cy: 380, col: 'rgba(197, 155, 39, 0.12)', lw: 2 }
  ];

  vetas.forEach(v => {
    ctxD.strokeStyle = v.col;
    ctxD.lineWidth = v.lw;
    ctxD.beginPath();
    ctxD.moveTo(v.x1, v.y1);
    ctxD.quadraticCurveTo(v.cx, v.cy, v.x2, v.y2);
    ctxD.stroke();
  });

  ctxN.fillStyle = 'rgb(128, 128, 255)';
  ctxN.fillRect(0, 0, ancho, alto);

  const valR = Math.floor(rugosidad * 255);
  ctxR.fillStyle = `rgb(${valR}, ${valR}, ${valR})`;
  ctxR.fillRect(0, 0, ancho, alto);
}

function dibujarGrisNeutro(
  ctxD: CanvasRenderingContext2D,
  ctxN: CanvasRenderingContext2D,
  ctxR: CanvasRenderingContext2D,
  ancho: number,
  alto: number,
  rugosidad: number
): void {
  ctxD.fillStyle = '#4a5568';
  ctxD.fillRect(0, 0, ancho, alto);

  // Grano de microcemento
  ctxD.fillStyle = 'rgba(0, 0, 0, 0.06)';
  for (let i = 0; i < 6000; i++) {
    ctxD.fillRect(Math.random() * ancho, Math.random() * alto, 2, 2);
  }

  ctxN.fillStyle = 'rgb(128, 128, 255)';
  ctxN.fillRect(0, 0, ancho, alto);

  const valR = Math.floor(rugosidad * 255);
  ctxR.fillStyle = `rgb(${valR}, ${valR}, ${valR})`;
  ctxR.fillRect(0, 0, ancho, alto);
}

function dibujarJuntasEspeciales(
  ctxD: CanvasRenderingContext2D,
  ctxN: CanvasRenderingContext2D,
  ctxR: CanvasRenderingContext2D,
  ancho: number,
  alto: number,
  color_grout: string,
  grosor: number
): void {
  // 1. Difuso: color de la junta
  ctxD.strokeStyle = color_grout;
  ctxD.lineWidth = grosor;
  ctxD.strokeRect(grosor / 2, grosor / 2, ancho - grosor, alto - grosor);

  // 2. Normales: Bisel hendido para rebaje de la junta (Crea sombra real al incidir la luz)
  // Borde superior e izquierdo (Luz entrante)
  ctxN.strokeStyle = 'rgb(200, 100, 255)'; // Normal inclinada
  ctxN.lineWidth = grosor;
  ctxN.strokeRect(grosor / 2, grosor / 2, ancho - grosor, alto - grosor);

  // 3. Rugosidad: La junta es 100% mate (valor 245 = rugosidad casi máxima)
  ctxR.strokeStyle = 'rgb(240, 240, 240)';
  ctxR.lineWidth = grosor * 1.5;
  ctxR.strokeRect(grosor / 2, grosor / 2, ancho - grosor, alto - grosor);
}
