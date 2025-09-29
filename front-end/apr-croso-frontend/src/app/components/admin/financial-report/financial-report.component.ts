import { Component, OnInit } from '@angular/core';
import { FinancialReportService } from '../../../service/financial-report.service';
import { Company } from '../../../class/company';
import { CompanyService } from '../../../service/company.service';

@Component({
  selector: 'financial-report',
  templateUrl: './financial-report.component.html',
  styleUrl: './financial-report.component.css'
})
export class FinancialReportComponent implements OnInit {
  financialReports: any[] = [];
  newReport = {
    companyName: '',
    year: null,
    balanceSheet: null,
    incomeStatement: null,
  };

  isEditing = false;
  editingReportId: number | null = null;
  sortColumn: string = ''; 
  sortAscending: boolean = true; 

  companies: Company[] = [];
  

  constructor(private financialReportService: FinancialReportService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getAllReports();
    this.getCompanies();
  }

  sortTable(column: string): void {
    if (this.sortColumn === column) {
      // Ako se klikne na istu kolonu, preokreni redosled
      this.sortAscending = !this.sortAscending;
    } else {
      // Postavi novu kolonu za sortiranje
      this.sortColumn = column;
      this.sortAscending = true;
    }

    this.financialReports.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) return this.sortAscending ? -1 : 1;
      if (valueA > valueB) return this.sortAscending ? 1 : -1;
      return 0;
    });
  }

  getAllReports(): void {
    this.financialReportService.getAllFinancialReports().subscribe({
      next: (reports) => {
        this.financialReports = reports;
      },
      error: (error) => {
        console.error('Error fetching reports:', error);
        alert('Failed to load financial reports.');
      },
    });
  }

  private getCompanies(){
    this.companyService.getCompanyList().subscribe(data => {
      this.companies = data;
    })
  }
  getOwnerUcn(report: any): string {
    const company = this.companies.find(c => c.name === report.companyName);
    return company ? company.ownerUcn!: '';
  } 

  deleteFinancialReport(id: number): void {
    if (confirm('Da li ste sigurni da želite da obrišete kompaniju?')) {
      this.financialReportService.deleteFinancialReport(id).subscribe(() => {
        alert('Report uspešno obrisan.');
        this.getAllReports(); // osveži listu
      }, error => {
        alert('Došlo je do greške prilikom brisanja.');
      });
    }
  }





  toggleValid(report: any, event: any): void {
    const updatedReport = { ...report, valid: event.target.checked }; // Ažuriraj valid status

    this.financialReportService.updateFinancialReport(updatedReport).subscribe({
      next: () => {
        alert(
          `Financial report marked as ${updatedReport.valid ? 'valid' : 'invalid'
          }!`
        );
        this.getAllReports(); // Osveži listu da prikaže promenu
      },
      error: (error) => {
        console.error('Error toggling valid status:', error);
        alert('Failed to update the financial report.');
      },
    });
  }


}
