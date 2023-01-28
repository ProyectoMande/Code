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
import { UsuarioHomeComponent } from './components/usuario-home/usuario-home.component';
import { UsuarioLoginComponent } from './components/usuario-login/usuario-login.component';
import { UsuarioActualizarComponent } from './components/usuario-actualizar/usuario-actualizar.component';

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
    UsuarioHomeComponent,
    UsuarioLoginComponent,
    UsuarioActualizarComponent
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
