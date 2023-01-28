import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  celularUsuarioActual: string;

  URI = 'http://localhost:4000/api/usuario'

  constructor(private http: HttpClient) { }

  addUsuario(usuarioNuevo: Usuario, reciboImage: File){
    const fd = new FormData();

    fd.append("nombreCompleto", usuarioNuevo.nombreCompleto);
    fd.append("celular", usuarioNuevo.celular);
    fd.append("direccion", usuarioNuevo.direccion);
    fd.append("email", usuarioNuevo.email);
    fd.append("id", usuarioNuevo.id);
    fd.append("tarjeta_cvv", usuarioNuevo.tarjeta_cvv);
    fd.append("tarjeta_fecha_vencimiento", usuarioNuevo.tarjeta_fecha_vencimiento);
    fd.append("tarjeta_numero", usuarioNuevo.tarjeta_numero);
    fd.append("reciboImage", reciboImage);

    return this.http.post(this.URI, fd);
  }

  getUsuario(celular: string){
    return this.http.get(`${this.URI}/${celular}`);
  }

  setUsuario(celular: string){
    this.celularUsuarioActual = celular;
  }

  getUsuarioActual(){
    return this.celularUsuarioActual;
  }

  solicitarServicio(servicio: any){
    return this.http.post(`${this.URI}/servicio`, servicio);
  }

  getCalificacionesPendientes(celular: string){
    return this.http.get(`${this.URI}/calificaciones_pendientes/${celular}`);
  }

  addCalificacion(calificacion: any, celular_usuario: string){

    const calificacionNueva = {
      celular_usuario: celular_usuario,
      id_solicitud: calificacion.solicitud_id,
      calificacion: calificacion.calificacion
    }

    return this.http.post(`${this.URI}/calificacion_nueva`, calificacionNueva);
  }

  verificarTarjeta(infoTarjeta:any, celular:string){
    return this.http.get(`${this.URI}/info_tarjeta/${celular}/${infoTarjeta.tarjeta_numero}/${infoTarjeta.tarjeta_fecha_vencimiento}/${infoTarjeta.tarjeta_cvv}`);
  }
}
