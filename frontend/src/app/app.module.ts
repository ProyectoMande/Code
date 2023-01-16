import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { EmployeeRegisterComponent } from './components/employee-register/employee-register.component';
import { FormsModule } from '@angular/forms';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { TrabajadorHomeComponent } from './components/trabajador-home/trabajador-home.component';
import { NavbarInicioComponent } from './components/navbar-inicio/navbar-inicio.component';
import { NavbarTrabajadorHomeComponent } from './components/navbar-trabajador-home/navbar-trabajador-home.component';
import { NotificacionesTrabajadorComponent } from './components/notificaciones-trabajador/notificaciones-trabajador.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserRegisterComponent,
    EmployeeRegisterComponent,
    EmployeeLoginComponent,
    TrabajadorHomeComponent,
    NavbarInicioComponent,
    NavbarTrabajadorHomeComponent,
    NotificacionesTrabajadorComponent
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
