import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../../../shared/directives/NgbdSortableHeader';
declare var require
const Swal = require('sweetalert2')

interface Reto {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  inicioInscripcion: Date;
  finInscripcion: Date;
  // maximoPersonas: number;
  // maximoPersonasEquipo: number;
  tipo_acceso: string;
  estado: string;
  empleadoid: Empleado;
  encargadoid: Encargado;
  empresaid: Empresa;
}
interface Jovenesequipos {
  id: number;
  jovenesid: Joven;
  equiposid: Equipos;
}
interface Equipos {
  id?: number;
  nombre: string;
}
interface JovenesPorEquipo {
  id: number;
  equiposid: any; // Puedes reemplazar `any` con el tipo correcto si lo tienes.
  jovenesid: any[]; // Debe ser un array.
}
interface Equiposretos {
  id: number;
  equiposid: Equipos;
  retosid: Reto;
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
  empresaid: Empresa;
}

interface Empresa {
  id: number;
  nombre: string;
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

interface TipoDocumento {
  id: number;
  siglas: string;
  descripcion: string;
}
@Component({
  selector: 'app-reto',
  templateUrl: './retos.component.html',
  styleUrls: ['./retos.component.scss']
})
export class RetosComponent implements OnInit {
  private apiUrl = 'https://backend-do1k.onrender.com/retos';
  private token = localStorage.getItem('authToken');
  errorMessages: any = {};
  public jovenesporequitotal: JovenesPorEquipo = {
    id: 0,
    equiposid: null,
    jovenesid: [],
  };
  public tableItem$: Observable<Reto[]>;
  public searchText: string;
  total$: Observable<number>;
  public validate = false;
  public tooltipValidation = false;
  public empleados: Empleado[] = [];
  public encargados: Encargado[] = [];
  public empresas: Empresa[] = [];
  public encargadosFiltrados: Encargado[] = [];
  public equiposRetos: Equiposretos[] = [];
  public equiposAsociados: Equiposretos[] = [];
  public retosid?: number;
  public newReto: Reto = {
    id: 0,
    nombre: '',
    descripcion: '',
    fechaInicio: new Date(),
    fechaFin: new Date(),
    // maximoPersonas: null,
    // maximoPersonasEquipo: null,
    tipo_acceso: '',
    estado: '',
    inicioInscripcion: new Date(),
    finInscripcion: new Date(),
    empleadoid: { id: 1, nombre: '', apellido: '' },
    encargadoid: { id: 1, nombre: '', apellido: '', empresaid: { id: 1, nombre: '' } },
    empresaid: { id: 1, nombre: '' }
  };
  public selectedReto: Reto = { ...this.newReto };

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
    this.getRetos();
    this.newReto.encargadoid = null; // o undefined

    this.getEmpleados();
    this.getEncargados();
    this.getEmpresas();
    this.getEquiposretos();
    this.service.searchTerm = this.searchTerm;
  }
  loadEmpresas(): void {
    this.getEmpresas();
  }
  openVerticallyCentered(content, retoId) {

    this.equiposAsociados = this.equiposRetos.filter(equiposReto => equiposReto.retosid.id === retoId);
    this.retosid = retoId;
    this.modalService.open(content);
  }

