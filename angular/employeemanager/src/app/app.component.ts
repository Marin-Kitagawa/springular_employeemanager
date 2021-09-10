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
  public deleteEmployee!: Employee | null;
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
    if(mode === 'add') {
      button.setAttribute('data-target', `#${mode}EmployeeModal`);
    }
    if(mode === 'update') {
      button.setAttribute('data-target', `#${mode}EmployeeModal`);
      this.editEmployee = employee;
    }
    if(mode === 'delete') {
      button.setAttribute('data-target', `#${mode}EmployeeModal`);
      this.deleteEmployee = employee;
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

  public onDeleteEmployee(employeeId: number) : void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string) : void {
    const results: Employee[] = [];
    for(const employee of this.employees) {
      if(
           employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(employee);
      }
    }
    this.employees = results;
    if(results.length === 0 || !key) {
      this.getEmployees();
    }
  }
}
