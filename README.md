# DevTree Frontend

Aplicación frontend para DevTree — red social que agrupa todos tus perfiles sociales en un solo enlace.

## Tecnologías

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | ^19.2.0 | UI library |
| TypeScript | ~5.9.3 | Tipado estático |
| Vite | ^7.3.1 | Bundler y dev server |
| Tailwind CSS | ^4.1.18 | Estilos utilitarios |
| TanStack Query | ^5.90.21 | Cache y estado del servidor |
| TanStack Query Devtools | ^5.91.3 | Debugging de queries |
| React Router | ^7.12.0 | Routing SPA |
| Axios | ^1.13.5 | HTTP client |
| React Hook Form | ^7.75.0 | Manejo de formularios |
| Sonner | ^2.0.7 | Toast notifications |
| @dnd-kit/react | ^0.3.2 | Drag & drop de links |
| @headlessui/react | ^2.2.9 | Componentes UI headless |
| @heroicons/react | ^2.2.0 | Iconos SVG |
| react-slugify | ^5.0.0 | Slugificación de handles |
| @vitejs/plugin-react-swc | ^4.2.2 | Fast refresh con SWC |

## Rutas

| Path | Componente | Layout | Descripción |
|------|-----------|--------|-------------|
| `/` | `HomeViewe` | — | Landing page con buscador de handles |
| `/auth/login` | `LoginView` | `AuthLayout` | Inicio de sesión |
| `/auth/register` | `RegisterView` | `AuthLayout` | Registro de usuario |
| `/admin` | `LinkTreeView` | `AppLayout` | Admin: edición de links sociales |
| `/admin/profile` | `ProfileView` | `AppLayout` | Admin: edición de perfil |
| `/:handle` | `HandleView` | `AuthLayout` | Perfil público de un usuario |
| `/404` | `NotFoundView` | `AuthLayout` | Página no encontrada |
| `*` | `NotFoundView` | `AuthLayout` | Catch-all |

## Estructura del proyecto

```
src/
├── api/
│   └── DevTreeApi.ts          # Funciones de API (login, getUser, updateProfile, etc.)
├── components/
│   ├── nav/
│   │   ├── AdminNavigation.tsx # Nav del panel admin
│   │   └── HomeNavigation.tsx  # Nav de la landing
│   ├── DevTree.tsx             # Layout principal del dashboard admin
│   ├── DevTreeInput.tsx        # Input individual para link social
│   ├── DevTreeLink.tsx         # Visualización de link (drag & drop)
│   ├── ErrorMessage.tsx        # Componente de error para formularios
│   ├── HandleData.tsx          # Vista de perfil público
│   ├── Header.tsx              # Header global
│   ├── Logo.tsx                # Logo de la app
│   ├── NavigationTabs.tsx      # Tabs de navegación admin
│   └── SearchForm.tsx          # Buscador de handles disponibles
├── config/
│   └── axios.ts                # Configuración de Axios + interceptor JWT
├── data/
│   └── social.ts               # Datos de redes sociales disponibles
├── layouts/
│   ├── AppLayout.tsx           # Layout del dashboard admin
│   └── AuthLayout.tsx          # Layout de autenticación
├── types/
│   └── index.ts                # Tipos TypeScript (User, SocialNetwork, etc.)
├── utils/
│   └── index.ts                # Utilidades (classNames, isValidURL)
├── views/
│   ├── HandleView.tsx          # Vista pública de perfil
│   ├── HomeViewe.tsx           # Landing page
│   ├── LinkTreeView.tsx        # Edición de links
│   ├── LoadingView.tsx         # Estado de carga
│   ├── LoginView.tsx           # Login
│   ├── NotFoundView.tsx        # 404
│   ├── ProfileView.tsx         # Edición de perfil
│   └── RegisterView.tsx        # Registro
├── main.tsx                    # Entry point
├── router.tsx                  # Configuración de rutas
└── index.css                   # Estilos globales + Tailwind
```

## Variables de entorno

```env
VITE_API_URL=http://localhost:4000
```

## Scripts

```bash
pnpm dev        # Inicia servidor de desarrollo
pnpm build      # Compila TypeScript + Vite build
pnpm preview    # Previsualiza build de producción
pnpm lint       # ESLint
```