  getEquiposretos() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Equiposretos[]>('https://backend-do1k.onrender.com/equiposretos', { headers }).subscribe(
      (data) => {
        this.equiposRetos = data;
      },
      (error) => {
        console.error('Error fetching empresas:', error);
      }
    );
  }
  loadEncargados(): void {
    this.getEncargados();

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
        console.error('Error al obtener las empresas:', error);
      }
    );
  }
  

  getRetos() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Reto[]>(this.apiUrl, { headers }).subscribe(
      (data) => {
        this.service.setUserData(data);
      },
      (error) => {
        console.error('Error fetching retos:', error);
      }
    );
  }

  public createReto() {
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.post<Reto>(this.apiUrl, this.newReto, { headers }).subscribe(
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

        this.getRetos();
        this.modalService.dismissAll();
      },
      (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessages = error.error; // Captura los mensajes de error de validación
        } else {
          console.error('Error creating retos:', error);
        }
      }
    );
  }

  public editReto() {
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.put<Reto>(`${this.apiUrl}/${this.selectedReto.id}`, this.selectedReto, { headers }).subscribe(
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
        this.getRetos();
        this.modalService.dismissAll();
      },
      (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessages = error.error; // Captura los mensajes de error de validación
        } else {
          console.error('Error editing retos:', error);
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
        this.getRetos();
      },
      (error) => {
        console.error('Error deleting reto:', error);
      }
    );
  }
  VerDetalles(detalleModal: any, reto: any): void {
    this.selectedReto = { ...reto }; // Copia el reto seleccionado para mostrar detalles
    this.modalService.open(detalleModal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      () => {
        // Lógica después de cerrar el modal si es necesario
      },
      () => {
        // Lógica si se cancela el modal
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

  onEmpresaChange(event?: any): void {
    const selectedEmpresaId = event ? +event.target.value : this.selectedReto.empresaid.id;
    this.filterEncargadosByEmpresa(selectedEmpresaId);
  }
filterEncargadosByEmpresa(empresaId: number) {
  if (empresaId) {
    // Filtrar los encargados por empresaId
    this.encargadosFiltrados = this.encargados.filter(encargado => encargado.empresaid?.id === empresaId);
  } else {
    // Si no se selecciona empresa, limpiar los encargados filtrados
    this.encargadosFiltrados = [];
  }

  // Manejar caso donde no hay encargados disponibles
  if (this.encargadosFiltrados.length === 0) {
    this.encargadosFiltrados = [{
      id: null,
      nombre: 'No hay encargados asociados',
      apellido: '',
      empresaid: { id: null, nombre: '' }
    }];
  }

  // Verificar si el encargado seleccionado ya no está en la lista filtrada
  const encargadoSeleccionadoId = this.selectedReto.encargadoid?.id;
  const encargadoEncontrado = this.encargadosFiltrados.some(encargado => encargado.id === encargadoSeleccionadoId);

  // Si el encargado seleccionado no está en la lista filtrada, limpiar la selección
  if (!encargadoEncontrado) {
    this.selectedReto.encargadoid = null; // Limpiar el encargado seleccionado
  }
}


  loadRetoForEdit(reto: Reto) {
    this.selectedReto = { ...reto }; // Copia el reto seleccionado para edición
    this.filterEncargadosByEmpresa(reto.empresaid.id); // Actualiza los encargados filtrados según la empresa del reto seleccionado
  }


  Crear(content) {
    this.newReto = {
      id: 0,
      nombre: '',
      descripcion: '',
      fechaInicio: null,
      fechaFin: null,
      tipo_acceso: '',
      estado: 'En curso',
      inicioInscripcion: null,
      finInscripcion: null,
      empleadoid: { id: 1, nombre: '', apellido: '' },
      encargadoid: { id: 1, nombre: '', apellido: '', empresaid: { id: 1, nombre: '' } },
      empresaid: { id: 1, nombre: '' }
    };
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  Editar(content1, reto: Reto) {
    this.selectedReto = { ...reto };
    this.modalService.open(content1, { backdropClass: 'light-blue-backdrop' });
    this.selectedReto = { ...reto }; // Copia el reto seleccionado para edición
    this.filterEncargadosByEmpresa(reto.empresaid.id); // Actualiza los encargados filtrados según la empresa del reto seleccionado

  }

  withConfirmation(reto: Reto) {
    Swal.fire({
      title: '¿Estás seguro de cambiar el estado?',
      text: "Recuerda que puedes revertirlo en cualquier momento",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar estado',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toggleEstado(reto);
      }
    });
  }

  toggleEstado(reto: Reto) {
    const nuevoEstado = reto.estado === 'En curso' ? 'Finalizado' : 'En curso';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.put(`${this.apiUrl}/${reto.id}/estado`, nuevoEstado, { headers })
      .subscribe(
        () => {
          this.validate = false;
          this.tooltipValidation = false;
          this.errorMessages = '';
          Swal.fire({
            icon: "success",
            title: "Estado cambiado",
            showConfirmButton: false,
            timer: 1500
          });
          this.getRetos();
        },
        (error) => {
          Swal.fire(
            'Error',
            'Hubo un problema al actualizar el estado. Por favor, intenta nuevamente.',
            'error'
          );
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
        this.unretoporequipo = data[0];
      },
      (error) => {
        console.error('Error fetching equiposretos:', error);
      }
    );
  }
  getJovenesequipostodos(item) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    this.jovenesporequitotal = {
      id: 0,
      equiposid: [],
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
  detalleEquipo(equipoModal, item) {
    this.getJovenesequipostodos(item)
    this.modalService.open(equipoModal, { backdropClass: 'light-blue-backdrop' });
  }
}
interface SearchResult {
  tableItem: Reto[];
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

function sort(tableItem: Reto[], column: SortColumn, direction: string): Reto[] {
  if (direction === '' || column === '') {
    return tableItem;
  } else {
    return [...tableItem].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }


}

function matches(Reto: Reto, term: string, pipe: PipeTransform) {
  return Reto.nombre.toLowerCase().includes(term.toLowerCase()) ||
    Reto.tipo_acceso.toLowerCase().includes(term.toLowerCase()) ||
    Reto.descripcion.toLowerCase().includes(term.toLowerCase()) ||
    Reto.estado.toLowerCase().includes(term.toLowerCase())
}
@Injectable({ providedIn: 'root' })
export class TableService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tableItem$ = new BehaviorSubject<Reto[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  userData: Reto[] = [];

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

  setUserData(val: Reto[]) {
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
