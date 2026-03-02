using Microsoft.AspNetCore.Mvc;
using FacturacionApp.Core.DTOs;
using FacturacionApp.Core.Interfaces;
using FacturacionApp.Services;

namespace FacturacionApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FacturasController : ControllerBase
{
    private readonly IFacturaRepository _repository;
    private readonly FacturaService _service;

    public FacturasController(IFacturaRepository repository, FacturaService service)
    {
        _repository = repository;
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetFacturas()
    {
        var facturas = await _repository.GetAllAsync();
        return Ok(facturas);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetFactura(int id)
    {
        var factura = await _repository.GetByIdAsync(id);
        if (factura == null) return NotFound();
        return Ok(factura);
    }

    [HttpPost]
    public async Task<IActionResult> CreateFactura(FacturaCreateDto dto)
    {
        var factura = await _service.CreateFacturaAsync(dto);
        return CreatedAtAction(nameof(GetFactura), new { id = factura.Id }, factura);
    }

    [HttpPost("{id}/pagos")]
    public async Task<IActionResult> RegistrarPago(int id, PagoCreateDto dto)
    {
        try
        {
            var factura = await _service.RegistrarPagoAsync(id, dto);
            if (factura == null) return BadRequest("Factura no encontrada o balance inválido.");
            return Ok(factura);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message); // Retorna el error si el monto supera el balance
        }
    }
}