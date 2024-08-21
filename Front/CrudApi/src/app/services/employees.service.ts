import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Employee } from '../models/emplyee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  baseApiUrl: string = environment.baseApiUrl

  constructor(private http: HttpClient) { }

  //pega todos os colaboradores
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseApiUrl + '/api/employees')
  }

  //acrescenta os colaboradores
  addEmployee(addEmployeeRequest: Employee): Observable<Employee>{
    addEmployeeRequest.id='00000000-0000-0000-0000-000000000000';
    return this.http.post<Employee>(this.baseApiUrl + '/api/employees', addEmployeeRequest);
  }

  //pega um colaborador pelo id
  getEmployee(id:string): Observable<Employee> {
    return this.http.get<Employee>(this.baseApiUrl + '/api/employees/'+ id)
  }

  //atualiza um colaborador
  updateEmployee(id:string, updateEmployeeRequest: Employee): Observable<Employee>{
    return this.http.put<Employee>(this.baseApiUrl + '/api/employees/' + id, updateEmployeeRequest)}

  //deleta um colaborador
  deleteEmployee(id:string): Observable<Employee>{
    return this.http.delete<Employee>(this.baseApiUrl + '/api/employees/' + id)
  }

}
