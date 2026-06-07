# ITX Movy

Frontend de tienda de móviles construido con React.

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| UI | React 19 + React Compiler |
| Build | Vite 8 |
| Routing | React Router v7 |
| Estado servidor | TanStack Query v5 (con persistencia a localStorage) |
| Estilos | Tailwind CSS v4 |
| Testing | Vitest + Testing Library + jsdom |

## Primeros pasos

### Prerrequisitos

- Node.js >= 18
- pnpm

### Instalación

```bash
pnpm install
```

### Ejecución

```bash
pnpm dev
```

El servidor de desarrollo arranca en `http://localhost:5173`.

## Scripts

| Script | Comando | Descripción |
|--------|---------|-------------|
| `dev` | `pnpm dev` | Servidor de desarrollo con HMR |
| `build` | `pnpm build` | Build de producción |
| `preview` | `pnpm preview` | Preview del build de producción |
| `lint` | `pnpm lint` | Linting con ESLint |
| `test` | `pnpm test` | Tests en modo watch |
| `test:run` | `pnpm test:run` | Ejecución única de tests |

## Estructura del proyecto

```
src/
├── api/                → cliente HTTP y utilidades de filtrado
├── app/                → providers (QueryClient, Router) y definición de rutas
├── components/         → componentes reutilizables
│   ├── feedback/       → Spinner, ErrorState, LoadMoreSpinner
│   ├── icons/          → iconos SVG (cart, search)
│   ├── layout/         → Header, Breadcrumbs
│   └── ui/             → PageShell, Collapsible, OptionSelector, Toast, ScrollToTopButton
├── features/           → módulos por dominio
│   └── products/       → api, components, hooks, pages, utils
├── features/
│   └── cart/           → api, context, hooks
├── hooks/              → hooks compartidos (useDebounce, useInfiniteScroll)
├── lib/                → utilidades (priceUtils, queryClient, queryKeys)
├── styles/             → estilos globales (Tailwind)
└── test/               → setup de testing
```

## Testing

El proyecto usa Vitest con jsdom como entorno y Testing Library para renderizar e interactuar con componentes. Los archivos de test están creados junto al código que testean.

```
src/
├── api/client.test.js
├── api/filterProductsWithPrice.test.js
├── lib/priceUtils.test.js
├── hooks/useDebounce.test.js
├── hooks/useInfiniteScroll.test.js
├── components/feedback/Spinner.test.jsx
├── components/feedback/ErrorState.test.jsx
├── features/products/utils/filterProducts.test.js
├── features/products/components/ProductCard.test.jsx
├── features/products/components/ProductGrid.test.jsx
├── features/products/components/SearchBar.test.jsx
├── features/products/pages/ProductListPage.test.jsx
└── components/layout/Header.test.jsx
```

## Mejoras de experiencia de usuario

La aplicación incluye las siguientes mejoras de UX/UI:

- **ErrorBoundary** — Captura errores de render y muestra UI de recuperación con botón de reintentar
- **Sticky Header** — El header se mantiene fijo al hacer scroll, ocultando los breadcrumbs para ganar espacio
- **Especificaciones expansibles** — La tabla de specs se pliega/despliega con animación fluida
- **Toasts** — Notificaciones no intrusivas para feedback de acciones (añadir al carrito)
- **Spinners de feedback** — Estados de carga en botones y carga incremental de productos
- **ScrollToTop** — Botón flotante para volver arriba en el listado de productos
- **Debounce** — La búsqueda aplica un retardo de 300ms para evitar filtrar en cada tecla
- **Infinite Scroll** — Los productos se cargan por bloques de 12 al hacer scroll
- **Acciones accesibles** — Los selectores de opciones y el botón de añadir al carrito se muestran antes que la tabla de especificaciones para facilitar el acceso

### React Compiler

El proyecto utiliza `babel-plugin-react-compiler`, que aplica memoizaciones automáticas en tiempo de compilación. Esto elimina la necesidad de `useMemo`, `useCallback` y `React.memo` manuales en la mayoría de casos, ya que el compilador detecta y optimiza los re-renders por sí solo.
