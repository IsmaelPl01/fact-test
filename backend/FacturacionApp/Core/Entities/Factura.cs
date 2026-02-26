using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FacturacionApp.Core.Entities
{
    public class Factura
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }
        public DateTime FechaEmision { get; set; }
        public decimal Subtotal { get; set; }
        public decimal ITBIS { get; set; }
        public decimal Total { get; set; }
        public decimal TotalPagado { get; set; }
        public decimal BalancePendiente { get; set; }
        public string Estado { get; set; }

        public List<FacturaItem> Items { get; set; } = new();
        public List<Pago> Pagos { get; set; } = new();
    }
}
