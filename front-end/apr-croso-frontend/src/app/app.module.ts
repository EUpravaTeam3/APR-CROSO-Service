import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateCompanyComponent } from './components/user/create-company/create-company.component';
import { CompanyListComponent } from './components/user/company-list/company-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CompanyService } from './service/company.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateCompanyComponent,
    CompanyListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
