using BackEnd_API.Controllers.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_API.Data
{
    public class CrudAPIDbContext : DbContext
    {
        public CrudAPIDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set;}
    }
}
