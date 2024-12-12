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

export interface PermissionGroup {
  [key: string]: string;
}

export interface SelectedPermissions {
  [key: string]: boolean;
}

interface Permiso {
  id: number;
  nombre: string;
}
interface Estado {
  id: number;
  nombre: string;
}

interface Rol {
  id: number;
  nombre: string;
  estadoid: Estado;
}
interface permisosroles {
  nombre: any;
  permisos_rolesid: number;
  rolid: Rol;
  permisosid: Permiso;
}
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  private apiUrl = 'https://backend-do1k.onrender.com/roles';
  private token = localStorage.getItem('authToken');
  errorMessages: any = {};
  public tableItem$: Observable<Rol[]>;
  public searchText: string;
  total$: Observable<number>;
  public validate = false;
  public tooltipValidation = false;
  public permisos: Permiso[] = [];
  public permisosroles: permisosroles[] = [];
  public newRol: Rol = {
    id: 0,
    nombre: '',
    estadoid: { id: 1, nombre: '' }

  };
  public selectedRol: Rol = { ...this.newRol };
  permissionGroups: PermissionGroup = {
    celulas: 'Células',
    empleados: 'Empleados',
    empresas: 'Empresas',
    encargados: 'Encargados',
    equipos: 'Equipos',
    equiposretos: 'Equipos Retos',
    estado: 'Estado',
    inscripcion_celulas: 'Inscripción Células',
    inscripcionsesiones: 'Inscripción Sesiones',
    instituciones: 'Instituciones',
    jovenes: 'Jóvenes',
    jovenesequipos: 'Jóvenes Equipos',
    jovenesinstituciones: 'Jóvenes Instituciones',
    logros: 'Logros',
    permisos: 'Permisos',
    permisosroles: 'Permisos Roles',
    programarsesion: 'Programar Sesión',
    retos: 'Retos',
    retosempresas: 'Retos Empresas',
    roles: 'Roles',
    tipodocumento: 'Tipo Documento',
    usuarios: 'Usuarios',
    login: 'Iniciar sesión',
    logup: 'Registrarse',
    logout: 'Cerrar sesión',
    recuperarcontraseña: 'Recuperar contraseña',
    restablecercontraseña: 'Restablecer contraseña',
  };

  selectedPermissions: SelectedPermissions = {};
  private rolid = 0;
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

  ngOnInit(): void {
    this.getRoles();
    this.getPermisos();
    this.initializeSelectedPermissions();
    this.service.searchTerm = this.searchTerm;
  }
  initializeSelectedPermissions() {
    Object.keys(this.permissionGroups).forEach(module => {
      this.selectedPermissions[module] = false;
      this.selectedPermissions[`${module}/crear`] = false;
      this.selectedPermissions[`${module}/actualizar`] = false;
      this.selectedPermissions[`${module}/eliminar`] = false;
    });
  }
  onSelectRol(rol: Rol) {
    this.selectedRol = rol;
    this.loadPermissionsForRole();
  }
  loadPermissionsForRole() {
    // Limpia el objeto de permisos seleccionados
    this.selectedPermissions = {};

    // Marca los permisos como seleccionados
    for (let i = 0; i < this.permisosroles.length; i++) {
      const permiso = this.permisosroles[i];
      this.selectedPermissions[permiso.nombre] = true;
    }
  }


  openEditRoleModal(modal: any) {
    this.loadPermissionsForRole();
    this.modalService.open(modal);
  }
  getPermisosRoles(rolId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<permisosroles[]>(`https://backend-do1k.onrender.com/permisosroles/rol/${rolId}/permisos`, { headers }).subscribe(
      (data) => {
        this.permisosroles.splice(0, this.permisosroles.length);
        this.permisosroles = data
        this.loadPermissionsForRole()
      },
      (error => {
        console.error('Error fetching permisos:', error);
        return of([]); // Devuelve un arreglo vacío en caso de error
      })
    );
  }


  // Verificar si todos los permisos están seleccionados
  isAllSelected(): boolean {
    return Object.keys(this.permissionGroups).every(module =>
      ['', '/crear', '/actualizar', '/eliminar'].every(action =>
        this.selectedPermissions[`${module}${action}`]
      )
    );
  }

  // Verificar si todos los permisos de un tipo están seleccionados
  isAllTypeSelected(type: string): boolean {
    return Object.keys(this.permissionGroups).every(module =>
      this.selectedPermissions[type === 'view' ? module : `${module}/${type}`]
    );
  }

  // Verificar si todos los permisos de un módulo están seleccionados
  isAllModuleSelected(module: string): boolean {
    return ['', '/crear', '/actualizar', '/eliminar'].every(action =>
      this.selectedPermissions[`${module}${action}`]
    );
  }

  // Manejar selección de todos los permisos
  handleSelectAll(): void {
    const newValue = !this.isAllSelected();
    Object.keys(this.permissionGroups).forEach(module => {
      this.selectedPermissions[module] = newValue;
      this.selectedPermissions[`${module}/crear`] = newValue;
      this.selectedPermissions[`${module}/actualizar`] = newValue;
      this.selectedPermissions[`${module}/eliminar`] = newValue;
    });
  }

  // Manejar selección de todos los permisos de un tipo
  handleSelectAllType(type: string): void {
    const newValue = !this.isAllTypeSelected(type);
    Object.keys(this.permissionGroups).forEach(module => {
      const permission = type === 'view' ? module : `${module}/${type}`;
      this.selectedPermissions[permission] = newValue;
    });
  }
  // Manejar selección de todos los permisos de un módulo
  handleSelectAllModule(module: string): void {
    const newValue = !this.isAllModuleSelected(module);
    this.selectedPermissions[module] = newValue;
    this.selectedPermissions[`${module}/crear`] = newValue;
    this.selectedPermissions[`${module}/actualizar`] = newValue;
    this.selectedPermissions[`${module}/eliminar`] = newValue;
  }

  handlePermissionChange(permission: string): void {
    // Cambiar el estado de la selección
    this.selectedPermissions[permission] = !this.selectedPermissions[permission];

    // Obtener el ID del permiso y del rol (esto puede depender de cómo lo tengas estructurado)
    const rolId = this.rolid; // Asumiendo que tienes un ID de rol seleccionado

    // Si el permiso está ahora seleccionado, asignar; de lo contrario, eliminar
    if (this.selectedPermissions[permission]) {
      this.asignarPermisoARol(permission, rolId); // Se envía el nombre del permiso
    } else {
      this.eliminarPermisoDeRol(permission, rolId); // Se envía el nombre del permiso también
    }
  }

  // Método para asignar permiso al rol
  asignarPermisoARol(permisoName: string, rolId: number): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    // Realizar la petición POST al backend
    this.http.post(`https://backend-do1k.onrender.com/permisosroles/asignar?rolId=${rolId}&nombrePermiso=${permisoName}`, {}, { headers })
      .subscribe(response => {
        this.validate = false;
        this.tooltipValidation = false;
        this.errorMessages = '';
        console.log('Permiso asignado con éxito:', response);
      }, error => {
        Swal.fire(
          'Error',
          'Algo esta sucediendo, intentalo mas tarde.',
          'error'
        );
      });
  }

  // Método para eliminar permiso del rol
  eliminarPermisoDeRol(permisoName: string, rolId: number): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    // Realizar la petición DELETE al backend
    this.http.delete(`https://backend-do1k.onrender.com/permisosroles/eliminar?rolId=${rolId}&nombrePermiso=${permisoName}`, { headers })
      .subscribe(response => {
        console.log('Permiso eliminado con éxito:', response);
      }, error => {
        Swal.fire(
          'Error',
          'Algo esta sucediendo, intentalo mas tarde.',
          'error'
        );
      });
  }

  permisosedit() {
    Swal.fire(
      'Felicidades',
      'Cambios guardados con exito.',
      'success'
    );
    this.getRoles();
    this.modalService.dismissAll();
  }


  // Obtener las claves de los módulos
  getModuleKeys(): string[] {
    return Object.keys(this.permissionGroups);
  }
  getPermisos() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Permiso[]>('https://backend-do1k.onrender.com/permisos', { headers }).subscribe(
      (data) => {
        this.permisos = data;
      },
      (error) => {
        console.error('Error fetching permisos:', error);
      }
    );
  }


  getRoles() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Rol[]>(this.apiUrl, { headers }).subscribe(
      (data) => {
        this.service.setUserData(data);
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  public createRol() {
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.post<Rol>(this.apiUrl, this.newRol, { headers }).subscribe(
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
        this.errorMessages = '';
        this.getRoles();
        this.modalService.dismissAll();
      },
      (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessages = error.error;
        } else {
          console.error('Error creating rol:', error);
        }
      }
    );
  }

  public editRol() {
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.put<Rol>(`${this.apiUrl}/${this.selectedRol.id}`, this.selectedRol, { headers }).subscribe(
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
        this.errorMessages = '';
        this.getRoles();
        this.modalService.dismissAll();
      },
      (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessages = error.error;
        } else {
          console.error('Error editing rol:', error);
        }
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
    this.newRol = {
      id: 0,
      nombre: '',
      estadoid: { id: 1, nombre: '' }

    };
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  Editar(content1, rol: Rol) {
    this.selectedRol = { ...rol };
    this.modalService.open(content1, { backdropClass: 'light-blue-backdrop' });
  }
  ver(permisos, item) {
    this.rolid = item.id;
    this.getPermisosRoles(item.id)
    this.modalService.open(permisos, { backdropClass: 'light-blue-backdrop' });
  }

  cambiarEstado(rol: Rol) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas cambiar el estado del rol "${rol.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar estado',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toggleEstado(rol);
      }
    });
  }

  toggleEstado(rol: Rol) {
    // Determinar el nuevo estado
    const nuevoEstadoId = rol.estadoid.id === 1 ? 2 : 1;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    // Hacer la solicitud PUT para actualizar el estado en el servidor
    this.http.put(`${this.apiUrl}/${rol.id}/estado`, nuevoEstadoId, { headers })
      .subscribe(
        () => {
          this.validate = false;
          this.tooltipValidation = false;
          this.errorMessages = '';
          // Actualizar el estado localmente solo si la petición fue exitosa
          rol.estadoid.id = nuevoEstadoId;
          rol.estadoid.nombre = nuevoEstadoId === 1 ? 'Activo' : 'Inactivo';

          // Mostrar el mensaje de éxito
          Swal.fire(
            '¡Estado actualizado!',
            `El Líder ahora está en estado ${rol.estadoid.nombre.toLowerCase()}.`,
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
  tableItem: Rol[];
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

function sort(tableItem: Rol[], column: SortColumn, direction: string): Rol[] {
  if (direction === '' || column === '') {
    return tableItem;
  } else {
    return [...tableItem].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }


}

function matches(Rol: Rol, term: string, pipe: PipeTransform) {
  return Rol.nombre.toLowerCase().includes(term.toLowerCase())
}

@Injectable({ providedIn: 'root' })
export class TableService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tableItem$ = new BehaviorSubject<Rol[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  userData: Rol[] = [];

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

  setUserData(val: Rol[]) {
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
    tableItem = tableItem.filter(Rol => matches(Rol, searchTerm, this.pipe));

    const total = tableItem.length;

    // 3. paginate
    tableItem = tableItem.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ tableItem, total });
  }

}
