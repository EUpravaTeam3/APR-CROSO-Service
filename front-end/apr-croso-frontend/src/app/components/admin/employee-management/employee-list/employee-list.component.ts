import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../../../../service/employee.service';
import { AddingEmployeeResponse, AddingEmployeeService } from '../../../../service/adding-employee.service';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  requests: AddingEmployeeResponse[] = [];
  

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

  getRequestStatusForEmployee(employeeId: number | undefined): string {
    if (!employeeId) return 'N/A'; // Ako je undefined, vrati N/A

    const request = this.requests.find(r => r.employee?.id === employeeId);
    return request ? request.status : 'N/A';
  }

  getStatusClass(status: string): string {
  switch (status) {
    case 'APPROVED':
      return 'status-approved';
    case 'REJECTED':
      return 'status-rejected';
    case 'PENDING':
      return 'status-pending';
    default:
      return '';
  }
}




}
