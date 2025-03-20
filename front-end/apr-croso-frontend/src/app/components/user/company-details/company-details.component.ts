import { Component } from '@angular/core';
import { Company } from '../../../class/company';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../service/company.service';
import { Address } from '../../../class/address';
import { WorkField, WorkfieldService } from '../../../service/workfield.service';

@Component({
  selector: 'company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css'
})
export class CompanyDetailsComponent {

  id!: number;
  company!: Company;
  address!: Address;
  workFields: WorkField[] = [];  // Promenili smo workField u niz workFields


  constructor(
    private companyService: CompanyService, 
    private workFieldService: WorkfieldService, 
    private router: Router, 
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getCompanyById();
    this.getAddressByCompanyId(); // Pozovite metodu za učitavanje adrese
    this.getWorkFieldsByCompanyId(); 

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

  getWorkFieldsByCompanyId() {
    this.workFieldService.getWorkFieldsByCompanyId(this.id).subscribe(
      (data) => {
        this.workFields = data;
      },
      (error) => {
        console.error('Error fetching work fields:', error);
      }
    );
  }


  goHome(){
    this.router.navigate(['/home']);
  }

}
