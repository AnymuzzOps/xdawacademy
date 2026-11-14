# XDAW Academy

Web estática independiente, en español, para `AnymuzzOps/xdawacademy`. HTML, CSS y JavaScript nativos, sin dependencias de ejecución ni archivos publicados de xdaw.cl.

## Desarrollo y validación

Requisitos: Node.js 22+ y Python 3 para la vista previa.

```sh
npm run dev
npm run check
node --check src/main.js
npm run build
```

Abrir http://localhost:3000. El resultado publicable está en `dist/`. `check` verifica los enlaces locales de las cuatro páginas, anclas, IDs únicos, idioma y formato del archivo de convocatorias. No sustituye una auditoría visual o de accesibilidad con navegador.

## GitHub Pages

1. Subir este commit a `main` de `AnymuzzOps/xdawacademy`.
2. En Settings → Pages → Build and deployment elegir **GitHub Actions**.
3. Ejecutar el workflow `Deploy GitHub Pages`, o hacer push a main. El workflow valida, compila y publica `dist/`.
4. Comprobar `https://anymuzzops.github.io/xdawacademy/`, `/formacion/`, `/formaciones/` y `/legal/`.

Todos los enlaces internos y assets son relativos. El mismo build funciona en el subdirectorio del repositorio y en un dominio propio. No hace falta configurar un router ni reescrituras.

### Dominio xdawacademy.cl

Cuando el dominio y su administración estén confirmados:

- Verificar el dominio en GitHub antes de asociarlo.
- Añadir `xdawacademy.cl` en Settings → Pages → Custom domain.
- Configurar los registros A del dominio raíz con los valores vigentes de la documentación oficial de GitHub Pages (actualmente 185.199.108.153, 185.199.109.153, 185.199.110.153 y 185.199.111.153). Confirmarlos antes de modificar DNS.
- Para `www`, usar CNAME hacia `anymuzzops.github.io` y elegir el dominio canónico en GitHub.
- Esperar la validación DNS y activar Enforce HTTPS.
- Si se añade un archivo `CNAME` al proyecto, incluirlo también en la lista de copia de `scripts/build.mjs`.
- Añadir canonical, og:url y sitemap con el dominio definitivo una vez activo. No están fijados prematuramente al dominio aún no verificado.

No se modificó DNS ni se habilitó Pages desde esta implementación.

## Estructura

- `index.html`: Home y formulario.
- `src/styles.css`: tokens y componentes responsivos.
- `src/main.js`: menú accesible, reveals finitos y borrador de consulta.
- `formacion/`: pilares conceptuales y estado del programa pendiente.
- `formaciones/`: estado vacío de convocatorias.
- `legal/`: funcionamiento actual y documentación legal pendiente.
- `data/formaciones.json`: colección vacía para futuras convocatorias. Aún no se consume automáticamente: mantenerla vacía hasta definir y conectar su gestión.
- `scripts/`: validación, compilación y servidor de desarrollo.

Para futuras convocatorias, definir campos `id`, `nombre`, `ciudad`, `modalidad`, `fecha`, `lugar`, `cupos`, `estado` y `urlInscripcion`; los opcionales deben omitirse si no están confirmados. Implementar su renderizado con escape de texto y validación de URLs al activar la gestión. No hay fixtures comerciales ni fechas ficticias.

## Formulario y contacto

No hay backend, almacenamiento, analítica, pagos, autenticación ni LMS. La validación usa campos HTML nativos. El botón prepara texto local, permite copiarlo y comunica explícitamente que **no fue enviado**. El correo `contacto@xdaw.cl` está publicado en el HTML de referencia; no se afirma que sea un buzón exclusivo de Academy.

Antes de habilitar recepción: definir responsable, política de privacidad, consentimiento/base de tratamiento y retención; conectar un endpoint real, implementar validación del servidor y estados accesibles de envío, error y éxito según la respuesta real. Nunca convertir la preparación local en un supuesto envío exitoso.

## Sistema visual y referencia inspeccionada

Se inspeccionaron mediante la conexión de GitHub `index.html`, `src/styles.css` y `src/main.js` de AnymuzzOps/xdaw, rama main, el 14 de noviembre de 2026. El clon por terminal falló por restricción de red; la inspección del código sí se completó mediante el conector. No se hizo una comparación visual de la web de referencia en navegador.

Reutilizados como principios y patrones (reimplementados, sin importar componentes):

- Barlow Condensed para títulos, Inter para texto.
- Tokens originales: negro #090909, carbón #191919, blanco #f7f6f3, cian #00d8ec, naranja #ff7200 y magenta #ff2079.
- Contenedor máximo de 1120 px, líneas finas, contraste, botones cápsula, foco cian y navegación compacta.
- Recorrido editorial conectado y animaciones discretas con reduced-motion.

Desarrollados para Academy:

- Hero tipográfico centrado, cian dominante y recurso X abstracto, sin replicar la Home principal.
- Seis pilares editoriales, separación «Vive / Enseña», camino conceptual y ámbitos profesionales.
- Arquitectura de convocatorias, estado vacío, rutas propias y formulario honesto sin integración.
- Composiciones diferentes para móvil: recorrido vertical, pilares en una columna, comunidad editorial y formulario en dos columnas compactas.

El identificador tipográfico XDAW Academy es provisional; no se presenta como un archivo oficial de logo. Sustituirlo por el arte aprobado cuando exista. No se han utilizado fotos sintéticas como si fueran registros reales, ni capturas de Instagram. El bloque WE MOVE TOGETHER es una composición tipográfica; el hero dispone de `.hero-art` para sustituir por foto/video auténtico conservando contraste y reduced-motion. Las fotos de formación y del creador están pendientes.

## Pendientes editoriales

Validar programa, horas, valores, requisitos y condiciones de certificación; convocatorias reales; fotografías autorizadas; logo Academy; redes; privacidad y condiciones. Las rutas muestran estos límites claramente. No se incorporaron testimonios, estadísticas ni promesas de empleo.

## Verificación de esta entrega

Pasaron comprobaciones estáticas de navegación y compilación. La infraestructura de preview falló con `relay could not open browser port 4173`; por ello no se verificó visualmente desktop/tablet/móvil ni se completó una auditoría de teclado con navegador. Antes de lanzamiento revisar 360/390/768/1280 px, zoom 200%, tabulación, menú (Escape), validación, copia, reduced-motion y disponibilidad de Google Fonts. No hay éxito de despliegue afirmado sin una ejecución real de Pages.
