import { Component } from '@angular/core';
import { Employee } from '../../../models/emplyee.model';
import { EmployeesService } from '../../../services/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent {

  employees: Employee[] = [];

  constructor(private employeesService: EmployeesService) {}

  ngOnInit():void {
    this.employeesService.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error:(response) =>{
        console.log(response);
      }
    })
  }
}
