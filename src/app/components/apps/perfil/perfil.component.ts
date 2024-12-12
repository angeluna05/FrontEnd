import { sticky } from '../../../shared/data/sticky/sticky';
import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../../../shared/directives/NgbdSortableHeader';
declare var require
const Swal = require('sweetalert2')
export interface Notes {
  id: number;
  isDeleted: boolean
}
interface InscripcionCelulas {
  id: number;
  celulaid: Celula;  // Referencia a la entidad Celula
  jovenid: Joven;    // Referencia a la entidad Joven
  estado: string;
}
interface inscripcionCelulas {
  id: number;
  celulaid: Celula;
  jovenid: Joven;
  estado: String;
}
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
  documento: number;
  fechaNacimiento: string; // Asegúrate de que el formato coincida con la API
  numeroContacto: string;
  cargo: string;
  correo: string;
  tipoDocumentoid: TipoDocumento;
  estadoid: Estado;
}


interface Encargado {
  id: number;
  nombre: string;
  apellido: string;
  empresaid: Empresa;
}

interface Empresa {
  id: number;
  nombre: string;
}
interface Reto {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  inicioInscripcion: Date;
  finInscripcion: Date;
  tipo_acceso: string;
  estado: string;
  logo?: string;
}
export interface Joven {
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
interface Equipos {
  id?: number;
  nombre: string;
}

interface Equiposretos {
  id: number;
  equiposid: Equipos;
  retosid: Reto;
}
interface Jovenesequipos {
  id: number;
  jovenesid: Joven;
  equiposid: Equipos;
}
interface Logro {
  id: number;
  descripcion: string;
  anoLogro: number;
  fechaRegistro: Date;
  jovenid: Joven;
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
interface JovenesPorEquipo {
  id: number;
  equiposid: any; // Puedes reemplazar `any` con el tipo correcto si lo tienes.
  jovenesid: any[]; // Debe ser un array.
}


@Component({
  selector: 'app-sticky',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  private apiUrl = 'https://backend-do1k.onrender.com/logros';
  private jovenApiUrl = 'https://backend-do1k.onrender.com/jovenes';
  private token = localStorage.getItem('authToken');
  private joven = localStorage.getItem('correo');
  public userRole = localStorage.getItem('rolName');
  public retos: Reto[] = [];
  public equiposRetos: Equiposretos[] = [];
  public equipos: Equipos[] = [];
  public jovenesEquipos: Jovenesequipos[] = [];
  errorMessages: any = {};
  public tableItem$: Observable<Logro[]>;
  public searchText: string;
  total$: Observable<number>;
  public correo: string | null = null;
  public validate = false;
  public tiposDocumentos: TipoDocumento[] = [];
  public tooltipValidation = false;
  public jovenesid?: number;
  logros: Logro[] = [];
  public celulas: Celula[] = [];
  public instituciones: Institucion[] = [];
  public inscripcionCelulas: InscripcionCelulas[] = [];
  public jovenes: any[] = [];
  public newjoven: Joven = {
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
  public selectedjoven: Joven = { ...this.newjoven };
  public jovenesporequitotal: JovenesPorEquipo = {
    id: 0,
    equiposid: null,
    jovenesid: [],
  };
  public newUsuario: Usuario = {
    id: 0,
    correo: '',
    nombre: '',
    contrasena: '',
    estadoid: { id: 1, nombre: '' },
    rolid: { id: 1, nombre: '' }
  };
  public selectedUsuario: Usuario = { ...this.newUsuario };

  public newEmpleado: Empleado = {
    id: 0,
    nombre: '',
    apellido: '',
    documento: 0,
    fechaNacimiento: '',
    numeroContacto: '',
    cargo: '',
    correo: '',
    tipoDocumentoid: { id: 1, siglas: '', descripcion: '' },
    estadoid: { id: 1, nombre: 'Activo' }
  };
  public selectedEmpleado: Empleado = { ...this.newEmpleado };

  // public notes: Notes[] = data.sticky;

  constructor(
    private eRef: ElementRef,
    public service: TableService,
    private http: HttpClient,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private route: ActivatedRoute, private router: Router
  ) {
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    config.backdrop = 'static';
    config.keyboard = false;
  }
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.correo = params['correo'];
      console.log('Correo recibido:', this.correo); // Imprime el correo en la consola
      // Aquí puedes hacer lo que necesites con el correo
    });
    this.getCelulas();
    this.getEquiposDelJoven();

    this.getJovenes();
    this.getTiposDocumentos();
    this.getInstituciones();
    this.service.searchTerm = this.searchTerm;
  }
  getInstituciones() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Institucion[]>('https://backend-do1k.onrender.com/instituciones', { headers }).subscribe(
      (data) => {
        this.instituciones = data;
      },
      (error) => {
        console.error('Error fetching instituciones:', error);
      }
    );
  }
  goBack() {
    this.router.navigate(['/jovenes']);

  }

