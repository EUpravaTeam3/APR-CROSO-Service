import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompanyDetailsComponent } from './components/user/company-details/company-details.component';
import { CompanyReportComponent } from './components/user/company-report/company-report.component';
import { AddingEmployeeComponent } from './components/admin/adding-employee/adding-employee.component';
import { EmployeeSearchComponent } from './components/user/employee-search/employee-search.component';
import { InsuredPersonsComponent } from './components/user/insured-persons/insured-persons.component';
import { FinancialReportComponent } from './components/admin/financial-report/financial-report.component';
import { BankruptcyReportComponent } from './components/admin/bankruptcy-report/bankruptcy-report.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'company-details/:id', component: CompanyDetailsComponent},
  {path: 'company-report', component: CompanyReportComponent},
  {path: 'adding-employee', component: AddingEmployeeComponent},
  {path: 'employee-search', component: EmployeeSearchComponent},
  {path: 'insured-persons', component: InsuredPersonsComponent},
  {path: 'financial-report', component: FinancialReportComponent},
  {path: 'bankruptcy-report', component: BankruptcyReportComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
