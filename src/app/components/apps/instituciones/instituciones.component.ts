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

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.scss']
})
export class InstitucionesComponent implements OnInit {
  private apiUrl = 'https://backend-do1k.onrender.com/instituciones'; // URL del API para instituciones
  private token = localStorage.getItem('authToken');

  public tableItem$: Observable<Institucion[]>;
  public searchText: string;
  total$: Observable<number>;
  public validate = false;
  public tooltipValidation = false;
  public estados: Estado[] = [];
  public empleados: Empleado[] = [];
  public newInstitucion: Institucion = {
    id: 0,
    nombre: '',
    rector: '',
    numeroContacto: '',
    jovenesActivos: 0,
    jovenesEgresados: 0,
    empleadoid: { id: 0, nombre: '' },
    estadoid: { id: 1, nombre: '' }
  };
  errorMessages: any = {};

  public selectedInstitucion: Institucion = { ...this.newInstitucion };

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
    this.getInstituciones();
    this.getEmpleados();
    this.getEstados();
    this.service.searchTerm = this.searchTerm;
  }

  getEstados() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Estado[]>('https://backend-do1k.onrender.com/estado', { headers }).subscribe(
      (data) => {
        this.estados = data;
      },
      (error) => {
        console.error('Error fetching estados:', error);
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
  getInstituciones() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Institucion[]>(this.apiUrl, { headers }).subscribe(
      (data) => {
        this.service.setUserData(data);
      },
      (error) => {
        console.error('Error fetching instituciones:', error);
      }
    );
  }
  
  public createInstitucion() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;

    this.http.post<Institucion>(this.apiUrl, this.newInstitucion, { headers }).subscribe(
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
        this.getInstituciones();
        this.modalService.dismissAll();
      },
      (error) => {
        if (error.status === 400 && error.error) {
        this.errorMessages = '';
          this.errorMessages = error.error; // Captura los mensajes de error de validación
        } else {
          console.error('Error creating joven:', error);
        }      }
    );
  }

  public editInstitucion() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;

    this.http.put<Institucion>(`${this.apiUrl}/${this.selectedInstitucion.id}`, this.selectedInstitucion, { headers }).subscribe(
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
        this.getInstituciones();
        this.modalService.dismissAll();
      },
      (error) => {
        console.error('Error editing institucion:', error);
      }
    );
  }

  public deleteInstitucion(id: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡No podrás recuperar esta institución!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla'
    }).then((result) => {
      if (result.isConfirmed) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.token}`
        });

        this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe(
          () => {
            this.getInstituciones();
            Swal.fire('Eliminado!', 'La institución ha sido eliminada.', 'success');
          },
          (error) => {
            console.error('Error deleting institucion:', error);
          }
        );
      }
    });
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
    this.newInstitucion = {
        id: 0,
        nombre: '',
        rector: '',
        numeroContacto: '',
        jovenesActivos: 0,
        jovenesEgresados: 0,
        empleadoid: { id: 1, nombre: '' },
        estadoid: { id: 1, nombre: '' }
    };
    
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  Editar(content1, instituciones: Institucion) {
    this.selectedInstitucion = { ...instituciones };
    this.modalService.open(content1, { backdropClass: 'light-blue-backdrop' });
  }


  withConfirmation(instituciones: Institucion) {
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
        // Cambiar el estado de la instituciones
        this.toggleEstado(instituciones);
      }
    });
  }

  toggleEstado(instituciones: Institucion) {
    // Determinar el nuevo estado
    const nuevoEstadoId = instituciones.estadoid.id === 1 ? 2 : 1;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    // Hacer la solicitud PUT para actualizar el estado en el servidor
    this.http.put(`${this.apiUrl}/${instituciones.id}/estado`, nuevoEstadoId, { headers })
      .subscribe(
        () => {
          // Actualizar el estado localmente solo si la petición fue exitosa
          instituciones.estadoid.id = nuevoEstadoId;
          instituciones.estadoid.nombre = nuevoEstadoId === 1 ? 'Activo' : 'Inactivo';

          // Mostrar el mensaje de éxito
          Swal.fire(
            '¡Estado cambiado!',
            `La instituciones ahora está ${instituciones.estadoid.nombre.toLowerCase()}.`,
            'success'
          );
        },
        (error) => {
          // Manejar errores de la petición
          Swal.fire(
            'Error',
            'Hubo un problema al cambiar el estado. Por favor, intenta nuevamente.',
            'error'
          );
        }
      );
  }

}

interface SearchResult {
  tableItem: Institucion[];
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

function sort(tableItem: Institucion[], column: SortColumn, direction: string): Institucion[] {
  if (direction === '' || column === '') {
    return tableItem;
  } else {
    return [...tableItem].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }


}

function matches(instituciones: Institucion, term: string, pipe: PipeTransform) {
  return instituciones.nombre.toLowerCase().includes(term.toLowerCase()) ||
    instituciones.rector.toLowerCase().includes(term.toLowerCase()) ||
    instituciones.numeroContacto.toLowerCase().includes(term.toLowerCase()) ||
    instituciones.estadoid.nombre.toLowerCase().includes(term.toLowerCase()) ||
    pipe.transform(instituciones.id).includes(term) ||
    pipe.transform(instituciones.estadoid.id).includes(term);
}

@Injectable({ providedIn: 'root' })
export class TableService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tableItem$ = new BehaviorSubject<Institucion[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  userData: Institucion[] = [];

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

  setUserData(val: Institucion[]) {
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
    tableItem = tableItem.filter(instituciones => matches(instituciones, searchTerm, this.pipe));

    const total = tableItem.length;

    // 3. paginate
    tableItem = tableItem.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ tableItem, total });
  }

}
