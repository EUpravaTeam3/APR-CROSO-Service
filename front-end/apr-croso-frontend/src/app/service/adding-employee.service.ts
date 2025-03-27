import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.service';

export interface AddingEmployeeRequest {
  id?: number;
  employee: Employee;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class AddingEmployeeService {
  private apiUrl = 'http://localhost:8005/adding-employee';

  constructor(private http: HttpClient) {}

  getRequests(): Observable<AddingEmployeeRequest[]> {
    return this.http.get<AddingEmployeeRequest[]>(this.apiUrl);
  }

  sendRequest(employee: Employee): Observable<AddingEmployeeRequest> {
    return this.http.post<AddingEmployeeRequest>(`${this.apiUrl}/request`, employee);
  }

  processRequest(id: number, approve: boolean): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/process/${id}?approve=${approve}`, {});
  }
}
