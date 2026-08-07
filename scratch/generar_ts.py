import re

raw_data = """
Sal soluble plain ivory
Fabricante: ITACA
Precio por m²: Ref 23.90
Precio por caja: Ref 34.42
Medidas: 60x60
Contenido: Caja 4 piezas
Cubre: 1.44 m²

Sal soluble siena
Fabricante: ITACA
Precio por m²: Ref 23.90
Precio por caja: Ref 34.42
Medidas: 60x60
Contenido: Caja 4 piezas
Cubre: 1.44 m²

Florim gold
Fabricante: ITACA
Precio por m²: Ref 29.00
Precio por caja: Ref 41.76
Medidas: 60x60
Contenido: Caja 4 piezas
Cubre: 1.44 m²

Mexima onyx
Fabricante: ITACA
Precio por m²: Ref 29.00
Precio por caja: Ref 41.76
Medidas: 60x60
Contenido: Caja 4 piezas
Cubre: 1.44 m²

Hexa onyx gold
Fabricante: ITACA
Precio por m²: Ref 37.00
Precio por caja: Ref 53.28
Medidas: 60x60
Contenido: Caja 4 piezas
Cubre: 1.44 m²

Xtreme negro
Fabricante: ITACA
Precio por m²: Ref 37.00
Precio por caja: Ref 53.28
Medidas: 60x60
Contenido: Caja 4 piezas
Cubre: 1.44 m²

Saint laurent
Fabricante: ITACA
Precio por m²: Ref 37.00
Precio por caja: Ref 53.28
Medidas: 60x60
Contenido: Caja 4 piezas
Cubre: 1.44 m²

Nero marquina
Fabricante: ITACA
Precio por m²: Ref 37.00
Precio por caja: Ref 53.28
Medidas: 60x60
Contenido: Caja 4 piezas
Cubre: 1.44 m²

Hera dune
Fabricante: Palo rosa
Precio por m²: Ref 29.00
Precio por caja: Ref 41.76
Medidas: 60x60
Contenido: Caja 4 piezas
Cubre: 1.44 m²

Belfast gris
Fabricante: Palo rosa
Precio por m²: Ref 29.00
Precio por caja: Ref 41.76
Medidas: 60x60
Contenido: Caja 4 piezas
Cubre: 1.44 m²

Block blanco
Fabricante: Palo rosa
Precio por m²: Ref 29.00
Precio por caja: Ref 41.76
Medidas: 60x60
Contenido: Caja 4 piezas
Cubre: 1.44 m²

Block beige
Fabricante: Palo rosa
Precio por m²: Ref 29.00
Precio por caja: Ref 41.76
Medidas: 60x60
Contenido: Caja 4 piezas
Cubre: 1.44 m²

Black onyx beauty
Fabricante: ITACA
Precio por m²: Ref 39.00
Precio por caja: Ref 56.16
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Marquina gold
Fabricante: ITACA
Precio por m²: Ref 39.00
Precio por caja: Ref 56.16
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Eagele nero
Fabricante: ITACA
Precio por m²: Ref 39.00
Precio por caja: Ref 56.16
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Marquina black
Fabricante: ITACA
Precio por m²: Ref 39.00
Precio por caja: Ref 56.16
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Negro marquina XL
Fabricante: Palo rosa
Precio por m²: Ref 49.00
Precio por caja: Ref 70.56
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Mallorca gris
Fabricante: Carabobo
Precio por m²: Ref 23.00
Precio por caja: Ref 32.66
Medidas: 59.4x119.4
Contenido: Caja 2 piezas
Cubre: 1.42 m²

Body basald stone white
Fabricante: Ilegible (Probablemente ITACA)
Precio por m²: Ref 39.00
Precio por caja: Ilegible
Medidas: Ilegible (Formato 60x120)
Contenido: Ilegible (Seguramente 2 piezas)
Cubre: 1.44 m² (Estimado por el formato estándar)

GHR Body archie bianco
Fabricante: ITACA
Precio por m²: Ref 39.00
Precio por caja: Ref 56.16
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Calacatta green endles
Fabricante: ITACA
Precio por m²: Ref 29.00
Precio por caja: Ref 41.76
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Verona beige
Fabricante: Palo rosa
Precio por m²: Ref 35.00
Precio por caja: Ref 75.60
Medidas: 60x120
Contenido: Caja 3 piezas
Cubre: 2.16 m²

Mallorca gris (Repetido del nro 18)
Fabricante: Carabobo
Precio por m²: Ref 23.00
Precio por caja: Ref 32.66
Medidas: 59.4x119.4
Contenido: Caja 2 piezas
Cubre: 1.42 m²

Kachori gold
Fabricante: ITACA
Precio por m²: Ref 39.00
Precio por caja: Ref 56.16
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Smoke gold
Fabricante: ITACA
Precio por m²: Ref 39.00
Precio por caja: Ref 56.16
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Siena gold
Fabricante: Palo rosa
Precio por m²: Ref 35.00
Precio por caja: Ref 50.40
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Macline art green
Fabricante: ITACA
Precio por m²: Ref 39.00
Precio por caja: Ref 56.16
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Loira olivo
Fabricante: Domosa
Precio por m²: Ref 35.00
Precio por caja: Ref 56.16
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Falconer aqua
Fabricante: ITACA
Precio por m²: Ref 39.00
Precio por caja: Ref 56.16
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Taica art aqua
Fabricante: ITACA
Precio por m²: Ref 39.00
Precio por caja: Ref 56.16
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Smoke aqua
Fabricante: ITACA
Precio por m²: Ref 39.00
Precio por caja: Ref 56.16
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Torso bianco
Fabricante: ITACA
Precio por m²: Ref 29.00
Precio por caja: Ref 41.76
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Statuario sipani
Fabricante: ITACA
Precio por m²: Ref 29.00
Precio por caja: Ref 41.76
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Carrara grey
Fabricante: ITACA
Precio por m²: Ref 29.00
Precio por caja: Ref 41.76
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Medici Gris
Fabricante: Palo rosa
Precio por m²: Ref 35.00
Precio por caja: Ref 50.40
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Plain white
Fabricante: ITACA
Precio por m²: Ref 29.00
Precio por caja: Ref 41.76
Medidas: 60x120
Contenido: Caja 2 piezas
Cubre: 1.44 m²

Genova gris
Fabricante: Balgres
Precio por m²: Ref 21.11
Precio por caja: Ref 43.70
Medidas: 36x48
Contenido: Caja 12 piezas
Cubre: 2.07 m²

Genova rosa
Fabricante: Balgres
Precio por m²: Ref 19.00
Precio por caja: Ref 39.33
Medidas: 36x48
Contenido: Caja 12 piezas
Cubre: 2.07 m²

Marble blue
Fabricante: Caribe
Precio por m²: Ref 21.00
Precio por caja: Ref 38.85
Medidas: 43x43
Contenido: Caja 10 piezas
Cubre: 1.85 m²

Carrara marquez
Fabricante: Caribe
Precio por m²: Ref 23.00
Precio por caja: Ref 42.55
Medidas: 43x43
Contenido: Caja 10 piezas
Cubre: 1.85 m²

Calacatta
Fabricante: Caribe
Precio por m²: Ref 23.00
Precio por caja: Ref 42.55
Medidas: 43x43
Contenido: Caja 10 piezas
Cubre: 1.85 m²

Anela
Fabricante: Caribe
Precio por m²: Ref 23.00
Precio por caja: Ref 42.55
Medidas: 43x43
Contenido: Caja 10 piezas
Cubre: 1.85 m²

Lys horse
Fabricante: Caribe
Precio por m²: Ref 21.00
Precio por caja: Ref 38.85
Medidas: 43x43
Contenido: Caja 10 piezas
Cubre: 1.85 m²

Marmol brandt beige
Fabricante: Ilegible (Asumido Caribe por la serie)
Precio por m²: Ref 23.00
Precio por caja: Ilegible
Medidas: Ilegible (Formato 43x43)
Contenido: Ilegible (Seguramente 10 piezas)
Cubre: 1.85 m² (Estimado por la serie Caribe de ese estante)

Madera teca (Calidad 2da)
Fabricante: Caribe
Precio por m²: Ref 16.00
Precio por caja: Ref 29.60
Medidas: 43x43
Contenido: Caja 10 piezas
Cubre: 1.85 m²

Patagonia
Fabricante: Caribe
Precio por m²: Ref 23.00
Precio por caja: Ref 42.55
Medidas: 43x43
Contenido: Caja 10 piezas
Cubre: 1.85 m²

Madera teca (Calidad 1era)
Fabricante: Caribe
Precio por m²: Ref 18.00
Precio por caja: Ref 33.30
Medidas: 43x43
Contenido: Caja 10 piezas
Cubre: 1.85 m²

Choroni miel
Fabricante: Caribe
Precio por m²: Ref 16.00
Precio por caja: Ref 29.60
Medidas: 43x43
Contenido: Caja 10 piezas
Cubre: 1.85 m²

Atenas beige
Fabricante: Caribe
Precio por m²: Ref 21.00
Precio por caja: Ref 38.85
Medidas: 43x43
Contenido: Caja 10 piezas
Cubre: 1.85 m²
"""

