# XDAW Academy

Web independiente en español para `AnymuzzOps/xdawacademy`, compatible con GitHub Pages bajo `/xdawacademy/` y con el futuro dominio `xdawacademy.cl`. HTML, CSS y JavaScript nativos, sin dependencias de ejecución.

## Diseño implementado

La Home reproduce la composición de las dos capturas Desktop/Mobile facilitadas, sin usar las capturas como imágenes de fondo:

- Header negro con logo tipográfico a la izquierda, navegación compacta y CTA cian en PC. Logo y menú desplegable en móvil.
- Hero fotográfico completo, degradado oscuro a la izquierda, titular «TRANSFORMA MOVIMIENTO EN LIDERAZGO», tres líneas y acento cian. En móvil, foto arriba y contenido debajo, con ambos botones a todo el ancho.
- Franja cian con tres mensajes en PC; mensaje «MUEVE. EXPRESA. LIDERA.» y flecha en móvil.
- Metodología con tres pilares editoriales a la izquierda y foto a la derecha. En móvil: introducción, foto y pilares.
- Recorrido sobre blanco cálido, cuatro etapas con conectores horizontales en PC y verticales en móvil.
- Panel compacto de futuras formaciones, sin fechas, precios ni certificaciones anunciadas como disponibles.
- Comunidad con foto grande a la izquierda y texto/origen de Klaudio Reies a la derecha; apilado intencional en móvil.
- Contacto cian completo, titular a la izquierda y formulario a la derecha; campos en una columna en móvil.
- Footer negro compacto.

La tipografía condensada se aproxima visualmente con **Anton**, y el texto con **Inter**, ambas alojadas localmente. No se dispone del archivo fuente de Figma ni de sus tokens exactos: tamaños, colores, espaciados y recortes se derivan de las capturas. No se afirma una equivalencia pixel-perfect comprobada.

### Fotografías e identidad

No se recibieron las fotos originales separadas. Se incluyen tres escenas **ilustrativas generadas con IA**, no fotografías oficiales de XDAW. La procedencia está en `/legal/` y enlazada desde el footer. Ver `src/media/README.md` para tamaños y sustitución por fotos aprobadas.

Los seis WebP suman aproximadamente 530 KB. `picture` selecciona versiones de móvil, las imágenes inferiores tienen carga diferida y dimensiones declaradas; el hero tiene prioridad alta. Todas usan `object-fit: cover` y focos responsivos. No se depende de URLs externas para fotos o fuentes. Las licencias de fuentes están en `src/fonts/`.

El wordmark es tipográfico, no un archivo oficial de logo Academy. Reemplazar por el original aprobado si se facilita.

## Funcionamiento y límites

- Navegación accesible con skip link, foco visible, menú móvil con Escape y cierre al navegar.
- Animaciones finitas de aparición con escalonado de 90 ms; el contenido permanece visible si fallan o no hay JavaScript. Se respetan los cambios de `prefers-reduced-motion`.
- El formulario valida nombre, correo y ciudad. Conserva formación de interés, teléfono y mensaje; los dos opcionales están en un desplegable para respetar la composición compacta de la captura.
- **No existe backend ni envío automático.** «Solicitar información» prepara un texto local para copiar y enviar al correo publicado `contacto@xdaw.cl`. Los mensajes distinguen preparación, copia y envío. No se guarda información en localStorage ni se hacen peticiones con los datos.
- Sin JavaScript, el botón de preparación queda deshabilitado y se muestra la alternativa por correo.
- No hay pagos, LMS, autenticación, emisión de certificados, estadísticas o testimonios inventados.

Antes de recibir solicitudes reales: validar responsable, política de privacidad, tratamiento y retención; conectar un endpoint con validación de servidor y estados accesibles derivados de la respuesta real. Confirmar programa, condiciones y convocatorias antes de publicarlos.

## Desarrollo y comprobaciones

Requisitos: Node.js 22+ y Python 3 para el servidor de desarrollo.

```sh
npm run dev
npm run check
node --check src/main.js
npm run build
```

Abrir http://localhost:3000. El build se genera en `dist/` sin instalaciones ni servicios externos.

`npm run check` verifica las cuatro páginas, anclas, idioma, IDs únicos, enlaces, `srcset`, assets CSS, fuentes locales, formato de convocatorias y ausencia de rutas absolutas que romperían el subdirectorio de GitHub Pages.

### Verificación de esta entrega

Completados `npm run check`, `npm run build`, `node --check src/main.js` y `git diff --check`. Se inspeccionaron las tres imágenes generadas y se verificaron sus dimensiones/formato.

Se revisaron estáticamente las reglas para **320, 375, 430, 768 y 1440 px**, incluyendo las anchuras de titulares con las métricas reales de Anton y los cambios de columnas, menú, imágenes y formulario. Esto no sustituye una revisión visual en navegador.

**Limitación del entorno:** `sites-preview start` volvió a fallar con `relay could not open browser port 4173: timed out waiting for relay readiness`; `sites-preview status` indicó `Sites preview stopped`. No se pudo completar la comparación visual ni las pruebas de interacción en navegador en ninguno de esos anchos. Quedan pendientes antes de lanzamiento: comparación con capturas, overflow real, recortes, zoom al 200%, teclado, validación y copia al portapapeles. No se presenta esa verificación como completada.

## Estructura

