using FacturacionApp.Core.DTOs;
using FacturacionApp.Core.Entities;
using FacturacionApp.Core.Interfaces;

namespace FacturacionApp.Services;

public class FacturaService
{
    private readonly IFacturaRepository _facturaRepository;

    public FacturaService(IFacturaRepository facturaRepository)
    {
        _facturaRepository = facturaRepository;
    }

    public async Task<Factura> CreateFacturaAsync(FacturaCreateDto dto)
    {
        var factura = new Factura
        {
            ClienteId = dto.ClienteId,
            FechaEmision = DateTime.UtcNow,
            Estado = "Pendiente",
            Items = dto.Items.Select(i => new FacturaItem
            {
                Descripcion = i.Descripcion,
                Cantidad = i.Cantidad,
                PrecioUnitario = i.PrecioUnitario,
                LineaTotal = i.Cantidad * i.PrecioUnitario
            }).ToList()
        };

        factura.Subtotal = factura.Items.Sum(x => x.LineaTotal);
        factura.ITBIS = factura.Subtotal * 0.18m;
        factura.Total = factura.Subtotal + factura.ITBIS;
        factura.BalancePendiente = factura.Total;

        await _facturaRepository.AddAsync(factura);
        return factura;
    }

    public async Task<Factura?> RegistrarPagoAsync(int facturaId, PagoCreateDto dto)
    {
        var factura = await _facturaRepository.GetByIdAsync(facturaId);

        if (factura == null || factura.BalancePendiente == 0 || dto.Monto <= 0)
        {
            return null;
        }

        if (dto.Monto > factura.BalancePendiente)
        {
            throw new InvalidOperationException("El monto supera el balance pendiente.");
        }

        var pago = new Pago
        {
            FacturaId = facturaId,
            Fecha = DateTime.UtcNow,
            Monto = dto.Monto
        };

        factura.Pagos.Add(pago);
        factura.TotalPagado += dto.Monto;
        factura.BalancePendiente -= dto.Monto;

        if (factura.BalancePendiente == 0)
        {
            factura.Estado = "Pagada";
        }

        await _facturaRepository.AddPagoAsync(pago);
        await _facturaRepository.UpdateAsync(factura);

        return factura;
    }
}