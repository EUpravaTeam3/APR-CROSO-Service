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

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
  });

  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    // ako je ulogovan, skip login page.
    if (this.auth.currentUser()) this.router.navigateByUrl('/');
  }

  username = '';
  password = '';

  submit() {
    if (this.form.invalid) return;
    this.http.post<LoginUsers>('http://localhost:9090/user', {
      ucn: this.username,
      password: this.password
    }, { withCredentials: true }).subscribe(res => {
      console.log('Logged in:', res);
      
      // user = res
      console.log(res);
      const user = (res as any).user;  // uzimamo user objekat iz res

      this.auth.setCurrentUser(user);
      localStorage.setItem("eupravaUcn", user.ucn ?? '');
      localStorage.setItem("eupravaEmail", user.email ?? '');
      localStorage.setItem("eupravaName", user.name ?? '');
      localStorage.setItem("eupravaSurname", user.surname ?? '');
      localStorage.setItem("eupravaAddress", user.address ?? '');

      this.auth.fetchRole();


      // === PROVERA ownerUcn ===
    console.log('Current user UCN in AuthService:', this.auth.currentUserData()?.ucn);
    console.log('Current user in AuthService:', this.auth.currentUserData());



      this.router.navigateByUrl("/home")
    });
      this.loading.set(true);
  }
}

//trenutno spojeno, edited
