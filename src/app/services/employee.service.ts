import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/Employee.model';
import { Event } from '../model/Event.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {



  

  private baseUrl = "http://localhost:8084/users/employee"

  constructor(private http: HttpClient, private authService : AuthService) { }


  findAllEmployeeDev():Observable<Employee[]>{  
    return this.http.get<Employee[]>(this.baseUrl+"/findAll/Dev")
  }


 

  findAllEmployeeManager():Observable<Employee[]>{  
    return this.http.get<Employee[]>(this.baseUrl+"/findAll/Manager")
  }


  findAllEventEmployee():Observable<Event[]>{
    console.log(this.authService.employee.id)
    return this.http.get<Event[]>(this.baseUrl + "/findAllEvent/" + this.authService.employee.id)
  }

  saveEmployeeDev(empl :Employee):Observable<Employee>{
    return this.http.post<Employee>(this.baseUrl+"/saveEmployeeDev",empl)
  }


  saveEmployeeMan(empl :Employee):Observable<Employee>{
    return this.http.post<Employee>(this.baseUrl+"/saveEmployeeManger",empl)
  }
 


  deleteEmployeeById(id : number){
    return this.http.delete(this.baseUrl +"/deleteEmployeeById/" + id).subscribe();
  }

  saveEmployeeDevM(employeeM: Employee):Observable<Employee> {
    return this.http.put<Employee>(this.baseUrl+"/saveEmployeeDevM",employeeM);
  }


  saveEmployeeManM(employeeM: Employee):Observable<Employee> {
    return this.http.put<Employee>(this.baseUrl+"/saveEmployeeMangerM",employeeM);
  }
}
