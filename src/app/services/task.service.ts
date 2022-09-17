import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataSourceChangedEventArgs, DataStateChangeEventArgs } from '@syncfusion/ej2-angular-kanban';
import { Observable, Subject } from 'rxjs';
import { Task } from '../model/Task.model';
import { TaskChart } from '../model/TaskChart.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends Subject<DataStateChangeEventArgs> {

  private baseUrl = "http://localhost:8084/users/task"

  constructor(private http: HttpClient, private authService: AuthService) {super(); }

  findAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + "/fidAllTaskByEmployee/" + this.authService.employee.id);
  }

  findAllTaskProjectById(id: string): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + "/findAllTaskByProjectId/" + id);
  }

  addTaskToEmployee(id: string, ide: number, task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + "/addTaskToProject/" + id + "/" + ide, task);
  }

  deleteTaskById(id : number){
    console.log(this.baseUrl +"/deleteTaskById/" + id)
    return this.http.delete(this.baseUrl +"/deleteTaskById/" + id).subscribe();
  }



  editTask(id : number ,task : Task):Observable<Task>{
    return this.http.post<Task>(this.baseUrl + "/editTask/"+id,task)
  }

  ChartTask(id: string):Observable<TaskChart>{
    return this.http.get<TaskChart>(this.baseUrl+"/ChartTask/"+id)
  }


  updateCard(task : Task): Observable<Task> {
    return this.http.put<Task>(this.baseUrl + "/editTaskForEmplyee/", task);
}

public execute(state: any): void {
  this.findAllTask().subscribe(x => super.next());
}



}


