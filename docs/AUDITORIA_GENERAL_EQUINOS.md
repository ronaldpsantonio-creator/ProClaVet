# Auditoría general del atlas equino — VETANATOMY 3D

- Fecha de inicio: 2026-11-10
- Rama de trabajo: audit/equinos-general-2026-11-10
- Rama base preservada: main (sin modificaciones)
- Alcance: revisar el catálogo equino, nomenclatura, clasificación por sistemas/capas, fichas, modelos 3D, referencias y funcionamiento del visor antes de iniciar bovinos o porcinos.

## 1. Línea base observada

En la revisión inicial de data/equino.json se encontraron 3,543 registros:

| Código | Sistema | Registros |
|---|---|---:|
| car | Cardiovascular | 594 |
| ske | Esquelético | 334 |
| mus | Muscular | 531 |
| dig | Digestivo | 131 |
| res | Respiratorio | 163 |
| ner | Nervioso | 1,305 |
| uri | Urinario | 68 |
| rep | Reproductor | 238 |
| teg | Tegumentario | 179 |
| | **Total** | **3,543** |

Distribución inicial por capa declarada en el JSON:

| Código | Registros |
|---|---:|
| org | 2,672 |
| oss | 205 |
| art | 135 |
| msu | 133 |
| mpr | 393 |
| fas | 5 |

La aplicación declara diez capas en el código del visor. La correspondencia entre los códigos de capa del JSON y las diez capas de interfaz debe auditarse; no asumir que la clasificación actual es correcta.

## 2. Hallazgos iniciales confirmados en el código y los datos

1. El catálogo tiene 3,543 entradas, pero el volumen de entradas no equivale a estructuras anatómicas verificadas ni a modelos 3D terminados.
2. En la muestra de datos revisada, solo una entrada declara una ruta GLB: models/equino/organs/equ.car.cor.001.glb. Debe comprobarse que el archivo exista, cargue y corresponda anatómicamente.
3. El código del visor incluye geometría esquemática provisional para algunos huesos. El propio código la identifica como simplificada y no anatómica real.
4. El código genera fichas a partir de s.ficha, pero en el recuento inicial no se encontraron fichas pobladas.
5. Hay documentos de pendientes para los sistemas nervioso, tegumentario y urinario/reproductor; sus listados deben convertirse en una matriz de verificación, no tratarse automáticamente como errores confirmados.
6. El código usa capas inicializadas y controles visuales independientes; debe verificarse que cada registro esté asignado a la capa anatómica correcta.
7. La nomenclatura latina, los nombres colectivos/individuales y las particularidades equinas requieren contraste con fuentes veterinarias de referencia antes de corregir datos.

## 3. Reglas de trabajo

- No sobrescribir ni alterar main durante la auditoría.
- Mantener esta rama como espacio de trabajo y registrar cada hallazgo con evidencia.
- No inventar estructuras, modelos, licencias, referencias ni datos anatómicos.
- Diferenciar claramente: confirmado, probable, pendiente de fuente y no evaluado.
- No eliminar registros solo por duplicidad aparente: primero comprobar lateralidad, sinónimos, niveles anatómicos y nomenclatura NAV.
- Priorizar fuentes anatómicas veterinarias fiables y documentar edición/página cuando sea posible.
- Antes de cualquier corrección de datos, conservar el estado previo y validar JSON y visor.

## 4. Fases de auditoría

### A. Integridad técnica del catálogo
- Validar JSON, esquema, campos obligatorios y tipos.
- Detectar IDs duplicados, IDs mal formados y códigos de sistema/capa inválidos.
- Detectar nombres ES/LA vacíos, repetidos o inconsistentes.
- Revisar lateralidad, sexo, grupos, niveles y relaciones entre registros.
- Comprobar rutas GLB y existencia real de los archivos.

### B. Auditoría anatómica por sistema
Orden de revisión propuesto:
1. Esquelético y articulaciones.
2. Muscular.
3. Cardiovascular.
4. Nervioso y órganos de los sentidos.
5. Digestivo.
6. Respiratorio.
7. Urinario.
8. Reproductor.
9. Tegumentario.
10. Endocrino, linfático, serosas y otras categorías si forman parte del alcance actual o deben incorporarse.

Para cada sistema se elaborará una lista de estructuras esperadas, existentes, ausentes, duplicadas y por verificar, con fuente de respaldo.

