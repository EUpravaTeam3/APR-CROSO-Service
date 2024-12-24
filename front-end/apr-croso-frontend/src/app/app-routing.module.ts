import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompanyDetailsComponent } from './components/user/company-details/company-details.component';
import { CompanyReportComponent } from './components/user/company-report/company-report.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'company-details/:id', component: CompanyDetailsComponent},
  {path: 'company-report', component: CompanyReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
