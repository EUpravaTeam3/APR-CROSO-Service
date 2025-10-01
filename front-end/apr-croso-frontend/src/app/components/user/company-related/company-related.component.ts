import { Component, Input, OnInit } from '@angular/core';
import { CompanyService } from '../../../service/company.service';

@Component({
  selector: 'company-related',
  templateUrl: './company-related.component.html',
  styleUrl: './company-related.component.css'
})
export class CompanyRelatedComponent implements OnInit {
  @Input() companyId!: number;
  relatedCompanies: any[] = [];
  loading = false;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    if (this.companyId) {
      this.loadRelatedCompanies();
    }
  }

  loadRelatedCompanies(): void {
    this.loading = true;
    this.companyService.getRelatedCompanies(this.companyId).subscribe({
      next: (data) => {
        this.relatedCompanies = data;
        console.log("relatedCompanies:", data);
        this.loading = false;
      },
      error: (err) => {
        console.error("Greška pri učitavanju related kompanija:", err);
        this.loading = false;
      }
    });
  }

}
