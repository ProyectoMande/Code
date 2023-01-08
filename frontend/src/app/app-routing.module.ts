import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { EmployeeRegisterComponent } from './components/employee-register/employee-register.component'
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';


//rutas de navegacion
const routes: Routes = [
  {path: '', redirectTo:'home',pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'user-register',component: UserRegisterComponent},
  {path: 'employee-register',component: EmployeeRegisterComponent},
  {path: 'employee-login',component: EmployeeLoginComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
