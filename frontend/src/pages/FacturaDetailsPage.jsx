import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, DollarSign, Download, FileText } from "lucide-react";
import { api } from "../lib/api";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";
import { Input } from "../components/ui/Input";

export function FacturaDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [factura, setFactura] = useState(null);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [montoPago, setMontoPago] = useState("");
  const [pagando, setPagando] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const data = await api.get(`/facturas/${id}`);
      setFactura(data);
      setPagos(data.pagos || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePagar = async (e) => {
    e.preventDefault();
    setPagando(true);
    try {
      await api.post(`/facturas/${id}/pagos`, {
        monto: parseFloat(montoPago)
      });
      setIsModalOpen(false);
      setMontoPago("");
      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setPagando(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-slate-500">Cargando detalles...</div>;
  }

  if (!factura) {
    return <div className="text-center py-12 text-red-500">Factura no encontrada</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/facturas")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-slate-900">
              Factura INV-{factura.id?.toString().padStart(4, "0")}
            </h1>
            <Badge variant={factura.estado === "Pagada" ? "success" : factura.estado === "Parcial" ? "primary" : "warning"}>
              {factura.estado}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          {factura.balancePendiente > 0 && (
            <Button onClick={() => {
              setMontoPago(factura.balancePendiente.toString());
              setIsModalOpen(true);
            }}>
              <DollarSign className="mr-2 h-4 w-4" /> Registrar Pago
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-8 pb-8 border-b border-slate-100">
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Facturado a:</p>
                <h3 className="text-lg font-bold text-slate-900">{factura.cliente?.nombre}</h3>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500 font-medium mb-1">Fecha de Emisión:</p>
                <p className="font-semibold text-slate-800">{factura.fechaEmision ? new Date(factura.fechaEmision).toLocaleDateString() : ""}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800 flex items-center">
                <FileText className="mr-2 h-4 w-4 text-slate-400" /> Detalle de Servicios
              </h4>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase text-xs font-semibold">
                    <tr>
                      <th className="px-4 py-3">Descripción</th>
                      <th className="px-4 py-3 text-center">Cant.</th>
                      <th className="px-4 py-3 text-right">Precio</th>
                      <th className="px-4 py-3 text-right">Importe</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {factura.items?.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 font-medium text-slate-800">{item.descripcion}</td>
                        <td className="px-4 py-3 text-center text-slate-600">{item.cantidad}</td>
                        <td className="px-4 py-3 text-right text-slate-600">${item.precioUnitario?.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right font-medium text-slate-800">${item.lineaTotal?.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-6">
                <div className="w-64 space-y-3">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-medium text-slate-900">${factura.subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>ITBIS (18%):</span>
                    <span className="font-medium text-slate-900">${factura.itbis?.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between text-lg">
                    <span className="font-bold text-slate-900">Total:</span>
                    <span className="font-bold text-primary-600">${factura.total?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-4">Resumen de Cuenta</h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-sm font-medium text-slate-500 mb-1">Monto Cobrado</p>
                <p className="text-2xl font-bold text-slate-900">
                  ${(factura.totalPagado || 0).toFixed(2)}
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <p className="text-sm font-medium text-red-600 mb-1">Balance Pendiente</p>
                <p className="text-2xl font-bold text-red-700">
                  ${factura.balancePendiente?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-4">Historial de Pagos</h3>
            {pagos.length === 0 ? (
              <p className="text-sm text-slate-500 italic">No hay pagos registrados.</p>
            ) : (
              <div className="space-y-4">
                {pagos.map((pago, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-slate-800">${pago.monto.toFixed(2)}</p>
                      <p className="text-xs text-slate-500">
                        {pago.fechaPago ? new Date(pago.fechaPago).toLocaleDateString() : ""}
                      </p>
                    </div>
                    <Badge variant="success">Completado</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar Pago"
      >
        <form onSubmit={handlePagar} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Monto a Pagar ($)</label>
            <Input
              required
              type="number"
              step="0.01"
              max={factura.balancePendiente}
              value={montoPago}
              onChange={(e) => setMontoPago(e.target.value)}
              placeholder="Ej. 100.00"
            />
            <p className="text-xs text-slate-500 mt-1">
              Balance pendiente máximo: ${factura.balancePendiente?.toFixed(2)}
            </p>
          </div>
          <div className="pt-4 flex justify-end space-x-2 border-t border-slate-100">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={pagando || parseFloat(montoPago) <= 0}>
              {pagando ? "Procesando..." : "Confirmar Pago"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
