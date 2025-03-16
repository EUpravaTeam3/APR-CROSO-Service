import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InsuredPerson } from '../../../class/InsuredPerson';
import { InsuredPersonService } from '../../../service/insured-person.service';
import { Company } from '../../../class/company';
import { CompanyService } from '../../../service/company.service';

@Component({
  selector: 'insured-persons',
  templateUrl: './insured-persons.component.html',
  styleUrl: './insured-persons.component.css'
})
export class InsuredPersonsComponent implements OnInit {
  insuredPersonForm!: FormGroup;
  insuredPersons: InsuredPerson[] = [];
  selectedPerson: InsuredPerson | null = null;
  companies: Company[] = [];

  // Selektovanje sekcije detalja
  @ViewChild('detailsSection', { static: false }) detailsSection!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private insuredPersonService: InsuredPersonService,
    private renderer: Renderer2,
    private companyService: CompanyService

  ) { }

  ngOnInit(): void {
    this.insuredPersonForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jmbg: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      employed: [false, Validators.required],
      employerName: [''],
      insuranceTypes: [[], Validators.required]
    });

    // Dinamička validacija za employerName
    this.insuredPersonForm.get('employed')?.valueChanges.subscribe((isEmployed) => {
      const employerNameControl = this.insuredPersonForm.get('employerName');
      if (isEmployed) {
        employerNameControl?.setValidators(Validators.required);
      } else {
        employerNameControl?.clearValidators();
      }
      employerNameControl?.updateValueAndValidity();
    });

    this.loadInsuredPersons();
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService.getCompanyList().subscribe({
      next: (data) => {
        this.companies = data;
      },
      error: (err) => console.error('Failed to load companies:', err)
    });
  }
  

  loadInsuredPersons(): void {
    this.insuredPersonService.getAllInsuredPersons().subscribe({
      next: (data) => {
        this.insuredPersons = data;
      },
      error: (err) => console.error('Failed to load insured persons:', err)
    });
  }

  onSubmit(): void {
    if (this.insuredPersonForm.valid) {
      const newPerson = this.insuredPersonForm.value as InsuredPerson;
      this.insuredPersonService.registerInsuredPerson(newPerson).subscribe({
        next: (person) => {
          this.insuredPersons.push(person);
          this.insuredPersonForm.reset();
          alert('Osigurana osoba uspešno registrovana.');
        },
        error: (err) => {
          console.error('Failed to register insured person:', err);
          alert('Došlo je do greške. Pokušajte ponovo.');
        }
      });
    }
  }

  selectPerson(person: InsuredPerson): void {
    this.selectedPerson = person;
     // Fokus na sekciju sa detaljima
     setTimeout(() => {
      if (this.detailsSection) {
        this.detailsSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }

  deletePerson(id: number | undefined): void {

    const confirmAction = confirm('Da li ste sigurni da želite da obrišete osiguranu osobu?');

    if(confirmAction){ 
      if (id === undefined) {
        console.error('ID nije definisan');
        return;
      }
  
      this.insuredPersonService.deleteInsuredPerson(id).subscribe(() => {
        this.insuredPersons = this.insuredPersons.filter(person => person.id !== id);
      });

      alert('Osigurana soba uspešno obrisana');
    }
    else{
      alert('Osigurana osoba nije obrisana.');
    }

    
  }
  getErrorMessage(field: string): string {
    const control = this.insuredPersonForm.get(field);
    if (control?.hasError('required')) {
      return 'Ovo polje je obavezno.';
    }
    if (control?.hasError('minlength')) {
      return 'Unos je prekratak.';
    }
    if (control?.hasError('maxlength')) {
      return 'Unos je predugačak.';
    }
    if (control?.hasError('pattern')) {
      return 'Unos nije u ispravnom formatu.';
    }
    return '';
  }
  

}
