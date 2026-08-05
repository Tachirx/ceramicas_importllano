import codecs

products = [
    # Screenshot 1
    ("NOGAL NATURAL", "msd-v02", "piso", "MARRON"),
    ("KARISMA OSCURO", "mbd-d104", "piso", "GRIS"),
    ("LYS HORSE", "mbd-v124", "piso", "BEIGE"),
    ("CUARZO", "mbd-v113", "piso", "DORADO"),
    ("MARBLE BIANCO", "mbd-v115", "pared", "BLANCO"),
    ("BARROCO GRIS", "msd-d107", "pared", "GRIS"),
    
    # Screenshot 2
    ("CRONOS", "mbd-d78", "piso", "NEGRO"),
    ("CHORONI", "mbd-d101", "pared", "MARRON"),
    ("GOTEADO ARENA", "msg-634", "piso", "BEIGE"),
    ("AZABACHE", "ml-002", "piso", "NEGRO"),
    ("CARIBE", "msd-v61", "piso", "BEIGE"),
    ("MARMOL CARRARA", "mbd-d24", "pared", "BLANCO"),
    ("MARMOL TRAVERTINO", "mbd-d25", "pared", "BEIGE"),
    ("SAN MARTIN OSCURO", "msg-v36", "piso", "NEGRO"),
    ("MARMOL CARRARA GRIS", "mbd-v68", "piso", "GRIS"),

    # Screenshot 3
    ("BLANCO ALPES", "ml-004", "pared", "BLANCO"),
    ("BRECCIA", "mbd-v100", "pared", "GRIS"),
    ("CARRARA MARQUES", "mbd-v17", "pared", "BLANCO"),
    ("PRIMAVERA AZUL", "mbd-v10", "pared", "AZUL"),
    ("MARMOL CARIBE", "mbd-v83", "pared", "GRIS"),
    ("AZABACHE PARED", "ml-v04", "pared", "NEGRO"),
    ("CARRARA OCRE", "mbd-v20", "pared", "BEIGE"),
    ("VENANZO", "mbd-v105", "piso", "GRIS"),
    ("CALACATTA", "mbd-v110", "piso", "GRIS"),
    ("ANELA", "mbd-v101", "piso", "BEIGE"),

    # Screenshot 4
    ("CARRARA OCRE 2", "mbd-802", "pared", "BEIGE"),
    ("RÚSTICO", "mr-002", "pared", "MARRON"),
    ("MARKO CONCRETO", "msd-v100", "pared", "BEIGE"),
    ("PRATO ROSSO", "mbd-v61", "pared", "ROSADO"),
    ("COLONIAL COTTO", "mbd-v75", "pared", "MARRON"),
    ("MONACO", "mbd-v14", "pared", "GRIS"),
    ("BABILONIA GRIS", "mbd-d106", "pared", "GRIS"),

    # Screenshot 5
    ("NOGAL NATURAL PARED", "msd-d08", "pared", "MARRON"),
    ("PLANICIE GRIS", "ml-d08", "pared", "GRIS"),
    ("CHORONI ARENA", "mbd-d98", "pared", "MARRON"),
    ("CUBO NIEVE", "ml-d10", "pared", "BLANCO"),
    ("CORCEL NEGRO", "mbd-d02", "piso", "NEGRO"),
    ("CHORONI MIEL", "mbd-v78", "piso", "BEIGE"),
    ("CAICO", "mr-d02", "piso", "MARRON"),
    ("MADERA FRESNO", "mbd-d21", "pared", "GRIS"),
    ("MADERA TECA GRIS", "mbd-d46", "pared", "GRIS"),
    ("MURALLA BROWN", "msd-v03", "piso", "MARRON"),
]

color_map = {
    "MARRON": "#8B5A2B",
    "GRIS": "#808080",
    "BEIGE": "#F5F5DC",
    "DORADO": "#FFD700",
    "BLANCO": "#FFFFFF",
    "NEGRO": "#000000",
    "AZUL": "#0000FF",
    "ROSADO": "#FFC0CB",
    "VERDE": "#008000"
}

output = ""
for nombre, sku, cat, color in products:
    color_hex = color_map.get(color, "#CCCCCC")
    formato = "FORMATO_60_60" if cat == "piso" else "FORMATO_60_30"
    
    code = f"""  {{
    id: '{sku.lower()}',
    nombre: '{nombre} (Cerámicas Caribe)',
    marca: 'Ceramicas Caribe',
    categoria: '{cat}',
    acabado: 'mate',
    formato_predeterminado: {formato},
    url_textura: '/texturas/{sku.lower()}.jpg',
    precio_m2: 15.00,
    propiedades_pbr: {{
      color_hex: '{color_hex}',
      rugosidad: 0.8,
      metalizado: 0.0,
    }},
  }},"""
    output += code + "\n"

# Escribir todo junto con el tag de cierre
with codecs.open("src/datos/catalogo_materiales.ts", "a", encoding="utf-8") as f:
    f.write(output + "];\n")
