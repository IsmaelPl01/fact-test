import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, ArrowLeft, Save } from "lucide-react";
import { api } from "../lib/api";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";

export function NuevaFacturaPage() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [factura, setFactura] = useState({
    clienteId: "",
    items: [{ descripcion: "", cantidad: 1, precioUnitario: 0 }]
  });

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await api.get("/clientes");
        setClientes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClientes();
  }, []);

  const handleAddItem = () => {
    setFactura({
      ...factura,
      items: [...factura.items, { descripcion: "", cantidad: 1, precioUnitario: 0 }]
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = factura.items.filter((_, i) => i !== index);
    setFactura({ ...factura, items: newItems });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...factura.items];
    newItems[index][field] = value;
    setFactura({ ...factura, items: newItems });
  };

  const subtotal = factura.items.reduce((sum, item) => sum + (item.cantidad * item.precioUnitario), 0);
  const itbis = subtotal * 0.18;
  const total = subtotal + itbis;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        clienteId: parseInt(factura.clienteId),
        items: factura.items.map(i => ({
          descripcion: i.descripcion,
          cantidad: Number(i.cantidad),
          precioUnitario: Number(i.precioUnitario)
        }))
      };
      await api.post("/facturas", payload);
      navigate("/facturas");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/facturas")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Nueva Factura</h1>
          <p className="text-slate-500">Crea una factura y agrega los items</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Seleccionar Cliente</label>
          <Select
            required
            value={factura.clienteId}
            onChange={(e) => setFactura({ ...factura, clienteId: e.target.value })}
            className="max-w-md bg-white"
          >
            <option value="" disabled>-- Selecciona un cliente --</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </Select>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Items (Servicios / Productos)</h3>
            <Button type="button" variant="secondary" size="sm" onClick={handleAddItem}>
              <Plus className="h-4 w-4 mr-1" /> Añadir Fila
            </Button>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-3 text-sm font-medium text-slate-500 mb-2 px-1">
              <div className="col-span-5">Descripción</div>
              <div className="col-span-2">Cant.</div>
              <div className="col-span-2">Precio U.</div>
              <div className="col-span-2">Importe</div>
              <div className="col-span-1 text-center">Acción</div>
            </div>

            {factura.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-3 items-center group">
                <div className="col-span-5">
                  <Input 
                    required
                    placeholder="Descripción del item"
                    value={item.descripcion}
                    onChange={(e) => updateItem(index, "descripcion", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Input 
                    required
                    type="number" 
                    min="1"
                    className="text-right"
                    value={item.cantidad}
                    onChange={(e) => updateItem(index, "cantidad", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Input 
                    required
                    type="number" 
                    min="0.01" step="0.01"
                    className="text-right"
                    value={item.precioUnitario}
                    onChange={(e) => updateItem(index, "precioUnitario", e.target.value)}
                  />
                </div>
                <div className="col-span-2 flex items-center justify-end px-3 font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-md h-10">
                  ${(item.cantidad * item.precioUnitario).toFixed(2)}
                </div>
                <div className="col-span-1 flex justify-center">
                  <button 
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    disabled={factura.items.length === 1}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col items-end">
          <div className="w-64 space-y-3">
            <div className="flex justify-between items-center text-sm text-slate-600">
              <span>Subtotal:</span>
              <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-slate-600">
              <span>ITBIS (18%):</span>
              <span className="font-medium text-slate-900">${itbis.toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
              <span className="font-semibold text-slate-900">Total:</span>
              <span className="font-bold text-xl text-primary-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => navigate("/facturas")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading || !factura.clienteId}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Guardando..." : "Guardar Factura"}
          </Button>
        </div>
      </form>
    </div>
  );
}
