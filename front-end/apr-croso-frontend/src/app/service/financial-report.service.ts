import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialReportService {

  private financialReportUrl = 'http://localhost:8005/api/financial-reports';
  private bankruptcyReportUrl = 'http://localhost:8005/api/bankruptcy-reports';

  constructor(private http: HttpClient) { }

  // Kreiranje finansijskog izveštaja
  createFinancialReport(report: any): Observable<any> {
    return this.http.post(this.financialReportUrl, report);
  }

  // Dobijanje svih finansijskih izveštaja
  getAllFinancialReports(): Observable<any[]> {
    return this.http.get<any[]>(this.financialReportUrl);
  }

  // Dobijanje finansijskog izveštaja po ID-u
  getFinancialReportById(id: number): Observable<any> {
    return this.http.get<any>(`${this.financialReportUrl}/${id}`);
  }

  // Ažuriranje finansijskog izveštaja
  updateFinancialReport(report: any): Observable<any> {
    return this.http.put(`${this.financialReportUrl}/${report.id}`, report);
  }

  deleteFinancialReport(id: number): Observable<void>{
    return this.http.delete<void>(`${this.financialReportUrl}/${id}`);
  }

  
  // Kreiranje prijave za stečaj
  createBankruptcyReport(report: any): Observable<any> {
    return this.http.post(this.bankruptcyReportUrl, report);
  }

  // Dobijanje svih prijava za stečaj
  getAllBankruptcyReports(): Observable<any[]> {
    return this.http.get<any[]>(this.bankruptcyReportUrl);
  }

  updateCompanyStatusByPib(requestBody: { pib: string; status: string }): Observable<any> {
    return this.http.put('http://localhost:8005/api/companies/update-status-by-pib', requestBody);
  }


  //dobavljanje reportova po UserUcn
  getFinancialReportsByUser(ucn: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.financialReportUrl}/user/${ucn}`);
}

getBankruptcyReportsByUser(ucn: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.bankruptcyReportUrl}/user/${ucn}`);
}

  
  

  

}
