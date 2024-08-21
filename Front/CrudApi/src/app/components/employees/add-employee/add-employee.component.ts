import { Component } from '@angular/core';
import { Employee } from '../../../models/emplyee.model';
import { EmployeesService } from '../../../services/employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {

  addEmployeeRequest: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: ''
  }

  constructor(private employeesService: EmployeesService, private router: Router){}

  addEmployee(){
    this.employeesService.addEmployee(this.addEmployeeRequest).subscribe({
      next: (employee) => {
        this.router.navigate(['']);
        console.log(employee);
      }
    })
  }
}
