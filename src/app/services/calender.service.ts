import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  private baseUrl = "http://localhost:8084/users/event"

  constructor(private http: HttpClient) { }

  getEvents() {
  return this.http.get<any>(this.baseUrl+"getAllEvent")
    .toPromise()
    .then(res => <any[]>res.data)
    .then(data => { return data; });
  }
}
