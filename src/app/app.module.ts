import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './Components/header/header.component';
import { SidenavComponent } from './Components/sidenav/sidenav.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { CalenderComponent } from './Components/calender/calender.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DropdownModule} from 'primeng/dropdown';



import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { TabViewModule } from 'primeng/tabview';
import { TimesheetComponent } from './Components/timesheet/timesheet.component';
import { TacheComponent } from './Components/tache/tache.component';
import { GestionUserComponent } from './Components/gestion-user/gestion-user.component';
import { GestionProjetComponent } from './Components/gestion-projet/gestion-projet.component';
import { ProjetTacheComponent } from './Components/projet-tache/projet-tache.component';
import {StepsModule} from 'primeng/steps';
import {ListboxModule} from 'primeng/listbox';
import {SplitterModule} from 'primeng/splitter';




import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { ForbiddenComponent } from './Forbidden/forbidden/forbidden.component';
import { ProjetModificationComponent } from './Components/projet-modification/projet-modification.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { AgendaService, DayService, MonthService, ScheduleModule, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { KanbanAllModule } from '@syncfusion/ej2-angular-kanban';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { EventModificationComponent } from './Components/event-modification/event-modification.component';
import { UserModificationComponent } from './Components/user-modification/user-modification.component';
import { FooterComponent } from './Components/footer/footer.component';



FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    CalenderComponent,
    TimesheetComponent,
    TacheComponent,
    GestionUserComponent,
    GestionProjetComponent,
    ProjetTacheComponent,
    ForbiddenComponent,
    ProjetModificationComponent,
    EventModificationComponent,
    UserModificationComponent,
    FooterComponent,




  ],
  imports: [
    BrowserModule,
    ButtonModule,
    ChartModule,
    AppRoutingModule, BrowserAnimationsModule, MatIconModule, MatDividerModule, MatListModule, MatMenuModule,
    MatSidenavModule, MatToolbarModule, HttpClientModule, FormsModule,
    FullCalendarModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    ButtonModule,
    TabViewModule,
    HttpClientModule,
    InputNumberModule,
    TableModule,
    ToastModule,
    ReactiveFormsModule,
    CardModule,
    StepsModule,
   ToolbarModule,
   ListboxModule,
   ConfirmDialogModule,
   SplitterModule,
   DropdownModule,

    KanbanModule,
    DropDownListModule,
    MultiSelectAllModule,
    GridModule,
    GridAllModule,
    TabAllModule,ScheduleModule,
    DateTimePickerModule
  ],
  providers: [AgendaService, DayService, WeekService, WorkWeekService, MonthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
