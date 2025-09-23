import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee, EmployeeService } from '../../../../service/employee.service';
import { AddingEmployeeService } from '../../../../service/adding-employee.service';
import { AuthService } from '../../../../service/auth.service';

@Component({
  selector: 'adding-employee-final',
  templateUrl: './adding-employee-final.component.html',
  styleUrl: './adding-employee-final.component.css'
})
export class AddingEmployeeFinalComponent {
  employee: Employee = { name: '', position: '' };

  constructor(private addingEmployeeService: AddingEmployeeService) {}

  sendRequest(form: NgForm): void {
    if (!this.employee.name.trim() || !this.employee.position.trim()) {
      alert('Molimo popunite sva polja!');
      return;
    }

    this.addingEmployeeService.sendRequest(this.employee).subscribe({
      next: () => {
        alert('Zahtev poslat!');
        form.resetForm();
        this.employee = { name: '', position: '' };
      },
      error: (err) => {
        console.error('Error sending request:', err);
        alert('Došlo je do greške pri slanju zahteva.');
      }
    });
  }
}
