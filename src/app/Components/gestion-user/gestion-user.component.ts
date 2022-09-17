import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Observable, Subscriber } from 'rxjs';
import { Employee } from 'src/app/model/Employee.model';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.scss'],
  providers: [MessageService]
})
export class GestionUserComponent implements OnInit {


  reactFormDev: FormGroup;
  reactFormMan: FormGroup;
  activeIndex: number = 0;
  items: MenuItem[];

  employeeDev = new Employee();
  employeeMan = new Employee();

  selecetdFile: File;
  imagePreview: string;
  fileUpload: File;




  constructor(private messageService: MessageService , private employeeService : EmployeeService) {

    this.reactFormDev = new FormGroup({
      'check': new FormControl('', [Validators.required]),
      'login': new FormControl('', [Validators.required]),
      'email_check': new FormControl('', [Validators.email]),
      'date_check': new FormControl('', [Validators.required]),
      'city': new FormControl('', [Validators.required]),
      'state': new FormControl('', [Validators.required]),
      'Address': new FormControl(''),
      'password': new FormControl('', [Validators.required])
    });


    this.reactFormMan = new FormGroup({
      'check': new FormControl('', [Validators.required]),
      'login': new FormControl('', [Validators.required]),
      'email_check': new FormControl('', [Validators.email]),
      'date_check': new FormControl('', [Validators.required]),
      'city': new FormControl('', [Validators.required]),
      'state': new FormControl('', [Validators.required]),
      'Address': new FormControl(''),
      'password': new FormControl('', [Validators.required])
    });


  }

  ngOnInit(): void {
    this.reactFormMan.reset();
    this.reactFormDev.reset();
  }

  addSingle() {
    this.activeIndex = this.activeIndex + 1;
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
  }


  //pour chargement de l image ///////////////////////////////////////////
 
file : File;

  onChange(event) {
    this.file = event.target.files[0];
    this.convertToBase64(this.file)
  }

  convertToBase64(file: File): any {
    const observable = new Observable((subscriber: Subscriber<any>) => { this.readFile(file, subscriber); });
    observable.subscribe((d) => {
      const a = d.toString();
      const b = a.split(",")[1];
      this.employeeDev.photo = b;
    });
  }


  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }



  onChange1(event) {
    this.file = event.target.files[0];
    this.convertToBase641(this.file)
  }

  convertToBase641(file: File): any {
    const observable = new Observable((subscriber: Subscriber<any>) => { this.readFile1(file, subscriber); });
    observable.subscribe((d) => {
      const a = d.toString();
      const b = a.split(",")[1];
      this.employeeMan.photo = b;
    });
  }


  readFile1(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }




  /////////////////////////////////////////////////////////



    

  Next() {
    this.activeIndex = this.activeIndex + 1;
  }
  Back() {
    this.activeIndex = this.activeIndex - 1;
  }


  get check() { return this.reactFormDev.get('check'); }
  get login() { return this.reactFormDev.get('login'); }
  get password() { return this.reactFormDev.get('password'); }
  get email_check() { return this.reactFormDev.get('email_check'); }
  get date_check() { return this.reactFormDev.get('date_check'); }
  get city() { return this.reactFormDev.get('city'); }
  get state() { return this.reactFormDev.get('state'); }
  get Address() { return this.reactFormDev.get('Address'); }


  AddInfoEmployee() {
  }


  // onFileSelected(event) {
  //   this.selecetdFile = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result;

  //   };
  //   reader.readAsDataURL(this.selecetdFile);
  // }



addEmployeeDev(empl : Employee){
  this.employeeService.saveEmployeeDev(empl).subscribe(
    suc => {
   
      this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Developer is added' });
      this.reactFormDev.reset();
      this.employeeDev = new Employee();
      this.ngOnInit();
    
   
      
    },
    err => {
      this.messageService.add({ severity: 'error', summary: 'Service Message', detail: 'Erreur' });
    }
  ); 
}




addEmployeeMan(empl : Employee){
  this.employeeService.saveEmployeeMan(empl).subscribe(
    suc => {
   
      this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Manager is added' });
      this.employeeDev = new Employee();
      this.reactFormMan.reset();
      this.ngOnInit();
     
    },
    err => {
      this.messageService.add({ severity: 'error', summary: 'Service Message', detail: 'Erreur' });
    }
  ); 
}


}



