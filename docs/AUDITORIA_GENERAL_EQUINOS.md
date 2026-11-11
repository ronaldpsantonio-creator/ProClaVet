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


## 8. Revisión de documentación de respaldo

- docs/FUENTES_VERIFICACION.md declara expresamente que el contenido sigue siendo borrador y que no sustituye la revisión contra la NAV 6.ª edición (2017) y atlas veterinarios.
- La tabla de fuentes combina material académico, artículos revisados por pares, manual clínico, fuentes secundarias y apuntes de baja confianza. Cada afirmación debe heredar el nivel de confianza de su fuente.
- Los borradores musculares de cabeza/cuello y miembro torácico indican que no tienen modelos 3D y que las capas y la nomenclatura requieren verificación.
- El documento muscular de cabeza/cuello declara que no es exhaustivo e identifica grupos aún no incluidos o asignados a otros sistemas.
- Los documentos de pendientes del sistema nervioso, tegumentario y urinario/reproductor reconocen que parte de sus nombres y estructuras se escribieron de memoria o desde WikiVet y aún no se contrastaron con la NAV.
- El sistema esquelético está descrito en el changelog como borrador con formas esquemáticas provisionales; el listado de articulaciones/ligamentos también se identifica como borrador sin formas 3D.

### Implicación para la auditoría anatómica
No se debe marcar un sistema como anatómicamente completo solo porque tenga un gran número de registros. La revisión se hará contra una fuente veterinaria primaria o académica de referencia, anotando por cada bloque qué fue confirmado, qué está ausente, qué requiere aclaración y qué no se pudo verificar. Los términos latinos deberán normalizarse según la nomenclatura veterinaria aplicable y respetar diferencias específicas del caballo.



## 9. Auditoría anatómica del cráneo equino — primera pasada (2026-11-10)

### Alcance y método
Se revisó el bloque inicial de estructuras craneales de `data/equino.json` en la rama `audit/equinos-general-2026-11-10`. La comparación preliminar se hizo con:
- Sisson, *A Text-book of Veterinary Anatomy* (1911), sección de osteología equina: cráneo, huesos del cráneo, cara y articulaciones craneales. Es una referencia histórica útil para el inventario descriptivo, pero no sustituye la NAV vigente.
- University of Minnesota, *CVM Large Animal Anatomy*, capítulo 10 “Head” (revisión primavera 2024), con descripciones equinas del cráneo, mandíbula, paladar, base craneal y particularidades de la especie.
- *Textbook of Veterinary Anatomy* (Elsevier, Dyce et al.), fragmento disponible sobre rasgos del cráneo equino, usado como contraste secundario.

### Inventario que ya aparece en el bloque craneal
El bloque revisado contiene 28 registros de huesos craneofaciales:
- Neurocráneo: occipital; basisfenoides; presfenoides; etmoides; interparietal; parietales (2); frontales (2); temporales (2).
- Viscerocráneo: nasales (2); lagrimales (2); cigomáticos (2); maxilares (2); incisivos/premaxilares (2); palatinos (2); pterigoides (2); vómer (1).
- Mandíbula: dos hemimandíbulas, una por lado.
Además, hay 6 registros de huesecillos auditivos: martillo, yunque y estribo, bilaterales. El bloque, por tanto, incluye los tres huesecillos de cada oído.

