
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { KanbanComponent, CardSettingsModel, DataSourceChangedEventArgs, DataStateChangeEventArgs } from '@syncfusion/ej2-angular-kanban';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/Task.model';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TacheComponent implements OnInit {



  taskList: Task[];
  task: Task;
  submitted: boolean;
  taskDialog: boolean;
  reactForm: FormGroup;


  public fields: Object = { text: 'username', value: 'id' };
  public height: string = '250px';
  public watermark: string = 'Select an employee';
  Status : Object[] = [
    { Id: 'ToDo', Status: 'To Do' },
    { Id: 'InProgress', Status: 'In Progress' },
    { Id: 'Done', Status: 'Done' },]
   fields1: Object = { text: 'Status', value: 'Id' };

   Verified : Object[] = [
    { Id: true , Verified: 'Verified' },
    { Id: false, Verified: 'Not Verified' }]
    fields2: Object = { text: 'Verified', value: 'Id' };

  public waterMark: string = 'Select a status';
  public waterMark1: string = 'Select a Verified or Not Verified';



  constructor(private service: TaskService,
        private messageService: MessageService,
    private confirmationService: ConfirmationService,) { 
    
    this.reactForm = new FormGroup({
      'check': new FormControl('', [Validators.required]),
      'id_Task': new FormControl('', [Validators.required]),
      'nom': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required]),
      'duration': new FormControl('', [Validators.required]),
      'status': new FormControl('', [Validators.required]),
      'verified': new FormControl('', [Validators.required]),
  
    });
  }

  ngOnInit(): void {

    this.service.findAllTask().subscribe(data => { this.taskList = data; console.log(this.taskList) });
  }


  hideDialog() {
    this.taskDialog = false;
    this.submitted = false;
  }


  editTask(task1: Task) {
    console.log(task1)
    this.task = {...task1};
    console.log(this.task)
    this.taskDialog = true;
  }


  

  saveTask() {
    this.submitted = true;

    if (this.task.nom.trim()) {
      if (this.task.id_Task) {


        this.service.updateCard(this.task).subscribe(
          suc => {
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Task Updated', life: 3000});           
            this.task = new Task();
            this.ngOnInit();
          },
          err => {

            this.messageService.add({ severity: 'error', summary: 'Service Message', detail: 'Erreur' });
          }
        )
        
      }
      else {
      }
      this.service.findAllTask().subscribe(data => { this.taskList = data});
      this.taskList = [...this.taskList];
      this.taskDialog = false;
      this.task = new Task();
      this.ngOnInit();
    }
  }




 










}
