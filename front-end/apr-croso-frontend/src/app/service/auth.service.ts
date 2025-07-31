import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

export interface LoginResponse {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  companyId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private readonly api = "http://localhost:8005/api/auth";

  /** Reactive state using Signals (new in 17) */
  private currentUserSignal = signal<LoginResponse | null>(null);
  readonly currentUser = this.currentUserSignal.asReadonly();

  /** Persist session between refreshes */
  constructor() {
    const stored = localStorage.getItem('user');
    if (stored) this.currentUserSignal.set(JSON.parse(stored));
  }

  login(username: string) {
    return this.http
      .post<LoginResponse>(`${this.api}/login`, { username })
      .pipe(
        tap((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSignal.set(user);
        })
      );
  }

  getRole(): string | null {
    return this.currentUserSignal()?.role ?? null;
  }

  hasRole(roleToCheck: string): boolean {
    const role = this.getRole();
    return role ? role.includes(roleToCheck) : false;
  }



  logout() {
    localStorage.removeItem('user');
    this.currentUserSignal.set(null);
  }
}
