import { Component } from '@angular/core';
import { Labor } from '../../models/labor';
import { LaborService } from '../../services/labor.service';

@Component({
  selector: 'app-usuario-home',
  templateUrl: './usuario-home.component.html',
  styleUrls: ['./usuario-home.component.scss']
})
export class UsuarioHomeComponent {

  constructor(private laborService: LaborService){}

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
    )
  }

}
