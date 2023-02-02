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

  // ALerta satisfactoria
  alertaPagado = false

  // Alerta erronea
  alertaNoPagado = false

  constructor(
    private laborService: LaborService,
    private employeeService: EmployeeService,
    private usuarioService: UsuarioService
  ){}

  usuarioActual: any;

  solicitudesPorCalificar: any[] = [];

  laboresDisponibles: any[];
  
  trabajadoresDisponibles: any[]; // Segun labor

  trabajadorSeleccionado = {
    celular: '', 
    nombrecompleto: 'Seleccione un Trabajador', 
    promedio_calificacion: '', 
    precio_hora: 0, 
    distancia: 0
  };

  laborSeleccionada: number;

  horasAContratar = 1;

  descripcion = "";

  infoTarjeta = {
    tarjeta_numero: "",
    tarjeta_fecha_vencimiento: "",
    tarjeta_cvv: ""
  }

  ngOnInit() {
    // Se asigna el usuario actual
    this.usuarioActual = this.usuarioService.getUsuarioActual();

    // Se obtienen las labores dispobinles
    this.laborService.getLaboresDisponibles().subscribe(
      res => {
        const lab_disponibles = <any[]>res;
        this.laboresDisponibles = lab_disponibles;
        console.log(this.laboresDisponibles)
      },
      err => console.log(err)
    );
    
    // Se obtienen las calificaciones pendientes
    this.usuarioService.getCalificacionesPendientes(this.usuarioActual.celular).subscribe(
      res => {
        this.solicitudesPorCalificar = <any[]>res;
        for(let spc of this.solicitudesPorCalificar){
          spc.calificacion = 0
        }
        console.log(this.solicitudesPorCalificar);
      },
      err => console.log(err)
    )
  }

  trabajadores_labor(event: any){
    // Se obtienen los trabajdores disponibles
    this.laborSeleccionada = event.target.id;
    this.employeeService.getTrabajadores_Labor(this.usuarioActual.celular, this.laborSeleccionada)
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

    this.usuarioService.verificarTarjeta(this.infoTarjeta, this.usuarioActual.celular).subscribe(
      res => {
        if(res != null){
          const servicio = {
            celular_trabajador: this.trabajadorSeleccionado.celular,
            id_labor: this.laborSeleccionada,
            celular_usuario: this.usuarioActual.celular,
            descripcion: this.descripcion,
            pago: this.horasAContratar * this.trabajadorSeleccionado.precio_hora
          }
      
          console.log(servicio)
          this.usuarioService.solicitarServicio(servicio).subscribe(
            res => {
              console.log(res)
              this.trabajadoresDisponibles = this.trabajadoresDisponibles.filter(trabajador => trabajador.celular != this.trabajadorSeleccionado.celular)
              this.trabajadorSeleccionado = {
                celular: '', 
                nombrecompleto: 'Seleccione un Trabajador', 
                promedio_calificacion: '', 
                precio_hora: 0, 
                distancia: 0
              }
              this.alertaPagado = true
            }, 
            err => console.log(err)
          );
        }
        else {
          console.log("tarjeta invalida")
          this.alertaNoPagado = true
        }
      },
      err => console.log(err)
    )
  }

  calificarSolicitud(solicitud: any){
    this.usuarioService.addCalificacion(solicitud, this.usuarioActual.celular).subscribe(
      res => console.log(res), err => console.log(err)
    );

    this.solicitudesPorCalificar = this.solicitudesPorCalificar.filter(s => s != solicitud);
  }

}
