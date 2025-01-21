import { Component, OnInit } from '@angular/core';
import { FinancialReportService } from '../../../service/financial-report.service';

@Component({
  selector: 'bankruptcy-report',
  templateUrl: './bankruptcy-report.component.html',
  styleUrl: './bankruptcy-report.component.css'
})
export class BankruptcyReportComponent implements OnInit{
  bankruptcyReports: any[] = [];
  errorMessage: string = '';

  constructor(private financialReportService: FinancialReportService) {}

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
    // Prikazujemo potvrdu korisniku pre izvršavanja akcije
    const confirmAction = confirm('Da li ste sigurni da želite da potvrdite likvidaciju?');
  
    if (confirmAction) {
      // Ova funkcija može pozvati servis za ažuriranje stanja u bazi ili poslati drugi zahtev
      console.log('Potvrđena likvidacija za ID:', reportId);
      // TODO: Implementacija poziva servisa za potvrdu likvidacije
    } else {
      console.log('Likvidacija nije potvrđena.');
    }
  }

  confirmBankcruptcy(reportId: number): void {
    const confirmAction = confirm('Da li ste sigurni da želite da potvrdite stečaj?');

    if (confirmAction) {
      // Ova funkcija može pozvati servis za ažuriranje stanja u bazi ili poslati drugi zahtev
      console.log('Potvrđen stečaj za ID:', reportId);
      // TODO: Implementacija poziva servisa za potvrdu stečaja
    } else {
      console.log('Stečaj nije potvrđen.');
    }
  }
    

}
