import { Component, OnInit } from '@angular/core';
import { AddingEmployeeResponse, AddingEmployeeService } from '../../../../service/adding-employee.service';

@Component({
  selector: 'request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit{
  requests: AddingEmployeeResponse[] = [];

  constructor(private addingEmployeeService: AddingEmployeeService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.addingEmployeeService.getRequests().subscribe({
      next: (res) => this.requests = res,
      error: (err) => console.error(err)
    });
  }
  processRequest(id: number, approve: boolean): void {
    this.addingEmployeeService.processRequest(id, approve).subscribe(() => {
      this.requests = this.requests.filter(r => r.id !== id);
    });
  }

}