### Hallazgos preliminares
1. **Base del cráneo — nomenclatura a normalizar (pendiente):** el JSON registra “Basisfenoides” y “Presfenoides” como dos entradas. Es una separación anatómica descriptiva útil; debe comprobarse la forma latina y el tratamiento de las partes del hueso esfenoides según NAV, evitando duplicar un hueso compuesto o confundir partes adultas fusionadas con huesos independientes.
2. **Incisivo/premaxilar — nombre español a normalizar (probable):** la entrada “Incisivo” con latín `Os incisivum` corresponde al premaxilar. Recomendar “hueso incisivo (premaxilar)” para que el estudiante reconozca ambos términos, sujeto a la terminología española que se adopte.
3. **Mandíbula — representación razonable:** el uso de dos hemimandíbulas laterales es didácticamente válido; la ficha debe explicar que se unen rostralmente mediante la sínfisis mandibular y que en el adulto puede ocurrir sinostosis.
4. **Huesecillos auditivos — inventario completo en esta sección:** están representados martillo, yunque y estribo de ambos lados. No añadir “hueso orbicular” como cuarto huesecillo independiente sin justificación moderna; referencias antiguas pueden tratar el elemento lenticular como parte del yunque.
5. **Hioides — no localizado en el bloque craneal inspeccionado:** el aparato hioideo es parte importante de la anatomía de la cabeza equina, pero no aparece entre los registros craneales revisados. Antes de declararlo ausente del catálogo completo, se debe buscar en todo el JSON y comprobar si está registrado bajo otro grupo o sistema.
6. **Conchas/turbinados nasales — no localizados en el bloque craneal inspeccionado:** Sisson incluye concha/turbinal dorsal y ventral en el inventario facial. Se debe buscar en todo el catálogo, pues podrían estar clasificadas bajo respiratorio. No crear registros duplicados hasta completar esa búsqueda.
7. **Huesos pequeños/partes fusionadas:** verificar si el hueso interparietal se presenta como elemento independiente en la etapa/edad elegida y documentar la fusión con estructuras vecinas en el adulto. No asumir que cada centro de osificación persiste como hueso separado.
8. **Calidad de los registros:** los nombres craneales revisados carecen de ficha descriptiva, referencias, relaciones anatómicas y modelos 3D asociados. El inventario nominal no acredita todavía geometría anatómica ni contenido docente completo.

### Particularidades equinas que deben incluirse en fichas y láminas
- Órbita ósea completa.
- Cresta facial prominente, continuación rostral del arco cigomático.
- Escotadura nasoincisiva entre incisivo y nasal.
- Foramen infraorbitario y canal infraorbitario.
- Proceso supraorbitario y foramen supraorbitario.
- Fosa temporal relativamente poco profunda.
- Paladar duro formado principalmente por maxilares, con participación caudal de los palatinos.
- Cóanas separadas por el tabique nasal, con participación del vómer.
- Cóndilos occipitales y procesos paracondilares.
- Porciones escamosa, petrosa y mastoidea del temporal; incluir bulla timpánica y meato acústico externo como accidentes/partes, no como huesos independientes.
- Articulación temporomandibular y sínfisis mandibular.

Estas son estructuras y accidentes anatómicos que deben documentarse; no todas son huesos independientes ni deben convertirse automáticamente en registros de osteología.

### Matriz de estado del primer pase

| Elemento | Estado | Acción |
|---|---|---|
| Occipital, frontal, parietal, temporal | Presente | Verificar partes y accidentes |
| Esfenoides (base y presfenoides) | Presente, nomenclatura pendiente | Contrastar NAV y fusión |
| Etmoides e interparietal | Presente | Verificar límites y edad |
| Nasal, lagrimal, cigomático, maxilar | Presente bilateral | Revisar fichas y accidentes |
| Incisivo/premaxilar | Presente bilateral | Normalizar nombre visible |
| Palatino y pterigoides | Presente bilateral | Revisar procesos y láminas |
| Vómer | Presente | Documentar tabique nasal |
| Mandíbula | Presente como dos hemimandíbulas | Documentar sínfisis y procesos |
| Martillo, yunque, estribo | Presente bilateral | Mantener como huesecillos auditivos |
| Aparato hioideo | No visto en el bloque craneal | Buscar en catálogo completo |
| Conchas nasales dorsal/ventral | No vistas en el bloque craneal | Buscar en catálogo completo |
| Dientes/alvéolos | No incluidos en el bloque óseo revisado | Verificar ubicación y alcance del sistema digestivo |
| Suturas, forámenes, procesos, cavidades y senos | No son huesos independientes | Incorporar como accidentes/estructuras relacionadas en fichas |

### Conclusión provisional
El bloque craneal tiene una base de inventario razonable: incluye los principales huesos del neurocráneo y viscerocráneo, mandíbula y los seis huesecillos auditivos. Sin embargo, **no puede declararse completo**: falta comprobar en el catálogo completo el aparato hioideo y las conchas nasales, normalizar el tratamiento del esfenoides y del premaxilar, y añadir fichas académicas con particularidades equinas. Tampoco hay evidencia de modelos 3D craneales reales en esta revisión.

