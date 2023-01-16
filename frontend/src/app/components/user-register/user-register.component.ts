import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario'
import { UsuarioService } from '../../services/usuario.service'

//Region methods which is defined in the JS file.
declare function userRegister(): any;
//End Region

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})

export class UserRegisterComponent {

  constructor(private usuarioService: UsuarioService){}

  reciboImage: File;

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

  onImageReciboSelected(event: any):void {
    if (event.target.files && event.target.files[0]) {
      this.reciboImage = <File>event.target.files[0];
    }
  }

  addUsuario(){
    this.usuarioService.addUsuario(this.usuarioNuevo, this.reciboImage)
      .subscribe(
        res => console.log(res), err => console.log(err)
      );
  }

  ngOnInit() {
    userRegister();
  }
}
