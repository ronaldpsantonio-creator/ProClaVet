# VetAnatomy 3D
Aplicación web (PWA) gratuita de anatomía veterinaria 3D. Estado: **Fase 2** (visor y controles).

## Publicar en GitHub Pages
Subir todos los archivos a un repositorio público, luego Settings → Pages → rama `main`, carpeta `/ (root)`.

## Agregar modelos
Cada estructura de `data/equino.json` indica su archivo en `model`. Colocar el GLB con ese nombre (ID de la estructura) y la app lo carga sola. Los marcadores provisionales solo ocupan el lugar de los modelos que faltan.
Todos los GLB de una especie deben compartir el mismo sistema de coordenadas. Documentar procedencia y licencia en `docs/LICENCIAS.md`.

## Rellenar una ficha
Añadir en la estructura un objeto `"ficha"` con las claves: ubicacion, descripcion, relaciones, accidentes, articulaciones, inserciones, irrigacion, inervacion, funcion, especie, clinica, referencias. Solo datos verificados y con referencia.
