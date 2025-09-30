import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stats-dashboard',
  templateUrl: './stats-dashboard.component.html',
  styleUrl: './stats-dashboard.component.css'
})
export class StatsDashboardComponent implements OnInit{
  
  totalCompanies = 0;
  totalUsers = 0;

  workfieldStats: { name: string; count: number }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<number>('http://localhost:8005/api/stats/companies/count')
      .subscribe(count => this.totalCompanies = count);

    this.http.get<number>('http://localhost:8005/api/stats/users/count')
      .subscribe(count => this.totalUsers = count);

    this.http.get<any[]>('http://localhost:8005/api/stats/companies/by-workfield')
      .subscribe(data => this.workfieldStats = data);
  }

}
