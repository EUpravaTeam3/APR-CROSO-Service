import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../class/company';
import { Address } from '../class/address';
import { CreateCompanyDTO } from '../class/CreateCompanyDTO ';
import { AuditLog } from '../class/AuditLog';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseURL = "http://localhost:8005/api/companies";

  constructor(private httpClient: HttpClient) { }

  getCompanyList(): Observable<Company[]>{
    return this.httpClient.get<Company[]>(`${this.baseURL}`);
  }

  createCompany(dto: CreateCompanyDTO): Observable<Company> {
    return this.httpClient.post<Company>(this.baseURL, dto);
  }
  deleteCompany(id: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8005/api/companies/${id}`);
  }

  getCompanyById(id: number): Observable<any>{
    return this.httpClient.get<Company>(`${this.baseURL}/${id}`);
  }

  getAddressByCompanyId(companyId: number): Observable<Address> {
    return this.httpClient.get<Address>(`${this.baseURL}/${companyId}/address`);
  }

  //AuditLogCompanyHistory
  getCompanyHistory(companyId: number): Observable<AuditLog[]> {
    return this.httpClient.get<AuditLog[]>(`${this.baseURL}/${companyId}/history`);
  }

  //GetRelatedCompanies - preporucene kompanije
  getRelatedCompanies(companyId: number) {
  return this.httpClient.get<any[]>(`http://localhost:8005/api/companies/${companyId}/related`);
}

}
