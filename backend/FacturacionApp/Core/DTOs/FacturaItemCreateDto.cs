namespace FacturacionApp.Core.DTOs
{
    public class FacturaItemCreateDto
    {
        public string Descripcion { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }

    }
}
