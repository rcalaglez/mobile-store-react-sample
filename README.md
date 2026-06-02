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
│   ├── feedback/       → Spinner, ErrorState
│   ├── icons/          → iconos SVG (cart, search)
│   ├── layout/         → Header, Breadcrumbs
│   └── ui/             → PageShell
├── features/           → módulos por dominio
│   └── products/       → api, components, hooks, pages, utils
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
