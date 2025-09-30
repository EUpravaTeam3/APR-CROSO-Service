import { Component, OnInit } from '@angular/core';
import { WorkFieldChangeRequest, WorkfieldService } from '../../../service/workfield.service';

@Component({
  selector: 'workfield-request-list',
  templateUrl: './workfield-request-list.component.html',
  styleUrl: './workfield-request-list.component.css'
})
export class WorkfieldRequestListComponent implements OnInit{
requests: WorkFieldChangeRequest[] = [];

  constructor(private workfieldService: WorkfieldService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.workfieldService.getPendingRequests().subscribe({
      next: (data) => this.requests = data,
      error: (err) => console.error('Failed to load requests:', err)
    });
  }

  approve(id: number): void {
    this.workfieldService.approveRequest(id).subscribe({
      next: () => {
        alert('Request approved!');
        this.loadRequests();
      },
      error: (err) => console.error('Failed to approve request:', err)
    });
  }

  reject(id: number): void {
    this.workfieldService.rejectRequest(id).subscribe({
      next: () => {
        alert('Request rejected!');
        this.loadRequests();
      },
      error: (err) => console.error('Failed to reject request:', err)
    });
  }
}
