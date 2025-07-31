import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../../../../service/employee.service';
import { AddingEmployeeRequest, AddingEmployeeService } from '../../../../service/adding-employee.service';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  requests: AddingEmployeeRequest[] = [];
  

  constructor(private employeeService: EmployeeService,
    private addingEmployeeService: AddingEmployeeService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadRequests();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((data) => (this.employees = data));
  }


  loadRequests(): void {
    this.addingEmployeeService.getRequests().subscribe((data) => (this.requests = data));
  }

}
