# Web Spectacle

Monorepo de aplicaciones web desarrollado con React, Vite y TypeScript. Configurado para desarrollo local en Windows.

## Proyectos

- **estudio-arquitectura** - Aplicación web principal para estudio de arquitectura
- **api-server** - Servidor API con Express
- **mockup-sandbox** - Entorno de pruebas para mockups

## Requisitos previos

- Node.js 22+
- pnpm (requisito obligatorio, no usar npm o yarn)

## Instalación

```bash
pnpm install
```

## Scripts disponibles

### Desarrollo
```bash
# Aplicación principal (estudio-arquitectura)
cd artifacts/estudio-arquitectura
pnpm run dev

# Servidor API
cd artifacts/api-server
pnpm run dev

# Mockup sandbox
cd artifacts/mockup-sandbox
pnpm run dev
```

### Build
```bash
# Build de todos los paquetes
pnpm run build

# Typecheck completo
pnpm run typecheck
```

## Stack tecnológico

- **Gestor de paquetes**: pnpm workspaces
- **Runtime**: Node.js 22
- **Lenguaje**: TypeScript 5.9
- **Frontend**: React 19, Vite 7
- **Estilos**: TailwindCSS 4
- **UI Components**: Radix UI
- **Backend**: Express 5
- **Base de datos**: PostgreSQL + Drizzle ORM
- **Validación**: Zod
- **Build**: esbuild

## Configuración específica para Windows

Este proyecto está configurado para funcionar en Windows local:

- Dependencias nativas de Windows incluidas (@esbuild/win32-x64, @rollup/rollup-win32-x64-msvc)
- Exclusiones de dependencias de Linux configuradas en pnpm-workspace.yaml
- Valores por defecto para variables de entorno (PORT=3000, BASE_PATH=/)

## Variables de entorno

### estudio-arquitectura
- `PORT` - Puerto del servidor (default: 3000)
- `BASE_PATH` - Ruta base de la aplicación (default: /)

### api-server
- `DATABASE_URL` - String de conexión PostgreSQL
- `NODE_ENV` - Entorno (development/production)

## Estructura del proyecto

```
├── artifacts/               # Aplicaciones individuales
│   ├── estudio-arquitectura/  # App principal
│   ├── api-server/           # Servidor API
│   └── mockup-sandbox/       # Sandbox de pruebas
├── lib/                      # Librerías compartidas
├── scripts/                  # Scripts de utilidad
├── attached_assets/          # Assets estáticos
└── pnpm-workspace.yaml      # Configuración de workspace
```

## Deploy

Este proyecto está configurado para deployment en Vercel. Para conectar:

1. Crea un repositorio en GitHub
2. Importa el proyecto en Vercel
3. Configura las variables de entorno necesarias
4. Deploy automático en cada push a main

## Notas importantes

- Es obligatorio usar pnpm como gestor de paquetes
- El proyecto tiene configuraciones de seguridad para prevenir ataques supply-chain
- Las dependencias tienen un tiempo mínimo de publicación de 1 día por seguridad
