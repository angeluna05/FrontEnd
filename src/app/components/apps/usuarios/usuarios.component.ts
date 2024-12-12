import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../../../shared/directives/NgbdSortableHeader';
import * as XLSX from 'xlsx'; // Importa la librería XLSX
declare var require
const Swal = require('sweetalert2')

interface Estado {
  id: number;
  nombre: string;
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

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  private apiUrl = 'https://backend-do1k.onrender.com/usuarios';
  private token = localStorage.getItem('authToken');

  public tableItem$: Observable<Usuario[]>;
  public searchText: string;
  errorMessages: any = {};
  total$: Observable<number>;
  public validate = false;
  public tooltipValidation = false;
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
    this.getUsuarios();
    this.getEstados();
    this.getRoles();
    this.service.searchTerm = this.searchTerm;
  }
  download(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<any[]>(this.apiUrl, { headers }).subscribe(
      (data) => {
        // Crear una hoja de trabajo a partir de los datos JSON
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        // Crear un libro de trabajo
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        // Añadir la hoja al libro
        XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
        // Guardar el archivo Excel
        XLSX.writeFile(wb, 'usuarios.xlsx');
      },
      (error) => {
        console.error('Error fetching usuarios:', error);
      }
    );
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

  getRoles() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Rol[]>('https://backend-do1k.onrender.com/roles', { headers }).subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  getUsuarios() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Usuario[]>(this.apiUrl, { headers }).subscribe(
      (data) => {
        this.usuarios = data;
        this.service.setUserData(data);
      },
      (error) => {
        console.error('Error fetching usuarios:', error);
      }
    );
  }

  public createUsuario() {
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.post<Usuario>(this.apiUrl, this.newUsuario, { headers }).subscribe(
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
        this.getUsuarios();
        this.modalService.dismissAll();
      },
      (error) => {
        console.error('Error creating usuario:', error);
        if (error.status === 400 && error.error) {
          this.errorMessages = error.error; // Captura los mensajes de error de validación
        } else {
          this.errorMessages = error.error;
          console.error(this.newUsuario);
        }
      }
    );
  }

  public editUsuario() {
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.put<Usuario>(`${this.apiUrl}/${this.selectedUsuario.id}`, this.selectedUsuario, { headers }).subscribe(
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
        this.getUsuarios();
        this.modalService.dismissAll();
      },
      (error) => {
        console.error('Error editing usuario:', error);
        if (error.status === 400 && error.error) {
          this.errorMessages = error.error; // Captura los mensajes de error de validación
        } else {
          console.error('Error editing usuario:', error);
        }
      }
    );
  }

  deleteData(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe(
      () => {
        this.getUsuarios();
      },
      (error) => {
        console.error('Error deleting usuario:', error);
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
    this.newUsuario = {
      id: 0,
      correo: '',
      nombre: '',
      contrasena: '',
      estadoid: { id: 1, nombre: 'Activo' },
      rolid: { id: 1, nombre: '' }
    };
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  Editar(content1, usuario: Usuario) {
    this.selectedUsuario = { ...usuario };
    this.modalService.open(content1, { backdropClass: 'light-blue-backdrop' });
  }

  withConfirmation(usuario: Usuario) {
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
        // Cambiar el estado del usuario
        this.toggleEstado(usuario);
      }
    });
  }

  toggleEstado(usuario: Usuario) {
    // Determinar el nuevo estado
    const nuevoEstadoId = usuario.estadoid.id === 1 ? 2 : 1;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    // Hacer la solicitud PUT para actualizar el estado en el servidor
    this.http.put(`${this.apiUrl}/${usuario.id}/estado`, nuevoEstadoId, { headers })
      .subscribe(
        () => {
          this.validate = false;
          this.tooltipValidation = false;
          this.errorMessages = '';
          // Actualizar el estado localmente solo si la petición fue exitosa
          usuario.estadoid.id = nuevoEstadoId;
          usuario.estadoid.nombre = nuevoEstadoId === 1 ? 'Activo' : 'Inactivo';

          // Mostrar el mensaje de éxito
          Swal.fire(
            '¡Estado cambiado!',
            `El usuario ahora está ${usuario.estadoid.nombre.toLowerCase()}.`,
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
  tableItem: Usuario[];
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

function sort(tableItem: Usuario[], column: SortColumn, direction: string): Usuario[] {
  if (direction === '' || column === '') {
    return tableItem;
  } else {
    return [...tableItem].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(usuario: Usuario, term: string, pipe: PipeTransform) {
  return usuario.correo.toLowerCase().includes(term.toLowerCase()) ||
    usuario.nombre.toLowerCase().includes(term.toLowerCase()) ||
    usuario.estadoid.nombre.toLowerCase().includes(term.toLowerCase()) ||
    usuario.rolid.nombre.toLowerCase().includes(term.toLowerCase()) ||
    pipe.transform(usuario.id).includes(term) ||
    pipe.transform(usuario.estadoid.id).includes(term) ||
    pipe.transform(usuario.rolid.id).includes(term);
}

@Injectable({ providedIn: 'root' })
export class TableService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tableItem$ = new BehaviorSubject<Usuario[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  userData: Usuario[] = [];

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

  setUserData(val: Usuario[]) {
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
    tableItem = tableItem.filter(Usuario => matches(Usuario, searchTerm, this.pipe));

    const total = tableItem.length;

    // 3. paginate
    tableItem = tableItem.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ tableItem, total });
  }

}
