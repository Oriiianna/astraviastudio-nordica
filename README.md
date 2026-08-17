# Nórdica

Aplicación web funcional desarrollada con React, Vite y TypeScript. Configurado para desarrollo local y deployment en Vercel.

## Requisitos previos

- Node.js 18+
- npm

## Instalación

```bash
npm install
```

## Scripts disponibles

### Desarrollo
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run serve
```

### Typecheck
```bash
npm run typecheck
```

## Stack tecnológico

- **Gestor de paquetes**: npm
- **Runtime**: Node.js 18+
- **Lenguaje**: TypeScript 5.9
- **Frontend**: React 18, Vite 5
- **Estilos**: TailwindCSS 3
- **UI Components**: Radix UI
- **Formularios**: React Hook Form
- **Rutas**: Wouter
- **Validación**: Zod

## Variables de entorno

- `PORT` - Puerto del servidor (default: 4173)
- `BASE_PATH` - Ruta base de la aplicación (default: /)

## Estructura del proyecto

```
├── src/                      # Código fuente
│   ├── components/          # Componentes React
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilidades
│   ├── pages/               # Páginas
│   ├── App.tsx              # Componente principal
│   ├── main.tsx             # Entry point
│   └── index.css            # Estilos globales
├── public/                   # Assets estáticos
├── package.json             # Dependencias y scripts
├── vite.config.ts           # Configuración de Vite
├── tailwind.config.js       # Configuración de TailwindCSS
├── tsconfig.json            # Configuración de TypeScript
└── postcss.config.js        # Configuración de PostCSS
```

## Deploy

Este proyecto está configurado para deployment en Vercel. Para conectar:

1. Importa el proyecto en Vercel desde tu repositorio de GitHub
2. Configura el Root Directory como `.` (raíz del proyecto)
3. Configura las variables de entorno necesarias
4. Deploy automático en cada push a main

## Configuración específica para Windows

Este proyecto funciona correctamente en Windows local sin configuraciones especiales adicionales.

## Notas importantes

- Usa npm como gestor de paquetes
- El servidor de desarrollo buscará automáticamente un puerto disponible si el default está ocupado
- Configurado para hot module replacement durante el desarrollo
