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

    //Se comprueba si cada uno de los campos del usuario contiene un valor en específico, en caso contrario
    //Simplemente no envia los datos al servidor
    if (Object.values(this.usuarioNuevo).every(value => value)){
      
      //Agrega el usuario al servidor
      this.usuarioService.addUsuario(this.usuarioNuevo, this.reciboImage)
      .subscribe(
        res => console.log(res), err => console.log(err)
      );
      return false

    } else {
      
      //No agrega al usuario al servidor porque los datos se encuentran imcompletos
      console.log("Los datos se encuentran incompletos")
      return false
    }
  }

  ngOnInit() {
    userRegister();
  }
}
