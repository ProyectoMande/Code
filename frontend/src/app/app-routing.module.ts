import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './components/home/home.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { EmployeeRegisterComponent } from './components/employee-register/employee-register.component'
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { TrabajadorHomeComponent } from './components/trabajador-home/trabajador-home.component';
import { UsuarioHomeComponent } from './components/usuario-home/usuario-home.component';
import { UsuarioLoginComponent } from "./components/usuario-login/usuario-login.component";


//rutas de navegacion
const routes: Routes = [
  {path: '', redirectTo:'home',pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'user-register',component: UserRegisterComponent},
  {path: 'employee-register',component: EmployeeRegisterComponent},
  {path: 'employee-login',component: EmployeeLoginComponent},
  {path: 'usuario-login',component: UsuarioLoginComponent},
  {path: 'trabajador-home',component: TrabajadorHomeComponent},
  {path: 'usuario-home',component: UsuarioHomeComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
