import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service'
import { LaborService } from '../../services/labor.service'

@Component({
  selector: 'app-trabajador-home',
  templateUrl: './trabajador-home.component.html',
  styleUrls: ['./trabajador-home.component.scss']
})
export class TrabajadorHomeComponent {

  constructor(
    private employeeService: EmployeeService,
    private laborService: LaborService
    ){}

  trabajadorActual: any;

  solicitud = {
    direccion: 'Solictud',
    id_solicitud: 0,
    labor_name: 'No hay'
  }

  fotoPerfil: any;

  nuevaFotoPerfil: any;

  previewNuevaFotoPerfil: any;

  labores: any[];

  datosActualizar = {
    email: "",
    direccion: ""
  }

  ngOnInit() {
    // Se establece el trabajador actual
    this.trabajadorActual = this.employeeService.getTrabajadorActual();

    // Se establece la foto de perdil del trabajador actual
    this.fotoPerfil = `http://localhost:4000/api/images/${this.trabajadorActual.foto_perfil}`;

    // Se obtiene la solicitud (si tiene) del trabajador
    this.employeeService.getSolicitud(this.trabajadorActual.celular).subscribe(
      res => {
        if(res != null){
          this.solicitud = <any>res;
        }
      }, 
      err => console.log(err)
    )

    // Se obtienen todas las labores
    this.laborService.getLabores().subscribe(
      res => {
        this.labores = <any[]>res;
        // Se obtienen las labores del trabajador
        this.employeeService.getLabores(this.trabajadorActual.celular).subscribe(
          res => {
            const laboresTrabajador = <any[]>res;
            for(let labor of this.labores){
              labor.checked = false;
              labor.esNueva = true;
              for(let laborTrabajador of laboresTrabajador){
                if(laborTrabajador.nombre == labor.nombre){
                  labor.checked = true;
                  labor.esNueva = false;
                  labor.precio_hora = laborTrabajador.precio_hora;
                  break;
                }
              }
            }
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    );
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

  onFotoPerfilSelected(event: any):void {
    if (event.target.files && event.target.files[0]) {
      this.nuevaFotoPerfil = <File>event.target.files[0];
      // Ver la nueva foto
      const reader = new FileReader();
      reader.onload = e => this.previewNuevaFotoPerfil = reader.result;
      reader.readAsDataURL(this.nuevaFotoPerfil);
    }
  }

  actualizarTrabajador(){
    this.employeeService.actualizarTrabajador(this.datosActualizar, this.nuevaFotoPerfil, this.labores).subscribe(
      res => console.log(res), err => console.log(err)
    )
  }

}