### Fuentes consultadas
- Sisson, S. (1911). *A Text-book of Veterinary Anatomy*. W. B. Saunders. Secciones “The Bones of the Skull”, “Bones of the Cranium”, “Bones of the Face” y “The Articulations of the Skull”. Texto disponible en Project Gutenberg: https://www.gutenberg.org/files/75996/75996-h/75996-h.htm
- University of Minnesota, College of Veterinary Medicine. *CVM Large Animal Anatomy*, capítulo 10 “Head”, revisión primavera 2024: https://open.lib.umn.edu/largeanimalanatomy/chapter/neck-head/
- Dyce, Sack & Wensing. *Textbook of Veterinary Anatomy*, capítulo de cráneo equino (fragmento de consulta): https://elsevier-elibrary.com/contents/fullcontent/58986/epubcontent_v2/OEBPS/B9781416066071000025.htm




## 10. Corroboración externa y corrección de hallazgos craneales (2026-11-10)

### Fuentes contrastadas
Se contrastó el inventario con el capítulo “10 Head” de *CVM Large Animal Anatomy* (University of Minnesota, revisión 2024), *Textbook of Veterinary Anatomy* (Dyce, Sack & Wensing; capítulos de cráneo, cavidad nasal y aparato hioideo), WikiVet (cráneo y aparato hioideo equinos), IVIS (enfermedades de cavidad nasal/senos paranasales) y el artículo primario de imagenología correlacionada del aparato hioideo equino (CT, micro-CT e histología; 2021). WikiVet se usa como fuente secundaria didáctica, no como autoridad única. La evidencia de anatomía aplicada y el artículo de imagenología tienen mayor peso para particularidades del caballo.

### Corrección importante: conchas nasales SÍ están en el catálogo
La primera pasada dijo que no se habían localizado en el bloque craneal. La búsqueda posterior en el JSON completo confirma que ya existen en el sistema respiratorio:
- `equ.res.cav.003-i/d`: concha nasal dorsal, bilateral.
- `equ.res.cav.004-i/d`: concha nasal ventral, bilateral.
- `equ.res.cav.005-i/d`: conchas etmoidales, bilateral.
- También aparecen registros de concha nasal media y senos conchales en el bloque respiratorio.
Por tanto, **no deben agregarse de nuevo**. La tarea pendiente es revisar nomenclatura, clasificación por capa (actualmente `org`) y relaciones anatómicas; confirmar si “conchas etmoidales” representa adecuadamente las endoturbinadas y si la concha media se está distinguiendo correctamente. WikiVet describe dorsal, media y ventral y los meatos; Dyce identifica dorsal, ventral, media y etmoidales. El capítulo de Minnesota describe conchas/turbinados bilaterales y sus funciones. La fuente IVIS confirma las conchas dorsal y ventral equinas y el patrón de meatos.

### Confirmación del aparato hioideo: ausencia de huesos, presencia de estructuras relacionadas
La búsqueda global de `data/equino.json` no encontró registros de los huesos del aparato hioideo (p. ej., basihioides, estilohioides, ceratohioides, tirohioides o epihioides/queratohioides como huesos). Sí encontró:
- Músculos hioideos en el sistema muscular.
- Dos registros de articulación tirohioidea en el sistema respiratorio.
- Ramas nerviosas estilohioideas en el sistema nervioso.
Esto no equivale a tener representado el aparato óseo. Se confirma como **ausencia del inventario óseo actual**, no como ausencia anatómica del caballo.
El aparato equino comprende pares de tympanohyoid, stylohyoid, epihyoid y ceratohyoid, además del basihyoid impar con procesos thyrohyoid; la literatura describe que el epihyoid puede fusionarse tempranamente con el stylohyoid. El basihyoid posee un proceso lingual prominente. Se debe modelar con cautela, reflejando la fusión y la variación descriptas, y distinguir hueso de cartílago tympanohyoid.

### Confirmaciones del cráneo equino
La fuente universitaria de Minnesota confirma:
- Órbita con anillo óseo completo.
- Arco cigomático que continúa rostralmente como cresta facial.
- Escotadura nasoincisiva.
- Foramen infraorbitario y canal infraorbitario.
- Fosa temporal relativamente poco profunda.
- Paladar duro principalmente maxilar, con borde caudal palatino; vómer en la formación del tabique nasal.
- Cóndilos occipitales y procesos paracondilares.
- Mandíbula bilateral unida por sínfisis mandibular; procesos coronoides y condilares y articulación temporomandibular.
- Base craneal ventral con basioccipital y basisfenoides, separados en animales jóvenes por la sincondrosis esfeno-occipital, que se fusiona con la edad.

