import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../../../shared/directives/NgbdSortableHeader';
declare var require
const Swal = require('sweetalert2')
import * as XLSX from 'xlsx'; // Importa la librería XLSX


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
}

interface Empleado {
  id: number;
  nombre: string;
}

interface Encargado {
  id: number;
  nombre: string;
}

interface Empresa {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-celula',
  templateUrl: './celulas.component.html',
  styleUrls: ['./celulas.component.scss']
})
export class CelulasComponent implements OnInit {
  private apiUrl = 'https://backend-do1k.onrender.com/celulas';
  private token = localStorage.getItem('authToken');
  errorMessages: any = {};

  public tableItem$: Observable<Celula[]>;
  public searchText: string;
  total$: Observable<number>;
  public validate = false;
  public tooltipValidation = false;
  public empleados: Empleado[] = [];
  public encargados: Encargado[] = [];
  public empresas: Empresa[] = [];
  public newCelula: Celula = {
    id: 0,
    nombre: '',
    objetivo: '',
    fechaInicio: null,
    fechaFin: null,
    maximoPersonas: null,
    tipo_acceso: '',
    estado: '',
    inicioInscripcion: null,
    finInscripcion: null,
    empleadoid: { id: 1, nombre: '' },
    encargadoid: { id: 1, nombre: '' },
    empresaid: { id: 1, nombre: '' }
  };
  public selectedCelula: Celula = { ...this.newCelula };

  constructor(
    public service: TableService,
    private http: HttpClient,
    config: NgbModalConfig,
    private modalService: NgbModal
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

  ngOnInit() {
    this.getCelulas();
    this.getEmpleados();
    this.getEncargados();
    this.getEmpresas();
    this.service.searchTerm = this.searchTerm;
  }
  

    download(celula): void {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });
  
