import { Component } from '@angular/core';
import { Company } from '../../../class/company';
import { CompanyService } from '../../../service/company.service';

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})
export class CompanyListComponent {

  companies: Company[] = [];

  constructor(private companyService: CompanyService){}

  ngOnInit(): void {
    this.getCompanies();
  }

  private getCompanies(){
    this.companyService.getCompanyList().subscribe(data => {
      this.companies = data;
    })
  }

}
