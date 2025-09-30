import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../../service/company.service';
import { Company } from '../../../class/company';
import { WorkField, WorkFieldChangeRequest, WorkfieldService } from '../../../service/workfield.service';
import { Router } from '@angular/router';

@Component({
  selector: 'workfield-request',
  templateUrl: './workfield-request.component.html',
  styleUrl: './workfield-request.component.css'
})
export class WorkfieldRequestComponent implements OnInit{
  workfieldReqForm!: FormGroup;
  companies: Company[] = [];
  userCompanies: Company[] = [];
  selectedCompany: Company | null = null;
  existingWorkFields: WorkField[] = [];
  selectedWorkField: WorkField | null = null;

  userRequests: WorkFieldChangeRequest[] = [];




  constructor
  ( private authService: AuthService,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private auth: AuthService,
    private workfieldService: WorkfieldService,
    private router: Router

  ){}


  ngOnInit(): void {
    this.workfieldReqForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      code: ['', Validators.required]
    });

    this.loadCompanies();
    this.loadUserRequests();
  }

  // Učitaj sve kompanije, filtriraj samo one čiji je owner trenutni user
  loadCompanies(): void {
    const currentUcn = this.auth.currentUserData()?.ucn;
    this.companyService.getCompanyList().subscribe({
      next: (data) => {
        this.companies = data;
        this.userCompanies = this.companies.filter(c => c.ownerUcn === currentUcn);
      },
      error: (err) => console.error('Failed to load companies:', err)
    });
  }

  // Kada korisnik odabere kompaniju -> povuci njene workfield-ove
  onCompanyChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const companyId = +select.value;
    this.selectedCompany = this.userCompanies.find(c => c.id === companyId) || null;

    if (this.selectedCompany) {
      this.workfieldService.getWorkFieldsByCompanyId(companyId).subscribe({
        next: (fields) => this.existingWorkFields = fields,
        error: (err) => console.error('Failed to load workfields:', err)
      });
    }
  }

  // Kada korisnik izabere koji workfield hoće da menja
  onWorkFieldSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const workFieldId = +select.value;
    this.selectedWorkField = this.existingWorkFields.find(w => w.id === workFieldId) || null;

    if (this.selectedWorkField) {
      this.workfieldReqForm.patchValue(this.selectedWorkField);
    }
  }

  //ucitavanje User zahteva/requests
  loadUserRequests(): void {
  const username = this.auth.currentUserData()?.ucn!;
  this.workfieldService.getUserRequests(username).subscribe({
    next: (data) => this.userRequests = data,
    error: (err) => console.error('Failed to load user requests:', err)
  });
}

// Submit - zahtev adminu
  onSubmit(): void {
  if (this.selectedCompany && this.selectedWorkField && this.workfieldReqForm.valid) {

    if (this.selectedWorkField.id === undefined) {
      console.error('Selected WorkField has no ID!');
      return;
    }

    const request = {
      companyId: this.selectedCompany.id,
      workFieldId: this.selectedWorkField.id,
      requestedBy: this.auth.currentUserData()?.ucn!,
      newValues: this.workfieldReqForm.value
    };

    this.workfieldService.submitChangeRequest(request).subscribe({
      next: () => {
        alert('Change request submitted successfully!');
        this.workfieldReqForm.reset();
        this.selectedWorkField = null;
        this.loadUserRequests();
      },
      error: (err) => {
        console.error('Error submitting change request:', err);
        alert('Failed to submit change request.');
      }
    });
  }
}





}