  getJovenes() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    if (this.userRole === 'ADMIN') {
      this.http.get<Usuario[]>('https://backend-do1k.onrender.com/usuarios', { headers }).subscribe(
        (data) => {
          const jovenEncontrado = data.find(joven => joven.correo === this.joven);
          if (jovenEncontrado) {
            this.jovenesid = jovenEncontrado.id;
            this.jovenes.splice(0, this.jovenes.length); // Elimina todos los elementos
            this.jovenes.push(jovenEncontrado); // Agrega el nuevo elemento
            this.selectedUsuario = jovenEncontrado;
          } else {
            console.error('No se encontró un joven con ese correo.');
          }
        });
    }
    else if (this.userRole === 'JOVEN') {
      this.http.get<Joven[]>(this.jovenApiUrl, { headers }).subscribe(
        (data) => {
          const jovenEncontrado = data.find(joven => joven.correo === this.joven);
          if (jovenEncontrado) {
            this.jovenesid = jovenEncontrado.id;
            this.jovenes.splice(0, this.jovenes.length); // Elimina todos los elementos
            this.jovenes.push(jovenEncontrado); // Agrega el nuevo elemento
            this.selectedjoven = jovenEncontrado;
            this.getLogros();
            this.getJovenesequipos();
          } else {
            console.error('No se encontró un joven con ese correo.');
          }
        });
    }
    else if (this.userRole === 'EMPLEADO') {
      this.http.get<Empleado[]>('https://backend-do1k.onrender.com/empleados', { headers }).subscribe(
        (data) => {
          const jovenEncontrado = data.find(joven => joven.correo === this.joven);
          if (jovenEncontrado) {
            this.jovenesid = jovenEncontrado.id;
            this.jovenes.splice(0, this.jovenes.length); // Elimina todos los elementos
            this.jovenes.push(jovenEncontrado); // Agrega el nuevo elemento
            this.selectedEmpleado = jovenEncontrado;
            this.getLogros();
            this.getJovenesequipos();
          } else {
            console.error('No se encontró un joven con ese correo.');
          }
        });
    }


  }
  public editjoven() {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    if (this.userRole === 'ADMIN') {
    }
    else if (this.userRole === 'JOVEN') {
      this.http.put<Joven>(`${this.jovenApiUrl}/${this.selectedjoven.id}`, this.selectedjoven, { headers }).subscribe(
        () => {
          this.validate = false;
          this.tooltipValidation = false;
          this.errorMessages = '';
          Swal.fire({
            icon: "success",
            title: "Edición exitosa",
            showConfirmButton: false,
            timer: 1500
          });

          this.getJovenes();
          this.modalService.dismissAll();
        },
        (error) => {
          if (error.status === 400 && error.error) {
            this.errorMessages = error.error; // Captura los mensajes de error de validación
          } else {
          }
        }
      );
    }
    else if (this.userRole === 'EMPLEADO') {
      this.http.put<Empleado>(`https://backend-do1k.onrender.com/empleados/${this.selectedEmpleado.id}`, this.selectedEmpleado, { headers }).subscribe(
        () => {
          this.validate = false;
          this.tooltipValidation = false;
          this.errorMessages = '';
          Swal.fire({
            icon: "success",
            title: "Edición exitosa",
            showConfirmButton: false,
            timer: 1500
          });
          this.errorMessages = ''
          this.getJovenes();
          this.modalService.dismissAll();
        },
        (error) => {
          if (error.status === 400 && error.error) {
            this.errorMessages = error.error; // Captura los mensajes de error de validación
          } else {
            console.error('Error editing empleados:', error);
          }
        }
      );
    } else {
      console.error('No se encontró un joven con ese correo.');
    }


  }

  EditarJoven(content1, joven: Joven) {
    this.selectedjoven = { ...joven };
    this.modalService.open(content1, { backdropClass: 'light-blue-backdrop' });
  }
  EditarEmpleado(editEmpleado, joven: Empleado) {
    this.selectedEmpleado = { ...joven };
    this.modalService.open(editEmpleado, { backdropClass: 'light-blue-backdrop' });
  }
  EditarAdmin(content1, joven: Joven) {
    this.selectedjoven = { ...joven };
    this.modalService.open(content1, { backdropClass: 'light-blue-backdrop' });
  }
  getTiposDocumentos() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<TipoDocumento[]>('https://backend-do1k.onrender.com/tipodocumentos', { headers }).subscribe(
      (data) => {
        this.tiposDocumentos = data;
      },
      (error) => {
        console.error('Error fetching tipos de documentos:', error);
      }
    );
  }
  public editEmpleado() {
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });


  }
  getLogros() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Logro[]>(`${this.apiUrl}/joven/${this.jovenesid}`, { headers }).subscribe(
      (data) => {
        // Asignar un sticky (color) a cada logro
        this.logros = data.map((logro, index) => {
          return {
            ...logro,
            sticky: sticky[index % sticky.length] // Asignar un color de forma ciclica
          };
        });
        this.service.setUserData(data);
      },
      (error) => {
        console.error('Error fetching logros:', error);
      }
    );
  }


  getJovenesequipos() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Jovenesequipos[]>(`https://backend-do1k.onrender.com/jovenesequipos/joven/${this.jovenesid}`, { headers }).subscribe(
      (data) => {
        this.jovenesEquipos = data;
        console.log(this.jovenesEquipos)
        this.getEquiposretos();

      },
      (error) => {
        console.error('Error fetching empresas:', error);
      }
    );
  }
  getJovenesequipostodos(item) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    this.jovenesporequitotal = {
      id: null,
      equiposid: null,
      jovenesid: []
    };
    this.http.get<Jovenesequipos[]>(`https://backend-do1k.onrender.com/jovenesequipos`, { headers }).subscribe(
      (data) => {
        this.getEquiposretos1(item.equiposid.id);

        data.forEach(element => {
          if (element.equiposid.id === item.equiposid.id) {
            // Asigna el id y equiposid solo si están vacíos.
            if (!this.jovenesporequitotal.id) {
              this.jovenesporequitotal.id = element.id;
              this.jovenesporequitotal.equiposid = element.equiposid;
            }

            // Agrega el joven al array sin reiniciar.
            this.jovenesporequitotal.jovenesid.push(element.jovenesid);
          }
        });
      },
      (error) => {
        console.error('Error fetching empresas:', error);
      }
    );
  }
  public unretoporequipo;
  getEquiposretos1(item) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    this.unretoporequipo = [];

    this.http.get<Equiposretos[]>(`https://backend-do1k.onrender.com/equiposretos/equipos/${item}`, { headers }).subscribe(
      (data) => {
        // Concatenar correctamente los datos al array
        this.unretoporequipo = data;
      },
      (error) => {
        console.error('Error fetching equiposretos:', error);
      }
    );
  }
  getEquiposretos() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    this.equiposRetos = [];  // Limpiamos la lista de equipos con retos

    // Usamos un bucle 'for' en lugar de 'forEach' para manejar correctamente las peticiones asíncronas
    let equiposConRetosActivos: any[] = [];  // Array para almacenar los equipos válidos

    for (let i = 0; i < this.jovenesEquipos.length; i++) {
      const element = this.jovenesEquipos[i];

      // Primero, obtenemos los retos de cada equipo
      this.http.get<Equiposretos[]>(`https://backend-do1k.onrender.com/equiposretos/equipos/${element.equiposid.id}`, { headers }).subscribe(
        (data) => {
          // Filtramos los retos cuyo estado es "En curso"
          const retosActivos = data.filter(retro => retro.retosid.estado === 'En curso');

          if (retosActivos.length > 0) {
            // Si el equipo tiene retos activos, lo añadimos a la lista de equipos con retos activos
            equiposConRetosActivos.push(element);

            // Asignamos un logo aleatorio solo si la celula está "En curso"
            const logos = [
              'assets/images/job-search/1.jpg',
              'assets/images/job-search/2.jpg',
              'assets/images/job-search/3.jpg',
              'assets/images/job-search/4.jpg',
              'assets/images/job-search/5.jpg',
              'assets/images/job-search/6.jpg'
            ];

            // Generamos un índice aleatorio para el logo
            const randomIndex = Math.floor(Math.random() * logos.length);

            // Asignamos el logo aleatorio
            retosActivos.forEach(retro => {
              retro.retosid.logo = logos[randomIndex];  // Asignamos el logo a cada reto activo
            });

            // Ahora que tenemos los retos activos, agregamos el equipo con los retos
            this.equiposRetos = this.equiposRetos.concat(retosActivos);
          }
        },
        (error) => {
          console.error('Error fetching equiposretos:', error);
        }
      );

      // Ahora obtenemos los jóvenes inscritos en el equipo
      this.http.get<Jovenesequipos[]>(`https://backend-do1k.onrender.com/jovenesequipos/equipo/${element.equiposid.id}`, { headers }).subscribe(
        (data) => {
          // Aquí debes agregar la información de los jóvenes solo si el equipo tiene retos activos
          if (equiposConRetosActivos.includes(element)) {
            // Esto asegura que solo se agregan los jóvenes de los equipos con retos activos
            this.jovenesEquipos = this.jovenesEquipos.concat(data);
          }
        },
        (error) => {
          console.error('Error fetching jovenesequipos:', error);
        }
      );
    }

    // Asignamos los equipos filtrados a la variable final
    setTimeout(() => {
      this.jovenesEquipos = equiposConRetosActivos;
      console.log('Equipos con retos activos:', this.jovenesEquipos);
    }, 2000); // Timeout para asegurar que se asignen después de todas las respuestas HTTP
  }

  // Verificar si el joven está registrado en un reto
  isJovenRegistradoEnReto(retoId: number): boolean {

    return this.equiposRetos.some(reto => this.jovenesEquipos.some(joven => joven.equiposid.id === reto.equiposid.id && reto.retosid.id === retoId));
  }
  detalles: any;

  detallemodal(detalleReto, item) {
    this.detalles = item; // Almacena los detalles del reto seleccionado
    this.modalService.open(detalleReto, { backdropClass: 'light-blue-backdrop' });
  }
  detallemodalCelula(detalleCelula, item) {
    this.detalles = item; // Almacena los detalles del reto seleccionado
    this.modalService.open(detalleCelula); // Abre el modal
  }
  detalleEquipo(equipoModal, item) {
    this.getJovenesequipostodos(item)
    this.modalService.open(equipoModal, { backdropClass: 'light-blue-backdrop' });
  }

  // Método para retirar al joven del reto
  retirarDelReto(retoId: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si la fecha de inscripción ya finalizó, no podrás inscribirte de nuevo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, retirar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.modalService.dismissAll(); // Cerrar el modal
        this.retirarJovenDeReto(retoId);
      }
    });
  }

  // Realiza la solicitud para retirar al joven del reto
  retirarJovenDeReto(retoId: number) {
    if (!this.jovenesEquipos) {
      console.error('ID del jovenesEquipos no encontrado');
      return;
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    const jovenesequiposdelete = this.jovenesEquipos.find(joven => this.equiposRetos.find(reto => joven.equiposid.id === reto.equiposid.id && reto.retosid.id === retoId));

    this.http.delete(`https://backend-do1k.onrender.com/jovenesequipos/${jovenesequiposdelete.id}`, { headers })
      .subscribe(
        () => {
          Swal.fire(
            'Retirado',
            'El joven ha sido retirado del reto con éxito.',
            'success'
          );
          this.getJovenesequipos();
          this.modalService.dismissAll(); // Cerrar el modal
          // Actualiza la lista de retos después de retirar
        },
        (error) => {

          console.error('Error al retirar al joven del reto:', error);
          Swal.fire(
            'Error',
            'Ocurrió un error al intentar retirar al joven del reto.',
            'error'
          );
          this.modalService.dismissAll(); // Cerrar el modal

        }

      );
  }




  public searchTerm: string = '';

  onSearchTermChange() {
    this.service.searchTerm = this.searchTerm;
  }

  public submit() {
    this.validate = !this.validate;
  }

  public tooltipSubmit() {
    this.tooltipValidation = !this.tooltipValidation;
  }
  equiposDelJoven: any[] = [];

  getEquiposDelJoven() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<inscripcionCelulas[]>('https://backend-do1k.onrender.com/inscripcion-celulas', { headers }).subscribe(
      (data) => {
        data.forEach(element => {
        if (element.estado ==='Inscrito') {
        this.equiposDelJoven.push(element);
        const logos = [
          'assets/images/job-search/1.jpg',
          'assets/images/job-search/2.jpg',
          'assets/images/job-search/3.jpg',
          'assets/images/job-search/4.jpg',
          'assets/images/job-search/5.jpg',
          'assets/images/job-search/6.jpg'
        ];
      
        const randomIndex = Math.floor(Math.random() * logos.length);
        element.celulaid.logo = logos[randomIndex];
      
        this.celulas.push(element.celulaid);
          
        }          
        });


      },
      (error) => {
        console.error('Error obteniendo equipos del joven:', error);
      }
    );
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

getCelulas() {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });
  this.celulas = [];

  this.http.get<Celula[]>('https://backend-do1k.onrender.com/celulas', { headers }).subscribe(
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
}
});


    },
    (error) => {
      console.error('Error fetching retos:', error);
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







}

