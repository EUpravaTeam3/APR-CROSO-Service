import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { HttpClient } from '@angular/common/http';

export interface LoginUsers{
  ucn: string;
  email: string;
  name: string;
  surname: string;
  address: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);
  private http = inject(HttpClient)

  // form = this.fb.nonNullable.group({
  //   username: ['', Validators.required],
  // });

  loading = signal(false);
  error = signal<string | null>(null);

  username = '';
  password = '';


  ngOnInit() {
    // ako je ulogovan, skip login page.
    if (this.auth.currentUser()) this.router.navigateByUrl('/');
  }

  
  submit() {
    if (!this.username || !this.password) {
      alert("Molimo unesite UCN i lozinku.");
      return;
    }

    this.loading.set(true);

    this.http.post<LoginUsers>('http://localhost:9090/user', {
      ucn: this.username,
      password: this.password
    }, { withCredentials: true }).subscribe({
      next: (res) => {
        console.log('Logged in:', res);

        const user = (res as any).user;
        if (!user) {
          alert("Pogrešni kredencijali, pokušajte ponovo.");
          this.loading.set(false);
          return;
        }

        this.auth.setCurrentUser(user);
        // === PROVERA ownerUcn ===
        console.log('Current user UCN in AuthService:', this.auth.currentUserData()?.ucn);
        console.log('Current user in AuthService:', this.auth.currentUserData());

        localStorage.setItem("eupravaUcn", user.ucn ?? '');
        localStorage.setItem("eupravaEmail", user.email ?? '');
        localStorage.setItem("eupravaName", user.name ?? '');
        localStorage.setItem("eupravaSurname", user.surname ?? '');
        localStorage.setItem("eupravaAddress", user.address ?? '');

        this.auth.fetchRole();

        this.router.navigateByUrl("/home");
      },
      error: () => {
        alert("Pogrešni kredencijali, pokušajte ponovo.");
        this.loading.set(false);
      }
    });
  }
}

