import { Injectable } from '@angular/core';
import { Trabajador } from '../models/employee'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URI = 'http://localhost:4000/api/trabajador'

  constructor(private http: HttpClient) { }

  addTrabajador(trabajador: Trabajador) {
    console.log(trabajador);
    return this.http.post(this.URI, trabajador);
  }
}
