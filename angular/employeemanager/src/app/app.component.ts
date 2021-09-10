import {Component, Injectable, OnInit} from '@angular/core';
import {Employee} from "./interfaces/employee";
import {EmployeeService} from "./services/employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // The following is to hold all the Employees coming from the backend
  public employees!: Employee[];
  public deleteEmployee!: Employee;
  public editEmployee!: Employee | null;

  constructor(private employeeService: EmployeeService){}

  ngOnInit() {
    // This call the below function whenever the component is initialized
    this.getEmployees();
  }

  // We need to call the below function whenever the component is loaded or initialized and hence we use `OnInit()` function
  public getEmployees(): void {
    // this.employeeService.getEmployees() -> returns an Observable -> makes a request over the network (internet) -> and hence we need to subscribe
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );  // subscribe() notifies us when data comes back from the server
  }

  public onOpenModal(employee: Employee | null, mode: string) : void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(['add', 'update', 'delete'].includes(mode)) {
      button.setAttribute('data-target', `#${mode}EmployeeModal`);
    }
    if(mode === 'update') {
      this.editEmployee = employee;
    }
    container!.appendChild(button);
    button.click();
  }

  public onAddEmployee(addForm: NgForm) : void {
    // @ts-ignore
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();  // To clear the form of the details of the previously added employee
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(employee: Employee) : void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employee: number | undefined) : void {

  }
}
