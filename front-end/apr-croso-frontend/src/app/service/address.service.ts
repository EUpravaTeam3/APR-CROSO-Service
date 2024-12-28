import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private baseUrl = 'http://localhost:8005/api/companies'; // Osnovni URL za API kompanija

  constructor(private http: HttpClient) {}

  addAddressToCompany(companyId: number, address: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${companyId}/address`, address);
  }
}
