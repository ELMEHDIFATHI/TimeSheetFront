import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/model/Event.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { EventService } from 'src/app/services/event.service';
import { Employee } from 'src/app/model/Employee.model';
import {  ViewEncapsulation, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-event-modification',
  templateUrl: './event-modification.component.html',
  styleUrls: ['./event-modification.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class EventModificationComponent implements OnInit {



  EventList: Event[];
  event : Event;
  public waterMark: string = 'Select start date';
  ids: number[];
  public height: string = '250px';
  
  multifields: Object = { text: 'firstName ' + 'lastName', value: 'id' };
  box: string = 'Box'
  emplyeeList: Employee[];
  public multiwatermark: string = 'Select employees';


  eventDialog: boolean;
  reactForm: any;
  submitted: boolean;
  constructor(private employeeService : EmployeeService,
     private eventService : EventService,
     private messageService: MessageService,
     private confirmationService: ConfirmationService,
     private changeDetect: ChangeDetectorRef) {


    this.reactForm = new FormGroup({
      'check': new FormControl('', [Validators.required]),
      'id_event': new FormControl('', [Validators.required]),
      'nom': new FormControl('', [Validators.required]),
      'startDate': new FormControl('', [Validators.required]),
      'endDate': new FormControl('', [Validators.required])

    });




  }

  ngOnInit(): void {
    this.employeeService.findAllEmployeeDev().subscribe(data => { this.emplyeeList = data , console.log(this.emplyeeList) });
    this.employeeService.findAllEventEmployee().subscribe(data => this.EventList =data);
  }



  ngAfterViewInit() {
    this.changeDetect.detectChanges();
}











  editEvent(event1: Event) {
    this.event = {...event1};
    console.log(this.event)
    this.eventDialog = true;

  }




  saveEvent() {
    this.submitted = true;

    if (this.event.title.trim()) {
      if (this.event.id) {
        this.eventService.addEvent(this.event,this.ids).subscribe(
          suc => {
        
            console.log(this.ids)

            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Event Updated', life: 3000 });
            this.event = new Event();
            this.ids=null;
            this.ngOnInit();
          },
          err => {
            console.log("error")
            this.messageService.add({ severity: 'error', summary: 'Service Message', detail: 'Erreur' });
          }
        )
      }
      else {

        
        this.eventService.addEvent(this.event,this.ids).subscribe(
          suc => {
        
            console.log(this.ids)

            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Event Created', life: 3000 });
            this.event = new Event();
            this.ids=null;
            this.ngOnInit();
          },
          err => {
            console.log("error")
            this.messageService.add({ severity: 'error', summary: 'Service Message', detail: 'Erreur' });
          }
        )
      }

      this.EventList = [...this.EventList];
      this.eventDialog = false;
      this.event = new Event();
      this.ngOnInit();
    }


  }



  deleteEvent(event: Event) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + event.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eventService.deleteEventById(event.id);
        this.EventList=null;
        this.employeeService.findAllEventEmployee().subscribe(data => this.EventList =data);
        this.ngOnInit();
        this.event = new Event();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Event Deleted', life: 3000 });
       
      }
    });
    this.EventList=null;
    this.employeeService.findAllEventEmployee().subscribe(data => this.EventList =data);
    this.EventList = [...this.EventList];
    this.eventDialog = false;
    this.event = new Event();
    this.ngOnInit();

  }

  openNew() {

    this.event = new Event();
    this.submitted = false;
    this.eventDialog = true;

  }
  hideDialog(){

  }










}