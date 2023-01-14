import { Component, OnInit } from '@angular/core';
import { Trabajador } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service'

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent {

  fotoPerfil: File;
  fotoId: File;

  labores = [
    {
      "nombre": "aseador",
      "checked": false,
      "precio_hora": 0
    },
    {
      "nombre": "plomero",
      "checked": false,
      "precio_hora": 0
    },
    {
      "nombre": "cerrajero",
      "checked": false,
      "precio_hora": 0
    }
  ];

  laboresTrabajador: Map<string, number>;

  constructor(private employeeService: EmployeeService) {}

  nuevoTrabajador: Trabajador = {
    nombreCompleto: '',
    celular: '',
    id: '',
    email: '',
    direccion: '',
  }

  ngOnInit() {
  }

  onFotoPerfilSelected(event: any):void {
    if (event.target.files && event.target.files[0]) {
      this.fotoPerfil = <File>event.target.files[0];
    }
  }

  onFotoIdSelected(event: any):void {
    if (event.target.files && event.target.files[0]) {
      this.fotoId = <File>event.target.files[0];
    }
  }

  addTrabajador() {
    console.log("add coom");
    this.employeeService.addTrabajador(this.nuevoTrabajador, this.fotoPerfil, this.fotoId).subscribe(
      res => console.log(res), err => console.log(err)
    );
    return false
  } 

  addLabor(event: any):void {
    console.log(this.labores);
  }
}
