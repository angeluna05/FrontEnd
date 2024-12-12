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

interface Joven {
  id: number;
  nombre: string;
  apellido: string;

}

interface Logro {
  id: number;
  descripcion: string;
  anoLogro: number;
  fechaRegistro: Date;
  jovenid: Joven;
}

@Component({
  selector: 'app-logros',
  templateUrl: './logros.component.html',
  styleUrls: ['./logros.component.scss']
})
export class LogrosComponent implements OnInit {
  private apiUrl = 'https://backend-do1k.onrender.com/logros';
  private jovenApiUrl = 'https://backend-do1k.onrender.com/jovenes';
  private token = localStorage.getItem('authToken');
  errorMessages: any = {};
  public tableItem$: Observable<Logro[]>;
  public searchText: string;
  total$: Observable<number>;
  public validate = false;
  public tooltipValidation = false;
  public jovenes: Joven[] = [];
  public newLogro: Logro = {
    id: 0,
    descripcion: '',
    anoLogro: new Date().getFullYear(),
    fechaRegistro: new Date(),
    jovenid: null
  };
  public selectedLogro: Logro = { ...this.newLogro };

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
    this.getLogros();
    this.getJovenes();
    this.service.searchTerm = this.searchTerm;
  }

  getJovenes() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Joven[]>(this.jovenApiUrl, { headers }).subscribe(
      (data) => {
        this.jovenes = data;
      },
      (error) => {
        console.error('Error fetching jovenes:', error);
      }
    );
  }

  getLogros() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Logro[]>(this.apiUrl, { headers }).subscribe(
      (data) => {
        this.service.setUserData(data);
      },
      (error) => {
        console.error('Error fetching logros:', error);
      }
    );
  }

  public createLogro() {
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.post<Logro>(this.apiUrl, this.newLogro, { headers }).subscribe(
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

        this.getLogros();
        this.modalService.dismissAll();
      },
      (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessages = error.error;
          console.log(this.errorMessages = error.error);
          console.log(this.newLogro);
        } else {
          console.error('Error creating logro:', error);
        }
      }
    );
  }
  onJovenChange(selectedJoven: any) {
    // Lógica para manejar el cambio de selección
    this.selectedLogro.jovenid = selectedJoven;
  }
  public editLogro() {
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.put<Logro>(`${this.apiUrl}/${this.selectedLogro.id}`, this.selectedLogro, { headers }).subscribe(
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
        console.log(this.selectedLogro)
        this.getLogros();
        this.modalService.dismissAll();
      },
      (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessages = error.error;
        } else {
          console.error('Error editing logro:', error);
        }
      }
    );
  }

  deleteData(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: '¡No, cancélalo!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.token}`
        });
        this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe(
          () => {
            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
              'El logro ha sido eliminado.',
              'success'
            ),
              this.getLogros();
          },
          (error) => {
            console.error('Error deleting logro:', error);
          }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu logro está a salvo :)',
          'error'
        )
      }
    })
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
    this.newLogro = {
      id: 0,
      descripcion: '',
      anoLogro: new Date().getFullYear(),
      fechaRegistro: new Date(),
      jovenid: null
    };
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  Editar(content1, logro: Logro) {
    this.selectedLogro = { ...logro };
    this.modalService.open(content1, { backdropClass: 'light-blue-backdrop' });
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
