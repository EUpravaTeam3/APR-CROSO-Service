import { Component } from '@angular/core';
import { Company } from '../../../class/company';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../service/company.service';

@Component({
  selector: 'company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css'
})
export class CompanyDetailsComponent {

  id!: number;
  company!: Company;


  constructor(private companyService: CompanyService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.getCompanyById();
    // this.getCompanies();
  }


  getCompanyById(){
    this.id = this.route.snapshot.params[`id`];

    this.company = new Company();
    this.companyService.getCompanyById(this.id).subscribe(data => {
      this.company = data;
    });
  }

  goHome(){
    this.router.navigate(['/home']);
  }

  // private getCompanies(){
  //   this.companyService.getCompanyList().subscribe(data => {
  //     this.companies = data;
  //   })
  // }

  // private getCompanyById(){
  //   this.companyId = this.route.snapshot.params['id']
    
  //   console.log('companyId from Company: ', this.companyId);

  //   this.companyService.getCompanyById(this.companyId).subscribe(data => {
  //     this.companies = data;
  //   });
  // }

  // // Primer podataka o kompaniji
  // company: Company = {
  //   id: 1,
  //   pib: '1234567890123',
  //   registrationNumber: '2001234567890',
  //   registrationDate: new Date('2020-01-15'),
  //   name: 'ABC Tehnika',
  //   companyStatus: 'Aktivna'
  // };

}
