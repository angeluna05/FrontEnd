import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-joven',
  templateUrl: './jovenes.component.html',
  styleUrls: ['./jovenes.component.scss']
})
export class JovenesComponent implements OnInit {
  private apiUrl = 'https://backend-do1k.onrender.com/jovenes';
  private token = localStorage.getItem('authToken');
  errorMessages: any = {};
  public tableItem$: Observable<joven[]>;
  public searchText: string;
  total$: Observable<number>;
  private joven = localStorage.getItem('correo');
  public validate: boolean = false;
  public tooltipValidation: boolean = false;
  public estados: Estado[] = [];
  public tiposDocumentos: TipoDocumento[] = [];
  public instituciones: Institucion[] = [];
  public newjoven: joven = {
    id: 0, // Puede ser 0 o null si se generará automáticamente
    documento: null,
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
  public selectedjoven: joven = { ...this.newjoven };

  constructor(
    public service: TableService,
    private http: HttpClient,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router
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
    this.getjovenes();
    this.getEstados();
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

  getjovenes() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<joven[]>(this.apiUrl, { headers }).subscribe(
      (data) => {
        this.service.setUserData(data);
      },
      (error) => {
        console.error('Error fetching jovenes:', error);
      }
    );
  }

  perfil(item: any) {
    // El administrador selecciona el perfil del joven, guardando su correo
    this.joven = item.correo;
    localStorage.setItem('correo-joven', `${item.correo}`);


    // Redirigimos al perfil del joven seleccionado
    this.router.navigate(['/perfil-joven'], { queryParams: { correo: this.joven } });
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
        XLSX.utils.book_append_sheet(wb, ws, 'Jóvenes');
        // Guardar el archivo Excel
        XLSX.writeFile(wb, 'jovenes.xlsx');
      },
      (error) => {
        console.error('Error fetching jovenes:', error);
      }
    );
  }



  public createjoven() {
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.post<joven>(this.apiUrl, this.newjoven, { headers }).subscribe(
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
        this.getjovenes();
        this.modalService.dismissAll();
      },
      (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessages = error.error; // Captura los mensajes de error de validación
        } else {
          console.error('Error creating joven:', error);
        }
      }
    );
  }

  public editjoven() {
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.put<joven>(`${this.apiUrl}/${this.selectedjoven.id}`, this.selectedjoven, { headers }).subscribe(
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
        this.getjovenes();
        this.modalService.dismissAll();
      },
      (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessages = error.error; // Captura los mensajes de error de validación
        } else {
          console.error('Error editing  joven:', error);
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
        this.getjovenes();
      },
      (error) => {
        console.error('Error deleting empresa:', error);
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
    this.newjoven = {
      id: 0, // Puede ser 0 o null si se generará automáticamente
      documento: null,
      nombre: '',
      apellido: '',
      fechaNacimiento: null, // Formato de fecha puede necesitar ajuste según el uso (string o Date)
      numeroContacto: '',
      correo: '',
      tipo_institucion: '',
      institucion: '',
      habilidades: '',
      caracteristicas: '',
      descripcion: '',
      tipoDocumentoid: { id: 1, siglas: '', descripcion: '' }, // Asegúrate de ajustar los valores por defecto
      estadoid: { id: 1, nombre: 'Activo' }
    };
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  Editar(content1, joven: joven) {
    this.selectedjoven = { ...joven };
    this.modalService.open(content1, { backdropClass: 'light-blue-backdrop' });
  }


  withConfirmation(joven: joven) {
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
        // Cambiar el estado de la joven
        this.toggleEstado(joven);
      }
    });
  }

  toggleEstado(joven: joven) {
    // Determinar el nuevo estado
    const nuevoEstadoId = joven.estadoid.id === 1 ? 2 : 1;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    // Hacer la solicitud PUT para actualizar el estado en el servidor
    this.http.put(`${this.apiUrl}/${joven.id}/estado`, nuevoEstadoId, { headers })
      .subscribe(
        () => {
          this.validate = false;
          this.tooltipValidation = false;
          this.errorMessages = '';
          // Actualizar el estado localmente solo si la petición fue exitosa
          joven.estadoid.id = nuevoEstadoId;
          joven.estadoid.nombre = nuevoEstadoId === 1 ? 'Activo' : 'Inactivo';

          // Mostrar el mensaje de éxito
          Swal.fire(
            '¡Estado actualizado!',
            `El Joven ahora está en estado ${joven.estadoid.nombre.toLowerCase()}.`,
            'success'
          );
        },
        (error) => {
          // Manejar errores de la petición
          Swal.fire(
            'Error',
            'Hubo un problema al actualizar el estado. Por favor, intenta nuevamente.',
            'error'
          );
        }
      );
  }

}
interface SearchResult {
  tableItem: joven[];
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

function sort(tableItem: joven[], column: SortColumn, direction: string): joven[] {
  if (direction === '' || column === '') {
    return tableItem;
  } else {
    return [...tableItem].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }


}

function matches(joven: joven, term: string, pipe: PipeTransform) {
  return joven.nombre.toLowerCase().includes(term.toLowerCase()) ||
    joven.correo.toLowerCase().includes(term.toLowerCase()) ||
    joven.apellido.toLowerCase().includes(term.toLowerCase()) ||
    joven.caracteristicas.toLowerCase().includes(term.toLowerCase()) ||
    joven.estadoid.nombre.toLowerCase().includes(term.toLowerCase()) ||
    pipe.transform(joven.id).includes(term) ||
    pipe.transform(joven.estadoid.id).includes(term);
}

@Injectable({ providedIn: 'root' })
export class TableService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tableItem$ = new BehaviorSubject<joven[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  userData: joven[] = [];

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

  setUserData(val: joven[]) {
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
    tableItem = tableItem.filter(joven => matches(joven, searchTerm, this.pipe));

    const total = tableItem.length;

    // 3. paginate
    tableItem = tableItem.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ tableItem, total });
  }

}