### C. Capas y visor
- Verificar correspondencia entre cada sistema y cada capa.
- Comprobar filtros, opacidad, aislamiento, selección, etiquetas, autoevaluación y vistas.
- Probar carga real de GLB, escala, orientación, centro, materiales y selección.
- Revisar experiencia en Android y escritorio.

### D. Fichas académicas y fuentes
- Definir plantilla de ficha por tipo de estructura.
- Completar datos solo cuando exista respaldo bibliográfico.
- Registrar referencias bibliográficas y licencias de modelos/recursos.

## 5. Primeros pendientes técnicos

- [ ] Validar integridad estructural de todo el JSON.
- [ ] Calcular IDs duplicados y nombres ES/LA repetidos.
- [ ] Verificar códigos de sistema y capa contra las constantes del visor.
- [ ] Comprobar todas las rutas de modelos y existencia de GLB.
- [ ] Analizar campos opcionales: ficha, sexo, grupo, lateralidad, relaciones y referencias.
- [ ] Crear matriz de auditoría anatómica por sistema.
- [ ] Revisar los documentos de pendientes existentes y consolidarlos sin perder detalle.

## 6. Estado

**Auditoría iniciada.** Los conteos y hallazgos de esta nota son una línea base preliminar obtenida de la revisión inicial del repositorio. No representan todavía una validación anatómica completa ni certifican que los 3,543 registros sean correctos o exhaustivos.


## 7. Resultados de la primera pasada técnica (2026-11-10)

### Integridad básica del JSON
- El archivo se parsea correctamente como JSON.
- Se encontraron 3,543 registros y todos tienen ID, nombre español y nombre latino.
- No se detectaron IDs duplicados.
- Todos los IDs revisados cumplen el patrón técnico actual: equ.<sistema>.<grupo>.<número> con sufijo opcional de lateralidad.
- No se detectaron códigos de sistema fuera de los nueve códigos declarados por la aplicación.
- No se detectaron códigos de capa fuera del conjunto de capas conocido por el visor.
- Los nombres españoles se repiten en 90 grupos y los latinos en 1,400 grupos. Los ejemplos revisados corresponden mayoritariamente a estructuras homónimas de miembros torácicos/pélvicos y a estructuras bilaterales. No se deben eliminar como duplicados sin comprobar el ID, región y lateralidad.

### Hallazgo prioritario: asignación de capas
Matriz observada de sistema por capa:

| Sistema | Capa | Registros |
|---|---|---:|
| Cardiovascular | org | 594 |
| Esquelético | oss | 205 |
| Esquelético | art | 129 |
| Muscular | msu | 133 |
| Muscular | mpr | 393 |
| Muscular | fas | 5 |
| Digestivo | org | 131 |
| Respiratorio | org | 157 |
| Respiratorio | art | 6 |
| Nervioso | org | 1,305 |
| Urinario | org | 68 |
| Reproductor | org | 238 |
| Tegumentario | org | 179 |

La interfaz declara capas específicas para piel (pel), sistema vascular (vas), sistema nervioso (ner) y cavidades (cav), pero actualmente no hay registros asignados a esas capas. Los 1,305 registros nerviosos y los 179 tegumentarios están todos en org. Los 594 cardiovasculares también están en org. Esto confirma una inconsistencia de clasificación que debe corregirse con revisión anatómica, no mediante reasignación automática sin inspección.

### Hallazgo prioritario: modelos 3D
- El único registro con ruta de modelo apunta a models/equino/organs/equ.car.cor.001.glb.
- La ruta no se pudo recuperar en GitHub (respuesta 404); por tanto, el archivo no está presente en esa ubicación de la rama auditada.
- docs/LICENCIAS.md declara que todavía no hay ningún modelo real incorporado.
- El marcador del corazón es provisional; no debe presentarse como un modelo anatómico real.
- Por ahora no hay evidencia de modelos GLB reales incorporados en el repositorio.

### Fichas
- Ninguno de los 3,543 registros tiene un objeto ficha poblado.
- La interfaz ya contiene una plantilla de 12 campos, pero los datos académicos todavía no están incorporados.

### Estado de estos hallazgos
- Confirmado: JSON válido, IDs únicos, campos básicos presentes, clasificación de capas observada, falta de ficha poblada, ruta GLB del corazón no encontrada y declaración de licencias sin modelos incorporados.
- Pendiente: decidir la clasificación anatómica correcta registro por registro; validar la exhaustividad y nomenclatura con atlas/NAV/Dyce; revisar duplicados aparentes según región/lateralidad; verificar comportamiento real del visor en dispositivos.
