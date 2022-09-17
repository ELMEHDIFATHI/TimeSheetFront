import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators, FormsModule, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Employee } from 'src/app/model/Employee.model';
import { Task } from 'src/app/model/Task.model';
import { TimeSheet } from 'src/app/model/TimeSheet.model';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { TimesheetService } from 'src/app/services/timesheet.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
  providers: [MessageService,TimesheetService]
})
export class TimesheetComponent implements OnInit {


  reactForm: FormGroup;
  timesheets: TimeSheet[] | any;
  timesheet : TimeSheet = new TimeSheet();
  employee = new Employee() ;
  
  

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private timesheetService : TimesheetService,
    public authService : AuthService,
    private service: TaskService
  ) {

    this.timesheet.date =new Date();
  
    

    this.reactForm = new FormGroup({
      'hours': new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.timesheetService.getAllTimeSheet().subscribe(data=> this.timesheets = data);
 
  }

  get check() { return this.reactForm.get('check'); }
  get email_check() { return this.reactForm.get('email_check'); }
  get date_check() { return this.reactForm.get('date_check'); }
  get city() { return this.reactForm.get('city'); }
  get state() { return this.reactForm.get('state'); }
  get Address() { return this.reactForm.get('Address'); }


  addTimeSheet() {

    console.log(this.timesheet);

    this.timesheetService.addTimeSheet(this.timesheet).subscribe(
      suc => {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'TimeSheet is added' });
        this.ngOnInit();
    },
    err => {
      this.messageService.add({ severity: 'error', summary: 'Service Message', detail: 'TimeSheet is added' });
    }
    );



  }

}
