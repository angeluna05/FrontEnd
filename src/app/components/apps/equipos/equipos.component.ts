import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, of, Subject, forkJoin } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../../../shared/directives/NgbdSortableHeader';

declare var require;
const Swal = require('sweetalert2');

interface Equipos {
  id: number;
  nombre: string;
}
export interface TableItems {
  equipos: Equipos;
  equiposRetos: {
    id: number;
    equiposid: Equipos;
    retosid?: Retos | null;
  };
  jovenesEquipos: {
    id: number;
    jovenesid: {
      id: number;
      nombre: string;
      apellido: string;
      correo: string;
    }[];
    equiposid: Equipos;
  };
}

export interface TableItems1 {
  equipos: Equipos;
  equiposRetos: Equiposretos;
  jovenesEquipos: Jovenesequipos;
}
interface Equiposretos {
  id: number;
  equiposid: Equipos;
  retosid: Retos;
}
interface Jovenesequipos {
  id: number;
  jovenesid: Jovenes;
  equiposid: Equipos;
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
interface Retos {
  id: number;
  nombre: string;
  // descripcion: string;
  // fechaInicio: Date;
  // fechaFin: Date;
  // inicioInscripcion: Date;
  // finInscripcion: Date;
  // // maximoPersonas: number;
  // // maximoPersonasEquipo: number;
  // tipo_acceso: string;
  // estado: string;
  // empleadoid: string;
  // encargadoid: string;
  // Equiposid: string;
}
@Component({
  selector: 'app-empleado',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss']
})
export class EquiposComponent implements OnInit {
  private apiUrlEquipos = 'https://backend-do1k.onrender.com/equipos';
  private apiUrlEquiposretos = 'https://backend-do1k.onrender.com/equiposretos';
  private apiUrlJovenesequipos = 'https://backend-do1k.onrender.com/jovenesequipos';
  private jovenApiUrl = 'https://backend-do1k.onrender.com/jovenes';
  private retoApiUrl = 'https://backend-do1k.onrender.com/retos';

  private token = localStorage.getItem('authToken');
  errorMessages: any = {};
  public tableItem$: Observable<any[]>;
  public tableItem1$: TableItems[] = [];
  public searchText: string;
  total$: Observable<number>;
  public validate = false;
  public tooltipValidation = false;
  public retos: Retos[] = [];
  public jovenesEquipos: Jovenesequipos[] = [];
  public equiposRetos: Equiposretos[] = [];
  public equipos: Equipos[] = [];
  public jovenes: Jovenes[] = [];
  selectedJoven: Jovenes;


  public newEquipos: Equipos = {
    id: 0,
    nombre: ''
  };
  public newEquiposretos: Equiposretos = {
    id: 0,
    equiposid: { id: 0, nombre: '' }, // Inicializa Equipos con valores por defecto
    retosid: { id: 0, nombre: '' }
  };
  public newJovenesequipos: Jovenesequipos = {
    id: 0,
    jovenesid: { id: 0, nombre: '', apellido: '', correo: '' },
    equiposid: { id: 0, nombre: '' }
  };

  public newTableItems1: TableItems1 = {
    equipos: { id: 0, nombre: '' }, // Inicializa Equipos con valores por defecto
    equiposRetos: {
      id: 0,
      equiposid: { id: 0, nombre: '' }, // Inicializa Equipos con valores por defecto
      retosid: { id: 0, nombre: '' }
    }, // Inicializa Equipos con valores por defecto
    jovenesEquipos: {
      id: 0,
      jovenesid: { id: 0, nombre: '', apellido: '', correo: '' },
      equiposid: { id: 0, nombre: '' }
    }
  };
  public selectedEquipos: Equipos = { ...this.newEquipos };
  public selectedEquiposretos: Equiposretos = { ...this.newEquiposretos };
  public selecTableItems1: TableItems1 = { ...this.newTableItems1 };
  public selectedJovenes: Jovenes[] = [];  // Esto indica que es un array de objetos de tipo Jovenes

  // Si quieres convertirlo en un array para que sea iterable
  public selectedJovenesequipos: Jovenesequipos[] = [this.newJovenesequipos];
  public selectedJovenesequipos1: Jovenesequipos[] = []; // Define como array

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

  onJovenChange(selectedJoven: Jovenes) {
    // Verifica si el joven ya está en la lista de seleccionados
    if (selectedJoven && !this.selectedJovenes.some(j => j.id === selectedJoven.id)) {
      this.selectedJovenes.push(selectedJoven);

    }
    // Resetea el campo seleccionado si es necesario
    this.selectedJoven = null;
  }


