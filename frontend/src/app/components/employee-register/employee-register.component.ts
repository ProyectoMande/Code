import { Component, OnInit } from '@angular/core';
import { Trabajador } from '../../models/employee';
import { Labor } from '../../models/labor'
import { EmployeeService } from '../../services/employee.service'
import { LaborService } from '../../services/labor.service'

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

//Region methods which is defined in the JS file.
declare function employeeRegister(): any;
//End Region

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent {

  fotoPerfil: File;
  fotoId: File;

  labores: Labor[];

  laboresTrabajador: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private laborService: LaborService
    ) {}

  nuevoTrabajador: Trabajador = {
    nombreCompleto: '',
    celular: '',
    id: '',
    email: '',
    direccion: '',
  }

  
  ngOnInit() {
    employeeRegister();
    this.laborService.getLabores().subscribe(
      res => {
        const labs = <Labor[]>res;
        this.labores = labs;
      }, 
      err => console.log(err)
    )
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

    // Añadimos las labores
    this.laboresTrabajador = [];
    for (var labor of this.labores) {
      if (labor.checked){
        this.laboresTrabajador.push(labor);
      }
    }

    //Se comprueba si cada uno de los campos del trabajador contiene un valor en específico, en caso contrario
    //Simplemente no envia los datos al servidor
    if (Object.values(this.nuevoTrabajador).every(value => value)){

      // Utilizamos el servicio employeeRegister para enviar los datos
      this.employeeService.addTrabajador(this.nuevoTrabajador, this.fotoPerfil, this.fotoId, this.laboresTrabajador).subscribe(
        res => console.log(res), err => console.log(err)
      );
      return false

    } else {

      console.log("Los datos se encuentran incompletos")
      return false
    }
  }
  
  addLabor(event: any):void {
    console.log(this.labores);
  }
}
