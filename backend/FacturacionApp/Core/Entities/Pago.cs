namespace FacturacionApp.Core.Entities
{
    public class Pago
    {
        public int Id { get; set; }
        public int FacturaId { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Monto { get; set; }
    }
}
