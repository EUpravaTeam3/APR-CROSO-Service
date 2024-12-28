import { Component } from '@angular/core';
import { Company } from '../../../class/company';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../service/company.service';
import { Address } from '../../../class/address';

@Component({
  selector: 'company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css'
})
export class CompanyDetailsComponent {

  id!: number;
  company!: Company;
  address!: Address;


  constructor(private companyService: CompanyService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.getCompanyById();
    this.getAddressByCompanyId(); // Pozovite metodu za učitavanje adrese
  }


  getCompanyById(){
    this.id = this.route.snapshot.params[`id`];

    this.company = new Company();
    this.companyService.getCompanyById(this.id).subscribe(data => {
      this.company = data;
    });
  }

  getAddressByCompanyId() {
    this.companyService.getAddressByCompanyId(this.id).subscribe(
      (data) => {
        this.address = data;
      },
      (error) => {
        console.error('Error fetching address:', error);
      }
    );
  }

  goHome(){
    this.router.navigate(['/home']);
  }

}
