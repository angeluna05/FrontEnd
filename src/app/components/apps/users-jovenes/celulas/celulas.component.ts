import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { JobDB } from '../../../../shared/data/job-search/job-search';
const Swal = require('sweetalert2')

interface Celula {
  id: number;
  nombre: string;
  objetivo: string;
  fechaInicio: Date;
  fechaFin: Date;
  maximoPersonas: number;
  tipo_acceso: string;
  estado: string;
  inicioInscripcion: Date;
  finInscripcion: Date;
  empleadoid: Empleado;
  encargadoid: Encargado;
  empresaid: Empresa;
  logo?: string;
}

interface Empleado {
  id: number;
  nombre: string;
  apellido: string;

}

interface Encargado {
  id: number;
  nombre: string;
  apellido: string;
}

interface Empresa {
  id: number;
  nombre: string;
}
interface inscripcionCelulas {
  id: number;
  celulaid: Celula;
  jovenid: Jovenes;
  estado: String;
}
interface Jovenes {
  id: number;
  // documento: number;
  nombre: string;
  apellido: string;
  // fechaNacimiento: Date; // Usamos string aquí para manejar la fecha en formato ISO
  // numeroContacto: string;
  correo: string;
  // habilidades: string;
  // caracteristicas: string;
  // descripcion: string;
  // tipoDocumentoid: string;
  // estadoid: string;
}
@Component({
  selector: 'app-celulas',
  templateUrl: './celulas.component.html',
  styleUrls: ['./celulas.component.scss']
})
export class CelulasComponent {
  private apiUrl = 'https://backend-do1k.onrender.com/celulas';
  private token = localStorage.getItem('authToken');
  private joven = localStorage.getItem('correo');
  errorMessages: any = {};
  logos: string[] = [
    'assets/images/job-search/1.jpg',
    'assets/images/job-search/2.jpg',
    'assets/images/job-search/3.jpg',
    'assets/images/job-search/4.jpg',
    'assets/images/job-search/5.jpg',
    'assets/images/job-search/6.jpg'
  ];
  currentImageIndex: number = 0;
  public searchText: string;
  total$: Observable<number>;
  public validate = false;
  public tooltipValidation = false;
  public empleados: Empleado[] = [];
  public encargados: Encargado[] = [];
  public empresas: Empresa[] = [];
  public celulas: Celula[] = [];
  public jovenes: Jovenes[] = [];
  public inscripcionCelulas: inscripcionCelulas[] = [];
  public retoId: number;
  public jovenesid?: number;
  public retosid?: number;
  public idjoven?: number;
  equiposDelJoven: any[] = [];
  retosDelEquipo: any[] = [];

  getRandomLogo(): string {
    const randomIndex = Math.floor(Math.random() * this.logos.length); // Genera un índice aleatorio
    return this.logos[randomIndex];
  }
  owlcarousel2Options = {
    loop: true,
    margin: 10,
    lazyLoad: true,
    items: 5,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      }
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit() {
    this.getCelulas();
    this.getEmpresas();
    this.getJovenes();
    this.getEquiposDelJoven();
  }
  detalles: any;

