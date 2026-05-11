# DevTree Frontend

Aplicación frontend para **DevTree** — una red social que agrupa todos tus perfiles sociales (Instagram, TikTok, GitHub, YouTube, etc.) en un solo enlace personalizado.

## Features

- **Perfil público con link personalizado** — compartí un solo enlace (`devtree.com/tu-handle`) con todos tus perfiles
- **Drag & Drop** — reordená tus links sociales arrastrándolos
- **Dashboard admin** — panel para gestionar links y perfil
- **Búsqueda de handles** — verificá disponibilidad antes de registrarte
- **Subida de imagen** — image de perfil con Cloudinary
- **Autenticación JWT** — login y registro con tokens

## Tech Stack

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | ^19.2.0 | UI library |
| TypeScript | ~5.9.3 | Tipado estático |
| Vite | ^7.3.1 | Bundler y dev server |
| Tailwind CSS | ^4.1.18 | Estilos utilitarios |
| TanStack Query | ^5.90.21 | Cache y estado del servidor |
| React Router | ^7.12.0 | Routing SPA |
| Axios | ^1.13.5 | HTTP client |
| React Hook Form | ^7.75.0 | Formularios |
| Sonner | ^2.0.7 | Toast notifications |
| @dnd-kit/react | ^0.3.2 | Drag & drop |
| @headlessui/react | ^2.2.9 | Componentes UI headless |
| react-slugify | ^5.0.0 | Slugificación de handles |

## Prerrequisitos

- **Node.js** >= 18
- **pnpm** >= 8 (`npm install -g pnpm`)
- Backend corriendo en `http://localhost:4000` ([DevTree Backend](https://github.com/tu-usuario/devtree-backend))

## Instalación

```bash
# 1. Clonar el repo
git clone https://github.com/tu-usuario/devtree-front.git
cd devtree-front

# 2. Instalar dependencias
pnpm install

# 3. Configurar variables de entorno (ver abajo)

# 4. Iniciar en desarrollo
pnpm dev
```

## Variables de Entorno

Crear un archivo `.env.local` en la raíz:

```env
VITE_API_URL=http://localhost:4000
```

| Variable | Descripción | Obligatoria | Default |
|----------|-------------|-------------|---------|
| `VITE_API_URL` | URL base del backend | Sí | — |

## Scripts

```bash
pnpm dev        # Inicia servidor de desarrollo (Vite)
pnpm build      # Compila TypeScript + Vite build
pnpm preview    # Previsualiza build de producción
pnpm lint       # Ejecuta ESLint
```

## Rutas

| Path | Componente | Layout | Auth | Descripción |
|------|-----------|--------|------|-------------|
| `/` | `HomeViewe` | — | No | Landing page con buscador |
| `/auth/login` | `LoginView` | `AuthLayout` | No | Inicio de sesión |
| `/auth/register` | `RegisterView` | `AuthLayout` | No | Registro |
| `/admin` | `LinkTreeView` | `AppLayout` | Sí | Edición de links |
| `/admin/profile` | `ProfileView` | `AppLayout` | Sí | Edición de perfil |
| `/:handle` | `HandleView` | `AuthLayout` | No | Perfil público |
| `/404` | `NotFoundView` | `AuthLayout` | No | No encontrada |
| `*` | `NotFoundView` | `AuthLayout` | No | Catch-all |

## API Endpoints

El frontend se conecta al backend en `VITE_API_URL`. Endpoints principales:

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/auth/login` | No | Login → devuelve token JWT |
| POST | `/auth/register` | No | Registro de usuario |
| GET | `/user` | Bearer | Obtener perfil autenticado |
| PATCH | `/user` | Bearer | Actualizar perfil |
| POST | `/user/image` | Bearer | Subir imagen (FormData) |
| GET | `/:handle` | No | Obtener perfil público |
| POST | `/search` | No | Buscar handle disponible |

## Deploy a GitHub Pages

```bash
pnpm deploy
```

Esto hace build + deploy a la branch `gh-pages` usando la librería `gh-pages`.

### Pre-requisitos

1. El repo debe existir en GitHub con remote `origin` configurado
2. En `vite.config.ts`, `base` debe coincidir con el nombre del repo:
   ```ts
   base: '/nombre-de-tu-repo/',
   ```
   (Si es user site `tu-usuario.github.io`, usar `base: '/'`)

3. En GitHub, ir a **Settings > Pages** y seleccionar **Deploy from a branch** → `gh-pages` → `/ (root)`

## Estructura del Proyecto

```
src/
├── api/
│   └── DevTreeApi.ts              # Funciones de API
├── components/
│   ├── nav/
│   │   ├── AdminNavigation.tsx    # Nav del dashboard
│   │   └── HomeNavigation.tsx     # Nav de la landing
│   ├── DevTree.tsx                # Layout dashboard admin
│   ├── DevTreeInput.tsx           # Input para link social
│   ├── DevTreeLink.tsx            # Visualización de link
│   ├── ErrorMessage.tsx           # Error de formularios
│   ├── HandleData.tsx             # Perfil público
│   ├── Header.tsx                 # Header global
│   ├── Logo.tsx                   # Logo
│   ├── NavigationTabs.tsx         # Tabs de navegación
│   └── SearchForm.tsx             # Buscador de handles
├── config/
│   └── axios.ts                   # Axios + interceptor JWT
├── data/
│   └── social.ts                  # Redes sociales disponibles
├── layouts/
│   ├── AppLayout.tsx              # Layout dashboard
│   └── AuthLayout.tsx             # Layout auth
├── types/
│   └── index.ts                   # Tipos TypeScript
├── utils/
│   └── index.ts                   # Utilidades
├── views/
│   ├── HandleView.tsx             # Perfil público
│   ├── HomeViewe.tsx              # Landing
│   ├── LinkTreeView.tsx           # Edición de links
│   ├── LoadingView.tsx            # Loading state
│   ├── LoginView.tsx              # Login
│   ├── NotFoundView.tsx           # 404
│   ├── ProfileView.tsx            # Edición de perfil
│   └── RegisterView.tsx           # Registro
├── main.tsx                       # Entry point
├── router.tsx                     # Rutas
└── index.css                      # Estilos globales
```

## License

MIT
