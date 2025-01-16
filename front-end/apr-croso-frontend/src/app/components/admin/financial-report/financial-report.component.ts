import { Component, OnInit } from '@angular/core';
import { FinancialReportService } from '../../../service/financial-report.service';

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
  sortColumn: string = ''; // Trenutno aktivna kolona za sortiranje
  sortAscending: boolean = true; // Sortiranje u rastućem ili opadajućem redosledu

  constructor(private financialReportService: FinancialReportService) { }

  ngOnInit(): void {
    this.getAllReports();
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
}