### Ajustes necesarios al primer informe
1. Se corrige la afirmación de que las conchas nasales no estaban en el catálogo: sí están, dentro del sistema respiratorio.
2. Se mantiene la conclusión de que el aparato hioideo óseo no está registrado como tal, aunque existen músculos y articulación relacionada.
3. El catálogo registra basisfenoides y presfenoides, pero la fuente de Minnesota destaca basioccipital y basisfenoides para la base ventral del cráneo; se requiere verificar si el registro actual está omitiendo basioccipital como hueso separado y cómo se debe representar presfenoides según NAV/edad.
4. La afirmación de que el hueso interparietal podría persistir como pieza separada requiere revisión específica: WikiVet señala particularidades equinas en la fusión del interparietal; no asumir una regla sin edad y fuente anatómica explícitas.

### Decisión de auditoría
- Conchas nasales: presentes; no duplicar.
- Aparato hioideo óseo: ausente del catálogo como inventario; agregar a la matriz de faltantes.
- Accidentes craneales y particularidades: mantener como contenido de fichas/relaciones, no convertir automáticamente en huesos.
- Nomenclatura de base craneal, hueso interparietal y clasificación de capas: pendiente de cotejo final con NAV y atlas anatómico de referencia.

### Referencias web
- University of Minnesota, CVM Large Animal Anatomy, “10 Head” (revised Spring 2024): https://open.lib.umn.edu/largeanimalanatomy/chapter/neck-head/
- Dyce, Sack & Wensing, *Textbook of Veterinary Anatomy*, capítulo de cráneo equino: https://elsevier-elibrary.com/contents/fullcontent/58986/epubcontent_v2/OEBPS/B9781416066071000025.htm
- Dyce, Sack & Wensing, *Textbook of Veterinary Anatomy*, cavidad nasal y senos paranasales: https://elsevier-elibrary.com/contents/fullcontent/58986/epubcontent_v2/OEBPS/B9781416066071000256.htm
- Dyce, Sack & Wensing, *Textbook of Veterinary Anatomy*, aparato hioideo/laringe: https://elsevier-elibrary.com/contents/fullcontent/58986/epubcontent_v2/OEBPS/B9781416066071000049.htm
- “Correlated Imaging of the Equine Hyoid Apparatus Using CT, Micro-CT, and Histology” (2021): https://pmc.ncbi.nlm.nih.gov/articles/PMC8287096/
- WikiVet, “Hyoid Apparatus – Anatomy & Physiology”: https://en.wikivet.net/Hyoid_Apparatus_-_Anatomy_%26_Physiology
- WikiVet, “Equine Upper Respiratory Tract – Horse Anatomy”: https://en.wikivet.net/index.php?title=Equine_Upper_Respiratory_Tract_-_Horse_Anatomy
- IVIS, “Diseases of the Nasal Cavities and Paranasal Sinuses”: https://www.ivis.org/library/equine-respiratory-diseases/diseases-of-nasal-cavities-and-paranasal-sinuses


## 11. Incorporación controlada del inventario craneal faltante (2026-11-10)

Se actualizó `data/equino.json` únicamente en la rama de auditoría `audit/equinos-general-2026-11-10`. Antes de insertar, se volvió a consultar el catálogo completo y se comprobó que los IDs nuevos no existieran.

### Registros incorporados
Se añadieron 10 registros óseos:
- `equ.ske.cra.018`: basioccipital (porción basilar del occipital), para representar explícitamente la región/bone element de la base craneal que la fuente universitaria distingue del basisfenoides. Su separación anatómica debe interpretarse con la edad: la sincondrosis esfeno-occipital se fusiona durante el desarrollo.
- `equ.ske.hyo.001`: basihioides, impar.
- `equ.ske.hyo.002-i/d`: tirohioides, pares.
- `equ.ske.hyo.003-i/d`: ceratohioides, pares.
- `equ.ske.hyo.004-i/d`: estilohioides, pares.
- `equ.ske.hyo.005-i/d`: epihioides, pares; la ficha debe advertir que pueden fusionarse tempranamente con los estilohioides.

