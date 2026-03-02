using Microsoft.EntityFrameworkCore;
using FacturacionApp.Core.Entities;

namespace FacturacionApp.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Factura> Facturas { get; set; }
    public DbSet<FacturaItem> FacturaItems { get; set; }
    public DbSet<Pago> Pagos { get; set; }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder
            .Properties<decimal>()
            .HavePrecision(18, 2);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Factura>()
            .HasMany(f => f.Items)
            .WithOne()
            .HasForeignKey(i => i.FacturaId);

        modelBuilder.Entity<Factura>()
            .HasMany(f => f.Pagos)
            .WithOne()
            .HasForeignKey(p => p.FacturaId);
    }
}