  detallemodal(detalle, item) {
    this.detalles = item; // Almacena los detalles del reto seleccionado
    this.modalService.open(detalle); // Abre el modal
  }
  owlcarousel1 = [
    { id: 1, img: "assets/images/big-lightgallry/retos-carrusel1.jpg" },
    { id: 2, img: "assets/images/big-lightgallry/retos-carrusel3.jpg" },
    { id: 3, img: "assets/images/big-lightgallry/retos-carrusel3.jpg" },
    { id: 4, img: "assets/images/big-lightgallry/retos-carrusel1.jpg" },
    { id: 5, img: "assets/images/big-lightgallry/retos-carrusel2.jpg" },
    { id: 6, img: "assets/images/big-lightgallry/retos-carrusel3.jpg" },
    { id: 7, img: "assets/images/big-lightgallry/retos-carrusel1.jpg" },
    { id: 8, img: "assets/images/big-lightgallry/retos-carrusel2.jpg" },
    { id: 9, img: "assets/images/big-lightgallry/retos-carrusel3.jpg" },
    { id: 10, img: "assets/images/big-lightgallry/retos-carrusel1.jpg" }
  ];
  getEmpresas() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Empresa[]>('https://backend-do1k.onrender.com/empresas', { headers }).subscribe(
      (data) => {
        this.empresas = data;
      },
      (error) => {
        console.error('Error fetching empresas:', error);
      }
    );
  }

  getCelulas() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    this.celulas = [];

    this.http.get<Celula[]>(this.apiUrl, { headers }).subscribe(
      (data) => {
// Obtenemos la fecha actual
const fechaActual = new Date();

// Iteramos sobre los datos
data.forEach(element => {
  // Convertimos todas las fechas a objetos Date
  const fechaInicioCelula = new Date(element.fechaInicio + 'T00:00:00');
  const fechaFinCelula = new Date(element.fechaFin + 'T00:00:00');
  const fechaInicioInscripcion = new Date(element.inicioInscripcion + 'T00:00:00');
  const fechaFinInscripcion = new Date(element.finInscripcion + 'T00:00:00');

  // Verificamos si la célula está dentro del rango de fechas de la célula o de inscripción
  const estaEnRangoCelula = fechaInicioCelula <= fechaActual && fechaActual <= fechaFinCelula;
  const estaEnRangoInscripcion = fechaInicioInscripcion <= fechaActual && fechaActual <= fechaFinInscripcion;

  // Filtramos según las condiciones
  if (
    (element.estado === 'En curso' || element.estado === 'Por empezar') &&
    element.tipo_acceso === 'Abierta' &&
    (estaEnRangoCelula || estaEnRangoInscripcion)
  ) {
    // Asignamos un logo aleatorio
    const logos = [
      'assets/images/job-search/1.jpg',
      'assets/images/job-search/2.jpg',
      'assets/images/job-search/3.jpg',
      'assets/images/job-search/4.jpg',
      'assets/images/job-search/5.jpg',
      'assets/images/job-search/6.jpg'
    ];

    const randomIndex = Math.floor(Math.random() * logos.length);
    element.logo = logos[randomIndex];

    // Añadimos la célula al array de células
    this.celulas.push(element);
  }
});


      },
      (error) => {
        console.error('Error fetching retos:', error);
      }
    );
  }


  getJovenes() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Jovenes[]>('https://backend-do1k.onrender.com/jovenes', { headers }).subscribe(
      (data) => {

        const jovenEncontrado = data.find(joven => joven.correo === this.joven);
        if (jovenEncontrado) {
          this.jovenesid = jovenEncontrado.id;  // Guarda el ID en una variable de clase
        } else {
        }
      },
      (error) => {
      }
    );
  }

  openVerticallyCentered(celulaid: number) {
    Swal.fire({
      title: '¿Deseas inscribirte a la célula?',
      text: '¡Estás a un paso de inscribirte!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: '¡Inscribirme!',
      cancelButtonText: 'Ahora no'
    }).then((result) => {
      if (result.isConfirmed) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        });

        this.http.post<inscripcionCelulas>('https://backend-do1k.onrender.com/inscripcion-celulas', { celulaid, jovenid: this.jovenesid, estado: 'Inscrito' }, { headers }).subscribe(
          (data) => {
            Swal.fire(
              'Felicidades',
              '¡Te has inscrito con éxito!.',
              'success'
            );
            this.ngOnInit();

          },
          (error) => {
            console.error('Error durante la inscripción:', error);
            Swal.fire('Error', 'Hubo un problema al inscribirte. Inténtalo de nuevo más tarde.', 'error');
          }
        );
      }
    });
  }


  getEquiposDelJoven() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<inscripcionCelulas[]>('https://backend-do1k.onrender.com/inscripcion-celulas', { headers }).subscribe(
      (data) => {
        this.equiposDelJoven = data;

      },
      (error) => {
        console.error('Error obteniendo equipos del joven:', error);
      }
    );
  }


  deleteJovenCelulas(celulaId: number) {
    // Mostramos el modal de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si la fecha de inscripción ya finalizó, no podrás inscribirte de nuevo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, retirar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      // Si el usuario confirma la acción
      if (result.isConfirmed) {
        // Buscamos la inscripción del joven en la célula
        const jovenesequiposdelete = this.equiposDelJoven.find(inscripcion =>
          inscripcion.jovenid.id === this.jovenesid && inscripcion.celulaid.id === celulaId
        );
  
        // Definimos los encabezados para la solicitud HTTP
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        });
  
        // Realizamos la solicitud HTTP para eliminar la inscripción
        this.http.delete<inscripcionCelulas[]>(`https://backend-do1k.onrender.com/inscripcion-celulas/${jovenesequiposdelete.id}`, { headers }).subscribe(
          () => {
            // Mensaje de éxito si la eliminación fue exitosa
            Swal.fire(
              'Retirado',
              'Te has retirado de la célula con éxito.',
              'success'
            );
            this.modalService.dismissAll(); // Cerrar el modal
            this.ngOnInit(); // Refrescar los datos
          },
          (error) => {
            // Si ocurre un error durante la eliminación
            Swal.fire(
              'Error',
              'Error al retirarte de la célula.',
              'error'
            );
            this.modalService.dismissAll(); // Cerrar el modal
            this.ngOnInit(); // Refrescar los datos
          }
        );
      } else {

      }
    });
  }
  



// Método para verificar si el joven logueado está inscrito en una célula específica
isJovenRegistradoEnCelula(celulaId: number, inicioInscripcion: string, finInscripcion: string): boolean {
  // Obtenemos la fecha actual
  const fechaActual = new Date();
  const fechaInicioInscripcion = new Date(inicioInscripcion + 'T00:00:00');
  const fechaFinInscripcion = new Date(finInscripcion + 'T00:00:00');

  // Verificamos si el joven está inscrito
  const estaInscrito = this.equiposDelJoven.some(inscripcion =>
    inscripcion.jovenid.id === this.jovenesid && inscripcion.celulaid.id === celulaId
  );

  // Si el joven está inscrito, devolvemos true
  if (estaInscrito) {
    return true;
  }

  // Si el joven no está inscrito, verificamos las fechas de inscripción
  // Devolvemos false si la fecha de fin de inscripción ha pasado
  return fechaActual <= fechaFinInscripcion;
}

// Método para verificar si la inscripción ya finalizó
isInscripcionFinalizada(inicioInscripcion: string, finInscripcion: string): boolean {
  const fechaActual = new Date();
  const fechaFinInscripcion = new Date(finInscripcion + 'T23:59:59'); // Asumimos que la fecha de fin incluye el 16 de noviembre completo

  // Comparamos solo las fechas (sin horas) para asegurarnos de que el día de la fecha fin esté incluido
  return fechaActual >= fechaFinInscripcion;
}




}