Todos los registros nuevos usan `sys: "ske"` y `layer: "oss"`, coherentes con el inventario óseo existente. No se agregaron duplicados de conchas nasales, huesecillos auditivos, mandíbula ni huesos faciales ya presentes.

### Estructura deliberadamente no añadida como hueso
El tympanohyoid/tympanohyoid cartilage conecta el proceso estiloides del temporal con el estilohioides. Las fuentes de imagenología equina lo describen como cartílago (fibrocartílago en el estudio de 2021; cartílago hialino en la serie de TC publicada en 2025). Por ello no se incorporó como registro óseo en la capa `oss`. Debe documentarse como estructura cartilaginosa/elemento de unión en una ficha del aparato hioideo cuando el modelo de datos permita clasificarlo correctamente.

### Pendientes que no deben resolverse por duplicación
- El hueso interparietal requiere ficha con advertencia de fusión/variación relacionada con edad; no debe suponerse una pieza independiente constante en adultos.
- Basisfenoides y presfenoides ya están en el catálogo. Se conservan; falta documentar sus partes, relaciones y desarrollo.
- Las conchas nasales dorsal, media, ventral y etmoidales ya existen en el bloque respiratorio; no se duplicaron. La capa y la ubicación funcional en el visor requieren revisión posterior.
- El registro general “Occipital” se conserva. El nuevo basioccipital permite detallar la porción basilar/elemento de desarrollo sin eliminar el registro general; las fichas deberán explicar la fusión con el resto del occipital según edad.

### Verificación y alcance
La actualización añade registros al catálogo de datos, no modelos GLB ni fichas descriptivas completas. La mera presencia en JSON no demuestra que cada estructura ya se visualice como geometría anatómica 3D. Antes de cerrar el cráneo se debe probar el visor, revisar filtros/capas y completar fichas con descripción, ubicación, articulaciones, relaciones y variaciones por edad.

### Fuentes de corroboración
- University of Minnesota, *CVM Large Animal Anatomy*, “Head”: https://pressbooks.umn.edu/largeanimalanatomy/chapter/neck-head/ — distingue basioccipital y basisfenoides y describe la sincondrosis esfeno-occipital, además del aparato hioideo equino.
- “Correlated Imaging of the Equine Hyoid Apparatus Using CT, Micro-CT, and Histology” (2021): https://pmc.ncbi.nlm.nih.gov/articles/PMC8287096/ — describe los elementos pares/impares del aparato y la fusión temprana del epihioides con el estilohioides.
- “Computed tomographic signs of hyoid apparatus disease in 165 horses” (2025): https://pmc.ncbi.nlm.nih.gov/articles/PMC12492637/ — corrobora componentes, articulaciones y naturaleza cartilaginosa del tympanohyoid.
- Dyce, Sack & Wensing, *Textbook of Veterinary Anatomy*, capítulo de cráneo equino: https://elsevier-elibrary.com/contents/fullcontent/58986/epubcontent_v2/OEBPS/B9781416066071000025.htm


## 12. Integración provisional de nuevas estructuras en el visor (2026-11-10)

Se actualizó `js/app.js` en la rama de auditoría para que las diez incorporaciones del basioccipital y del aparato hioideo no queden sin representación esquemática en el visor:

- Basioccipital: geometría esquemática provisional asociada a `equ.ske.cra.018`.
- Basihioides, tirohioides bilaterales, ceratohioides bilaterales, estilohioides bilaterales y epihioides bilaterales: segmentos esquemáticos provisionales asociados a sus IDs `equ.ske.hyo.*`.
- Se añadió color de representación para el grupo hioideo.
- Las estructuras permanecen en el sistema esquelético y capa ósea; el visor las carga desde el catálogo y permite seleccionarlas en la lista.

**Limitación importante:** estas geometrías son marcadores didácticos esquemáticos y no modelos anatómicos 3D validados. No representan con precisión escala, curvatura, articulaciones, inserciones ni variación/fusión de los componentes hioideos. El tympanohyoid no se representó como hueso. Las fichas anatómicas completas y los modelos GLB verificados siguen pendientes.

**Verificación realizada:** se volvió a leer el archivo actualizado desde la rama y se confirmó la presencia de las ramas de geometría para basioccipital e hioides. Falta probar el comportamiento visual en navegador móvil y escritorio antes de considerar esta integración validada.
