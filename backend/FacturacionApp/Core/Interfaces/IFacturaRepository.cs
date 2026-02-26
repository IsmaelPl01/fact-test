using FacturacionApp.Core.Entities;

namespace FacturacionApp.Core.Interfaces
{
    public interface IFacturaRepository
    {
        Task<IEnumerable<Factura>> GetAllAsync();
        Task<Factura> GetByIdAsync(int id);
        Task AddAsync(Factura factura);
        Task UpdateAsync(Factura factura);
        Task AddPagoAsync(Pago pago);
    }
}
