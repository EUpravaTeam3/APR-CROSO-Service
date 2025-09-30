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
import { CreateCompanyComponent } from './components/user/create-company/create-company.component';
import { ContributionPaymentComponent } from './components/user/contribution-payment/contribution-payment.component';
import { EmployeeListComponent } from './components/admin/employee-management/employee-list/employee-list.component';
import { RequestListComponent } from './components/admin/employee-management/request-list/request-list.component';
import { AddingEmployeeFinalComponent } from './components/admin/employee-management/adding-employee-final/adding-employee-final.component';
import { LoginComponent } from './components/login/login.component';
import { WorkfieldRequestComponent } from './components/user/workfield-request/workfield-request.component';
import { WorkfieldRequestListComponent } from './components/admin/workfield-request-list/workfield-request-list.component';
import { StatsDashboardComponent } from './components/admin/stats-dashboard/stats-dashboard.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'company-details/:id', component: CompanyDetailsComponent},
  {path: 'company-report', component: CompanyReportComponent},
  {path: 'adding-employee', component: AddingEmployeeComponent},
  {path: 'employee-search', component: EmployeeSearchComponent},
  {path: 'insured-persons', component: InsuredPersonsComponent},
  {path: 'financial-report', component: FinancialReportComponent},
  {path: 'bankruptcy-report', component: BankruptcyReportComponent},
  {path: 'create-company', component: CreateCompanyComponent},
  {path: 'contribution-payment', component: ContributionPaymentComponent},
  {path: 'employee-list', component: EmployeeListComponent},
  {path: 'request-list', component: RequestListComponent},
  {path: 'adding-employee-final', component: AddingEmployeeFinalComponent},
  {path: 'login', component: LoginComponent },
  {path: 'workfield-request', component: WorkfieldRequestComponent},
  {path: 'workfield-request-list', component: WorkfieldRequestListComponent},
  {path: 'stats-dashboard', component: StatsDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
