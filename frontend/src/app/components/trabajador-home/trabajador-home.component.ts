import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service'

@Component({
  selector: 'app-trabajador-home',
  templateUrl: './trabajador-home.component.html',
  styleUrls: ['./trabajador-home.component.scss']
})
export class TrabajadorHomeComponent {

  constructor(private employeeService: EmployeeService){}

  trabajadorActual: any;

  solicitud = {
    direccion: 'Solictud',
    id_solicitud: 0,
    labor_name: 'No hay'
  }

  ngOnInit() {
    this.trabajadorActual = this.employeeService.getTrabajadorActual();
    this.employeeService.getSolicitud(this.trabajadorActual.celular).subscribe(
      res => {
        if(res != null){
          this.solicitud = <any>res;
        }
      }, 
      err => console.log(err)
    )
  }

  laborRealizada(){
    // Si hay solicitud
    if(this.solicitud.direccion != 'Solictud'){
      this.employeeService.solicitudRealizada(this.solicitud.id_solicitud).subscribe(
        res => console.log(res),
        err => console.log(err)
      )
      this.solicitud = {
        direccion: 'Solictud',
        id_solicitud: 0,
        labor_name: 'No hay'
      }
    }
  }

}
