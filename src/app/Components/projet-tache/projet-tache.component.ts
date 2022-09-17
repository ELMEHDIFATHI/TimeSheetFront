import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/model/Project.model';
import { Task } from 'src/app/model/Task.model';
import { TaskChart } from 'src/app/model/TaskChart.model';
import { ProjectServiceService } from 'src/app/services/project-service.service';
import { TaskService } from 'src/app/services/task.service';
import { ConfirmationService, MessageService } from 'primeng/api';



@Component({
  selector: 'app-projet-tache',
  templateUrl: './projet-tache.component.html',
  styleUrls: ['./projet-tache.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ProjetTacheComponent implements OnInit {


  taskLisk: Task[];
  project = new Project();
  id: string;
  data: any;
  chartOptions: any;


  taskChart = new TaskChart();

  todo: number ;
  pro: number ;
  done: number ;

  constructor(
    private projectService: ProjectServiceService,
    private router: ActivatedRoute,
    private taskService: TaskService,
    private routre: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {


  }

  ngOnInit(): void {

    this.router.paramMap.subscribe(params => { this.id = params.get('id_Project'); console.log(params.get('id_Project')) });

    this.projectService.findProjectById(this.id).subscribe(data => this.project = data)
    this.taskService.findAllTaskProjectById(this.id).subscribe(da => this.taskLisk = da)


    this.taskService.ChartTask(this.id).subscribe(data=>{this.taskChart = data;
       this.todo = this.taskChart.taskTodo; 
       this.pro = this.taskChart.taskInprogress;
       this.done = this.taskChart.taskDone;
       this.Chart();});





  }

  Chart() {

    console.log(this.todo)
    this.data = {
      labels: ['To Do', 'Inprogress', 'Done'],
      datasets: [
        {
          data: [this.todo,this.pro,this.done],
          backgroundColor: [
            "#FFCDD2",
            "#FEEDAF",
            "#B3E5FC"
          ],
          hoverBackgroundColor: [
           "#C63737",
            "#f6c103",
            "#3767c6"
          ]
        }
      ]
    };

  }






  calculateCustomerTotal(name) {
    let total = 0;

    if (this.taskLisk) {
      for (let task of this.taskLisk) {
        if (task.employeeTask.username === name) {
          total++;
        }
      }
    }

    return total;
  }


  deletProject(id: number) {




    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + this.project.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.projectService.deleteProjectById(id);
        this.ngOnInit();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Project Deleted', life: 3000 });
        this.routre.navigate(['/dashboard']).then(() => {
          this.routre.navigate(['/gestion-projet']);
        });;
      }
    });
  }

}
