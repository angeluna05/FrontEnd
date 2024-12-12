import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import * as XLSX from 'xlsx'; // Importa la librería XLSX
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Init } from 'v8';

export interface joven {
  id: number;
  documento: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date; // Usamos string aquí para manejar la fecha en formato ISO
  numeroContacto: string;
  correo: string;
  tipo_institucion: string;
  institucion: string;
  habilidades: string;
  caracteristicas: string;
  descripcion: string;
  tipoDocumentoid: TipoDocumento;
  estadoid: Estado;
}
interface Estado {
  id: number;
  nombre: string;
}

interface TipoDocumento {
  id: number;
  siglas: string;
  descripcion: string;
}
@Component({
  selector: 'app-total-users',
  templateUrl: './total-users.component.html',
  styleUrls: ['./total-users.component.scss']
})
export class TotalUsersComponent implements OnInit{
  activos: number = 0;
  inactivos: number = 0;
  private apiUrl = 'https://backend-do1k.onrender.com/jovenes';
  private token = localStorage.getItem('authToken');
  public show: boolean = false
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  ngOnInit() {this.getjovenes();}
  toggle() {
    this.show = !this.show
  }
  constructor(private http: HttpClient) { }

  getjovenes() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<joven[]>(this.apiUrl, { headers }).subscribe(
      (data) => {
        // Calcular la cantidad de jóvenes activos e inactivos
        this.activos = data.filter(joven => joven.estadoid.nombre === 'Activo').length;
        this.inactivos = data.filter(joven => joven.estadoid.nombre === 'Inactivo').length;
      },
      (error) => {
        console.error('Error fetching jovenes:', error);
      }
    );
  }
}
