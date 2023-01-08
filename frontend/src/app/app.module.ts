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
import { FormsModule } from '@angular/forms';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    HomeComponent,
    UserRegisterComponent,
    EmployeeRegisterComponent,
    EmployeeLoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
