# Fichas anatómicas — Costilla 11 equina

**Fecha:** 15 de noviembre de 2026  
**Estado:** fichas incorporadas; pendientes de revisión y confirmación del usuario.  
**Verificación registrada:** Costilla 10 izquierda y derecha confirmadas por el usuario el 15 de noviembre de 2026.  
**Modelo 3D:** no certificado por la verificación del contenido textual.

## Verificación
- `equ.ske.cos.010-i` — Costilla 10 izquierda: ficha verificada por confirmación expresa del usuario.
- `equ.ske.cos.010-d` — Costilla 10 derecha: ficha verificada por confirmación expresa del usuario.

Esta confirmación se refiere a las fichas textuales y no certifica geometría ni visualización 3D.

## Fichas incorporadas
- `equ.ske.cos.011-i` — Costilla 11 izquierda.
- `equ.ske.cos.011-d` — Costilla 11 derecha.

Ambas fichas contienen los 12 campos del protocolo ProClaVet: ubicación, descripción, relaciones, accidentes, articulaciones, inserciones, irrigación, inervación, función, especie, clínica y referencias.

## Criterios anatómicos
- El caballo presenta habitualmente 18 pares de costillas; las primeras ocho son esternales y de la novena a la decimoctava son asternales.
- La undécima costilla es asternal; su cartílago participa en el arco costal y no se une directamente al esternón.
- Se conserva la lateralidad de cada ficha sin inventar diferencias morfológicas entre lados.
- Se describen con cautela los detalles articulares y neurovasculares que requieren cotejo con atlas o espécimen equino.
- No se inventan inserciones musculares puntuales ni ramas arteriales intraóseas.
- La incorporación de fichas no implica validación del modelo 3D.

## Integración técnica
- Archivo: `data/fichas_costillas_11.json`.
- El cargador integra las fichas suplementarias de Costillas 7, 8, 9, 10 y 11.
- El service worker precarga el archivo nuevo y actualiza la versión de caché.

## Referencias
1. Dyce, K. M., Sack, W. O. y Wensing, C. J. G. *Textbook of Veterinary Anatomy*, 5.ª ed., secciones sobre costillas, esternón y tórax del caballo.
2. Budras, K.-D., Sack, W. O. y Röck, S. *Anatomy of the Horse*, 6.ª ed., esqueleto axial y región torácica.
3. University of Minnesota. *Large Animal Anatomy: Neck and Thorax*. https://pressbooks.umn.edu/largeanimalanatomy/chapter/thorax/.
4. NC State University. *A Guided Tour of Veterinary Anatomy*, capítulo 3: The Thorax.
