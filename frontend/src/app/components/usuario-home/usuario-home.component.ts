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



}
