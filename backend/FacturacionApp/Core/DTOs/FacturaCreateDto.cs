namespace FacturacionApp.Core.DTOs
{
    public class FacturaCreateDto
    {
        public int ClienteId { get; set; }
        public List<FacturaItemCreateDto> Items { get; set; } = new();

    }
}
