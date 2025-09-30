import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface WorkField {
  id?: number;
  name: string;
  description: string;
  code: string;
}

export interface WorkFieldChangeRequest {
  id: number;
  companyId: number;
  oldValue: string;
  newValue: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdBy: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkfieldService {
  private apiUrl = 'http://localhost:8005/api'; 

  constructor(private http: HttpClient) {}

  addWorkFieldToCompany(companyId: number, workField: WorkField): Observable<WorkField> {
    return this.http.post<WorkField>(`${this.apiUrl}/companies/${companyId}/workfields`, workField);
  }

  getWorkFieldsByCompanyId(companyId: number): Observable<WorkField[]> {
    return this.http.get<WorkField[]>(`${this.apiUrl}/companies/${companyId}/workfields`);
  }

  updateWorkField(companyId: number, workFieldId: number, workField: WorkField): Observable<WorkField> {
  return this.http.put<WorkField>(`${this.apiUrl}/companies/${companyId}/workfields/${workFieldId}`, workField);
}


//Change Requests
getPendingRequests(): Observable<WorkFieldChangeRequest[]> {
    return this.http.get<WorkFieldChangeRequest[]>(`${this.apiUrl}/workfield-requests/pending`);
  }

  approveRequest(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/workfield-requests/${id}/approve`, {});
  }

  rejectRequest(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/workfield-requests/${id}/reject`, {});
  }


    submitChangeRequest(request: {
  companyId: number;
  workFieldId: number;
  requestedBy: string;
  newValues: any;
}): Observable<any> {
  const payload = {
    companyId: request.companyId,
    workFieldId: request.workFieldId,
    createdBy: request.requestedBy,
    oldValue: '', // mogu se uibaciti stare vrednosti
    newValue: JSON.stringify(request.newValues)
  };

  return this.http.post(`${this.apiUrl}/workfield-requests`, payload);
}


}
