namespace FacturacionApp.Core.Entities
{
    public class Cliente
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Identificacion { get; set; }
        public string Email { get; set; }

        public List<Factura> Facturas { get; set; } = new();
    }
}
