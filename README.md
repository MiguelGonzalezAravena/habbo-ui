# habbo-ui

Biblioteca React y catálogos de las interfaces web de Habbo, organizados por año. Proyecto no afiliado a Habbo. Consulta las fuentes históricas y el alcance de cada restauración en los catálogos.

## Requisitos
- Node.js 20.19+ o 22+
- pnpm 9 (`corepack enable` y `corepack prepare pnpm@9.15.9 --activate`)

## Inicio rápido
```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm storybook    # http://localhost:6006
pnpm test
pnpm typecheck
pnpm build
```

`pnpm dev` compila primero la librería local y después inicia el playground. Si modificas componentes de `packages/habbo-ui`, vuelve a ejecutar `pnpm dev` para recompilarlos.

## Consumir la librería
Para consumir la versión publicada, instala `@mgadev/habbo-ui` y carga el CSS:
```tsx
import { Button, Panel, PanelHeader, PanelBody } from '@mgadev/habbo-ui/2006';
import '@mgadev/habbo-ui/2006/styles.css';

export function Example() {
  return <Panel><PanelHeader>Noticias</PanelHeader><PanelBody><Button>Continuar</Button></PanelBody></Panel>;
}
```
Para pruebas locales, `pnpm --filter @mgadev/habbo-ui build` genera `packages/habbo-ui/dist`. La versión 0.1.0 está publicada en npm; los cambios locales de 0.2.0 todavía no se han publicado.

## Estructura
- `packages/habbo-ui`: componentes, estilos y tests.
- `apps/playground`: demostración Vite.
- `apps/docs`: Storybook.
- `.changeset`: base para futuras versiones.

## Alcance v0.1.0
- `Button`: variantes, tamaños, estados disabled/loading y soporte de eventos nativos.
- `Panel`: Header/Body/Footer y variantes cromáticas.
- `Window`: contenedor visual no modal, controlado o no controlado. **No implementa focus trap, arrastre ni Escape**; para modales reales se incorporará una capa `Dialog` accesible en una versión posterior.

## Próximos pasos
1. Auditoría de capturas y assets históricos, registrar medidas y estados.
2. Refinar bordes pixelados, 9-slice y tokens.
3. Añadir `Dialog` accesible y pruebas visuales.
4. Preparar publicación y licencias de assets propios.

## Derechos
Proyecto de inspiración visual y estudio. No afiliado, patrocinado ni aprobado por Habbo o sus titulares. No redistribuir imágenes, fuentes, marcas o sprites históricos sin autorización/licencia aplicable.

## Fidelity audit (historical archive)

See [HISTORICAL_SOURCES.md](./HISTORICAL_SOURCES.md). Panel now uses original 2006 sprite assets; Button and Window remain approximations. Historical assets must be reviewed for redistribution rights before publishing.

## Referencia original de 2006

El playground abre la web archivada de Habbo USA (diciembre de 2006) en `/habbo-2006/index.html`, con su HTML, CSS y recursos locales originales. Consulta `HISTORICAL_SOURCES.md` para las reparaciones de rutas y los límites del archivo. `Panel` utiliza el CSS y el DOM originales; las ventanas del cliente Flash no forman parte de esas hojas web.

## Catálogo de componentes

