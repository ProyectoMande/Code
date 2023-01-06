import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { EmployeeRegisterComponent } from './components/employee-register/employee-register.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    HomeComponent,
    UserRegisterComponent,
    EmployeeRegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
