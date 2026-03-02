using Microsoft.AspNetCore.Mvc;
using FacturacionApp.Core.Entities;
using FacturacionApp.Core.DTOs;
using FacturacionApp.Core.Interfaces;

namespace FacturacionApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    private readonly IClienteRepository _repository;

    public ClientesController(IClienteRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetClientes()
    {
        var clientes = await _repository.GetAllAsync();
        return Ok(clientes);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCliente(ClienteCreateDto dto)
    {
        var cliente = new Cliente
        {
            Nombre = dto.Nombre,
            Identificacion = dto.Identificacion,
            Email = dto.Email
        };
        await _repository.AddAsync(cliente);
        return CreatedAtAction(nameof(GetClientes), new { id = cliente.Id }, cliente);
    }
}