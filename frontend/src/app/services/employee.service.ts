import { Injectable } from '@angular/core';
import { Trabajador } from '../models/employee'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URI = 'http://localhost:4000/api/trabajador'

  constructor(private http: HttpClient) { }

  addTrabajador(trabajador: Trabajador, fotoPerfil: File, fotoId: File, laboresTrabajador: any[]) {
    console.log(trabajador);
    const fd = new FormData();
    fd.append('nombreCompleto', trabajador.nombreCompleto);
    fd.append('celular', trabajador.celular);
    fd.append('id', trabajador.id);
    fd.append('email', trabajador.email);
    fd.append('estado', 'disponible');
    fd.append('direccion', trabajador.direccion);

    fd.append('fotoPerfil', fotoPerfil);
    fd.append('fotoId', fotoId);

    fd.append('laboresTrabajador', JSON.stringify(laboresTrabajador));

    return this.http.post(this.URI, fd);
  }

  getTrabajador(celular: string) {
    return this.http.get(`${this.URI}/${celular}`);
  }

  // Se obtiene la funcion trabajadores_labor de la bd
  getTrabajadores_Labor(celularUsuarioActual: string, laborId: number){
    return this.http.get(`${this.URI}/${celularUsuarioActual}/${laborId}`);
  }
}
