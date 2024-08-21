using BackEnd_API.Controllers.Models;
using BackEnd_API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly CrudAPIDbContext _crudAPIDbContext;

        public EmployeesController(CrudAPIDbContext crudAPIDbContext)
        {
            _crudAPIDbContext = crudAPIDbContext;
        }

        //Pega todos os dados
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _crudAPIDbContext.Employees.ToListAsync();

            return Ok(employees);
        }

        //Insere um novo dado
        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Models.Employee employeeRequest)
        {
            employeeRequest.Id = Guid.NewGuid();
            await _crudAPIDbContext.Employees.AddAsync(employeeRequest);
            await _crudAPIDbContext.SaveChangesAsync();

            return Ok(employeeRequest);
        }

        //Pega um unico dado
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetEmployee([FromRoute]Guid id)
        {
            var employee=
            await _crudAPIDbContext.Employees.FirstOrDefaultAsync(x => x.Id == id);

            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        //update
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] Guid id, Employee updateEmployeeRequest)
        {
            var employee =
            await _crudAPIDbContext.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            employee.Name = updateEmployeeRequest.Name;
            employee.Email = updateEmployeeRequest.Email;
            employee.Salary = updateEmployeeRequest.Salary;
            employee.Phone = updateEmployeeRequest.Phone;
            employee.Department = updateEmployeeRequest.Department;

            await _crudAPIDbContext.SaveChangesAsync();
            return Ok(employee);
        }

        //delete
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id)
        {
            var employee = 
                await _crudAPIDbContext.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            _crudAPIDbContext.Employees.Remove(employee);
            await _crudAPIDbContext.SaveChangesAsync();

            return Ok(employee);
        }

    }
}
