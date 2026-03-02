using FacturacionApp.Core.Entities;
using FacturacionApp.Core.Interfaces;
using FacturacionApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FacturacionApp.Infrastructure.Repositories;

public class FacturaRepository : IFacturaRepository
{
    private readonly ApplicationDbContext _context;

    public FacturaRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Factura>> GetAllAsync()
    {

        return await _context.Facturas
            .Include(f => f.Items)
            .Include(f => f.Pagos)
            .ToListAsync();
    }

    public async Task<Factura?> GetByIdAsync(int id)
    {
        return await _context.Facturas
            .Include(f => f.Items)
            .Include(f => f.Pagos)
            .FirstOrDefaultAsync(f => f.Id == id);
    }

    public async Task AddAsync(Factura factura)
    {
        await _context.Facturas.AddAsync(factura);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Factura factura)
    {
        _context.Facturas.Update(factura);
        await _context.SaveChangesAsync();
    }

    public async Task AddPagoAsync(Pago pago)
    {
        await _context.Pagos.AddAsync(pago);
        await _context.SaveChangesAsync();
    }
}