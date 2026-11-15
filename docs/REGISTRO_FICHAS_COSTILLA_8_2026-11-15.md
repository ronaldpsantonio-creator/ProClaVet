# Fichas anatómicas — Costilla 8 equina

**Fecha de incorporación:** 15 de noviembre de 2026  
**Estado del contenido:** fichas incorporadas; pendientes de revisión y confirmación por el usuario.  
**Modelo 3D:** no certificado por la incorporación de la ficha.

## Estructuras incorporadas
- `equ.ske.cos.008-i` — Costilla 8 izquierda.
- `equ.ske.cos.008-d` — Costilla 8 derecha.

Cada ficha contiene ubicación, descripción, relaciones, accidentes anatómicos, articulaciones, inserciones, irrigación, inervación, función, particularidades equinas, importancia clínica y referencias.

## Criterios anatómicos y de calidad
- En el caballo se describen habitualmente 18 pares de costillas; las primeras ocho son esternales o verdaderas. La octava es, por tanto, la última costilla esternal equina y su cartílago se une directamente al esternón.
- Se conserva la lateralidad y no se presuponen diferencias morfológicas izquierda/derecha sin evidencia.
- La articulación costovertebral y el número segmentario exacto de las estructuras neurovasculares se dejan formulados con cautela cuando requieren cotejo específico en un espécimen o atlas equino.
- No se inventan inserciones musculares puntuales ni ramas vasculares intraóseas no documentadas.
- La revisión de la ficha textual no certifica el modelo 3D.

## Integración técnica
- Archivo de datos: `data/fichas_costillas_8.json`.
- El cargador de la aplicación combina las fichas suplementarias de Costilla 7 y Costilla 8 con el catálogo anatómico.
- El service worker incluye el nuevo archivo en la precarga y actualiza la versión de caché.

## Referencias
1. Dyce, K. M., Sack, W. O. y Wensing, C. J. G. *Textbook of Veterinary Anatomy*, 5.ª ed., “The Ribs and Sternum” y “The Thorax of the Horse”. [Costillas y esternón](https://elsevier-elibrary.com/contents/fullcontent/58986/epubcontent_v2/OEBPS/B9781416066071000025.htm); [tórax del caballo](https://elsevier-elibrary.com/contents/fullcontent/58986/epubcontent_v2/OEBPS/B9781416066071000207.htm).
2. University of Minnesota. *Large Animal Anatomy: Neck and Thorax*. [Capítulo de tórax](https://pressbooks.umn.edu/largeanimalanatomy/chapter/thorax/).
3. NC State University. *A Guided Tour of Veterinary Anatomy*, capítulo 3: The Thorax. [Recurso académico](https://repository.lib.ncsu.edu/server/api/core/bitstreams/6051847d-f70e-4cb3-a0e2-088c9c0254eb/content).
4. Budras, K.-D., Sack, W. O. y Röck, S. *Anatomy of the Horse*, 6.ª ed., región torácica y esqueleto axial.
