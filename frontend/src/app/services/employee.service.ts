import { Injectable } from '@angular/core';
import { Trabajador } from '../models/employee'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URI = 'http://localhost:4000/api/trabajador'

  constructor(private http: HttpClient) { }

  addTrabajador(trabajador: Trabajador, fotoPerfil: File) {
    console.log(trabajador);
    const fd = new FormData();
    /*
    nombreCompleto: string,
    celular: string,
    id: string,
    email: string,
    direccion: string,
    fotoId?: File,
    fotoPerfil?: File
    */
    fd.append('nombreCompleto', trabajador.nombreCompleto);
    fd.append('celular', trabajador.celular);
    fd.append('fotoPerfil', fotoPerfil);
    return this.http.post(this.URI, fd);
  }
}
