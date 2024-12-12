import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../../../shared/directives/NgbdSortableHeader';
declare var require;
const Swal = require('sweetalert2');

interface Estado {
  id: number;
  nombre: string;
}

interface TipoDocumento {
  id: number;
  siglas: string;
  descripcion: string;
}

interface Empresa {
  id: number;
  nombre: string;
}

interface Encargado {
  id: number;
  nombre: string;
  apellido: string;
  documento: number;
  fechaNacimiento: string;
  numeroContacto: string;
  cargo: string;
  tipoDocumentoid: TipoDocumento;
  empresaid: Empresa;
  estadoid: Estado;
}

@Component({
  selector: 'app-encargados',
  templateUrl: './encargados.component.html',
  styleUrls: ['./encargados.component.scss']
})
export class EncargadosComponent implements OnInit {
  private apiUrl = 'https://backend-do1k.onrender.com/encargados';
  private token = localStorage.getItem('authToken');
  errorMessages: any = {};

  public tableItem$: Observable<Encargado[]>;
  public searchText: string = '';
  total$: Observable<number>;
  public validate: boolean = false;
  public tooltipValidation: boolean = false;
  public estados: Estado[] = [];
  public tiposDocumentos: TipoDocumento[] = [];
  public empresas: Empresa[] = [];

  public newEncargado: Encargado = {
    id: null,
    nombre: '',
    apellido: '',
    documento: null,
    fechaNacimiento: '',
    numeroContacto: '',
    cargo: '',
    tipoDocumentoid: { id: 1, siglas: '', descripcion: '' },
    empresaid: { id: 1, nombre: '' },
    estadoid: { id: 1, nombre: 'Activo' }
  };
  public selectedEncargado: Encargado = { ...this.newEncargado };

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
    this.getEncargados();
    this.getEstados();
    this.getTiposDocumentos();
    this.getEmpresas();
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

  getEncargados() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Encargado[]>(this.apiUrl, { headers }).subscribe(
      (data) => {
        this.service.setUserData(data);
      },
      (error) => {
        console.error('Error fetching Encargados:', error);
      }
    );
  }

  public createEncargado() {
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.post<Encargado>(this.apiUrl, this.newEncargado, { headers }).subscribe(
      () => {
        this.validate = false;
        this.tooltipValidation = false;
        this.errorMessages = '';
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          showConfirmButton: false,
          timer: 1500
        });
        this.errorMessages = {};
        this.getEncargados();
        this.modalService.dismissAll();
        this.resetNewEncargado();
      },
      (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessages = error.error; // Captura los mensajes de error de validación
        }else if(error.status === 500 && error.error){
          Swal.fire(
            'Error',
            `${error.error.errors.sql_error}.`,
            'error'
          );
        } else {
          console.error('Error creating encargado:', error);
        }
      }
    );
  }

  public editEncargado(encargado: Encargado) {
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.put<Encargado>(`${this.apiUrl}/${this.selectedEncargado.id}`, this.selectedEncargado, { headers }).subscribe(
      () => {
        this.validate = false;
        this.tooltipValidation = false;
        this.errorMessages = '';
        Swal.fire({
          icon: 'success',
          title: '¡Edición exitosa!',
          showConfirmButton: false,
          timer: 1500
        });
        this.errorMessages = {};
        this.getEncargados();
        this.modalService.dismissAll();
      },
      (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessages = error.error; // Captura los mensajes de error de validación
        }else if(error.status === 500 && error.error){
          Swal.fire(
            'Error',
            `${error.error.errors.sql_error}.`,
            'error'
          );
        } else {
          console.error('Error editing encargado:', error);
        }
      }
    );
  }

  public deleteData(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe(
      () => {
        this.getEncargados();
        Swal.fire({
          icon: 'success',
          title: '¡Eliminación exitosa!',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        console.error('Error deleting encargado:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar',
          text: 'No se pudo eliminar el encargado. Inténtalo de nuevo.',
        });
      }
    );
  }

  withConfirmation(encargado: Encargado) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar estado',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toggleEstado(encargado);
      }
    });
  }

  toggleEstado(encargado: Encargado) {
    const nuevoEstadoId = encargado.estadoid.id === 1 ? 2 : 1;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.put(`${this.apiUrl}/${encargado.id}/estado`, nuevoEstadoId, { headers })
      .subscribe(
        () => {
          encargado.estadoid.id = nuevoEstadoId;
          encargado.estadoid.nombre = nuevoEstadoId === 1 ? 'Activo' : 'Inactivo';

          Swal.fire(
            '¡Estado actualizado!',
            `El Encargado ahora está en estado ${encargado.estadoid.nombre.toLowerCase()}.`,
            'success'
          );
        },
        (error) => {
          console.error('Error cambiando estado:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el estado. Inténtalo de nuevo.',
          });
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
    this.newEncargado = {
      id: null,
      nombre: '',
      apellido: '',
      documento: null,
      fechaNacimiento: '',
      numeroContacto: '',
      cargo: '',
      tipoDocumentoid: { id: 1, siglas: '', descripcion: '' },
      empresaid: { id: 1, nombre: '' },
      estadoid: { id: 1, nombre: 'Activo' }
    };
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  Editar(content1, encargado: Encargado) {
    this.selectedEncargado = { ...encargado };
    this.modalService.open(content1, { backdropClass: 'light-blue-backdrop' });
  }

  private resetNewEncargado() {
    this.newEncargado = {
      id: 0,
      nombre: '',
      apellido: '',
      documento: 0,
      fechaNacimiento: '',
      numeroContacto: '',
      cargo: '',
      tipoDocumentoid: { id: 1, siglas: '', descripcion: '' },
      empresaid: { id: 1, nombre: '' },
      estadoid: { id: 1, nombre: 'Activo' }
    };
    // this.errorMessages = {};
    // this.validate = false;
  }
}

interface SearchResult {
  tableItem: Encargado[];
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

function sort(tableItem: Encargado[], column: SortColumn, direction: string): Encargado[] {
  if (direction === '' || column === '') {
    return tableItem;
  } else {
    return [...tableItem].sort((a, b) => {
      const res = compare(getNestedProperty(a, column), getNestedProperty(b, column));
      return direction === 'asc' ? res : -res;
    });
  }
}

function getNestedProperty(obj: any, propertyPath: string): any {
  return propertyPath.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function matches(encargado: Encargado, term: string, pipe: PipeTransform) {
  if (!term) return true;
  const lowerTerm = term.toLowerCase();
  return (
    encargado.nombre.toLowerCase().includes(lowerTerm) ||
    encargado.apellido.toLowerCase().includes(lowerTerm) ||
    encargado.numeroContacto.toLowerCase().includes(lowerTerm) ||
    encargado.documento.toString().includes(lowerTerm) ||
    encargado.cargo.toLowerCase().includes(lowerTerm) ||
    encargado.tipoDocumentoid.siglas.toLowerCase().includes(lowerTerm) ||
    encargado.estadoid.nombre.toLowerCase().includes(lowerTerm)
  );
}

@Injectable({ providedIn: 'root' })
export class TableService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tableItem$ = new BehaviorSubject<Encargado[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  userData: Encargado[] = [];

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

  setUserData(val: Encargado[]) {
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
    tableItem = tableItem.filter(encargado => matches(encargado, searchTerm, this.pipe));

    const total = tableItem.length;

    // 3. paginate
    tableItem = tableItem.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ tableItem, total });
  }
}
