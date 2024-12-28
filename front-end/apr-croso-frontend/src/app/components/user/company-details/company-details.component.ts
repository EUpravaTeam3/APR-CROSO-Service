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

}
