import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service'

@Component({
  selector: 'app-trabajador-home',
  templateUrl: './trabajador-home.component.html',
  styleUrls: ['./trabajador-home.component.scss']
})
export class TrabajadorHomeComponent {

  constructor(private employeeService: EmployeeService){}

  trabajadorActual: string; // celular del trabajdor

  solicitud = {
    direccion: 'No hay',
    id_solicitud: 0,
    labor_name: 'Solictud'
  }

  ngOnInit() {
    this.trabajadorActual = this.employeeService.getTrabajadorActual();
    this.employeeService.getSolicitud(this.trabajadorActual).subscribe(
      res => {
        this.solicitud = <any>res;
      }, 
      err => console.log(err)
    )
  }

}
