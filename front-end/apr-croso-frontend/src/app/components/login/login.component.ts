import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
  });

  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    // ako je ulogovan, skip login page.
    if (this.auth.currentUser()) this.router.navigateByUrl('/');
  }

  submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.auth
      .login(this.form.controls.username.value)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.router.navigateByUrl('/home'),
        error: (err) =>
          this.error.set(err.error?.message ?? 'Login failed – try again.'),
      });
  }
}
