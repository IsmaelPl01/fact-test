using FacturacionApp.Core.Entities;
using FacturacionApp.Core.Interfaces;
using FacturacionApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FacturacionApp.Infrastructure.Repositories;

public class ClienteRepository : IClienteRepository
{
    private readonly ApplicationDbContext _context;

    public ClienteRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Cliente>> GetAllAsync()
    {
        return await _context.Clientes.ToListAsync();
    }

    public async Task AddAsync(Cliente cliente)
    {
        await _context.Clientes.AddAsync(cliente);
        await _context.SaveChangesAsync();
    }
}