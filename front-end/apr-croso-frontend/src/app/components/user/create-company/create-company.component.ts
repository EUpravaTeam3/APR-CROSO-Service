import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../../../class/company';
import { CompanyService } from '../../../service/company.service';
import { AddressService } from '../../../service/address.service';
import { WorkField, WorkfieldService } from '../../../service/workfield.service';

@Component({
  selector: 'create-company',
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})
export class CreateCompanyComponent implements OnInit {
  companyForm!: FormGroup;
  workFields: WorkField[] = [];

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private addressService: AddressService,
    private workFieldService: WorkfieldService

  ) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required]],
      pib: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
      registrationDate: ['', [Validators.required]],
      companyStatus: ['ACTIVE', [Validators.required]],
      address: this.fb.group({ 
        city: ['', Validators.required],
        street: ['', Validators.required],
        numberAndLetter: ['', Validators.required]
      }),
      workField: this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        code: ['', Validators.required]
      })
    });
  }
  

  // Ova funkcija se poziva prilikom slanja forme
  onSubmit(): void {
    if (this.companyForm.invalid) {
      return;
    }

    const company: Company = this.companyForm.value;
    const workField: WorkField = this.companyForm.get('workField')?.value;

    console.log('Submitted Form:', this.companyForm.value); // Proverite sve vrednosti

    console.log('Submitted Company Status:', company.companyStatus);  // Proverite vrednost ovde


    this.companyService.createCompany(company).subscribe(
      (companyResponse) => {
        console.log('Company created successfully!', companyResponse);

        const address = this.companyForm.get('address')?.value;
        this.addressService.addAddressToCompany(companyResponse.id, address).subscribe(
          () => {
            console.log('Address added successfully!');
          },
          (error) => {
            console.error('Error adding address', error);
          }
        );

        this.workFieldService.addWorkFieldToCompany(companyResponse.id, workField).subscribe(
          () => {
            console.log('WorkField added successfully!');
            alert('Company, address, and work field added successfully!');
            this.companyForm.reset();
            this.reloadPage();
          },
          (error) => {
            console.error('Error adding work field', error);
            alert('Company created, but error adding work field.');
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

