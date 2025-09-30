import { Component, Input, OnInit } from '@angular/core';
import { AuditLog } from '../../../class/AuditLog';
import { CompanyService } from '../../../service/company.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'company-history',
  templateUrl: './company-history.component.html',
  styleUrl: './company-history.component.css'
})
export class CompanyHistoryComponent implements OnInit{
@Input() companyId!: number;
  logs: AuditLog[] = [];
  loading = false;
  isAdmin: boolean = false;

  constructor(
    private companyService: CompanyService,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    if (this.companyId) {
      this.loadHistory();
    }

    this.authService.fetchRole().subscribe(res => {
    this.isAdmin = res.role?.toUpperCase() === 'ADMIN';
    console.log('Da li je admin?', this.isAdmin);
    });
  }

  loadHistory(): void {
    this.loading = true;
    this.companyService.getCompanyHistory(this.companyId).subscribe({
      next: (data) => {
        this.logs = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load company history:', err);
        this.loading = false;
      }
    });
  }
}
