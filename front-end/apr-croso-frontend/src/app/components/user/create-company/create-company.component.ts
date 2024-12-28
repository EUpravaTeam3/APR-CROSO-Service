import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../../../class/company';
import { CompanyService } from '../../../service/company.service';
import { AddressService } from '../../../service/address.service';

@Component({
  selector: 'create-company',
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})
export class CreateCompanyComponent implements OnInit {
  companyForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private addressService: AddressService // Dodajemo servis za adrese

  ) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required]],
      pib: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
      registrationDate: ['', [Validators.required]],
      companyStatus: ['Active', [Validators.required]],
      address: this.fb.group({ // Dodavanje address kao FormGroup
        city: ['', Validators.required],
        street: ['', Validators.required],
        numberAndLetter: ['', Validators.required]
      })
    });
  }
  

  // Ova funkcija se poziva prilikom slanja forme
  onSubmit(): void {
    if (this.companyForm.invalid) {
      return;
    }

    const company: Company = this.companyForm.value;

    console.log('Submitted Company Status:', company.companyStatus);  // Proverite vrednost ovde

    this.companyService.createCompany(company).subscribe(
      (companyResponse) => {
        console.log('Company created successfully!', companyResponse);

        const address = this.companyForm.get('address')?.value;

        this.addressService.addAddressToCompany(companyResponse.id, address).subscribe(
          (addressResponse) => {
            console.log('Address added successfully!', addressResponse);
            alert('Company and address created successfully!');
            this.companyForm.reset();
          },
          (addressError) => {
            console.error('Error adding address', addressError);
            alert('Company created, but error adding address.');
          }
        );
      },
      (error) => {
        console.error('Error creating company', error);
        alert('Error creating company.');
      }
    );
  }

  reloadPage() {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
  }
  
}

