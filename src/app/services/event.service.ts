import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../model/Event.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  
 


  private baseUrl = "http://localhost:8084/users/event"


  constructor(private http: HttpClient, private authService : AuthService) { }

  getEvents():Observable<Event[]> {
  return this.http.get<Event[]>(this.baseUrl+"/getAllEventById/"+this.authService.employee.id)
  }

  addEvent(event : Event, ids : number[]):Observable<Event>{
    console.log(event)
    console.log(ids)
    return this.http.post<Event>(this.baseUrl +"/addEventByManager/"+ids+"/"+this.authService.employee.id,event);
  }

  deleteEventById(id: number) {
    return this.http.delete(this.baseUrl +"/deleteEventById/" + id).subscribe();  }
}