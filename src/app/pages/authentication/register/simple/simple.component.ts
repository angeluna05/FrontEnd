import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModalConfig, NgbModal, NgbTimeStruct, NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
const Swal = require('sweetalert2')
import { Router } from '@angular/router';

export interface Empleado {
  id: number;
  nombre: string;
}

export interface Estado {
  id: number;
  nombre: string;
}

export interface Institucion {
  id: number;
  nombre: string;
  rector: string;
  numeroContacto: string;
  jovenesActivos: number;
  jovenesEgresados: number;
  empleadoid: Empleado;
  estadoid: Estado;
}

interface TipoDocumento {
  id: number;
  siglas: string;
  descripcion: string;
}
interface Usuario {
  id: number;
  correo: string;
  nombre: string;
  contrasena: string;
  estadoid: Estado;
  rolid: Rol;
}

interface Rol {
  id: number;
  nombre: string;
}
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

interface RegisterRequest {
  correo: string;
  nombre: string;
  contrasena: string;
  estadoid: number;
  rolid: number;
  documento: number;
  apellido: string;
  fechaNacimiento: Date;
  numeroContacto: string;
  tipo_institucion: string;
  institucion: string;
  habilidades: string;
  caracteristicas: string;
  descripcion: string;
  tipoDocumentoid: number;
}

@Component({
  selector: 'app-register-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss']
})
export class RegisterSimpleComponent implements OnInit {

  public validate = false;
  public tooltipValidation = false;
  errorMessages: any = {};
  public instituciones: Institucion[] = [];
  confirmContrasena: string = '';
  public errorconfirmContrasena: string = '';
  public passwordsMatch: boolean = true;
  public tiposDocumentos: TipoDocumento[] = [];
  private token = localStorage.getItem('authToken');
  public show: boolean = false;
  public newjovenes: joven = {
    id: 0, // Puede ser 0 o null si se generará automáticamente
    documento: 0,
    nombre: '',
    apellido: '',
    fechaNacimiento: new Date(), // Formato de fecha puede necesitar ajuste según el uso (string o Date)
    numeroContacto: '',
    correo: '',
    tipo_institucion: '',
    institucion: '',
    habilidades: '',
    caracteristicas: '',
    descripcion: '',
    tipoDocumentoid: { id: 1, siglas: '', descripcion: '' }, // Asegúrate de ajustar los valores por defecto
    estadoid: { id: 1, nombre: '' }
  };
  public estados: Estado[] = [];
  public roles: Rol[] = [];
  public usuarios: Usuario[] = [];
  public newUsuario: Usuario = {
    id: 0,
    correo: '',
    nombre: '',
    contrasena: '',
    estadoid: { id: 1, nombre: '' },
    rolid: { id: 1, nombre: '' }
  };
  public selectedUsuario: Usuario = { ...this.newUsuario };


  private apiUrl = 'https://backend-do1k.onrender.com/api/register';

  public newjoven: RegisterRequest = {
    correo: '',
    nombre: '',
    contrasena: '',
    estadoid: 1, // ID por defecto, ajústalo según tus necesidades
    rolid: 7, // ID del rol
    documento: null,
    apellido: '',
    fechaNacimiento: null,
    numeroContacto: '',
    tipo_institucion: '',
    institucion: '',
    habilidades: '',
    caracteristicas: '',
    descripcion: '',
    tipoDocumentoid: 0 // Tipo de documento predeterminado
  };
  public selectedjoven: RegisterRequest = { ...this.newjoven };
  getInstituciones() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Institucion[]>('https://backend-do1k.onrender.com/instituciones').subscribe(
      (data) => {
        this.instituciones=data;
      },
      (error) => {
        console.error('Error fetching instituciones:', error);
      }
    );
  }
  getEstados() {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    this.http.get<Estado[]>('https://backend-do1k.onrender.com/estado',).subscribe(
      (data) => { this.estados = data; },
      (error) => { console.error('Error fetching estados:', error); }
    );
  }

  getRoles() {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    this.http.get<Rol[]>('https://backend-do1k.onrender.com/roles',).subscribe(
      (data) => { this.roles = data; },
      (error) => { console.error('Error fetching roles:', error); }
    );
  }

  register() {
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;
    this.validatePasswords();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });


    if (this.newjoven.contrasena !== this.confirmContrasena) {

    } else {
      this.http.post<RegisterRequest[]>(this.apiUrl, this.newjoven).subscribe(
        (response) => {
          Swal.fire({
            icon: "success",
            title: "¡Registro exitoso!",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/auth/login']); // Redirige al login
  
        },
        (error) => {
          if (error.status === 400 && error.error) {
            if (error.error.errors.nombre || error.error.errors.apellido || error.error.errors.tipoDocumentoid || error.error.errors.documento || error.error.errors.fechaNacimiento || error.error.errors.numeroContacto) {
              this.errorMessages = error.error.errors; // Captura los mensajes de error.error.errors de validación
              this.currentSection = 0
            }else if (error.error.errors.tipo_institucion || error.error.errors.institucion) {
              this.errorMessages = error.error.errors; // Captura los mensajes de error.error.errors de validación
              this.currentSection = 1
            }
            else if (error.error.errors.habilidades || error.error.errors.caracteristicas || error.error.errors.descripcion) {
              this.errorMessages = error.error.errors; // Captura los mensajes de error.error.errors de validación
              this.currentSection = 2
            } else if (error.error.errors.correo || error.error.errors.contrasena) {
              this.errorMessages = error.error.errors; // Captura los mensajes de error de validación
              this.currentSection = 3
            }
          }else if(error.status === 500 && error.error){
            Swal.fire(
              'Error',
              `${error.error.errors.detalle}.`,
              'error'
            );
          } else {
            console.error('Error creating joven:', error);
          }
        }
      );      this.errorMessages.confirmContrasena = null;
    }
  
  }

  constructor(private http: HttpClient, private router: Router,private cdr: ChangeDetectorRef) { }
  currentSection: number = 0;
  totalSections: number = 4;
  sections: number[] = Array(this.totalSections).fill(0);

  nextSection() {
    if (this.currentSection < this.totalSections - 1) {
      this.selectedjoven = { ...this.newjoven }
      this.currentSection++;
    }
  }

  previousSection() {
    if (this.currentSection > 0) {
      this.selectedjoven = { ...this.newjoven }
      this.currentSection--;
    }
  }

  goToSection(index: number) {
    this.selectedjoven = { ...this.newjoven }
    this.currentSection = index;
  }

  getTransform() {
    return `translateX(-${this.currentSection * 100}%)`;
  }


  ngOnInit() {
    this.getTiposDocumentos();
    this.getEstados();
    this.getRoles();
    this.getInstituciones();
  }
  getTiposDocumentos() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<TipoDocumento[]>('https://backend-do1k.onrender.com/tipodocumentos').subscribe(
      (data) => {
        this.tiposDocumentos = data;
      },
      (error) => {
        console.error('Error fetching tipos de documentos:', error);
      }
    );
  }
  showPassword() {
    this.show = !this.show;
  }


  validatePasswords() {
      if (this.newjoven.contrasena !== this.confirmContrasena) {

        this.errorMessages  = {confirmContrasena:'Las contraseñas no coinciden'};
        this.validate = !this.validate;
        this.tooltipValidation = !this.tooltipValidation;
      } else {
        // Eliminar el mensaje de error si las contraseñas coinciden
        this.errorMessages.confirmContrasena = null;
      }
    }
  
}
