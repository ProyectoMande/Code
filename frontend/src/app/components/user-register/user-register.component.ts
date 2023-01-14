import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario'

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {

  constructor(){}

  usuarioNuevo: Usuario = {
    celular: '',
    nombreCompleto: '',
    id: '',
    email: '',
    direccion: '',
    tarjeta_numero: '',
    tarjeta_fecha_vencimiento: '',
    tarjeta_cvv: ''
  };

  addUsuario(){
    console.log(this.usuarioNuevo);
  }
}
