import { Component, OnInit } from '@angular/core';
import { FinancialReportService } from '../../../service/financial-report.service';

@Component({
  selector: 'bankruptcy-report',
  templateUrl: './bankruptcy-report.component.html',
  styleUrl: './bankruptcy-report.component.css'
})
export class BankruptcyReportComponent implements OnInit {
  bankruptcyReports: any[] = [];
  errorMessage: string = '';

  constructor(private financialReportService: FinancialReportService) { }

  ngOnInit(): void {
    this.loadBankruptcyReports();
  }

  loadBankruptcyReports(): void {
    this.financialReportService.getAllBankruptcyReports().subscribe(
      (reports) => {
        this.bankruptcyReports = reports;
      },
      (error) => {
        console.error('Error loading bankruptcy reports:', error);
        this.errorMessage = 'Error loading bankruptcy reports. Please try again later.';
      }
    );
  }

  confirmLiquidation(reportId: number): void {
    const report = this.bankruptcyReports.find(r => r.id === reportId);

    if (!report) {
        console.error(`Report with ID ${reportId} not found.`);
        return;
    }

    const confirmAction = confirm('Da li ste sigurni da želite da potvrdite likvidaciju?');

    if (confirmAction) {
        this.financialReportService.updateCompanyStatusByPib({ pib: report.pib, status: 'LIQUIDATION' }).subscribe(
            (updatedReport) => {
                alert('Likvidacija potvrđena uspesno!');
                console.log('Status updated successfully:', updatedReport);

                // Ažuriramo status direktno u listi prijava
                report.status = updatedReport.companyStatus; 

            },
            (error) => {
                console.error('Error updating status:', error);
            }
        );
    } else {
      alert('Likvidacija nije potvrđena');
        console.log('Likvidacija nije potvrđena.');
    }
}


  confirmBankcruptcy(reportId: number): void {
    const report = this.bankruptcyReports.find(r => r.id === reportId);

    if (!report) {
        console.error(`Report with ID ${reportId} not found.`);
        return;
    }

    const confirmAction = confirm('Da li ste sigurni da želite da potvrdite stečaj?');

    if (confirmAction) {
        this.financialReportService.updateCompanyStatusByPib({ pib: report.pib, status: 'BANKRUPTCY' }).subscribe(
            (updatedReport) => {
                alert('Stecaj potvrđen uspesno!');
                console.log('Status updated successfully:', updatedReport);

                // Ažuriramo status direktno u listi prijava
                report.status = updatedReport.companyStatus; 

            },
            (error) => {
                console.error('Error updating status:', error);
            }
        );
    } else {
        console.log('Stečaj nije potvrđen.');
    }
}





}