      // Primero, obtenemos todas las inscripciones de las células
      this.http.get<any[]>('https://backend-do1k.onrender.com/inscripcion-celulas', { headers }).subscribe(
        (inscripciones) => {
          // Filtrar las inscripciones para obtener solo las de la célula seleccionada
          const inscripcionesCelula = inscripciones.filter(inscripcion => inscripcion.celulaid.id === celula.id);
  
          // Para cada inscripción, obtenemos los detalles del joven y la célula
          const datosParaExcel = inscripcionesCelula.map(inscripcion => {
            // Accediendo a los datos del joven según la estructura proporcionada
            return {
              Nombre_Joven: inscripcion.jovenid.nombre,  // Accediendo a nombre del joven
              Apellido_Joven: inscripcion.jovenid.apellido,  // Accediendo a apellido del joven
              Correo_Joven: inscripcion.jovenid.correo,  // Accediendo a correo del joven
              Tipo_Institucion: inscripcion.jovenid.tipo_institucion,  // Accediendo a tipo de institución
              Institucion: inscripcion.jovenid.institucion,  // Accediendo a la institución
              Habilidades: inscripcion.jovenid.habilidades,  // Accediendo a habilidades
              Caracteristicas: inscripcion.jovenid.caracteristicas,  // Accediendo a características
              Descripcion: inscripcion.jovenid.descripcion,  // Accediendo a descripción
              Celula: inscripcion.celulaid.nombre,  // Asumimos que el nombre de la célula está en celulaid.nombre
              Estado_Inscripcion: inscripcion.estado  // Estado de la inscripción (por ejemplo: 'Inscrito')
            };
          });
  
          // Crear una hoja de trabajo a partir de los datos
          const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosParaExcel);
          // Crear un libro de trabajo
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          // Añadir la hoja al libro
          XLSX.utils.book_append_sheet(wb, ws, 'Inscripciones');
          // Guardar el archivo Excel
          XLSX.writeFile(wb, `inscripciones_célula_${celula.nombre}.xlsx`);
        },
        (error) => {
          console.error('Error fetching inscripciones:', error);
        }
      );
    }
  
  
  getEmpleados() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Empleado[]>('https://backend-do1k.onrender.com/empleados', { headers }).subscribe(
      (data) => {
        this.empleados = data;
      },
      (error) => {
        console.error('Error fetching empleados:', error);
      }
    );
  }

  getEncargados() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Encargado[]>('https://backend-do1k.onrender.com/encargados', { headers }).subscribe(
      (data) => {
        this.encargados = data;
      },
      (error) => {
        console.error('Error fetching encargados:', error);
      }
    );
  }

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

    this.http.get<Celula[]>(this.apiUrl, { headers }).subscribe(
      (data) => {
        this.service.setUserData(data);
      },
      (error) => {
        console.error('Error fetching celulas:', error);
      }
    );
  }

  public createCelula() {
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.post<Celula>(this.apiUrl, this.newCelula, { headers }).subscribe(
      () => {
        this.validate = false;
        this.tooltipValidation = false;
        this.errorMessages = '';
        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          showConfirmButton: false,
          timer: 1500
        });
        this.errorMessages = ''

        this.getCelulas();
        this.modalService.dismissAll();
      },
      (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessages = error.error; // Captura los mensajes de error de validación
        } else {
          console.error('Error creating celulas:', error);
        }      }
    );
  }

  public editCelula() {
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;
    

    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.put<Celula>(`${this.apiUrl}/${this.selectedCelula.id}`, this.selectedCelula, { headers }).subscribe(
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
        this.getCelulas();
        this.modalService.dismissAll();
      },
      (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessages = error.error; // Captura los mensajes de error de validación
        } else {
          console.error('Error editing celulas:', error);
        }      }
    );
  }

  deleteData(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe(
      () => {
        this.getCelulas();
      },
      (error) => {
        console.error('Error deleting celula:', error);
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

  Crear(content) {
    this.newCelula = {
      id: 0,
      nombre: '',
      objetivo: '',
      fechaInicio: null,
      fechaFin: null,
      maximoPersonas: null,
      tipo_acceso: '',
      estado: 'Por empezar',
      inicioInscripcion: null,
      finInscripcion: null,
      empleadoid: { id: 1, nombre: '' },
      encargadoid: { id: 1, nombre: '' },
      empresaid: { id: 1, nombre: '' }
    };
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  Editar(content1, celula: Celula) {
    this.selectedCelula = { ...celula };
    this.modalService.open(content1, { backdropClass: 'light-blue-backdrop' });
  }

  withConfirmation(celula: Celula) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar estado',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toggleEstado(celula);
      }
    });
  }

  toggleEstado(celula: Celula) {
    const nuevoEstado = celula.estado === 'En curso' ? 'Finalizada' : 'En curso';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.put(`${this.apiUrl}/${celula.id}/estado`, nuevoEstado , { headers })
      .subscribe(
        () => {
          this.getCelulas();

          Swal.fire(
            '¡Estado cambiado!',
            `La célula ahora está ${celula.estado.toLowerCase()}.`,
            'success'
          );
        },
        (error) => {
          Swal.fire(
            'Error',
            'Hubo un problema al cambiar el estado. Por favor, intenta nuevamente.',
            'error'
          );
        }
      );
  }

  VerDetalles(content2, celula: Celula) {
    this.selectedCelula = { ...celula };
    this.modalService.open(content2, { backdropClass: 'light-blue-backdrop' });
  }
}

interface SearchResult {
  tableItem: Celula[];
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

function sort(tableItem: Celula[], column: SortColumn, direction: string): Celula[] {
  if (direction === '' || column === '') {
    return tableItem;
  } else {
    return [...tableItem].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }


}

function matches(celula: Celula, term: string, pipe: PipeTransform) {
  return celula.nombre.toLowerCase().includes(term.toLowerCase()) ||
         celula.tipo_acceso.toLowerCase().includes(term.toLowerCase()) ||
         celula.objetivo.toLowerCase().includes(term.toLowerCase()) ||
         celula.estado.toLowerCase().includes(term.toLowerCase())
}

@Injectable({ providedIn: 'root' })
export class TableService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tableItem$ = new BehaviorSubject<Celula[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  userData: Celula[] = [];

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

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  setUserData(val: Celula[]) {
    this.userData = val;
    this._search$.next(); // Trigger the search after setting data
  }

  deleteSingleData(id: string) {
    const index = this.userData.findIndex(item => item.id.toString() === id);
    if (index > -1) {
      this.userData.splice(index, 1);
      this._search$.next(); // Trigger the search to update the table
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
    tableItem = tableItem.filter(celula => matches(celula, searchTerm, this.pipe));

    const total = tableItem.length;

    // 3. paginate
    tableItem = tableItem.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ tableItem, total });
  }

}
