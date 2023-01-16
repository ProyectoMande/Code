import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LaborService {

  URI = 'http://localhost:4000/api/labor'

  constructor(private http: HttpClient) { }

  getLabores() {
    return this.http.get(this.URI);
  }

  getLaboresDisponibles() {
    return this.http.get(`${this.URI}/disponibles`);
  }
}
