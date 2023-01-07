import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trabajador } from '../../models/employee';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent {

  nuevoTrabajador: Trabajador = {
    nombreCompleto: '',
    celular: '',
    id: '',
    email: '',
    direccion: '',
  }
  
  addTrabajador(form: NgForm) {
    console.log(form.value);
  } 
}
