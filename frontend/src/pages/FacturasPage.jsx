import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye } from "lucide-react";
import { api } from "../lib/api";
import { Button } from "../components/ui/Button";
import { DataTable } from "../components/ui/DataTable";
import { Badge } from "../components/ui/Badge";

export function FacturasPage() {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFacturas();
  }, []);

  const fetchFacturas = async () => {
    try {
      const data = await api.get("/facturas");
      setFacturas(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: "Factura #", accessor: "id" },
    { header: "Cliente", accessor: "cliente" },
    { header: "Fecha", accessor: "fechaEmision" },
    { header: "Total", accessor: "total" },
    { header: "Balance", accessor: "balancePendiente" },
    { header: "Estado", accessor: "estado" },
    { header: "Acciones", accessor: "actions" },
  ];

  const renderRow = (factura) => (
    <>
      <td className="px-6 py-4 font-medium text-slate-900 border-t border-slate-100">
        INV-{factura.id.toString().padStart(4, "0")}
      </td>
      <td className="px-6 py-4 text-slate-700 border-t border-slate-100">{factura.cliente?.nombre || "Cliente Desconocido"}</td>
      <td className="px-6 py-4 text-slate-500 border-t border-slate-100">{new Date(factura.fechaEmision).toLocaleDateString()}</td>
      <td className="px-6 py-4 font-medium text-slate-900 border-t border-slate-100">
        ${factura.total?.toLocaleString() || "0.00"}
      </td>
      <td className="px-6 py-4 text-red-600 font-medium border-t border-slate-100">
        ${factura.balancePendiente?.toLocaleString() || "0.00"}
      </td>
      <td className="px-6 py-4 border-t border-slate-100">
        <Badge variant={factura.estado === "Pagada" ? "success" : "warning"}>
          {factura.estado}
        </Badge>
      </td>
      <td className="px-6 py-4 border-t border-slate-100">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary-600 hover:text-primary-800"
          onClick={() => navigate(`/facturas/${factura.id}`)}
        >
          <Eye className="h-4 w-4 mr-1" /> Ver
        </Button>
      </td>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Facturas</h1>
          <p className="text-slate-500 mt-1">Dashboard general de facturación</p>
        </div>
        <Button onClick={() => navigate("/facturas/nueva")}>
          <Plus className="mr-2 h-4 w-4" /> Crear Factura
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10 text-slate-500">Cargando facturas...</div>
      ) : (
        <DataTable columns={columns} data={facturas} renderRow={renderRow} />
      )}
    </div>
  );
}
