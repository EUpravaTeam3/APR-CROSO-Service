import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  jmbg: string;
}


@Component({
  selector: 'contribution-payment',
  templateUrl: './contribution-payment.component.html',
  styleUrl: './contribution-payment.component.css'
})
export class ContributionPaymentComponent implements OnInit {
  searchForm!: FormGroup;
  paymentForm!: FormGroup;
  employees: Employee[] = []; // Simulacija baze podataka
  filteredEmployees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  step: number = 1;
  successMessage: string = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Simulacija baze zaposlenih
    this.employees = [
      { id: 1, firstName: 'Marko', lastName: 'Markov', jmbg: '1234567890123' },
      { id: 2, firstName: 'Jovana', lastName: 'Jovanović', jmbg: '9876543210987' },
      { id: 3, firstName: 'Petar', lastName: 'Petrović', jmbg: '1122334455667' },
      { id: 4, firstName: 'Marko', lastName: 'Nikov', jmbg: '1234567891123' },
    ];

    this.searchForm = this.fb.group({
      searchCriteria: ['name', Validators.required],
      searchValue: ['', Validators.required]
    });

    this.paymentForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1000)]],
      period: ['', Validators.required]
    });
  }

  // Pretraga zaposlenih po kriterijumu
  searchEmployees(): void {
    const { searchCriteria, searchValue } = this.searchForm.value;

    console.log('Kriterijum:', searchCriteria);
    console.log('Uneta vrednost:', searchValue);

    if (!searchValue) {
      alert('Unesite kriterijum pretrage.');
      return;
    }

    this.filteredEmployees = this.employees.filter(employee =>
      searchCriteria === 'name'
        ? `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchValue.toLowerCase())
        : employee.jmbg.includes(searchValue)
    );

    console.log('Filtrirani rezultati:', this.filteredEmployees);

    if (this.filteredEmployees.length > 0) {
      this.step = 3; // Prelaz na prikaz zaposlenih
    } else {
      alert('Nema pronađenih zaposlenih.');
    }
  }

  // Izbor zaposlenog
  selectEmployee(employee: Employee): void {
    this.selectedEmployee = employee;
    this.step = 4; // Skok na unos iznosa i perioda
  }

  // Slanje podataka o uplati
  submitPayment(): void {
    if (this.paymentForm.valid && this.selectedEmployee) {
      this.successMessage = `Uspešno ste uplatili ${this.paymentForm.value.amount} RSD za period ${this.paymentForm.value.period} zaposlenom ${this.selectedEmployee.firstName} ${this.selectedEmployee.lastName}.`;
      this.step = 5; // Prikaz uspešne poruke
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