  onRetoChange(selectedReto: any) {
    // Lógica para manejar el cambio de selección
    this.selectedEquiposretos.retosid = selectedReto;
  }

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
    this.getJovenes();
    this.getRetos();
    this.loadTableItems();
    // this.getEquipos();
    this.service.searchTerm = this.searchTerm;
  }
  getJovenes() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Jovenes[]>(this.jovenApiUrl, { headers }).subscribe(
      (data) => {
        this.jovenes = data;
      },
      (error) => {
        console.error('Error fetching jovenes:', error);
      }
    );
  }
  getRetos() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Retos[]>(this.retoApiUrl, { headers }).subscribe(
      (data) => {
        this.retos = data;
      },
      (error) => {
        console.error('Error fetching reto:', error);
      }
    );
  }
  loadTableItems(): void {
    this.getTableItems().subscribe(tableItems => {
      this.tableItem1$ = tableItems; // Asigna los datos obtenidos a tableItem$
      this.service.setUserData(tableItems); // Almacena los datos en el servicio
    });
  }

  getJovenesNombres(jovenes: any[]): string {
    if (!jovenes) {
      return '';
    }
    return jovenes.map(j => j.nombre).join(', ');
  }
  agregarJoven() {
    if (this.newJovenesequipos) {
      // Encuentra el joven completo en la lista de jóvenes
      console.log('Selected Joven:', this.newJovenesequipos.jovenesid);

      const jovenSeleccionado = this.jovenes.find(j => j.id === this.newJovenesequipos.id);
      console.log('Joven Seleccionado:', jovenSeleccionado);

      if (jovenSeleccionado && !this.selectedJovenes.includes(jovenSeleccionado)) {
        this.selectedJovenes.push(jovenSeleccionado);
        this.newJovenesequipos = null; // Resetea el dropdown
      } else {
        console.log("error1")
      }
    } else {
      console.log("error2")
    }
  }



  // Método para eliminar un joven de la lista de seleccionados
  eliminarJoven(index: number) {
    this.selectedJovenes.splice(index, 1);
  }

  eliminarJovenes(jovenEquipoId): void {
    if (!jovenEquipoId.jovenesid.id) {
      console.error('El jovenEquipoId es inválido:', jovenEquipoId.jovenesid.id);
      return;
    }

    console.log('Contenido de selectedJovenesequipos antes de eliminar:', this.selectedJovenesequipos);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    // Encontrar la relación jovenequipo específica
    const relacionAEliminar = this.selectedJovenesequipos.find(relacion => relacion.jovenesid.id === jovenEquipoId.jovenesid.id);
    console.log(relacionAEliminar)
    if (!relacionAEliminar) {
      console.error(`No se encontró la relación jovenequipo con id ${jovenEquipoId.jovenesid.id}.`);
      return;
    }

    const deleteUrl = `${this.apiUrlJovenesequipos}/${jovenEquipoId.id}`;

    this.http.delete(deleteUrl, { headers }).subscribe({
      next: () => {
        // Si la solicitud fue exitosa, actualizar el array local
        this.selectedJovenesequipos = this.selectedJovenesequipos.filter(relacion => relacion.jovenesid.id !== jovenEquipoId.jovenesid.id);
        console.log(`Relación jovenequipo con id ${jovenEquipoId.jovenesid.id} eliminada correctamente.`);

        // También deberíamos actualizar selectedJovenes si lo estamos usando
        const jovenId = relacionAEliminar.jovenesid.id;
        this.selectedJovenes = this.selectedJovenes.filter(joven => joven.id !== jovenId);

        // Actualizar la vista
      },
      error: (err) => {
        console.error('Error al eliminar la relación jovenequipo:', err);
      }
    });
  }



  getTableItems(): Observable<TableItems[]> {
    return forkJoin({
      equipos: this.http.get<Equipos[]>(this.apiUrlEquipos),
      equiposretos: this.http.get<Equiposretos[]>(this.apiUrlEquiposretos),
      jovenesequipos: this.http.get<Jovenesequipos[]>(this.apiUrlJovenesequipos)
    }).pipe(
      map(({ equipos, equiposretos, jovenesequipos }) => {
        // Mapea los datos para combinarlos
        return equipos.map(equipo => {
          // Busca el reto asociado al equipo
          const equipoReto = equiposretos.find(er => er.equiposid.id === equipo.id);
          const reto = equipoReto?.retosid; // Obtiene el reto asociado al equipo

          const jovenes = jovenesequipos
            .filter(je => je.equiposid.id === equipo.id)
            .map(je => ({
              id: je.jovenesid.id,
              nombre: je.jovenesid.nombre,
              apellido: je.jovenesid.apellido,
              correo: je.jovenesid.correo
            }));

          // Asegúrate de que la estructura coincide con TableItem
          const tableItem: TableItems = {
            equipos: equipo,
            equiposRetos: { id: equipoReto?.id ?? 0, equiposid: equipo, retosid: reto },
            jovenesEquipos: {
              id: 0,
              jovenesid: jovenes,
              equiposid: equipo
            }
          };

          return tableItem;
        });
      })
    );
  }


  // getEquipos() {
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${this.token}`
  //   });

  //   this.http.get<Equipos[]>(this.apiUrlEquipos, { headers }).subscribe(
  //     (data) => {
  //       this.service.setUserData(data);
  //     },
  //     (error) => {
  //       console.error('Error fetching Equiposs:', error);
  //     }
  //   );
  // }


  // Método para crear el equipo y asociar los jóvenes seleccionados
  public createAll(modal: any) {
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    // Crear el nuevo equipo
    this.http.post<Equipos>(this.apiUrlEquipos, this.newEquipos, { headers }).pipe(
      switchMap((createdEquipo: Equipos) => {
        this.newEquiposretos.equiposid.id = createdEquipo.id;

        // Crear Equiposretos y todos los Jovenesequipos asociados
        const jovenesRequests = this.selectedJovenes.map(joven => {
          // Clonar el objeto para evitar que se sobrescriba en cada iteración
          const jovenEquipo = { ...this.newJovenesequipos };
          jovenEquipo.equiposid = createdEquipo;
          jovenEquipo.jovenesid = joven; // Asignar el joven correctamente

          console.log(jovenEquipo);  // Verifica que cada jovenEquipo sea diferente
          console.log(joven);        // Verifica los datos del joven

          // Realizar la solicitud POST para cada joven
          return this.http.post<Jovenesequipos>(this.apiUrlJovenesequipos, jovenEquipo, { headers });
        });


        return forkJoin([
          this.http.post<Equiposretos>(this.apiUrlEquiposretos, this.newEquiposretos, { headers }),
          ...jovenesRequests
        ]).pipe(
          map(() => createdEquipo)
        );
      })
    ).subscribe(
      (createdEquipo: Equipos) => {
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
        this.loadTableItems();

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


  public editAll(modal: any) {
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    // Actualizar el equipo seleccionado
    this.http.put<Equipos>(`${this.apiUrlEquipos}/${this.selectedEquipos.id}`, this.selectedEquipos, { headers }).pipe(
      switchMap((updatedEquipo: Equipos) => {
        // Actualizar Equiposretos
        const equiposretosRequest = this.http.put<Equiposretos>(
          `${this.apiUrlEquiposretos}/${this.selectedEquiposretos.id}`,
          {
            ...this.selectedEquiposretos,
            equiposid: updatedEquipo,
            retosid: this.selectedEquiposretos.retosid
          },
          { headers }
        );

        // Actualizar Jovenesequipos para cada joven asociado
        const jovenesRequests = this.selectedJovenes.map(joven => {
          const existingJovenEquipo = this.selectedJovenesequipos.find(je => je && je.jovenesid && je.jovenesid.id === joven.id);


          if (existingJovenEquipo) {
            // Actualizar joven existente
            return this.http.put<Jovenesequipos>(
              `${this.apiUrlJovenesequipos}/${existingJovenEquipo.id}`,
              {
                ...existingJovenEquipo,
                equiposid: updatedEquipo,
                jovenesid: joven
              },
              { headers }
            );
          } else {
            // Agregar nuevo joven al equipo
            return this.http.post<Jovenesequipos>(
              this.apiUrlJovenesequipos,
              {
                equiposid: updatedEquipo,
                jovenesid: joven
              },
              { headers }
            );
          }
        });

        return forkJoin([equiposretosRequest, ...jovenesRequests]);
      })
    ).subscribe(
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
        this.errorMessages = {};
        this.selectedJovenesequipos = [];
        this.selectedJoven = null;  // Vaciamos el objeto
        this.selectedJovenesequipos = [];
        this.selectedJovenes = [];
        this.loadTableItems();

        modal.close();
      },
      (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessages = error.error; // Captura los mensajes de error de validación
        } else {
          console.error('Error editing resources:', error);
          Swal.fire({
            icon: "error",
            title: "Error al editar",
            text: "Hubo un problema al actualizar el equipo. Por favor, intenta nuevamente.",
            showConfirmButton: true
          });
          // Vaciar arrays de objetos de tipo Retos, Jovenesequipos, Equiposretos, Equipos, y Jovenes

        }
      }
    );
  }




  // deleteData(id: number) {
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${this.token}`
  //   });


  //   this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe(
  //     () => {
  //       this.getEmpleados();
  //     },
  //     (error) => {
  //       console.error('Error deleting Equipos:', error);
  //     }
  //   );
  // }

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
    this.newEquipos = {
      id: 990,
      nombre: ''
    };
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }
  compareById(item1: any, item2: any): boolean {
    console.log(item1 && item2 ? item1.id === item2.id : item1 === item2)
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

  Editar(content1: any, equipos: Equipos, equiposRetos: Equiposretos, jovenesEquipos: Jovenesequipos[]) {
    // Carga el equipo seleccionado
    this.selectedJovenes=[];
    this.selectedEquipos = { ...equipos };
    // Asigna correctamente el reto, manejando ambos casos
    this.selectedEquiposretos = { ...equiposRetos };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Jovenesequipos[]>(`${this.apiUrlJovenesequipos}/equipo/${this.selectedEquipos.id}`, { headers }).subscribe(
      (data) => {
        this.selectedJovenesequipos = data;
      },
      (error) => {
        console.error('Error fetching reto:', error);
      }
    );


    // Asegúrate de que retosid sea el objeto completo
    if (this.selectedEquiposretos.retosid && typeof this.selectedEquiposretos.retosid === 'object') {
      // Si ya es un objeto, asegúrate de que tenga la estructura correcta
      this.selectedEquiposretos.retosid = {
        id: this.selectedEquiposretos.retosid.id,
        nombre: this.selectedEquiposretos.retosid.nombre
      };
    } else {
      // Si es solo un ID, busca el objeto completo en la lista de retos
      const retoCompleto = this.retos.find(reto => reto.id === this.selectedEquiposretos.retosid.id);
      if (retoCompleto) {
        this.selectedEquiposretos.retosid = {
          id: retoCompleto.id,
          nombre: retoCompleto.nombre
        };
      }
    }
    // Preselecciona los jóvenes si los hay
    //  if (!Array.isArray(jovenesEquipos)) {
    //   this.selectedJovenesequipos = [jovenesEquipos];
    //   console.log(this.selectedJovenesequipos)
    // } else {
    //   this.selectedJovenesequipos = [...jovenesEquipos];
    // }  

    // Abre el modal
    this.modalService.open(content1);
  }




  // withConfirmation(Empleado: Empleado) {
  //   Swal.fire({
  //     title: '¿Estás seguro?',
  //     text: "¡No podrás revertir esto!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Sí, cambiar estado',
  //     cancelButtonText: 'Cancelar'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // Cambiar el estado de la Empleado
  //       this.toggleEstado(Empleado);
  //     }
  //   });
  // }

  // toggleEstado(Empleado: Empleado) {
  //   // Determinar el nuevo estado
  //   const nuevoEstadoId = Empleado.estadoid.id === 1 ? 2 : 1;
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${this.token}`,
  //     'Content-Type': 'application/json'
  //   });
  //   // Hacer la solicitud PUT para actualizar el estado en el servidor
  //   this.http.put(`${this.apiUrl}/${Empleado.id}/estado`,nuevoEstadoId , { headers })
  //     .subscribe(
  //       () => {
  //         // Actualizar el estado localmente solo si la petición fue exitosa
  //         Empleado.estadoid.id = nuevoEstadoId;
  //         Empleado.estadoid.nombre = nuevoEstadoId === 1 ? 'Activo' : 'Inactivo';

  //         // Mostrar el mensaje de éxito
  //         Swal.fire(
  //           '¡Estado actualizado!',
  //           `El Líder ahora está en estado ${Empleado.estadoid.nombre.toLowerCase()}.`,
  //           'success'
  //         );
  //       },
  //       (error) => {
  //         // Manejar errores de la petición
  //         Swal.fire(
  //           'Error',
  //           'Hubo un problema al actualizar el estado. Por favor, intenta nuevamente.',
  //           'error'
  //         );
  //       }
  //     );
  // }

}
interface SearchResult {
  tableItem: TableItems[];
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

function sort(tableItem: TableItems[], column: SortColumn, direction: string): TableItems[] {
  if (direction === '' || column === '') {
    return tableItem;
  } else {
    return [...tableItem].sort((a, b) => {
      const res = compare(a.equipos[column], b.equipos[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(tableItem: TableItems, term: string, pipe: PipeTransform) {
  return tableItem.equipos.nombre.toLowerCase().includes(term.toLowerCase()) ||
    (tableItem.equiposRetos.retosid?.nombre || '').toLowerCase().includes(term.toLowerCase());
}



@Injectable({ providedIn: 'root' })
export class TableService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tableItem$ = new BehaviorSubject<TableItems[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  userData: TableItems[] = [];

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

  setUserData(val: TableItems[]) {
    this.userData = val;
    this._search$.next(); // Trigger the search after setting data
  }

  deleteSingleData(id: string) {
    const index = this.userData.findIndex(item => item.toString() === id);
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
    tableItem = tableItem.filter(TableItems => matches(TableItems, searchTerm, this.pipe));

    const total = tableItem.length;

    // 3. paginate
    tableItem = tableItem.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ tableItem, total });
  }

}
