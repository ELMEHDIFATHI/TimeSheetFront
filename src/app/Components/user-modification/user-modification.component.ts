import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { Employee } from 'src/app/model/Employee.model';


@Component({
  selector: 'app-user-modification',
  templateUrl: './user-modification.component.html',
  styleUrls: ['./user-modification.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class UserModificationComponent implements OnInit {


  EmployeeDevList: Employee[];
  EmployeeManList: Employee[];
  employeeM : Employee;
  userDialog: boolean;
  userDialog1: boolean;
  reactFormEmp: FormGroup;
  submitted: boolean;
  constructor(private employeeService: EmployeeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.employeeService.findAllEmployeeManager().subscribe(data => {this.EmployeeManList = data;console.log(this.EmployeeManList)});

    this.employeeService.findAllEmployeeDev().subscribe(data => {this.EmployeeDevList = data;console.log(this.EmployeeDevList)});


    this.reactFormEmp = new FormGroup({
      'id': new FormControl('', [Validators.required]),
      'check': new FormControl('', [Validators.required]),
      'username': new FormControl('', [Validators.required]),
      'lastname': new FormControl('', [Validators.required]),
      'firstname': new FormControl('', [Validators.required]),
      'email_check': new FormControl('', [Validators.email]),
      'date_check': new FormControl('', [Validators.required]),
      'city': new FormControl('', [Validators.required]),
      'state': new FormControl('', [Validators.required]),
      'Address': new FormControl(''),
      'password': new FormControl('', [Validators.required])
    });
  }

  get check() { return this.reactFormEmp.get('check'); }
  get username() { return this.reactFormEmp.get('username'); }
  get lastname() { return this.reactFormEmp.get('lastname'); }
  get firstname() { return this.reactFormEmp.get('firstname'); }
  get id() { return this.reactFormEmp.get('id'); }
  get password() { return this.reactFormEmp.get('password'); }
  get email_check() { return this.reactFormEmp.get('email_check'); }
  get date_check() { return this.reactFormEmp.get('date_check'); }
  get city() { return this.reactFormEmp.get('city'); }
  get state() { return this.reactFormEmp.get('state'); }
  get Address() { return this.reactFormEmp.get('Address'); }


  deleteEmplyee(empl: Employee) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + empl.lastName + ' ' + empl.firstName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeeService.deleteEmployeeById(empl.id);
        this.ngOnInit();
        this.employeeService.findAllEmployeeManager().subscribe(data => this.EmployeeManList = data);
        this.employeeService.findAllEmployeeDev().subscribe(data => this.EmployeeDevList = data);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Deleted', life: 3000 });

      }
    });
    this.ngOnInit();
    this.employeeService.findAllEmployeeManager().subscribe(data => this.EmployeeManList = data);
    this.employeeService.findAllEmployeeDev().subscribe(data => this.EmployeeDevList = data);
    this.userDialog = false;
   
  }


  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }



  /////////////////////////////////////////////
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
      this.employeeM.photo = b;
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

  /////////////////////////////////////////////////////////////////////

  editEmployee(empl1 : Employee){
    console.log(empl1)
    this.employeeM= {...empl1};
    this.userDialog = true;
  }

  editEmployee1(empl : Employee){
    console.log(empl)
    this.employeeM= {...empl};
    this.userDialog1 = true;
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  hideDialog1() {
    this.userDialog1 = false;
    this.submitted = false;
  }

  saveEmployeeDev(){
    this.submitted = true;

    if (this.employeeM.lastName.trim()) {
      if (this.employeeM.id) {


        this.employeeService.saveEmployeeDevM(this.employeeM).subscribe(
          suc => {
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Employee Updated', life: 3000});     
            this.employeeM = new Employee();
            this.ngOnInit();
          },
          err => {

            this.messageService.add({ severity: 'error', summary: 'Service Message', detail: 'Erreur' });
          }
        )
        
      }
      this.ngOnInit();
      this.employeeService.findAllEmployeeManager().subscribe(data => this.EmployeeManList = data);
      this.employeeService.findAllEmployeeDev().subscribe(data => this.EmployeeDevList = data);
      this.userDialog = false;
      this.employeeM = new Employee();

    }
  }



  saveEmployeeMan(){
    this.submitted = true;

    if (this.employeeM.lastName.trim()) {
      if (this.employeeM.id) {


        this.employeeService.saveEmployeeManM(this.employeeM).subscribe(
          suc => {
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Employee Updated', life: 3000});     
            this.employeeM = new Employee();
            this.ngOnInit();
          },
          err => {

            this.messageService.add({ severity: 'error', summary: 'Service Message', detail: 'Erreur' });
          }
        )
        
      }
      this.ngOnInit();
      this.employeeService.findAllEmployeeManager().subscribe(data => this.EmployeeManList = data);
      this.employeeService.findAllEmployeeDev().subscribe(data => this.EmployeeDevList = data);
      this.userDialog1 = false;
      this.employeeM = new Employee();

    }
  }
}
