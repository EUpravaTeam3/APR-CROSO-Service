import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../class/company';
import { Address } from '../class/address';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseURL = "http://localhost:8005/api/companies";

  constructor(private httpClient: HttpClient) { }

  getCompanyList(): Observable<Company[]>{
    return this.httpClient.get<Company[]>(`${this.baseURL}`);
  }

  createCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(this.baseURL, company);
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

}
