import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Contribution {
  id?: number;
  amount: number;
  period: string;
  paymentDate?: Date;
  employee: {
    id?: number;
    name: string;
    position: string;
  };
}

@Injectable({
  providedIn: 'root'
})

export class ContributionService {
  private apiUrl = 'http://localhost:8005/api/contributions';

  constructor(private http: HttpClient) {}

  addContribution(contribution: Contribution): Observable<Contribution> {
    return this.http.post<Contribution>(this.apiUrl, contribution);
  }

  getContributions(): Observable<Contribution[]> {
    return this.http.get<Contribution[]>(this.apiUrl);
  }
}
