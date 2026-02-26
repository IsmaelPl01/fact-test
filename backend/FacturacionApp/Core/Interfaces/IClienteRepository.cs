using FacturacionApp.Core.Entities;

namespace FacturacionApp.Core.Interfaces
{
    public interface IClienteRepository
    {
        Task<IEnumerable<Cliente>> GetAllAsync();
        Task AddAsync(Cliente cliente);
    }
}
