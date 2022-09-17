import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard } from '../model/Dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = "http://localhost:8084/users/dashboard"

  constructor(private http: HttpClient) { }
  globalDashboard():Observable<Dashboard>{
    return this.http.get<Dashboard>(this.baseUrl+"/global")
  }
}
