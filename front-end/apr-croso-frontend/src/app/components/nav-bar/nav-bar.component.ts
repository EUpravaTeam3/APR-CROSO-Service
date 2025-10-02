import { Component, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CheckedUser } from '../../class/CheckedUser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  // koristimo computed da uvek reaguje na promene signala
  user = computed(() => this.auth.currentUserData());
  role = computed(() => this.auth.getRole());

  constructor(private auth: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
  // kad se nav bar mount-uje, samo pozovi fetchRole
    this.auth.fetchRole().subscribe({
      next: (res) => {
        console.log("Role refreshed:", res.role);
      },
      error: (err) => {
        console.error("Not logged in:", err);
        this.router.navigateByUrl('/login');
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
