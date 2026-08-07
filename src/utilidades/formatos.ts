import { FormatoPalmeta } from '../tipos/materiales';

export const FORMATO_120_60: FormatoPalmeta = {
  ancho_metros: 1.20,
  largo_metros: 0.60,
  etiqueta: '1.20m x 0.60m'
};

export const FORMATO_60_60: FormatoPalmeta = {
  ancho_metros: 0.60,
  largo_metros: 0.60,
  etiqueta: '0.60m x 0.60m'
};

export const FORMATO_60_30: FormatoPalmeta = {
  ancho_metros: 0.60,
  largo_metros: 0.30,
  etiqueta: '0.60m x 0.30m'
};

export const FORMATO_30_30: FormatoPalmeta = {
  ancho_metros: 0.30,
  largo_metros: 0.30,
  etiqueta: '0.30m x 0.30m'
};

export const FORMATO_48_36: FormatoPalmeta = {
  ancho_metros: 0.48,
  largo_metros: 0.36,
  etiqueta: '48cm x 36cm'
};

export const FORMATO_43_43: FormatoPalmeta = {
  ancho_metros: 0.43,
  largo_metros: 0.43,
  etiqueta: '43cm x 43cm'
};

// Utilidad para obtener el formato dinámicamente desde la BD
export const construirFormato = (ancho: number, largo: number): FormatoPalmeta => {
  return {
    ancho_metros: ancho,
    largo_metros: largo,
    etiqueta: ancho > 1 ? `${ancho.toFixed(2)}m x ${largo.toFixed(2)}m` : `${(ancho * 100).toFixed(0)}cm x ${(largo * 100).toFixed(0)}cm`
  };
};
