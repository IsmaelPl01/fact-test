import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { FacturasPage } from "./pages/FacturasPage";
import { NuevaFacturaPage } from "./pages/NuevaFacturaPage";
import { FacturaDetailsPage } from "./pages/FacturaDetailsPage";
import { ClientesPage } from "./pages/ClientesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/facturas" replace />} />
          <Route path="facturas" element={<FacturasPage />} />
          <Route path="facturas/nueva" element={<NuevaFacturaPage />} />
          <Route path="facturas/:id" element={<FacturaDetailsPage />} />
          <Route path="clientes" element={<ClientesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