- `index.html`: Home.
- `src/styles.css`: componentes, layouts y responsive.
- `src/main.js`: menú, reveals y consulta local.
- `src/media/`: imágenes locales WebP y procedencia.
- `src/fonts/`: fuentes locales y licencias OFL.
- `formacion/`: seis pilares de la formación y programa pendiente. La Home los agrupa en tres ejes sin eliminar musicalidad, entrenamiento, liderazgo, comunidad ni desarrollo profesional.
- `formaciones/`: convocatorias pendientes.
- `legal/`: funcionamiento actual, privacidad pendiente y procedencia de imágenes.
- `data/formaciones.json`: colección vacía reservada para gestión futura; aún no se consume automáticamente.
- `scripts/`: validación, build y desarrollo.

Se conservan las anclas `#inicio`, `#academia`, `#formacion`, `#metodologia`, `#fechas` y `#contacto`; se añade `#comunidad`. Las páginas secundarias conservan sus rutas y comparten el header/footer.

Para gestionar convocatorias en el futuro, definir y validar `id`, `nombre`, `ciudad`, `modalidad`, `fecha`, `lugar`, `cupos`, `estado` y `urlInscripcion`. No añadir registros sin datos confirmados. Validar texto y URLs al implementar su renderizado.

## GitHub Pages

1. Subir o fusionar el commit en `main` de `AnymuzzOps/xdawacademy`.
2. En Settings → Pages → Build and deployment elegir **GitHub Actions**.
3. El workflow existente valida, compila y publica `dist/` en cada push a main; también permite ejecución manual.
4. Comprobar `https://anymuzzops.github.io/xdawacademy/` y las rutas `formacion/`, `formaciones/`, `legal/`.

No hay router SPA ni reescrituras; todos los enlaces y assets son relativos y funcionan bajo el subdirectorio del repositorio. El workflow no se modifica en esta revisión.

### Futuro dominio xdawacademy.cl

Cuando el dominio esté confirmado:

- Verificar su propiedad en GitHub y añadirlo en Settings → Pages → Custom domain.
- Configurar los registros A del dominio raíz según la documentación vigente de GitHub Pages (confirmar valores antes de tocar DNS).
- Para `www`, usar CNAME hacia `anymuzzops.github.io` y elegir el dominio canónico.
- Esperar validación DNS y activar Enforce HTTPS.
- Si se incorpora `CNAME` al código, añadirlo a la lista de copia de `scripts/build.mjs`.
- Añadir canonical, og:url y sitemap con el dominio definitivo cuando esté activo.

No se modifica xdaw.cl, DNS ni la configuración de hosting desde esta implementación.

## Ajuste fino de composición

Esta revisión solo modifica CSS de la Home; conserva HTML, contenidos, arquitectura, colores, familias tipográficas, archivos fotográficos, rutas y funcionamiento del formulario.

- Hero: foco vertical próximo al borde superior (8% desktop, 4% tablet, 0% móvil). El marco móvil es más ancho en proporción, con altura `clamp(240px, 70vw, 310px)` y degradado acoplado a esa altura; reduce el recorte lateral del grupo y mantiene el protagonismo de la instructora.
- Metodología: marco 4:3 basado en la imagen, sin altura mínima que fuerce un recorte lateral. Se centra respecto al contenido en PC/tablet.
- Comunidad: foco alto para preservar cabezas. Entre 701 y 1100 px, foto/texto usan proporción 3:2 y la fotografía un marco 3:2 centrado verticalmente; evita estirar la foto hasta la altura del texto y perder rostros laterales. En móvil el marco es 1.4:1.
- Contacto: padding desktop de 48/45 a 32/32 px; móvil de 31/28 a 22/24 px. Separación móvil entre introducción y formulario de 40 a 22 px; campos de 17 a 11 px. Campos con mínimo de 44 px y padding reducido; fuentes y avisos del formulario conservados. El formulario tiene ancho máximo de 580 px en PC.
- Ritmo: paddings ajustados a 40–56 px en las secciones superiores de PC y 24–28 px en móvil; margen/padding del origen más contenido.
- Header sticky: un pequeño espacio superior (12 px en PC, 8 px en móvil) sale de la pantalla al hacer scroll; la barra útil queda en 72/60 px, más su borde. No se modifica la altura durante el scroll, no se añaden listeners ni se recorta el área de los controles. El desplegable móvil se posiciona bajo la altura real del header. Se elimina el margen de ancla redundante de `#academia`.

Comprobaciones: `npm run check`, `npm run build`, `node --check src/main.js` y `git diff --check`. Se revisaron visualmente encuadres aislados de las tres imágenes con cajas estimadas para **1440, 1024, 768, 430 y 375 px**, incluyendo comparativas antes/después del hero. Son simulaciones del recorte `cover`, no capturas de la página ni prueba de layout completo.

La vista previa volvió a fallar con `relay could not open browser port 4173`; el estado fue `Sites preview stopped`. La revisión del formulario, sticky y layout completo en navegador sigue pendiente. Las proporciones reales de las cajas y la ausencia de overflow deben confirmarse en navegador antes del lanzamiento; no se afirma que esa revisión esté completada.


## Sistema dimensional compartido

La especificación actual de header, navegación, botones, tokens, auditoría y pruebas está en [docs/shared-dimensions.md](docs/shared-dimensions.md). Sustituye las dimensiones históricas descritas en entregas anteriores. Ejecutar `npm test` y `npm run build` para validar esta revisión.
