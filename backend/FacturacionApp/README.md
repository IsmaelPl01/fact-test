# FacturacionApp - Backend API

API RESTful robusta construida con .NET 8 y C# para gestionar clientes, facturas y pagos. Este backend aplica reglas de negocio, garantiza precisión financiera y utiliza una arquitectura limpia en capas.

## 🚀 Tech Stack & Arquitectura

- **Framework:** .NET 8 Web API
- **Database:** SQL Server
- **ORM:** Entity Framework Core 8.0
- **Architecture:** N-Tier (Core, Infrastructure, API/Services)
- **Documentation:** Swagger / OpenAPI

## ⚙️ Funcionalidades Principales

- **Gestión de Clientes:** Crear y consultar registros de clientes.
- **Procesamiento de Facturas:** Generar facturas con múltiples líneas de detalle.
- **Cálculos Financieros Automáticos:** Calcula automáticamente Line Totals, Subtotals, ITBIS (18%) y el Total Final.
- **Control de Pagos:** Permite registrar pagos parciales o completos. El sistema previene sobrepagos y actualiza automáticamente el estado de la factura a "Pagada" cuando el balance llega a cero.
- **Precisión Financiera:** Configuración global de tipo `decimal(18,2)` para evitar pérdida de datos o errores de redondeo en transacciones financieras.

---

## 🛠️ Requisitos Previos

Antes de iniciar, asegúrate de tener instalado lo siguiente:

1. .NET 8.0 SDK  
   https://dotnet.microsoft.com/download/dotnet/8.0
2. SQL Server (Developer Edition, Express o LocalDB)
3. Un IDE como Visual Studio 2022, JetBrains Rider o VS Code

---

## 🚦 Guía Paso a Paso para Ejecutar el Proyecto

Sigue exactamente estos pasos para levantar el backend localmente.

### 1. Clonar el Repositorio

Abre tu terminal y clona el proyecto en tu máquina local:

```bash
git clone <your-repository-url>
cd FacturacionApp
```

---

### 2. Configurar la Conexión a la Base de Datos

Abre el archivo `appsettings.json` y verifica que el `DefaultConnection` apunte a tu instancia local de SQL Server. La configuración por defecto usa Windows Authentication:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=FacturacionDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

Nota:
- Si utilizas LocalDB, cambia a: `Server=(localdb)\\mssqllocaldb`
- Si utilizas SQL Express, cambia a: `Server=.\\SQLEXPRESS`

---

### 3. Restaurar Dependencias

Restaura los paquetes NuGet necesarios ejecutando:

```bash
dotnet restore
```

---

### 4. Aplicar Migraciones de Base de Datos

Crea la base de datos física y las tablas utilizando Entity Framework Core. Ejecuta el siguiente comando en el directorio raíz del proyecto:

```bash
dotnet ef database update
```

Si estás usando Visual Studio con Package Manager Console, ejecuta:

```powershell
Update-Database
```

---

### 5. Ejecutar la Aplicación

Inicia el servidor de desarrollo con:

```bash
dotnet run
```

O simplemente presiona F5 si estás usando Visual Studio.

---

### 6. Probar la API

Una vez ejecutándose, la aplicación abrirá automáticamente la documentación Swagger en tu navegador (normalmente en `http://localhost:<port>/swagger`).

Desde esta interfaz puedes probar todos los endpoints (GET, POST, etc.) de forma interactiva sin necesidad de usar herramientas externas como Postman.

---

## 📌 Notas Importantes

- Asegúrate de que SQL Server esté en ejecución antes de aplicar migraciones.
- Verifica que el puerto configurado no esté siendo utilizado por otra aplicación.
- Si realizas cambios en los modelos, recuerda crear nuevas migraciones con:

```bash
dotnet ef migrations add <MigrationName>
```

Y luego aplicar los cambios con:

```bash
dotnet ef database update
```

---

## 🧩 Estructura del Proyecto

El proyecto sigue una arquitectura en capas (N-Tier):

- **Core:** Entidades y reglas de negocio.
- **Infrastructure:** Acceso a datos, DbContext y configuraciones.
- **API/Services:** Controladores, endpoints y configuración de la aplicación.

Esta separación facilita el mantenimiento, las pruebas y la escalabilidad del sistema.

---

## ✅ Estado del Proyecto

Backend completamente funcional con:

- Validaciones de negocio
- Cálculos financieros automatizados
- Control de estados de factura
- Persistencia en SQL Server
- Documentación interactiva con Swagger

Listo para integración con un frontend o para evaluación técnica.