blocks = raw_data.strip().split("\n\n")

ts_objects = []
seen = set()

for block in blocks:
    lines = [l.strip() for l in block.split("\n") if l.strip()]
    if len(lines) < 7: continue
    
    nombre = lines[0]
    
    if "(Repetido" in nombre:
        continue
        
    fab_match = re.search(r"Fabricante:\s*(.+)", lines[1])
    precio_m2_match = re.search(r"Precio por m²:.*?(\d+\.\d+)", lines[2])
    precio_caja_match = re.search(r"Precio por caja:.*?(\d+\.\d+)", lines[3])
    medidas_match = re.search(r"Medidas:.*?(\d+(\.\d+)?)x(\d+(\.\d+)?)", lines[4])
    contenido_match = re.search(r"Contenido:.*?(\d+)\s*piezas", lines[5])
    cubre_match = re.search(r"Cubre:.*?(\d+\.\d+)", lines[6])
    
    if not (fab_match and precio_m2_match and medidas_match and contenido_match and cubre_match):
        print("Falla:", lines)
        continue
        
    marca = fab_match.group(1).replace("Ilegible (Probablemente ITACA)", "ITACA").replace("Ilegible (Asumido Caribe por la serie)", "Ceramicas Caribe")
    if marca.lower() == "caribe":
        marca = "Ceramicas Caribe"
    
    precio_m2 = float(precio_m2_match.group(1))
    
    ancho = float(medidas_match.group(1))
    largo = float(medidas_match.group(3))
    # Estandarizar a centimetros para crear el formato
    if ancho > 100 or largo > 100:
        formato_w = int(ancho)
        formato_h = int(largo)
    else:
        formato_w = int(ancho)
        formato_h = int(largo)
        
    # Las medidas más grandes siempre primero en el nombre del formato por convención
    fmt_str = f"FORMATO_{max(formato_w, formato_h)}_{min(formato_w, formato_h)}"
    if max(formato_w, formato_h) == 119 and min(formato_w, formato_h) == 59:
        fmt_str = "FORMATO_120_60" # Estandarizar Mallorca Gris
    if max(formato_w, formato_h) == 48 and min(formato_w, formato_h) == 36:
        fmt_str = "FORMATO_48_36"
    if formato_w == 43:
        fmt_str = "FORMATO_43_43"

    unidades = int(contenido_match.group(1))
    cubre = float(cubre_match.group(1))
    
    id_name = re.sub(r'[^a-z0-9]+', '-', nombre.lower().replace("(calidad 1era)", "").replace("(calidad 2da)", "")).strip('-')
    
    if id_name in seen: continue
    seen.add(id_name)
    
    # Determinar si es piso o pared. Si es 43x43 de Caribe, suele ser piso/pared. Si es 120x60 ITACA, suele ser piso.
    # Asignaremos piso por defecto, el usuario lo puede ajustar. 
    categoria = "piso"
    
    # Buscar color_hex genérico
    color = "#DDDDDD"
    if "negro" in nombre.lower() or "black" in nombre.lower() or "nero" in nombre.lower() or "azabache" in nombre.lower():
        color = "#111111"
    elif "blanco" in nombre.lower() or "white" in nombre.lower() or "bianco" in nombre.lower():
        color = "#F5F5F5"
    elif "gris" in nombre.lower() or "grey" in nombre.lower():
        color = "#808080"
    elif "beige" in nombre.lower() or "arena" in nombre.lower() or "ivory" in nombre.lower():
        color = "#F5F5DC"
    elif "verde" in nombre.lower() or "green" in nombre.lower() or "olivo" in nombre.lower() or "aqua" in nombre.lower():
        color = "#A3A69C"
    elif "azul" in nombre.lower() or "blue" in nombre.lower():
        color = "#0000FF"
    elif "miel" in nombre.lower() or "nogal" in nombre.lower() or "teca" in nombre.lower() or "madera" in nombre.lower() or "cotto" in nombre.lower():
        color = "#8B5A2B"
    elif "gold" in nombre.lower():
        color = "#DAA520"

    ts_code = f"""
  {{
    id: '{id_name}',
    nombre: '{nombre.strip()}',
    marca: '{marca.strip()}',
    categoria: '{categoria}',
    acabado: 'pulido', // Asignado por defecto
    formato_predeterminado: {fmt_str},
    url_textura: '/texturas/{id_name}.jpg',
    precio_metro_cuadrado: {precio_m2:.2f},
    rendimiento_caja_m2: {cubre},
    unidades_por_caja: {unidades},
    propiedades_pbr: {{
      color_hex: '{color}',
      rugosidad: 0.1,
      metalicidad: 0.0,
      capa_brillo: 1.0,
      mapa_normal_intensidad: 0.0,
    }},
  }},"""
    ts_objects.append(ts_code)

print("".join(ts_objects))
