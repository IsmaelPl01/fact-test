# FacturEasy - Frontend React

Aplicación web frontend profesional para el sistema de facturación **FacturEasy**, construida con tecnologías modernas para ofrecer una experiencia rápida, estética y responsiva.

## 🚀 Tech Stack

*   **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) (Rendimiento super rápido en desarrollo)
*   **Enrutamiento**: [React Router DOM v6](https://reactrouter.com/) (Navegación fluida tipo Single Page Application)
*   **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) (Diseño utilitario y estético)
*   **Peticiones HTTP**: [Axios](https://axios-http.com/) (Interacción con la API de .NET)
*   **Iconos**: [Lucide React](https://lucide.dev/) (Iconografía limpia y consistente)

## 📂 Organización del Proyecto

*   `/src/components/ui`: Contiene nuestro "UI Kit" reutilizable (Botones, Tablas, Modales, Inputs).
*   `/src/pages/`: Las tres grandes vistas principales de la aplicación.
*   `/src/lib/api.js`: Instancia de Axios preconfigurada para hablar con el Backend automáticamente.

## ⚙️ Cómo iniciar el proyecto

1. Asegúrate de tener Node.js instalado.
2. Clona el repositorio e ingresa a la carpeta `frontend`.
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Configura el puerto de tu backend en el archivo `.env` (opcional, el código tiene fallback automático):
   ```env
   VITE_API_URL=http://localhost:5168/api
   ```
5. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
6. Abre la URL en tu navegador (usualmente `http://localhost:5173`).
