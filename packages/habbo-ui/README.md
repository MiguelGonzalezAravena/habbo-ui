# @mgadev/habbo-ui

Componentes React de Habbo organizados por año. Requiere React 18.2 o 19.

```tsx
import { RoomsCard, TagsCard } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

export function Example() {
  return <RoomsCard
    recommended={[{ id: 'room', name: 'My room', owner: 'RetroHabbo' }]}
    onEnter={room => console.log(room.id)}
  />;
}
```

## Ediciones

- `/2003`: Panel, OnlinePanel, HelpPanel, Navigation, NewsCard, PromoCard, Button, CheckInButton, Hero, Logo, Typography, ContactForm, WeekSelector y Page. GIF y fondo incluidos; estilos aislados.
- `/2006`: Button, Panel (Header, Body, Footer), Window (Header, Content, Footer), Tabs; GoldCard, SnowCard, WelcomeCard, WinterCard, HappeningsCard, ECard, NewsCard, PromoLink, ScoreTable, ScoresCard y Navigation. Conserva la hoja histórica global; úsala en una página dedicada.
- `/2008`: Button, Card, Alert, Field, Tabs, LoginForm, Dialog; HelpBubble, Tooltip, Pagination, TagCloud, TagsCard, SelectField, TextareaField, Checkbox, Radio, SettingsForm, RoomsCard, GroupsCard, HabbosCard, PromotionCard, NewsPromo, Navigation, Header y AvatarEditor. CSS aislado.

Importa el CSS de la misma edición: `@mgadev/habbo-ui/2003/styles.css`, `/2006/styles.css` o `/2008/styles.css`. La raíz exporta `editions`, no componentes. Todos los componentes y sus props se tipan con TypeScript.

## Comportamiento

Los formularios entregan valores mediante `onSubmit`; no incluyen backend. `Pagination` es controlada mediante `page` y `onPageChange`. `RoomsCard` entrega la sala a `onEnter`; `TagsCard` entrega consultas a `onSearch`. Las pestañas incluyen navegación de teclado. `Tooltip` se abre con foco/hover y cierra con Escape; admite `placement="top"` (por defecto) o `"bottom"`, ajusta la posición a la pantalla y mantiene la punta hacia el botón; `Dialog` contiene el foco y permite arrastrar su cabecera.

Las noticias y promociones usan imágenes locales por defecto y mantienen su ancho de referencia con un límite del 100% del contenedor. HabbosCard recibe avatares mediante `image`; sin imagen utiliza el esqueleto histórico como fallback. Los enlaces, avatares y datos de servidor se proporcionan por props.

## Storybook del repositorio

`pnpm storybook` compila la biblioteca e inicia el catálogo en http://localhost:6006. Las historias se agrupan en 2003, 2006 y 2008, con controles, variantes y ejemplos interactivos. `pnpm build-storybook` comprueba tipos y genera `apps/docs/storybook-static`. Storybook aísla la hoja global de 2006 bajo su decorador de edición.

Proyecto no afiliado a Habbo. Los recursos históricos conservan los derechos de sus respectivos propietarios.

### Card de Habbo Club (2008)

`<Card variant="hc" title="Habbo Club">...</Card>` utiliza la superficie `hcred` de HoloCMS: cabecera roja, fondo `#FFE8B7` y el patrón original `hc_pattern.gif` incluido en el paquete. Storybook la muestra en `2008/Card → Habbo Club · HC`.

## AvatarEditor (2008)

Importa `AvatarEditor` desde `@mgadev/habbo-ui/2008` y carga el CSS de 2008. Sirve los archivos del [vestidor histórico](https://github.com/MiguelGonzalezAravena/habbo-ui/tree/81685ed/apps/playground/public/habbo-2008/avatar-editor) desde el mismo origen en `/habbo-2008/avatar-editor/`. Si usas otra ruta, pasa la URL de `editor.html` en `editorUrl`. El vestidor carga Ruffle y la vista previa usa Habbo Imaging.
