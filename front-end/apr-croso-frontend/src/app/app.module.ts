import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Dodato FormsModule


import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateCompanyComponent } from './components/user/create-company/create-company.component';
import { CompanyListComponent } from './components/user/company-list/company-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CompanyService } from './service/company.service';
import { CompanyDetailsComponent } from './components/user/company-details/company-details.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CompanyReportComponent } from './components/user/company-report/company-report.component';
import { AddingEmployeeComponent } from './components/admin/adding-employee/adding-employee.component';
import { EmployeeSearchComponent } from './components/user/employee-search/employee-search.component';
import { InsuredPersonsComponent } from './components/user/insured-persons/insured-persons.component';
import { FinancialReportComponent } from './components/admin/financial-report/financial-report.component';
import { BankruptcyReportComponent } from './components/admin/bankruptcy-report/bankruptcy-report.component';
import { ContributionPaymentComponent } from './components/user/contribution-payment/contribution-payment.component';
import { EmployeeListComponent } from './components/admin/employee-management/employee-list/employee-list.component';
import { RequestListComponent } from './components/admin/employee-management/request-list/request-list.component';
import { AddingEmployeeFinalComponent } from './components/admin/employee-management/adding-employee-final/adding-employee-final.component';
import { LoginComponent } from './components/login/login.component';
import { WorkfieldRequestComponent } from './components/user/workfield-request/workfield-request.component';
import { WorkfieldRequestListComponent } from './components/admin/workfield-request-list/workfield-request-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateCompanyComponent,
    CompanyListComponent,
    CompanyDetailsComponent,
    NavBarComponent,
    CompanyReportComponent,
    AddingEmployeeComponent,
    EmployeeSearchComponent,
    InsuredPersonsComponent,
    FinancialReportComponent,
    BankruptcyReportComponent,
    ContributionPaymentComponent,
    EmployeeListComponent,
    RequestListComponent,
    AddingEmployeeFinalComponent,
    LoginComponent,
    WorkfieldRequestComponent,
    WorkfieldRequestListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
