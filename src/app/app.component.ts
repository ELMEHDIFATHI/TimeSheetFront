import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TimeSheet';

  sideBarOpen = true;
  visible : number =1

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  constructor(public authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
   this.authService.loadToken();
   if(this.authService.getToken() == null || this.authService.isTokenExpired() || !this.authService.isloggedIn){
    this.router.navigate(['/login'])
   }

  }

}
