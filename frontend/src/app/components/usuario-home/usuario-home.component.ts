import { Component } from '@angular/core';
import { Labor } from '../../models/labor';
import { LaborService } from '../../services/labor.service';
import { EmployeeService } from '../../services/employee.service';
import { UsuarioService } from '../../services/usuario.service'

@Component({
  selector: 'app-usuario-home',
  templateUrl: './usuario-home.component.html',
  styleUrls: ['./usuario-home.component.scss']
})
export class UsuarioHomeComponent {

  constructor(
    private laborService: LaborService,
    private employeeService: EmployeeService,
    private usuarioService: UsuarioService
  ){}

  laboresDisponibles: any[];
  
  trabajadoresDisponibles: any[]; // Segun labor

  trabajadorSeleccionado = {
    celular: '', 
    nombrecompleto: 'Seleccione un Trabajador', 
    promedio_calificacion: '', 
    precio_hora: 0, 
    distancia: 0
  };

  horasAContratar = 1;

  descripcion = "";

  infoTarjeta = {
    tarjeta_numero: "",
    tarjeta_fecha_vencimiento: "",
    tarjeta_cvv: ""
  }

  ngOnInit() {
    this.laborService.getLaboresDisponibles().subscribe(
      res => {
        const lab_disponibles = <any[]>res;
        this.laboresDisponibles = lab_disponibles;
        console.log(this.laboresDisponibles)
      },
      err => console.log(err)
    );
  }

  trabajadores_labor(event: any){
    // Se obtienen los trabajdores disponibles
    let laborId = event.target.id;
    const usuarioActual = this.usuarioService.getUsuarioActual();
    this.employeeService.getTrabajadores_Labor(usuarioActual, laborId)
      .subscribe(
        res => { 
          this.trabajadoresDisponibles = <any[]>res
          console.log(this.trabajadoresDisponibles)
        },
        err => console.log(err)
      );
  }

  setTrabajadorSeleccionado(trabajador: any){
    this.trabajadorSeleccionado = trabajador;
    console.log(this.trabajadorSeleccionado);
  }

  solicitarServicio(){
    
    const servicio = {
      celular_trabajador: this.trabajadorSeleccionado.celular,
      celular_usuario: this.usuarioService.getUsuarioActual(),
      descripcion: this.descripcion,
      pago: this.horasAContratar * this.trabajadorSeleccionado.precio_hora
    }

    console.log(servicio)
    this.usuarioService.solicitarServicio(servicio).subscribe(
      res => console.log(res), err => console.log(err)
    );
  }

}
