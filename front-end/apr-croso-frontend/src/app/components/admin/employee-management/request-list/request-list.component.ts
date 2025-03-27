import { Component, OnInit } from '@angular/core';
import { AddingEmployeeRequest, AddingEmployeeService } from '../../../../service/adding-employee.service';

@Component({
  selector: 'request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit{
  requests: AddingEmployeeRequest[] = [];

  constructor(private addingEmployeeService: AddingEmployeeService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.addingEmployeeService.getRequests().subscribe((data) => (this.requests = data));
  }

  processRequest(id: number, approve: boolean): void {
    this.addingEmployeeService.processRequest(id, approve).subscribe(() => {
      alert('Zahtev obrađen!');
      this.loadRequests();
    });
  }

}
