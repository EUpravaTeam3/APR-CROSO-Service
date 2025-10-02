import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinancialReportService } from '../../../service/financial-report.service';
import { Company } from '../../../class/company';
import { CompanyService } from '../../../service/company.service';

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

  companies: Company[] = [];
  
  constructor(
    private fb: FormBuilder,
    private financialReportService: FinancialReportService,
    private companyService: CompanyService
    
  ) {}

  ngOnInit(): void {
    this.financialReportForm = this.fb.group({
      companyName: ['', Validators.required],
      pib: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      balanceSheet: ['', Validators.required],
      incomeStatement: ['', Validators.required]
    });

    this.bankruptcyForm = this.fb.group({
      companyName: ['', Validators.required],
      pib: ['', Validators.required],
      bankruptcyDate: ['', Validators.required],
      liquidation: [false]
    });
    

      const currentUcn = localStorage.getItem('eupravaUcn');
    if (currentUcn) {
      this.loadCompanies(currentUcn);
      this.loadUserFinancialReports(currentUcn);
      this.loadUserBankruptcyReports(currentUcn);
  }
  }

  //Ucitavanje Kompanije iz servisa
  loadCompanies(ucn: string): void {
    this.companyService.getCompanyList().subscribe({
    next: (companies) => {
      this.companies = companies.filter(c => c.ownerUcn === ucn); // filter by ownerUcn
    },
    error: (err) => console.error('Failed to load companies:', err)
  });
  }

  // Obrada podnošenja finansijskog izveštaja
  onSubmitFinancialReport(): void {
  if (this.financialReportForm.valid) {
    const currentUcn = localStorage.getItem('eupravaUcn');  
    const report = {
      ...this.financialReportForm.value,
      submittedByUcn: currentUcn
    };

    this.financialReportService.createFinancialReport(report).subscribe({
      next: () => {
        this.loadUserFinancialReports(currentUcn!); 
        this.financialReportForm.reset();
        alert('Finansijski izveštaj uspešno podnet.');
      },
      error: (err) => console.error(err)
    });
  }
}

onSubmitBankruptcy(): void {
  if (this.bankruptcyForm.valid) {
    const currentUcn = localStorage.getItem('eupravaUcn'); 
    const report = {
      ...this.bankruptcyForm.value,
      submittedByUcn: currentUcn
    };

    this.financialReportService.createBankruptcyReport(report).subscribe({
      next: () => {
        this.loadUserBankruptcyReports(currentUcn!);
        this.bankruptcyForm.reset();
        alert('Prijava za stečaj uspešno podneta.');
      },
      error: (err) => console.error(err)
    });
  }
}

loadUserFinancialReports(ucn: string): void {
  this.financialReportService.getFinancialReportsByUser(ucn).subscribe({
    next: (data) => this.financialReportData = data,
    error: (err) => console.error(err)
  });
}

loadUserBankruptcyReports(ucn: string): void {
  this.financialReportService.getBankruptcyReportsByUser(ucn).subscribe({
    next: (data) => this.bankruptcyData = data,
    error: (err) => console.error(err)
  });
}

reloadReports(): void {
  const currentUcn = localStorage.getItem('eupravaUcn');
  if (currentUcn) {
    this.loadUserFinancialReports(currentUcn);
    this.loadUserBankruptcyReports(currentUcn);
  }
}



}
