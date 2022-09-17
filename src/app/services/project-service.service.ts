import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../model/Project.model';
import { ProjectDTO } from '../model/ProjectDTO.model';
import { Task } from '../model/Task.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {


  private baseUrl = "http://localhost:8084/users/project"


  constructor(private http: HttpClient, private authService : AuthService) { }

  addProjectDTo(pr: ProjectDTO): Observable<ProjectDTO> {
    console.log(this.authService.employee.id)
    return this.http.post<ProjectDTO>(this.baseUrl+"/addProject/" + this.authService.employee.id, pr);
  }


  listProject(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl + "/findAllProject/byEmployeeManager/"+this.authService.employee.id)
  }



  deleteProject(id: number) {
    console.log(id)
    this.http.delete<number>(this.baseUrl + "/delete/" + id).subscribe(
      suc => {
        console.log("alllerr")


      },
      err => {
        console.log(err);

      }
    );


  }


  findProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(this.baseUrl + "/findProjectById/" + id)
  }

  deleteProjectById(id : number){
    console.log(this.baseUrl +"/deleteProjectById/" + id)
    return this.http.delete(this.baseUrl +"/deleteProjectById/" + id).subscribe();
  }







}
