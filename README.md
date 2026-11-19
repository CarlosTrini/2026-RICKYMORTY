# 🚀 Plantilla React Básica (Starter Template)

Plantilla inicial estructurada para proyectos sencillos, ágiles y prototipos rápidos con **React 19**, **TypeScript**, **Vite** y **TailwindCSS v4**.

---

## 📁 Estructura de Carpetas

```text
src/
├── assets/             # Imágenes, SVGs, fuentes e iconografía
├── components/         # Componentes globales y reutilizables (Navbar, Cards, etc.)
├── constants/          # Constantes globales, rutas y datos estáticos
├── hooks/              # Custom hooks reutilizables (useDebounce, useLocalStorage)
├── lib/                # Instancias de librerías y clientes (Axios, cn utility)
├── services/           # Llamadas a API y esquemas de validación Zod
├── styles/             # Estilos globales y configuración TailwindCSS
├── types/              # Interfaces y definiciones de tipos globales en TypeScript
├── utils/              # Funciones helper y formateadores
├── App.tsx             # Componente raíz con la página de presentación y cards
└── main.tsx            # Punto de entrada de la aplicación con BrowserRouter
```

---

## 📦 Librerías Base Incluidas

- **[TailwindCSS v4](https://tailwindcss.com/)**: Estilizado mediante clases utilitarias de alto rendimiento.
- **[Axios](https://axios-http.com/)**: Cliente HTTP con interceptores preconfigurados (`src/lib/axios.ts`).
- **[Zod](https://zod.dev/)**: Validación de esquemas en tiempo de ejecución (`src/services/apiService.ts`).
- **[React Router](https://reactrouter.com/)**: Enrutamiento para aplicaciones SPA.
- **[Lucide React](https://lucide.dev/)**: Iconos modernos y minimalistas.
- **[clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge)**: Utilidad `cn()` para clases condicionales fluidas.

---

## 🎯 Casos de Uso Ideales

1. **Landing Pages**: Páginas de aterrizaje de alta conversión.
2. **Portafolios Personales**: Showcase para desarrolladores y creativos.
3. **MVPs y Prototipos Rápidos**: Validación ágil de flujos y productos.
4. **Sitios de Eventos**: Promoción para conferencias, webinars o hackathons.
5. **Formularios de Contacto & Waitlists**: Captura de prospectos con validación Zod.
6. **Micro-sitios de Campañas de Marketing**: Campañas temáticas optimizadas para anuncios.

---

## 🛠️ Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de la compilación
npm run preview
```
