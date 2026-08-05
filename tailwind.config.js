/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        importllano: {
          blanco: "#FFFFFF",
          blancoFondo: "#FFFFFF",
          negro: "#000000",
          rojo: "#E51E25",
          rojoOscuro: "#B91218",
          rojoClaro: "#FF333A",
          grisTexto: "#6B7280",
          grisBorde: "#E51E25", // Bordes rojos como pidió
          grisPanel: "#050505" // Cajas en negro
        }
      }
    },
  },
  plugins: [],
}
