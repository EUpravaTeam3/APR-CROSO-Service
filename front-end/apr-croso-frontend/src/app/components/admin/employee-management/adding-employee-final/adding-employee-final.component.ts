import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee, EmployeeService } from '../../../../service/employee.service';
import { AddingEmployeeService } from '../../../../service/adding-employee.service';

@Component({
  selector: 'adding-employee-final',
  templateUrl: './adding-employee-final.component.html',
  styleUrl: './adding-employee-final.component.css'
})
export class AddingEmployeeFinalComponent {
  employee: Employee = { name: '', position: '' };

  constructor(
    private employeeService: EmployeeService,
    private addingEmployeeService: AddingEmployeeService
  ) {}

  sendRequest(form: NgForm): void {
    if (!this.employee.name.trim() || !this.employee.position.trim()) {
      alert('Molimo popunite sva polja!');
      return;
    }

    this.addingEmployeeService.sendRequest(this.employee).subscribe(() => {
      alert('Zahtev poslat!');
      form.resetForm(); // Resetuje formu nakon uspešnog unosa
      this.employee = { name: '', position: '' }; // Resetuje model
    });
  }
}
