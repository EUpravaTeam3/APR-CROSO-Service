import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Employee {
  id?: number;
  name: string;
  position: string;
  employed?: boolean;
}

export interface CreateEmployeeRequest {
  name: string;
  position: string;
  createdByUserId: number;
  companyId: number;
}

export interface AddingEmployeeResponse {
  id?: number;
  employee: Employee;
  status: string;
  createdByUserId?: number;
  createdByUsername?: string;
  companyId?: number;
  companyName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AddingEmployeeService {
  private apiUrl = 'http://localhost:8005/adding-employee';
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getRequests(): Observable<AddingEmployeeResponse[]> {
    return this.http.get<AddingEmployeeResponse[]>(this.apiUrl);
  }

  sendRequest(employee: Employee): Observable<AddingEmployeeResponse> {
    const currentUser = this.authService.currentUser();
    if (!currentUser) throw new Error('No logged in user');

    const request: CreateEmployeeRequest = {
      name: employee.name,
      position: employee.position,
      createdByUserId: currentUser.id,
      companyId: currentUser.companyId,
    };

    return this.http.post<AddingEmployeeResponse>(`${this.apiUrl}/request`, request);
  }

  processRequest(id: number, approve: boolean): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/process/${id}?approve=${approve}`, {});
  }
}
