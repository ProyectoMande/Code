import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.scss']
})
export class UsuarioLoginComponent {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  celular: string;

  loginUsuario(){
    this.usuarioService.getUsuario(this.celular).subscribe(
      (res) => {
        if(res == null){
          console.log('Usuario no registrado')
        }
        else {
          console.log('Usuario registrado')
          this.router.navigate(['usuario-home'])
        }
      },
      err => console.log(err)
    );
  }
}
