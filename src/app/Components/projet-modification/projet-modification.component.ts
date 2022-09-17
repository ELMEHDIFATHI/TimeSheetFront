import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/model/Employee.model';
import { Project } from 'src/app/model/Project.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectServiceService } from 'src/app/services/project-service.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/Task.model';
import { CommandColumnService, CommandModel } from '@syncfusion/ej2-angular-grids';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-projet-modification',
  templateUrl: './projet-modification.component.html',
  styleUrls: ['./projet-modification.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ProjetModificationComponent implements OnInit {



  emplyeeList: Employee[];
  id: string;
  project = new Project();
  employeeProject: Employee[];
  ide: number;
  selectedTasks: Task[];
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


  task: Task;
  submitted: boolean;
  taskDialog: boolean;





  taskList: Task[];
  taskData: Task;
  reactForm: FormGroup;




  constructor(private authService: AuthService,
    private router: ActivatedRoute,
    private projectService: ProjectServiceService,
    private changeDetect: ChangeDetectorRef,
    private taskService: TaskService,
    private cdRef: ChangeDetectorRef,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private employeeService: EmployeeService) { 

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

    ngAfterContentChecked() {
      this.cdRef.detectChanges();
    }
    
  get check() { return this.reactForm.get('check'); }

  ngOnInit(): void {
    this.employeeService.findAllEmployeeDev().subscribe(data => { this.emplyeeList = data });
    this.router.paramMap.subscribe(params => { this.id = params.get('id_Project'); console.log(params.get('id_Project')) });

    this.projectService.findProjectById(this.id).subscribe(data => this.project = data);

  }

  openNew() {
    this.task = new Task();
    this.ide = null;
    this.submitted = false;
    this.taskDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.selectedTasks = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  editProduct(task1: Task) {
    console.log(task1)
    this.ide = task1.employeeTask.id;
    this.task = {...task1};
    console.log(this.task)
    this.taskDialog = true;
  }


  deleteProduct(task: Task) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + task.nom + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.taskService.deleteTaskById(task.id_Task);
        this.projectService.findProjectById(this.id).subscribe(data => this.project = data);
        this.ngOnInit();
        this.task = new Task();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Task Deleted', life: 3000 });
       
      }
    });
    this.projectService.findProjectById(this.id).subscribe(data => this.project = data);
    this.project.taskList = [...this.project.taskList];
    this.taskDialog = false;
    this.task = new Task();
    this.ngOnInit();
  }

  hideDialog() {
    this.taskDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.task.nom.trim()) {
      if (this.task.id_Task) {


        this.taskService.addTaskToEmployee(this.id,this.ide,this.task).subscribe(
          suc => {
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Task Updated', life: 3000});            this.projectService.findProjectById(this.id).subscribe(data => this.project = data);
            this.task = new Task();
            this.ngOnInit();
          },
          err => {

            this.messageService.add({ severity: 'error', summary: 'Service Message', detail: 'Erreur' });
          }
        )
        
      }
      else {

        console.log(this.ide)
        console.log("jjjj")
        this.taskService.addTaskToEmployee(this.id,this.ide,this.task).subscribe(
          suc => {
            console.log(this.ide)
            console.log("jjjj")

            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Task Created', life: 3000 });
            this.projectService.findProjectById(this.id).subscribe(data => this.project = data);
            this.task = new Task();
            this.ngOnInit();
          },
          err => {

            this.messageService.add({ severity: 'error', summary: 'Service Message', detail: 'Erreur' });
          }
        )
      }
      this.projectService.findProjectById(this.id).subscribe(data => this.project = data);
      this.project.taskList = [...this.project.taskList];
      this.taskDialog = false;
      this.task = new Task();
      this.ngOnInit();
    }
  }















  view() {
    console.log(this.ide)
    //this.addEmployeeListToProject(this.id, this.ide)
  }

  ngAfterViewInit() {
    this.changeDetect.detectChanges();
  }






}
