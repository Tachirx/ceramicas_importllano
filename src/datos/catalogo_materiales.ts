import { FormatoPalmeta, MaterialCeramico } from '../tipos/materiales';

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

export const CATALOGO_MATERIALES_MVP: MaterialCeramico[] = [


  {

    id: 'sal-soluble-plain-ivory',

    nombre: 'Sal soluble plain ivory',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_60_60,

    url_textura: '/texturas/sal-soluble-plain-ivory.jpg',

    precio_metro_cuadrado: 23.90,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 4,

    propiedades_pbr: {

      color_hex: '#F5F5DC',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'sal-soluble-siena',

    nombre: 'Sal soluble siena',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_60_60,

    url_textura: '/texturas/sal-soluble-siena.jpg',

    precio_metro_cuadrado: 23.90,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 4,

    propiedades_pbr: {

      color_hex: '#DDDDDD',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'florim-gold',

    nombre: 'Florim gold',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_60_60,

    url_textura: '/texturas/florim-gold.jpg',

    precio_metro_cuadrado: 29.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 4,

    propiedades_pbr: {

      color_hex: '#DAA520',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'mexima-onyx',

    nombre: 'Mexima onyx',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_60_60,

    url_textura: '/texturas/mexima-onyx.jpg',

    precio_metro_cuadrado: 29.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 4,

    propiedades_pbr: {

      color_hex: '#DDDDDD',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'hexa-onyx-gold',

    nombre: 'Hexa onyx gold',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_60_60,

    url_textura: '/texturas/hexa-onyx-gold.jpg',

    precio_metro_cuadrado: 37.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 4,

    propiedades_pbr: {

      color_hex: '#DAA520',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'xtreme-negro',

    nombre: 'Xtreme negro',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_60_60,

    url_textura: '/texturas/xtreme-negro.jpg',

    precio_metro_cuadrado: 37.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 4,

    propiedades_pbr: {

      color_hex: '#111111',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'saint-laurent',

    nombre: 'Saint laurent',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_60_60,

    url_textura: '/texturas/saint-laurent.jpg',

    precio_metro_cuadrado: 37.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 4,

    propiedades_pbr: {

      color_hex: '#DDDDDD',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'nero-marquina',

    nombre: 'Nero marquina',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_60_60,

    url_textura: '/texturas/nero-marquina.jpg',

    precio_metro_cuadrado: 37.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 4,

    propiedades_pbr: {

      color_hex: '#111111',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'hera-dune',

    nombre: 'Hera dune',

    marca: 'Palo rosa',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_60_60,

    url_textura: '/texturas/hera-dune.jpg',

    precio_metro_cuadrado: 29.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 4,

    propiedades_pbr: {

      color_hex: '#DDDDDD',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'belfast-gris',

    nombre: 'Belfast gris',

    marca: 'Palo rosa',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_60_60,

    url_textura: '/texturas/belfast-gris.jpg',

    precio_metro_cuadrado: 29.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 4,

    propiedades_pbr: {

      color_hex: '#808080',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'block-blanco',

    nombre: 'Block blanco',

    marca: 'Palo rosa',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_60_60,

    url_textura: '/texturas/block-blanco.jpg',

    precio_metro_cuadrado: 29.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 4,

    propiedades_pbr: {

      color_hex: '#F5F5F5',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'block-beige',

    nombre: 'Block beige',

    marca: 'Palo rosa',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_60_60,

    url_textura: '/texturas/block-beige.jpg',

    precio_metro_cuadrado: 29.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 4,

    propiedades_pbr: {

      color_hex: '#F5F5DC',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'black-onyx-beauty',

    nombre: 'Black onyx beauty',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/black-onyx-beauty.jpg',

    precio_metro_cuadrado: 39.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#111111',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'marquina-gold',

    nombre: 'Marquina gold',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/marquina-gold.jpg',

    precio_metro_cuadrado: 39.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#DAA520',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'eagele-nero',

    nombre: 'Eagele nero',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/eagele-nero.jpg',

    precio_metro_cuadrado: 39.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#111111',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'marquina-black',

    nombre: 'Marquina black',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/marquina-black.jpg',

    precio_metro_cuadrado: 39.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#111111',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'negro-marquina-xl',

    nombre: 'Negro marquina XL',

    marca: 'Palo rosa',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/negro-marquina-xl.jpg',

    precio_metro_cuadrado: 49.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#111111',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'mallorca-gris',

    nombre: 'Mallorca gris',

    marca: 'Carabobo',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/mallorca-gris.jpg',

    precio_metro_cuadrado: 23.00,

    rendimiento_caja_m2: 1.42,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#808080',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'body-basald-stone-white',

    nombre: 'Body basald stone white',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/body-basald-stone-white.jpg',

    precio_metro_cuadrado: 39.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#F5F5F5',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'ghr-body-archie-bianco',

    nombre: 'GHR Body archie bianco',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/ghr-body-archie-bianco.jpg',

    precio_metro_cuadrado: 39.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#F5F5F5',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'calacatta-green-endles',

    nombre: 'Calacatta green endles',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/calacatta-green-endles.jpg',

    precio_metro_cuadrado: 29.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#A3A69C',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'verona-beige',

    nombre: 'Verona beige',

    marca: 'Palo rosa',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/verona-beige.jpg',

    precio_metro_cuadrado: 35.00,

    rendimiento_caja_m2: 2.16,

    unidades_por_caja: 3,

    propiedades_pbr: {

      color_hex: '#F5F5DC',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'kachori-gold',

    nombre: 'Kachori gold',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/kachori-gold.jpg',

    precio_metro_cuadrado: 39.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#DAA520',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'smoke-gold',

    nombre: 'Smoke gold',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/smoke-gold.jpg',

    precio_metro_cuadrado: 39.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#DAA520',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'siena-gold',

    nombre: 'Siena gold',

    marca: 'Palo rosa',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/siena-gold.jpg',

    precio_metro_cuadrado: 35.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#DAA520',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'macline-art-green',

    nombre: 'Macline art green',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/macline-art-green.jpg',

    precio_metro_cuadrado: 39.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#A3A69C',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'loira-olivo',

    nombre: 'Loira olivo',

    marca: 'Domosa',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/loira-olivo.jpg',

    precio_metro_cuadrado: 35.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#A3A69C',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'falconer-aqua',

    nombre: 'Falconer aqua',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/falconer-aqua.jpg',

    precio_metro_cuadrado: 39.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#A3A69C',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'taica-art-aqua',

    nombre: 'Taica art aqua',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/taica-art-aqua.jpg',

    precio_metro_cuadrado: 39.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#A3A69C',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'smoke-aqua',

    nombre: 'Smoke aqua',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/smoke-aqua.jpg',

    precio_metro_cuadrado: 39.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#A3A69C',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'torso-bianco',

    nombre: 'Torso bianco',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/torso-bianco.jpg',

    precio_metro_cuadrado: 29.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#F5F5F5',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'statuario-sipani',

    nombre: 'Statuario sipani',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/statuario-sipani.jpg',

    precio_metro_cuadrado: 29.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#DDDDDD',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'carrara-grey',

    nombre: 'Carrara grey',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/carrara-grey.jpg',

    precio_metro_cuadrado: 29.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#808080',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'medici-gris',

    nombre: 'Medici Gris',

    marca: 'Palo rosa',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/medici-gris.jpg',

    precio_metro_cuadrado: 35.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#808080',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'plain-white',

    nombre: 'Plain white',

    marca: 'ITACA',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_120_60,

    url_textura: '/texturas/plain-white.jpg',

    precio_metro_cuadrado: 29.00,

    rendimiento_caja_m2: 1.44,

    unidades_por_caja: 2,

    propiedades_pbr: {

      color_hex: '#F5F5F5',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'genova-gris',

    nombre: 'Genova gris',

    marca: 'Balgres',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_48_36,

    url_textura: '/texturas/genova-gris.jpg',

    precio_metro_cuadrado: 21.11,

    rendimiento_caja_m2: 2.07,

    unidades_por_caja: 12,

    propiedades_pbr: {

      color_hex: '#808080',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'genova-rosa',

    nombre: 'Genova rosa',

    marca: 'Balgres',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_48_36,

    url_textura: '/texturas/genova-rosa.jpg',

    precio_metro_cuadrado: 19.00,

    rendimiento_caja_m2: 2.07,

    unidades_por_caja: 12,

    propiedades_pbr: {

      color_hex: '#DDDDDD',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'marble-blue',

    nombre: 'Marble blue',

    marca: 'Ceramicas Caribe',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_43_43,

    url_textura: '/texturas/marble-blue.jpg',

    precio_metro_cuadrado: 21.00,

    rendimiento_caja_m2: 1.85,

    unidades_por_caja: 10,

    propiedades_pbr: {

      color_hex: '#0000FF',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'carrara-marquez',

    nombre: 'Carrara marquez',

    marca: 'Ceramicas Caribe',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_43_43,

    url_textura: '/texturas/carrara-marquez.jpg',

    precio_metro_cuadrado: 23.00,

    rendimiento_caja_m2: 1.85,

    unidades_por_caja: 10,

    propiedades_pbr: {

      color_hex: '#DDDDDD',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'calacatta',

    nombre: 'Calacatta',

    marca: 'Ceramicas Caribe',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_43_43,

    url_textura: '/texturas/calacatta.jpg',

    precio_metro_cuadrado: 23.00,

    rendimiento_caja_m2: 1.85,

    unidades_por_caja: 10,

    propiedades_pbr: {

      color_hex: '#DDDDDD',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'anela',

    nombre: 'Anela',

    marca: 'Ceramicas Caribe',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_43_43,

    url_textura: '/texturas/anela.jpg',

    precio_metro_cuadrado: 23.00,

    rendimiento_caja_m2: 1.85,

    unidades_por_caja: 10,

    propiedades_pbr: {

      color_hex: '#DDDDDD',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'lys-horse',

    nombre: 'Lys horse',

    marca: 'Ceramicas Caribe',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_43_43,

    url_textura: '/texturas/lys-horse.jpg',

    precio_metro_cuadrado: 21.00,

    rendimiento_caja_m2: 1.85,

    unidades_por_caja: 10,

    propiedades_pbr: {

      color_hex: '#DDDDDD',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'marmol-brandt-beige',

    nombre: 'Marmol brandt beige',

    marca: 'Ceramicas Caribe',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_43_43,

    url_textura: '/texturas/marmol-brandt-beige.jpg',

    precio_metro_cuadrado: 23.00,

    rendimiento_caja_m2: 1.85,

    unidades_por_caja: 10,

    propiedades_pbr: {

      color_hex: '#F5F5DC',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'madera-teca',

    nombre: 'Madera teca (Calidad 2da)',

    marca: 'Ceramicas Caribe',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_43_43,

    url_textura: '/texturas/madera-teca.jpg',

    precio_metro_cuadrado: 16.00,

    rendimiento_caja_m2: 1.85,

    unidades_por_caja: 10,

    propiedades_pbr: {

      color_hex: '#8B5A2B',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'patagonia',

    nombre: 'Patagonia',

    marca: 'Ceramicas Caribe',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_43_43,

    url_textura: '/texturas/patagonia.jpg',

    precio_metro_cuadrado: 23.00,

    rendimiento_caja_m2: 1.85,

    unidades_por_caja: 10,

    propiedades_pbr: {

      color_hex: '#DDDDDD',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'choroni-miel',

    nombre: 'Choroni miel',

    marca: 'Ceramicas Caribe',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_43_43,

    url_textura: '/texturas/choroni-miel.jpg',

    precio_metro_cuadrado: 16.00,

    rendimiento_caja_m2: 1.85,

    unidades_por_caja: 10,

    propiedades_pbr: {

      color_hex: '#8B5A2B',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },

  {

    id: 'atenas-beige',

    nombre: 'Atenas beige',

    marca: 'Ceramicas Caribe',

    categoria: 'piso',

    acabado: 'pulido', // Asignado por defecto

    formato_predeterminado: FORMATO_43_43,

    url_textura: '/texturas/atenas-beige.jpg',

    precio_metro_cuadrado: 21.00,

    rendimiento_caja_m2: 1.85,

    unidades_por_caja: 10,

    propiedades_pbr: {

      color_hex: '#F5F5DC',

      rugosidad: 0.1,

      metalicidad: 0.0,

      capa_brillo: 1.0,

      mapa_normal_intensidad: 0.0,

    },

  },


];
