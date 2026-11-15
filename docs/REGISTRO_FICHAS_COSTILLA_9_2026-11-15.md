# Fichas anatómicas — Costilla 9 equina

**Fecha de incorporación:** 15 de noviembre de 2026  
**Estado del contenido:** fichas incorporadas; pendientes de revisión y confirmación por el usuario.  
**Verificación anterior:** Costilla 8 izquierda y derecha confirmadas por el usuario el 15 de noviembre de 2026.  
**Modelo 3D:** no certificado por la revisión de las fichas.

## Verificación registrada
- `equ.ske.cos.008-i` — Costilla 8 izquierda: ficha verificada por confirmación expresa del usuario.
- `equ.ske.cos.008-d` — Costilla 8 derecha: ficha verificada por confirmación expresa del usuario.

La verificación corresponde al contenido textual y no certifica la geometría ni la visualización del modelo 3D.

## Estructuras incorporadas
- `equ.ske.cos.009-i` — Costilla 9 izquierda.
- `equ.ske.cos.009-d` — Costilla 9 derecha.

Cada ficha incluye los 12 campos del protocolo ProClaVet: ubicación, descripción, relaciones, accidentes, articulaciones, inserciones, irrigación, inervación, función, especie, clínica y referencias.

## Criterios anatómicos y de calidad
- En el caballo se describen habitualmente 18 pares de costillas: las primeras ocho son esternales y la novena es la primera asternal.
- El cartílago de la novena costilla participa en el arco costal; no se describe como unido directamente al esternón.
- Se mantiene la lateralidad sin inventar diferencias anatómicas entre lados.
- Los detalles de facetas costovertebrales y segmentación neurovascular se expresan con cautela cuando requieren cotejo en atlas o espécimen equino.
- No se inventan inserciones puntuales ni ramas arteriales intraóseas.
- La ficha textual no valida el modelo 3D.

## Integración técnica
- Archivo: `data/fichas_costillas_9.json`.
- El cargador incorpora las fichas suplementarias de Costillas 7, 8 y 9.
- El service worker precarga el nuevo archivo y utiliza una versión de caché nueva.

## Referencias
1. Dyce, K. M., Sack, W. O. y Wensing, C. J. G. *Textbook of Veterinary Anatomy*, 5.ª ed., secciones sobre costillas, esternón y tórax del caballo.
2. Budras, K.-D., Sack, W. O. y Röck, S. *Anatomy of the Horse*, 6.ª ed., esqueleto axial y región torácica.
3. University of Minnesota. *Large Animal Anatomy: Neck and Thorax*. https://pressbooks.umn.edu/largeanimalanatomy/chapter/thorax/.
4. NC State University. *A Guided Tour of Veterinary Anatomy*, capítulo 3: The Thorax.