Abre [http://localhost:5173/design-system](http://localhost:5173/design-system) para consultar ejemplos interactivos, código de uso y procedencia histórica. La barra superior de la web archivada incluye un enlace que lo abre en otra pestaña.

Los ejemplos de cards, noticias, puntuaciones y navegación se extraen del HTML archivado con `python3 scripts/build-component-examples.py`. El catálogo muestra el HTML completo para copiar y carga cada composición con sus CSS originales en un documento aislado.

## Índice de versiones

La raíz `http://localhost:5173/` muestra el índice. Habbo 2006 sigue disponible en `/habbo-2006/index.html` y su catálogo en `/design-system`. Habbo 2008 está disponible en `/habbo-2008/index.html`, y su catálogo en `/design-system-2008`.

## Restauración preliminar de 2008

- Comunidad: `/habbo-2008/community.html`.
- Portada: `/habbo-2008/index.html`.
- Catálogo: `/design-system-2008`.

HTML oficial de la build 25.0.50 (20080826113116), recuperado de Wayback para septiembre de 2008. El CSS disponible procede del espejo Wendigo y contiene modificaciones de terceros: no se ha validado su igualdad con la build oficial. Faltan recursos gráficos y no se ha recuperado una página Me autenticada; la captura disponible devuelve mantenimiento. No describir esta restauración como una réplica exacta terminada.

`resource-manifest.json` registra los recursos y sus fuentes. `scripts/restore-habbo-2008.py` descarga datos estáticos del espejo; `scripts/prepare-habbo-2008.py` genera páginas y ejemplos aislados. `local.js` incorpora solo Rounder (extraído de visual.js) y un adaptador DOM local; no carga scripts publicitarios ni servicios históricos. El CSP bloquea formularios, conexiones externas y plugins. El vídeo introductorio Flash no se reproduce.

## Componentes de HoloCMS

El catálogo 2008 utiliza ahora los CSS y sprites suministrados en el proyecto local HoloCMS. `python3 scripts/import-holocms-components.py` copia exclusivamente CSS e imágenes de `web-gallery/v2`, documenta sus hashes en `holocms-manifest.json` y genera ejemplos aislados de botones, iconos, inputs, cards, diálogos, globos, avisos, pestañas y formularios. No modifica HoloCMS ni copia PHP, configuración o bases de datos. Los textos de muestra e interacciones locales están identificados en el catálogo.

Si se regeneran las páginas con `prepare-habbo-2008.py`, ejecutar después `import-holocms-components.py` para aplicar la fuente local y reconstruir estos ejemplos.

Los catálogos usan `ComponentPreview` para ajustar la altura de cada ejemplo automáticamente. `component-preview.css` adapta únicamente los documentos de ejemplo al ancho disponible; las páginas históricas y las hojas fuente no se modifican. Los generadores aplican el adaptador mediante `scripts/adapt-component-previews.py`.

Los formularios del catálogo 2008 ofrecen ancho según contenido, fijo en píxeles, al 100% del contenedor y vista de pantalla, con campos expansibles opcionales. El diálogo gris también se puede abrir sobre el catálogo, arrastrar por la cabecera o mover con flechas al enfocar la zona de arrastre; la X y Escape lo cierran. Las correcciones de contraste, alineación y extensión de sprites viven en `component-preview.css`, sin modificar los archivos fuente de HoloCMS.

Los formularios de acceso y configuración arrancan con ancho fijo de 360 px. Noticias conserva una composición de 300 × 187 px usando `top_story_poll2.png` de HoloCMS; se limita al espacio disponible en móvil. El ejemplo de salas carga también `rooms.css`, y la cabecera usa una distribución adaptable en lugar de apilar sus bloques de escritorio.

## Habbo 2003

Disponible en `/habbo-2003/index.html` y desde el índice principal. Usa el paquete preservado [Habbo 2003 EN](https://h4bbo.net/archive/Habbo%20Archives/Shockwave/Habbo%202003%20EN.zip), ensamblado en 2023 con referencias Wayback de octubre de 2003. Se mantienen HTML, tablas de ancho fijo, CSS y GIF originales del paquete; la portada incluye noticias del 8 de octubre y todas sus imágenes están presentes.

Se normalizaron rutas y codificación y se retiraron scripts de seguimiento. Check in, los servicios externos y los formularios no conectan con servidores históricos. El paquete incluye 54 páginas; algunos anuncios de páginas secundarias no están conservados. `public/habbo-2003/provenance.json` registra la fuente y referencias faltantes. No se ha demostrado igualdad píxel por píxel con la web en su navegador original.

`python3 scripts/prepare-habbo-2003.py` se ejecuta sobre una extracción limpia del paquete en `apps/playground/public/habbo-2003`.

## Design System de 2003

Disponible en `/design-system-2003`, con 12 ejemplos, colores, tipografía y HTML para copiar. `python3 scripts/build-habbo-2003-components.py` extrae los fragmentos del archivo local. Los ejemplos mantienen sus proporciones originales y se reducen proporcionalmente cuando el contenedor es más estrecho; las hojas y páginas históricas no se alteran.

La comunidad completa de 2008 también aplica los ajustes revisados del catálogo mediante `community-fixes.css` y `community-component-fixes.css`. `scripts/fix-habbo-2008-community.py`, invocado por el importador de HoloCMS, carga `rooms.css`, resuelve la promoción con un recurso local y conserva estos cambios al regenerar. “Show more” utiliza las filas ya presentes en la captura; los avatares no recuperados se indican sin inventar imágenes.

## Librería React · Habbo 2008

La entrada `@mgadev/habbo-ui/2008` exporta `Button`, `Card`, `Alert`, `Field`, `Tabs`, `LoginForm` y `Dialog`, junto con sus tipos TypeScript. Esta entrada tiene CSS Modules y assets incorporados en su propia hoja; no importa los estilos globales del archivo histórico. Los componentes de 2006 se importan desde `/2006`; la raíz solo exporta la lista de ediciones disponibles.

```tsx
import { useState } from 'react';
import { Button, Card, Dialog, LoginForm } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

export function Example() {
  const [open, setOpen] = useState(false);
  return <>
    <Card title="Noticias" variant="blue">
      <Button variant="green" onClick={() => setOpen(true)}>Continuar</Button>
    </Card>
    <Dialog open={open} onOpenChange={setOpen} title="Información">
      <p>Tu contenido</p>
    </Dialog>
    <LoginForm onSubmit={values => console.log(values.username)} />
  </>;
}
```

`Button`: variantes default/green/red/dark; icon, disabled, loading y fullWidth. `Card`: title, variant y footer. `Alert`: info/success/warning/error y onDismiss. `Field`: propiedades de input, label, hint y error. `Tabs`: items, value/defaultValue y onValueChange; teclado con flechas, Home y End. `LoginForm`: onSubmit, loading, error y widthMode (content/fixed/container), con ancho fijo de 360 px por defecto. No almacena credenciales ni contiene autenticación. `Dialog`: open/onOpenChange, title, footer, width y draggable; portal, arrastre, cierre con Escape, foco contenido y restauración del foco.

Ejemplos reales: `/design-system-2008#react-components`. Los ejemplos históricos en iframes siguen como referencia. Esta primera API React adapta la apariencia de 2008 a componentes actuales; no convierte todavía todos los bloques históricos ni las ediciones 2003/2006.

Construir: `pnpm build`. El subpaquete queda en `packages/habbo-ui/dist/2008`. Empaquetar: `pnpm --dir packages/habbo-ui pack --pack-destination ../../artifacts`. Instalar el archivo generado en otro proyecto con `pnpm add /ruta/mgadev-habbo-ui-0.1.0.tgz`. React y React DOM (18.2 o 19) son peer dependencies. El paquete se genera localmente; no se publica en npm.

## Componentes React de 2003

La entrada `@mgadev/habbo-ui/2003` incluye paneles, navegación, noticias, promociones, acciones gráficas, tipografía y formularios. Carga `@mgadev/habbo-ui/2003/styles.css`. Los GIF se incluyen en el paquete y los estilos están aislados. Consulta los ejemplos interactivos en `/design-system-2003#react-components` y la API en `packages/habbo-ui/src/2003/index.tsx`.

## Storybook y conversiones de 0.2.0

[Abrir el catálogo de componentes en Storybook](https://habbo-ui.mgadev.workers.dev/)

La historia **2008 → AvatarEditor → Vestidor** y el catálogo 2008 del Playground incluyen el generador de Habbos. El editor usa los SWF y el catálogo histórico de [HoloCMS](https://github.com/MiguelGonzalezAravena/HoloCMS/tree/39143d26be9f096fadfbd5e30b634977ab0dd5f3), ejecutados con Ruffle. La vista previa externa usa Habbo Imaging. Para usar `AvatarEditor` en otra aplicación, sirve la carpeta `apps/playground/public/habbo-2008/avatar-editor` desde el mismo origen y ajusta `editorUrl` si cambias la ruta.

`pnpm storybook` abre el catálogo en el puerto 6006; `pnpm build-storybook` verifica los tipos y genera la web estática. Las 53 familias de historias están en `apps/docs/src/2003`, `2006` y `2008`. Se incluyen variantes, estados vacíos e interacciones locales. La hoja histórica de 2006 queda limitada a las historias de ese año.

La API completa y las composiciones nuevas se documentan en `packages/habbo-ui/README.md`. El paquete local 0.2.0 incorpora las conversiones pendientes; no se publica automáticamente en npm.
