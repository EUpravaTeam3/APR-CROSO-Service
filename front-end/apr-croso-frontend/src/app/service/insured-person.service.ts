import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InsuredPerson } from '../class/InsuredPerson';

@Injectable({
  providedIn: 'root'
})
export class InsuredPersonService {
  private apiUrl = 'http://localhost:8005/api/insured-persons';

  constructor(private http: HttpClient) {}

  // Registracija osigurane osobe
  registerInsuredPerson(person: InsuredPerson): Observable<InsuredPerson> {
    return this.http.post<InsuredPerson>(`${this.apiUrl}/register`, person);
  }

  // Dohvatanje osigurane osobe po ID-u
  getInsuredPersonById(id: number): Observable<InsuredPerson> {
    return this.http.get<InsuredPerson>(`${this.apiUrl}/${id}`);
  }

  // Dohvatanje svih osiguranih osoba
  getAllInsuredPersons(): Observable<InsuredPerson[]> {
    return this.http.get<InsuredPerson[]>(this.apiUrl);
  }

  // Brisanje osigurane osobe po ID-u
  deleteInsuredPerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
