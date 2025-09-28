import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../../../class/company';
import { CompanyService } from '../../../service/company.service';
import { AddressService } from '../../../service/address.service';
import { WorkField, WorkfieldService } from '../../../service/workfield.service';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { CreateCompanyDTO } from '../../../class/CreateCompanyDTO ';

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
    private workFieldService: WorkfieldService,
    private authService: AuthService,
    private router: Router

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
  

  onSubmit(): void {
    if (this.companyForm.invalid) {
      return;
    }

    const company: Company = this.companyForm.value;
    
    const workField: WorkField = this.companyForm.get('workField')?.value;

    const currentUser = this.authService.currentUserData();
      if (!currentUser) {
        alert("User not logged in or ucn missing");
        return;
      }
      company.ownerUcn = currentUser.ucn;
    


    const rawDate = this.companyForm.value.registrationDate;
    const formattedDate = rawDate.split('T')[0]; // skida vreme ako postoji

      // DTO za backend
    const dto: CreateCompanyDTO = {
      name: this.companyForm.value.name,
      pib: this.companyForm.value.pib,
      registrationNumber: this.companyForm.value.registrationNumber,
      registrationDate: formattedDate, // yyyy-MM-dd
      companyStatus: this.companyForm.value.companyStatus,
      createdByUserId: currentUser.id,
      ownerUcn: currentUser.ucn!
    };

      console.log('DTO to be sent:', dto);
      console.log(typeof this.companyForm.value.registrationDate, this.companyForm.value.registrationDate)
      console.log('Raw date before DTO:', this.companyForm.value.registrationDate);



    company.createdByUserId = this.authService.currentUser()?.id;
    


    console.log('Submitted Form:', this.companyForm.value);
    console.log('Submitted Company Status:', company.companyStatus);  
    console.log('Company ownerUcn:', company.ownerUcn);

    this.companyService.createCompany(dto).subscribe(
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
            this.router.navigateByUrl("/home")
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

  
}

