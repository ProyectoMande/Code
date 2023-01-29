import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service'

@Component({
  selector: 'app-usuario-actualizar',
  templateUrl: './usuario-actualizar.component.html',
  styleUrls: ['./usuario-actualizar.component.scss']
})
export class UsuarioActualizarComponent {

  constructor(private usuarioService: UsuarioService){}

  datosActualizados = {
    email: "",
    direccion: "",
    tarjeta_numero: "",
    tarjeta_fecha_vencimiento: "",
    tarjeta_cvv: ""
  }

  actualizarUsuario(){
    this.usuarioService.actualizarUsuario(this.datosActualizados).subscribe(
      res => console.log(res), err => console.log(err)
    )
  }



}
