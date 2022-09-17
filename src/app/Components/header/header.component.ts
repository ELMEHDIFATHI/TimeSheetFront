import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/Employee.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
@Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

 employee = new Employee() ;

  constructor(private router:Router, public authService : AuthService) { }

  ngOnInit(): void {
  }


  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  onLogout(){
    this.authService.logout();
  }

}