interface SearchResult {
  tableItem: Logro[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(tableItem: Logro[], column: SortColumn, direction: string): Logro[] {
  if (direction === '' || column === '') {
    return tableItem;
  } else {
    return [...tableItem].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }


}


function matches(logro: Logro, term: string, pipe: PipeTransform) {
  return logro.descripcion.toLowerCase().includes(term.toLowerCase())
    || logro.jovenid.nombre.toLowerCase().includes(term.toLowerCase())
    || logro.jovenid.apellido.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(logro.id).includes(term);
}

@Injectable({ providedIn: 'root' })
export class TableService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tableItem$ = new BehaviorSubject<Logro[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  userData: Logro[] = [];

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._tableItem$.next(result.tableItem);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get tableItem$() { return this._tableItem$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  setUserData(val: Logro[]) {
    this.userData = val;
    this._search$.next();
  }

  deleteSingleData(id: string) {
    const index = this.userData.findIndex(item => item.id.toString() === id);
    if (index > -1) {
      this.userData.splice(index, 1);
      this._search$.next();
    }
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let tableItem = sort(this.userData, sortColumn, sortDirection);

    // 2. filter
    tableItem = tableItem.filter(logro => matches(logro, searchTerm, this.pipe));

    const total = tableItem.length;

    // 3. paginate
    tableItem = tableItem.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ tableItem, total });
  }
}
