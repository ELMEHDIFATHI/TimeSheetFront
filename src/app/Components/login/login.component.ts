import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/Employee.model';
import { User } from 'src/app/model/User.mode';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  erreur: number = 0;
  user = new User();
  
  reactForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { 
   
  }
  


  ngOnInit(): void {
    this.authService.isloggedIn = false;
    this.authService.logout();

  }

  onLoggedin() {
    this.authService.login(this.user).subscribe((data) => {
      let jwToken = data.headers.get('Authorization');
      this.authService.saveToken(jwToken);
      this.router.navigate(['/']);
    }, (err) => {
      this.erreur = 1;
    });
  }


}
