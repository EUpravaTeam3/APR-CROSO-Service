import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface WorkField {
  id?: number;
  name: string;
  description: string;
  code: string;
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


}
