import { Component } from '@angular/core';
import { Company } from '../../../class/company';
import { CompanyService } from '../../../service/company.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})
export class CompanyListComponent {
  isAdmin: boolean = false;

  companies: Company[] = [];

  nameFilter: String = '';
  pibFilter: String = '';
  regNumberFilter: String = '';
  regDateFilter: String = '';
  statusFilter: String = ''; // Ostaviti prazan string kao podrazumevano (sve kompanije prikazane)

  statusOptions: String[] = ['ACTIVE', 'INACTIVE', 'DELETED', 'BANKRUPTCY', 'LIQUIDATION'];

  constructor(private companyService: CompanyService, private router: Router, private authService: AuthService
  ){}

  ngOnInit(): void {
    this.getCompanies();
    this.isAdmin = this.authService.hasRole('ADMIN');
  }

  matchesSearch(fieldValue: String, filterValue: String): boolean {
    if (!filterValue.trim()) return true;
    return fieldValue.toLowerCase().includes(filterValue.toLowerCase());
  }

  get filteredCompanies() {
    return this.companies.filter(company =>
      this.matchesSearch(company.name, this.nameFilter) &&
      this.matchesSearch(company.pib, this.pibFilter) &&
      this.matchesSearch(company.registrationNumber, this.regNumberFilter) &&
      (this.statusFilter ? company.companyStatus === this.statusFilter : true) // TAČNA PODUDARNOST ZA STATUS
    );
  }

  resetFilters() {
    this.nameFilter = '';
    this.pibFilter = '';
    this.regNumberFilter = '';
    this.regDateFilter = '';
    this.statusFilter = '';
  }


  private getCompanies(){
    this.companyService.getCompanyList().subscribe(data => {
      this.companies = data;
    })
  }


  deleteCompany(id: number): void {
    if (confirm('Da li ste sigurni da želite da obrišete kompaniju?')) {
      this.companyService.deleteCompany(id).subscribe(() => {
        alert('Kompanija uspešno obrisana.');
        this.getCompanies(); // osveži listu
      }, error => {
        alert('Došlo je do greške prilikom brisanja kompanije.');
      });
    }
  }

  companyDetails(companyId: number){
    this.router.navigate(['/company-details', companyId]);

  }

}
