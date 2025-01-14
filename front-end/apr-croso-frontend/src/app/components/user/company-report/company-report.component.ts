import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinancialReportService } from '../../../service/financial-report.service';

@Component({
  selector: 'company-report',
  templateUrl: './company-report.component.html',
  styleUrls: ['./company-report.component.css']
})
export class CompanyReportComponent implements OnInit {

  // Forma za finansijske izveštaje
  financialReportForm!: FormGroup;
  financialReportSubmitted: boolean = false;
  financialReportData: any;

  // Forma za prijavu stečaja i likvidacije
  bankruptcyForm!: FormGroup;
  bankruptcySubmitted: boolean = false;
  bankruptcyData: any;

  constructor(
    private fb: FormBuilder,
    private financialReportService: FinancialReportService
  ) {}

  ngOnInit(): void {
    this.financialReportForm = this.fb.group({
      companyName: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      balanceSheet: ['', Validators.required],
      incomeStatement: ['', Validators.required]
    });

    this.bankruptcyForm = this.fb.group({
      companyName: ['', Validators.required],
      bankruptcyDate: ['', Validators.required],
      liquidation: [false]
    });
  }

  // Obrada podnošenja finansijskog izveštaja
  onSubmitFinancialReport(): void {
    if (this.financialReportForm.valid) {
      const report = this.financialReportForm.value;

      // Koristimo servis za slanje podataka na backend
      this.financialReportService.createFinancialReport(report).subscribe({
        next: (response: any) => {
          this.financialReportData = response;
          this.financialReportSubmitted = true;
          this.financialReportForm.reset();
          alert('Finansijski izveštaj uspešno podnet.');
        },
        error: (err: any) => {
          console.error('Greška pri podnošenju finansijskog izveštaja:', err);
          alert('Došlo je do greške. Pokušajte ponovo.');
        }
      });
    }
  }

  // Obrada podnošenja prijave za stečaj i likvidaciju
  onSubmitBankruptcy(): void {
    if (this.bankruptcyForm.valid) {
      const report = this.bankruptcyForm.value;

      // Koristimo servis za slanje podataka na backend
      this.financialReportService.createBankruptcyReport(report).subscribe({
        next: (response: any) => {
          this.bankruptcyData = response;
          this.bankruptcySubmitted = true;
          this.bankruptcyForm.reset();
          alert('Prijava za stečaj uspešno podneta.');
        },
        error: (err: any) => {
          console.error('Greška pri podnošenju prijave za stečaj:', err);
          alert('Došlo je do greške. Pokušajte ponovo.');
        }
      });
    }
  }
}
