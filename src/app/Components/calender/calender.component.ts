import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  providers:[EventService]
})
export class CalenderComponent implements OnInit {

  events: any[];

  options: any;

  header: any;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    
      this.eventService.getEvents().subscribe(events => {
          this.events = events;
          this.options = {...this.options, ...{events: events}};
      });

      this.options = {
              initialDate : Date.now(),
              headerToolbar: {
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
              },
              editable: true,
              selectable:true,
              selectMirror: true,
              dayMaxEvents: true
      };
  }
}