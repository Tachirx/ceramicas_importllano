-- Crear la tabla del catálogo de cerámicas y porcelanatos
CREATE TABLE public.catalogo_ceramicas (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    marca TEXT NOT NULL,
    categoria TEXT NOT NULL,
    acabado TEXT NOT NULL,
    formato_predeterminado_ancho NUMERIC NOT NULL,
    formato_predeterminado_largo NUMERIC NOT NULL,
    url_textura TEXT NOT NULL,
    precio_metro_cuadrado NUMERIC NOT NULL,
    rendimiento_caja_m2 NUMERIC NOT NULL,
    unidades_por_caja INTEGER NOT NULL,
    color_hex TEXT NOT NULL,
    rugosidad NUMERIC NOT NULL,
    metalicidad NUMERIC NOT NULL,
    capa_brillo NUMERIC NOT NULL,
    mapa_normal_intensidad NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar Seguridad a Nivel de Fila (Row Level Security)
ALTER TABLE public.catalogo_ceramicas ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir que cualquiera pueda LEER (SELECT) el catálogo
CREATE POLICY "Permitir lectura publica del catalogo" ON public.catalogo_ceramicas
    FOR SELECT USING (true);

-- Crear política para permitir inserción/actualización solo a usuarios autenticados o con ANON KEY (para el script de migración inicial)
-- IMPORTANTE: Para producción, deberías restringir las políticas de INSERT/UPDATE a usuarios administradores.
CREATE POLICY "Permitir modificacion anonima temporal (solo migracion)" ON public.catalogo_ceramicas
    FOR ALL USING (true) WITH CHECK (true);
