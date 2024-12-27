import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'employee-search',
  templateUrl: './employee-search.component.html',
  styleUrl: './employee-search.component.css'
})
export class EmployeeSearchComponent {
  employees = [
    { id: 1, name: 'Marko Marković', position: 'Inženjer', department: 'Razvoj' },
    { id: 2, name: 'Ana Anić', position: 'Menadžer', department: 'Marketing' },
    { id: 3, name: 'Petar Petrović', position: 'Analitičar', department: 'Finansije' },
    { id: 4, name: 'Jovana Jovanović', position: 'Programer', department: 'Razvoj' },
  ];

  searchControl = new FormControl('');
  sortDirection: boolean = true; // true = rastuće, false = opadajuće

  addEmployeeForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    position: new FormControl(''),
    department: new FormControl('')
  });

  selectedEmployee: any = null;

  editEmployeeForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    name: new FormControl(''),
    position: new FormControl(''),
    department: new FormControl('')
  });

  get filteredEmployees() {
    let employees = [...this.employees];

    const searchTerm = this.searchControl.value?.toLowerCase() || '';

    //Filtriranje
    employees = employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm) ||
      employee.position.toLowerCase().includes(searchTerm) ||
      employee.department.toLowerCase().includes(searchTerm)
    );

    // Sortiranje po ID
    employees.sort((a, b) => {
      if (this.sortDirection) {
        return a.id - b.id; // Rastuće
      } else {
        return b.id - a.id; // Opadajuće
      }
    });

    return employees;

  }
  sortById() {
    this.sortDirection = !this.sortDirection;
  }

  addEmployee() {
    const newEmployee = this.addEmployeeForm.value;
    if (newEmployee.id?.toString().trim() && newEmployee.name?.trim() && newEmployee.position?.trim() && newEmployee.department?.trim()) {
      const employeeId = +newEmployee.id;
      const existingEmployee = this.employees.find(employee => employee.id === employeeId);
      if (existingEmployee) {
        alert('Zaposleni sa unetim ID već postoji. Molimo unesite jedinstveni ID.');
        return;
      }
      this.employees.push({
        id: employeeId,
        name: newEmployee.name.trim(),
        position: newEmployee.position.trim(),
        department: newEmployee.department.trim(),
      });
      this.addEmployeeForm.reset();
    }
  }

  selectEmployee(employee: any) {
    this.selectedEmployee = employee;
    this.editEmployeeForm.setValue({
      id: employee.id,
      name: employee.name,
      position: employee.position,
      department: employee.department
    });
  }

  updateEmployee() {
    if (this.selectedEmployee) {
      const updatedEmployee = this.editEmployeeForm.getRawValue();
      this.selectedEmployee.name = updatedEmployee.name;
      this.selectedEmployee.position = updatedEmployee.position;
      this.selectedEmployee.department = updatedEmployee.department;
      this.selectedEmployee = null;
      this.editEmployeeForm.reset();
    }
  }

  deleteEmployee(employeeId: number) {
    const index = this.employees.findIndex(employee => employee.id === employeeId);
    if (index !== -1) {
      this.employees.splice(index, 1);
      if (this.selectedEmployee?.id === employeeId) {
        this.selectedEmployee = null;
        this.editEmployeeForm.reset();
      }
    }
  }
}

