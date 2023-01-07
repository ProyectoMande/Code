import { Component } from '@angular/core';
import { Trabajador } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service'

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent {

  constructor(private employeeService: EmployeeService) {}

  nuevoTrabajador: Trabajador = {
    nombreCompleto: '',
    celular: '',
    id: '',
    email: '',
    direccion: '',
  }
  
  addTrabajador() {
    console.log("add coom");
    this.employeeService.addTrabajador(this.nuevoTrabajador).subscribe(
      res => console.log(res), err => console.log(err)
    );
    return false
  } 
}
