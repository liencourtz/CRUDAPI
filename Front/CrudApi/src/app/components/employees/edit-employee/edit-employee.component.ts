import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../../../services/employees.service';
import { Employee } from '../../../models/emplyee.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent implements OnInit {

  employeeDetails: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: ''
  }

  constructor(private route: ActivatedRoute, private employeeesService: EmployeesService, private router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if(id){
          this.employeeesService.getEmployee(id).subscribe({
            next: (response) => {
              this.employeeDetails = response;
            }
          })
        }
      }
    });
  }

  updateEmployee(){
    this.employeeesService.updateEmployee(this.employeeDetails.id, this.employeeDetails).subscribe({
      next: (response) => {
        this.router.navigate(['']);
      }
    });
  }

  deleteEmployee(id : string){
    this.employeeesService.deleteEmployee(id).subscribe({
      next: (response) => {
        this.router.navigate(['']);
      }
    });
  }
}
