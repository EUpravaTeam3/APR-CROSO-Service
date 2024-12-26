import { Component } from '@angular/core';

@Component({
  selector: 'adding-employee',
  templateUrl: './adding-employee.component.html',
  styleUrl: './adding-employee.component.css'
})
export class AddingEmployeeComponent {
  employee = { name: '', type: '' };

  onAddEmployee() {
    alert(`Zaposleni "${this.employee.name}" uspešno dodat!`);
  }

}
