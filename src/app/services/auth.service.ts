import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Employee } from '../model/Employee.model';
import { Role } from '../model/Role.mode';
import { User } from '../model/User.mode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = 'http://localhost:8084/users';
  token: string;
  private helper = new JwtHelperService();

  employee = new Employee()

  public loggedUser !: string;
  public loggedUserId !: number;
  public isloggedIn: Boolean = false;
  public roles !: string[];

  constructor(private http: HttpClient, private router: Router) { }







  login(user: User) {
    return this.http.post<User>(this.apiURL + '/login', user, { observe: 'response' });
  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true
    this.decodeJWT();
  }

  getToken(): string {
    return this.token;
  }

  decodeJWT() {
    if (this.token == undefined) return;
    const decodeToken = this.helper.decodeToken(this.token);
    this.roles = decodeToken.roles;
    this.loggedUser = decodeToken.sub;
     this.findEmplyeeByUserName(this.loggedUser).subscribe(data=>this.employee = data);


  }



  isAdministrateur(): Boolean {

    if (!this.roles) //this.roles== undefiened
    return false;
    return (this.roles.indexOf('ADMIN') >-1) ;
    ;
  }


  logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined;
    this.roles = undefined;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }


  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    //this.getUserRoles(login);
  }


  loadToken() {
    this.token = localStorage.getItem('jwt');
    this.decodeJWT();
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }

  /*
  SignIn(user :  User): Boolean {
    let validEmloye: Boolean = false;
    this.employees.forEach((curUser) => {
      if (user.username == curUser.username && user.password == curUser.password) {
        validEmloye = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));

      }
    });
    return validEmloye;
  }
  getUserRoles(username: string) {
    this.getUserFromDB(username).subscribe((user: User) => {
      this.roles = user.roles;
    });
  }


  */


  findListEmplyeeByRole(role :string):Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiURL+"/find/listEmployeeByRole/"+role);
  }

  findEmplyeeByUserName(username :string):Observable<Employee>{
    return this.http.get<Employee>(this.apiURL+"/find/"+username);
  }













}
