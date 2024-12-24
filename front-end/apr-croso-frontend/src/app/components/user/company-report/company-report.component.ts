import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'company-report',
  templateUrl: './company-report.component.html',
  styleUrl: './company-report.component.css'
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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Inicijalizacija formi
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
      this.financialReportData = this.financialReportForm.value;
      this.financialReportSubmitted = true;
      this.financialReportForm.reset();
    }
  }

  // Obrada podnošenja prijave za stečaj i likvidaciju
  onSubmitBankruptcy(): void {
    if (this.bankruptcyForm.valid) {
      this.bankruptcyData = this.bankruptcyForm.value;
      this.bankruptcySubmitted = true;
      this.bankruptcyForm.reset();
    }
  }
}
