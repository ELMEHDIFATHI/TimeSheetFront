import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeSheet } from '../model/TimeSheet.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  username : string;

  private baseUrl = "http://localhost:8084/users/time"

  constructor(private http : HttpClient,private authService : AuthService) { }


getAllTimeSheet():Observable<TimeSheet[]>{
  this.username = this.authService.loggedUser;
  return this.http.get<TimeSheet[]>(this.baseUrl+"/findAllTimeEmployeeById/"+this.authService.employee.id);
}


addTimeSheet(timesheet : TimeSheet){
  return this.http.post<TimeSheet>(this.baseUrl+"/addTimeToEmplyeeById/"+this.authService.employee.id,timesheet);
}


}
