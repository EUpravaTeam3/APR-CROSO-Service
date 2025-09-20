import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddingEmployeeService } from '../../../service/adding-employee.service';
import { ContributionService } from '../../../service/contribution.service';

export interface Employee {
  id?: number;
  name: string;
  position: string;
  employed?: boolean;
}

export interface AddingEmployeeRequest {
  id?: number;
  employee: Employee;
  status: string;
}

export interface Contribution {
  id?: number;
  amount: number;
  period: string;
  paymentDate?: Date;
  employee: {
    id?: number;
    name: string;
    position: string;
  };
}


@Component({
  selector: 'contribution-payment',
  templateUrl: './contribution-payment.component.html',
  styleUrl: './contribution-payment.component.css'
})
export class ContributionPaymentComponent implements OnInit {
  searchForm!: FormGroup;
  paymentForm!: FormGroup;
  employees: Employee[] = []; 
  filteredEmployees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  step: number = 1;
  successMessage: string = '';
  contributions: Contribution[] = [];

  constructor(
    private fb: FormBuilder,
    private addingEmployeeService: AddingEmployeeService,
    private contributionService: ContributionService
  ) { }

  ngOnInit(): void {
  this.searchForm = this.fb.group({
    searchCriteria: ['name', Validators.required],
    searchValue: ['', Validators.required]
  });

  this.paymentForm = this.fb.group({
    amount: ['', [Validators.required, Validators.min(1000)]],
    period: ['', Validators.required]
  });

  this.loadApprovedEmployees();
  this.loadContributions();
}

loadContributions(): void {
    this.contributionService.getContributions().subscribe(data => {
      this.contributions = data;
    });
  }


loadApprovedEmployees(): void {
  this.addingEmployeeService.getRequests().subscribe((requests: AddingEmployeeRequest[]) => {
    const approved = requests.filter(r => r.status === 'APPROVED' && r.employee);
    this.employees = approved.map(r => r.employee);
  });
}


  // Pretraga zaposlenih po kriterijumu

    searchEmployees(): void {
  const { searchValue } = this.searchForm.value;

  if (!searchValue) {
    alert('Unesite kriterijum pretrage.');
    return;
  }

  this.filteredEmployees = this.employees.filter(employee =>
    employee.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (this.filteredEmployees.length > 0) {
    this.step = 3;
  } else {
    alert('Nema pronađenih zaposlenih.');
  }
}



  // searchEmployees(): void {
  //   const { searchCriteria, searchValue } = this.searchForm.value;

  //   console.log('Kriterijum:', searchCriteria);
  //   console.log('Uneta vrednost:', searchValue);

  //   if (!searchValue) {
  //     alert('Unesite kriterijum pretrage.');
  //     return;
  //   }

  //   this.filteredEmployees = this.employees.filter(employee =>
  //     searchCriteria === 'name'
  //       ? `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchValue.toLowerCase())
  //       : employee.jmbg.includes(searchValue)
  //   );

  //   console.log('Filtrirani rezultati:', this.filteredEmployees);

  //   if (this.filteredEmployees.length > 0) {
  //     this.step = 3; // Prelaz na prikaz zaposlenih
  //   } else {
  //     alert('Nema pronađenih zaposlenih.');
  //   }
  // }

  // Izbor zaposlenog
  selectEmployee(employee: Employee): void {
    this.selectedEmployee = employee;
    this.step = 4; // Skok na unos iznosa i perioda
  }

  // Slanje podataka o uplati
  submitPayment(): void {
    if (this.paymentForm.valid && this.selectedEmployee) {
      const newContribution: Contribution = {
        employee: this.selectedEmployee,
        amount: this.paymentForm.value.amount,
        period: this.paymentForm.value.period,
        paymentDate: new Date()
      };

      this.contributionService.addContribution(newContribution).subscribe(saved => {
        this.successMessage = `Uspešno ste uplatili ${saved.amount} RSD za period ${saved.period} zaposlenom ${saved.employee.name}.`;
        this.step = 5;
        this.loadContributions(); // ponovo učitaj posle upisa
      });
    } else {
      alert('Molimo popunite sva polja.');
    }
  }

  // Povratak na početak
  resetProcess(): void {
    this.searchForm.reset();
    this.paymentForm.reset();
    this.selectedEmployee = null;
    this.filteredEmployees = [];
    this.step = 1;
    this.successMessage = '';
  }
}
