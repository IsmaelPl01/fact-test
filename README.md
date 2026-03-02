# FacturEasy - Fullstack Web Application

Bienvenido al monorepo de **FacturEasy**, una aplicación web profesional de gestión de facturas y clientes desarrollada como prueba técnica / proyecto completo.

Este repositorio está dividido estructuralmente en dos partes principales, garantizando una separación limpia de responsabilidades (Frontend y Backend).

## 🧱 Arquitectura del Proyecto

### 1. Backend (`/FacturacionApp` / .NET 8)
El cerebro de la aplicación, responsable de resguardar los datos, procesar la lógica pesada y exponer los Endpoints.
*   **Responsabilidades**:
    *   Conexión y persistencia con la Base de Datos SQL Server a través de Entity Framework Core.
    *   Validaciones de reglas de negocio seguras (ej. no procesar pagos que superen la deuda, impedir montos negativos).
    *   Cálculos financieros automáticos (Cálculo de 18% de ITBIS, totales y balances).
    *   Exposición de interfaz RESTful estandarizada vía Controladores web.
    *   Configuración de seguridad y reglas CORS.

### 2. Frontend (`/frontend` / React + Vite)
La cara visible de la aplicación, enfocada netamente en la Experiencia de Usuario (UX) y el diseño visual (UI).
*   **Responsabilidades**:
    *   Presentación estética de los datos consumidos de la API.
    *   Enrutamiento del lado del cliente para navegación rápida sin recargas (React Router).
    *   Validaciones de primera capa visual (evitar que el usuario digite mal antes de enviar enviar al backend).
    *   Manejo de estados y asincronía (Loading states, Modales interactivas).
    *   Composición del "UI Kit" con sistema de diseño basado en Tailwind CSS.

## 🚀 Cómo correr el proyecto completo

Para correr este proyecto necesitas levantar ambas partes simultáneamente en terminales distintas:

### Levantar el Backend (HTTP: 5168)
1. Navega a la carpeta del proyecto C#: `cd backend/FacturacionApp`
2. Aplica las migraciones (si es la primera vez): `dotnet ef database update`
3. Corre el servidor API: `dotnet run`

### Levantar el Frontend (Puerto: 5173)
1. Abre una nueva terminal y accede: `cd frontend`
2. Instala los paquetes: `npm install`
3. Levanta el servidor Node: `npm run dev`

Ambos sistemas se conectan automáticamente gracias a la configuración de puertos implementada en la librería de React y al CORS autorizado en el archivo Program.cs de .NET.
