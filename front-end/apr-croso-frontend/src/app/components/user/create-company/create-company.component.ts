import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../../../class/company';
import { CompanyService } from '../../../service/company.service';

@Component({
  selector: 'create-company',
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})
export class CreateCompanyComponent implements OnInit {
  companyForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService  // Ako koristite servis za komunikaciju sa backendom
  ) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required]],
      pib: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
      registrationDate: ['', [Validators.required]],
      companyStatus: ['', [Validators.required]]
    });
  }

  // Ova funkcija se poziva prilikom slanja forme
  onSubmit(): void {
    if (this.companyForm.invalid) {
      return;
    }

    const company: Company = this.companyForm.value;

    this.companyService.createCompany(company).subscribe(
      (response) => {
        console.log('Company created successfully!', response);
        this.reloadPage();
        // Redirektujte korisnika ili prikažite poruku
      },
      (error) => {
        console.error('Error creating company', error);
      }
    );
  }

  reloadPage() {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
  }
  
}

