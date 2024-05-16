import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../class/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseURL = "http://localhost:8005/api/companies"

  constructor(private httpClient: HttpClient) { }

  getCompanyList(): Observable<Company[]>{
    return this.httpClient.get<Company[]>(`${this.baseURL}`);
  }
}
