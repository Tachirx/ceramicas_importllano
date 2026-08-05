import React, { useState } from 'react';
import { CATALOGO_MATERIALES_MVP } from '../../datos/catalogo_materiales';
import { FormatoPalmeta, MaterialCeramico, TipoCategoriaMaterial } from '../../tipos/materiales';
import { Check, Grid, Sparkles, Tag } from 'lucide-react';

interface PropiedadesPanelCatalogo {
  material_piso_activo: MaterialCeramico;
  formato_piso_activo: FormatoPalmeta;
  material_pared_activo: MaterialCeramico;
  formato_pared_activo: FormatoPalmeta;
  alSeleccionarMaterialPiso: (material: MaterialCeramico, formato: FormatoPalmeta) => void;
  alSeleccionarMaterialPared: (material: MaterialCeramico, formato: FormatoPalmeta) => void;
}

export const PanelCatalogo: React.FC<PropiedadesPanelCatalogo> = ({
  material_piso_activo,
  formato_piso_activo,
  material_pared_activo,
  formato_pared_activo,
  alSeleccionarMaterialPiso,
  alSeleccionarMaterialPared
}) => {
  const [categoriaPestana, setCategoriaPestana] = useState<TipoCategoriaMaterial>('piso');

  const materialesFiltrados = CATALOGO_MATERIALES_MVP.filter(
    material => material.categoria === categoriaPestana || material.categoria === 'piso'
  );

  return (
    <div className="bg-[#050505] rounded-2xl p-5 border-2 border-[#E51E25] flex flex-col gap-4 shadow-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Grid className="w-5 h-5 text-[#E51E25]" />
          Catálogo Importllano
        </h2>
        <span className="text-xs text-white font-bold bg-[#E51E25] px-2 py-0.5 rounded">
          Alta Calidad
        </span>
      </div>

      {/* Pestañas de categoría */}
      <div className="grid grid-cols-2 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
        <button
          onClick={() => setCategoriaPestana('piso')}
          className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            categoriaPestana === 'piso'
              ? 'bg-[#E51E25] text-white shadow-md font-bold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Pisos (Porcelanatos)
        </button>
        <button
          onClick={() => setCategoriaPestana('pared')}
          className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            categoriaPestana === 'pared'
              ? 'bg-[#E51E25] text-white shadow-md font-bold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Paredes (Cerámicas)
        </button>
      </div>

      {/* Lista de productos */}
      <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1">
        {materialesFiltrados.map(material => {
          const esActivoPiso = material_piso_activo.id === material.id;
          const esActivoPared = material_pared_activo.id === material.id;
          const esActivo = categoriaPestana === 'piso' ? esActivoPiso : esActivoPared;
          const formatoActual = categoriaPestana === 'piso' ? formato_piso_activo : formato_pared_activo;

          return (
            <div
              key={material.id}
              onClick={() => {
                if (categoriaPestana === 'piso') {
                  alSeleccionarMaterialPiso(material, material.formato_predeterminado);
                } else {
                  alSeleccionarMaterialPared(material, material.formato_predeterminado);
                }
              }}
              className={`group relative p-4 rounded-xl border transition-all cursor-pointer ${
                esActivo
                  ? 'bg-zinc-900 border-[#E51E25] shadow-[0_0_15px_rgba(229,30,37,0.3)] ring-1 ring-[#E51E25]'
                  : 'bg-[#0A0A0A] border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900'
              }`}
            >
              {/* Encabezado del Producto */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-zinc-600 inline-block shadow-inner"
                      style={{ backgroundColor: material.propiedades_pbr.color_hex }}
                    ></span>
                    <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                      {material.nombre}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2">{material.descripcion}</p>
                </div>
                {esActivo && (
                  <span className="bg-[#E51E25] text-white p-1 rounded-full text-xs flex-shrink-0 shadow">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
              </div>

              {/* Especificaciones PBR & Precio */}
              <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2.5 border-t border-zinc-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="bg-zinc-800 border border-zinc-700 text-zinc-300 px-2 py-0.5 rounded capitalize">
                    {material.acabado}
                  </span>
                  <span className="text-white font-bold flex items-center gap-1">
                    <Tag className="w-3 h-3 text-[#E51E25]" />
                    ${material.precio_metro_cuadrado.toFixed(2)}/m²
                  </span>
                </div>
              </div>

              {/* Selector de formatos disponibles */}
              {esActivo && (material.formatos_disponibles?.length || 0) > 0 && (
                <div
                  className="mt-3 pt-2.5 border-t border-zinc-800 flex flex-col gap-1.5"
                  onClick={e => e.stopPropagation()}
                >
                  <span className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#E51E25]" /> Formato activo:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(material.formatos_disponibles || [material.formato_predeterminado]).map(fmt => {
                      const esFormatoSeleccionado = formatoActual.etiqueta === fmt.etiqueta;
                      return (
                        <button
                          key={fmt.etiqueta}
                          onClick={() => {
                            if (categoriaPestana === 'piso') {
                              alSeleccionarMaterialPiso(material, fmt);
                            } else {
                              alSeleccionarMaterialPared(material, fmt);
                            }
                          }}
                          className={`px-2.5 py-1 text-xs rounded-md border font-mono transition-all ${
                            esFormatoSeleccionado
                              ? 'bg-[#E51E25] border-[#E51E25] text-white font-bold'
                              : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700'
                          }`}
                        >
                          {fmt.etiqueta}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
