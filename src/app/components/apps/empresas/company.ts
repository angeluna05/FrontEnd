import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Estado {
  id: number;
  nombre: string;
}

export interface CompanyDB {
  id: number;
  nombre: string;
  correo: string;
  numero_contacto: string;
  departamento: string;
  estadoid: Estado;
  ActionClass: string;
  iconClass: string;
  iconColor: string;
}

// Inicialmente, COMPANYDB está vacío
export const COMPANYDB: CompanyDB[] = [];

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'https://backend-do1k.onrender.com/empresas'; // Corrige la URL si es necesario
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW11ZWxzdGl2ZW4yMDA1QGdtYWlsLmNvbSIsImlhdCI6MTcyMzY0MTE4NiwiZXhwIjoxNzIzNjQ4Mzg2fQ.SpKhEVtpHRIrrHRVToqw_f0gcwfAz6qMrzsXMpLUPKo'; // Reemplaza con tu token

  constructor(private http: HttpClient) {}

  fetchEmpresas() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<CompanyDB[]>(this.apiUrl, { headers });
  }

  updateCompanyDB() {
    this.fetchEmpresas().subscribe(
      (data) => {
        // Actualizar COMPANYDB con los datos de la API
        COMPANYDB.length = 0; // Vaciar el array
        COMPANYDB.push(...data.map(empresa => ({
          ...empresa,
          ActionClass: "badge-light-primary",
          iconClass: "icofont-arrow-up",
          iconColor: "success"
        })));
      },
      (error) => {
        console.error('Error fetching empresas:', error);
      }
    );
  }
}
