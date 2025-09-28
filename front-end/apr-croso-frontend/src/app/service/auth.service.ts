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
  ucn?: string;
  email?: string;
  name?: string;
  surname?: string;
  address?: string;

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

  login(username: string, password: string) {
  return this.http
    .post<any>('http://localhost:9090/user', { ucn: username, password }, { withCredentials: true })
    .pipe(
      tap((res) => {
        console.log('Login response:', res);
        const user = res.user; // backend vraća { user: {...} }
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSignal.set(user);
      })
    );
}


 /** Uzimanje role sa backend-a (9090) i update signala */
  fetchRole(): void {
    this.http.get<{ role: string }>("http://localhost:9090/user/aprcroso", { withCredentials: true })
      .subscribe(res => {
        console.log("Korisnička uloga sa servera:", res.role);

        const current = this.currentUserSignal();
        if (current) {
          this.currentUserSignal.set({ ...current, role: res.role });
        } else {
          this.currentUserSignal.set({
            id: 0,
            username: "",
            firstName: "",
            lastName: "",
            companyId: 0,
            ...res // role dolazi iz servera
          });
        }
      });
  }

  /** Čitanje role iz signala */
  getRole(): string | null {
    return this.currentUserSignal()?.role ?? null;
  }

  /** Provera da li korisnik ima određenu rolu */
  hasRole(roleToCheck: string): boolean {
    const role = this.getRole();
    return role === roleToCheck;
  }

  setCurrentUser(user: LoginResponse) {
    this.currentUserSignal.set(user);
    localStorage.setItem("eupravaUser", JSON.stringify(user));
  }

  currentUserData(): LoginResponse | null {
    return this.currentUserSignal();
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSignal.set(null);
  }
}
