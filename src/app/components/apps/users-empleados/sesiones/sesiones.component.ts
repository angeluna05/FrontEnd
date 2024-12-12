import { Component, ViewEncapsulation, QueryList, ViewChild, TemplateRef,  ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbModalConfig, NgbModal,NgbTimeStruct,NgbCalendar, NgbDate, NgbDateParserFormatter,NgbModalRef, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

export interface PermissionGroup {
  [key: string]: string;
}

export interface SelectedPermissions {
  [key: string]: boolean;
}

export interface Programarsesion {
  id?: number;
  titulo: string;
  fecha: string;
  horaInicio: string;  // Hora en formato string "HH:mm"
  horaFin: string;     // Hora en formato string "HH:mm"
  link?: string;
  lugar?: string;
  descripcion: string;
  tipo_acceso: string;
  estado: string;
}
interface Estado {
  id: number;
  nombre: string;
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
interface inscripcionSesiones{
  id: number;
  programarSesionid: Programarsesion;
  jovenesid: joven;
  estado: string;
}

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SesionesComponent implements OnInit, AfterViewInit {
  @ViewChild('content1') content1: any;
  @ViewChild('cambiarestado') cambiarestado: any;
  @ViewChild('daysContainer') daysContainer!: ElementRef;
  @ViewChild('date') dateElement!: ElementRef;
  @ViewChild('dateInput') dateInput!: ElementRef;
  @ViewChild('eventDay') eventDay!: ElementRef;
  @ViewChild('eventDate') eventDate!: ElementRef;
  @ViewChild('eventsContainer') eventsContainer!: ElementRef;
  @ViewChild('addEventWrapper') addEventWrapper!: ElementRef;
  @ViewChild('addEventTitle') addEventTitle!: ElementRef;
  @ViewChild('addEventFrom') addEventFrom!: ElementRef;
  @ViewChild('addEventTo') addEventTo!: ElementRef;
  @ViewChild('addEventDescription') addEventDescription!: ElementRef;
  @ViewChild('addEventAccess') addEventAccess!: ElementRef;
  @ViewChild(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @ViewChild('particiantes') partTemplate!: TemplateRef<any>;
  pageSize = 10; // Tamaño de página por defecto
  pageIndex = 0; // Página actual
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private apiUrl = 'https://backend-do1k.onrender.com/programarsesion';
  private token = localStorage.getItem('authToken');
  meridian = true;
  programaciones: Programarsesion[] = [];
  inscripcionsesiones: inscripcionSesiones[] = [];
  newProgramacion = {
    id: 0,
    titulo: '',
    fecha: { day:0, month:0, year:0 },
    horaInicio: { hour: 0, minute: 0 },  // Objeto de hora
    horaFin: { hour: 0, minute: 0 },     // Objeto de hora
    link: '',
    lugar: '',
    descripcion: '',
    tipo_acceso: '',
    estado: 'Activo',
  };
  selectedValue: boolean;
  permissionGroups: PermissionGroup = {

  };
  selectedPermissions: SelectedPermissions = {};

  today: Date = new Date();
  activeDay!: number;
  year: number = this.today.getFullYear();
  month: number = this.today.getMonth();
  
  months: string[] = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  eventsArr: any[] = [];
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  constructor(
    private http: HttpClient,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private calendar: NgbCalendar,
    private formatter: NgbDateParserFormatter) {
      this.fromDate = calendar.getToday();
      this.toDate = calendar.getNext(calendar.getToday(), "d", 10);    config.backdrop = 'static';
    config.keyboard = false;
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  ngOnInit() {
    this.getProgramaciones();
    Object.keys(this.permissionGroups).forEach(module => {
      this.selectedPermissions[module] = false;
      this.selectedPermissions[`${module}/crear`] = false;
      this.selectedPermissions[`${module}/actualizar`] = false;
      this.selectedPermissions[`${module}/eliminar`] = false;
    });
  }

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

  // Manejar selección individual de permisos
  handlePermissionChange(permission: string): void {
    this.selectedPermissions[permission] = !this.selectedPermissions[permission];
  }
  handleChange(nuevoEstado: string, inscripcionId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    
    this.http.put<inscripcionSesiones[]>(
      `https://backend-do1k.onrender.com/inscripcionsesiones/estado/${inscripcionId}`,
      nuevoEstado,
      { headers }
    ).subscribe({
      next: (data) => {
        console.log('Estado actualizado correctamente');
        // Aquí puedes agregar alguna notificación de éxito
      },
      error: (error) => {
        console.error('Error al actualizar el estado:', error);
        // Aquí puedes agregar alguna notificación de error
      }
    });
  }

  asistenciaedit(){
    Swal.fire(
      'Felicidades',
      'Cambios guardados con exito.',
      'success'
    );
    this.modalService.dismissAll();
  }
  // Obtener las claves de los módulos
  getModuleKeys(): string[] {
    return Object.keys(this.permissionGroups);
  }


  ngAfterViewInit() {
    // Se elimina la llamada a initCalendar() aquí, ya que se llamará después de obtener los datos
  }

  getProgramaciones() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    this.http.get<Programarsesion[]>(`${this.apiUrl}`, { headers }).subscribe(
      (data) => {
        this.programaciones = data;
        this.programaciones.forEach((programacion) => {
          this.getEstadoClase(programacion.estado);
        });
        this.processEvents();
        this.initCalendar();
      },
      (error) => {
        console.error('Error al obtener las programaciones:', error);
      }
    );
  }
  getInscricionseciones(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    
    this.http.get<inscripcionSesiones[]>(`https://backend-do1k.onrender.com/inscripcionsesiones/by-sesionesid/${id}`, { headers }).subscribe(
      (data) => {
        // Limpiar el array de inscripciones y el objeto de permissionGroups para evitar datos de sesiones anteriores
        this.inscripcionsesiones = data;

      },
      (error) => {
        console.error('Error al obtener las programaciones:', error);
      }
    );
  }
  
  processEvents() {
    this.eventsArr = this.programaciones.map(prog => ({
      day: new Date(prog.fecha).getDate() +1,
      month: new Date(prog.fecha).getMonth() + 1,
      year: new Date(prog.fecha).getFullYear(),
      events: [{
        id: prog.id,
        titulo: prog.titulo,
        fecha:prog.fecha,
        horaInicio: `${prog.horaInicio}`,
        horaFin: `${prog.horaFin}`,
        descripcion: prog.descripcion,
        lugar: prog.lugar,
        tipo_acceso: prog.tipo_acceso,
        estado: prog.estado
      }]
    }));
  }

  initCalendar() {
    const firstDay = new Date(this.year, this.month, 1);
    const lastDay = new Date(this.year, this.month + 1, 0);
    const prevLastDay = new Date(this.year, this.month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    this.dateElement.nativeElement.innerHTML = this.months[this.month] + " " + this.year;

    let days = "";

    for (let x = day; x > 0; x--) {
      days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
      let event = false;
      this.eventsArr.forEach((eventObj) => {
        if (
          eventObj.day === i &&
          eventObj.month === this.month + 1 &&
          eventObj.year === this.year
        ) {
          event = true;
        }
      });
      if (
        i === new Date().getDate() &&
        this.year === new Date().getFullYear() &&
        this.month === new Date().getMonth()
      ) {
        this.activeDay = i+1;
        this.getActiveDay(i);
        this.updateEvents(i);
        if (event) {
          days += `<div class="day today active event">${i}</div>`;
        } else {
          days += `<div class="day today active">${i}</div>`;
        }
      } else {
        if (event) {
          days += `<div class="day event">${i}</div>`;
        } else {
          days += `<div class="day ">${i}</div>`;
        }
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next-date">${j}</div>`;
    }
    this.daysContainer.nativeElement.innerHTML = days;
    this.addListener();
  }
  getEstadoClase(estado: string): string {
    switch (estado) {
      case 'activo':
        return 'estado-activo';
      case 'pendiente':
        return 'estado-pendiente';
      case 'cancelado':
        return 'estado-cancelado';
      default:
        return '';
    }
  }
  
  prevMonth() {
    this.month--;
    if (this.month < 0) {
      this.month = 11;
      this.year--;
    }
    this.initCalendar();
  }

  nextMonth() {
    this.month++;
    if (this.month > 11) {
      this.month = 0;
      this.year++;
    }
    this.initCalendar();
  }

  addListener() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
      day.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        this.getActiveDay(parseInt(target.innerHTML));
        this.updateEvents(Number(target.innerHTML));
        this.activeDay = Number(target.innerHTML);
        days.forEach((day) => {
          day.classList.remove("active");
        });
        if (target.classList.contains("prev-date")) {
          this.prevMonth();
          setTimeout(() => {
            const newDays = document.querySelectorAll(".day");
            newDays.forEach((day) => {
              if (
                !day.classList.contains("prev-date") &&
                day.innerHTML === target.innerHTML
              ) {
                day.classList.add("active");
              }
            });
          }, 100);
        } else if (target.classList.contains("next-date")) {
          this.nextMonth();
          setTimeout(() => {
            const newDays = document.querySelectorAll(".day");
            newDays.forEach((day) => {
              if (
                !day.classList.contains("next-date") &&
                day.innerHTML === target.innerHTML
              ) {
                day.classList.add("active");
              }
            });
          }, 100);
        } else {
          target.classList.add("active");
        }
      });
    });
  }

  gotoDate() {
    const dateArr = this.dateInput.nativeElement.value.split("/");
    if (dateArr.length === 2) {
      if (parseInt(dateArr[0]) > 0 && parseInt(dateArr[0]) < 13 && dateArr[1].length === 4) {
        this.month = parseInt(dateArr[0]) - 1;
        this.year = parseInt(dateArr[1]);
        this.initCalendar();
        return;
      }
    }
    alert("Dato incorrecto");
  }
  goToToday() {
    this.today = new Date();
    this.month = this.today.getMonth();
    this.year = this.today.getFullYear();
    this.initCalendar();
  }
  getActiveDay(date: number) {
    const day = new Date(this.year, this.month, date);
    const dayName = day.toLocaleString('es', { weekday: 'long' });
    this.eventDay.nativeElement.innerHTML = dayName;
    this.eventDate.nativeElement.innerHTML = '';
  }

  updateEvents(date: number) {
    let eventsHTML = "";
    
    this.eventsArr.forEach((event, eventIndex) => {
      if (
        date === event.day &&
        this.month + 1 === event.month &&
        this.year === event.year
      ) {
        event.events.forEach((evt: any, index: number) => {
          eventsHTML += `
          <div class="event" data-event-index="${eventIndex}" data-event-subindex="${index}" style="position: relative;">
          <div class="title">
            <i class="fa fa-circle"></i>
            <h3 class="event-title">${evt.titulo}</h3>
          </div>
          <div class="event-time">
            <span class="event-time">${evt.horaInicio} - ${evt.horaFin}</span>
          </div>
          <!-- Icono para cambiar el estado al final -->
        </div>`
      });
      
      }
    });
    
    if (eventsHTML === "") {
      eventsHTML = `<div class="no-event">
              <h3>No hay eventos</h3>
          </div>`;
    }
  
    this.eventsContainer.nativeElement.innerHTML = eventsHTML;


    this.addEventListeners();
  }


  addEventListeners() {
    const eventElements = this.eventsContainer.nativeElement.querySelectorAll('.event');
    eventElements.forEach((element: HTMLElement) => {
      element.addEventListener('click', (e: Event) => {
        const eventIndex = parseInt(element.getAttribute('data-event-index'), 10);
        const subIndex = parseInt(element.getAttribute('data-event-subindex'), 10);
        const event = this.eventsArr[eventIndex].events[subIndex];
        this.verEvento(event,this.cambiarestado);

      });
    });
  }

  public selectedSesion1;
  estadoEvento(sesion: any, cambiarestado) {
    this.selectedSesion = { ...sesion };
  
    this.modalService.open(cambiarestado, { backdropClass: 'light-blue-backdrop' });

  }
  public selectedSesion;
  verEvento(sesion: any, content1) {
    this.selectedSesion = { ...sesion };

  this.getInscricionseciones(this.selectedSesion.id);
  Swal.fire({
    title: 'Asistencia',
    text: "¿Quieres subir los asistentes a esta sesión?",
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Asistencia',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Cambiar el estado de la joven
      this.modalService.open(this.partTemplate, { backdropClass: 'light-blue-backdrop' });
    }
  });
    
  }
  

editarEvento(){

  // const horaInicio = `${this.padNumber(this.selectedSesion.horaInicio.hour)}:${this.padNumber(this.selectedSesion.horaInicio.minute)}`;
  const horaInicio = this.formatTime(this.selectedSesion.horaInicio);
  const horaFin = this.formatTime(this.selectedSesion.horaFin);
  // const horaFin = `${this.padNumber(this.selectedSesion.horaFin.hour)}:${this.padNumber(this.selectedSesion.horaFin.minute)}`;
  const fecha = this.formatDate(this.selectedSesion.fecha);

    const programacionToSave: Programarsesion = {
    ...this.selectedSesion,
    fecha,
    horaInicio, // Ahora es una cadena "HH:mm:ss"
    horaFin    // Ahora es una cadena "HH:mm:ss"
  };
  // Petición PUT para actualizar el evento
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  });
  this.http.put(`${this.apiUrl}/${this.selectedSesion.id}`, programacionToSave, { headers }).subscribe(
    (response) => {
      console.log('Evento actualizado:', response);
      this.modalService.dismissAll();
      this.getProgramaciones(); // Actualizar lista de eventos
      Swal.fire("Cambios Guardados", "", "success");
    },
    (error) => {
      console.error('Error:', error);
    }
  )
}

  addEvent() {
this.newProgramacion;
    this.addEventWrapper.nativeElement.classList.toggle("active");
  }

  newProgramacioes = {
    horaInicio: { hour: 0, minute: 0, second: 0 },
    horaFin: { hour: 0, minute: 0, second: 0 },
    fecha: { day:0, month:0, year:0 }
  }; 
   // Convierte el objeto de tiempo a una cadena de formato HH:mm:ss
// Función para convertir hora a formato HH:mm:ss
formatTime(time: { hour: number, minute: number }): string {
  const hours = this.padNumber(time.hour);
  const minutes = this.padNumber(time.minute);
  return `${hours}:${minutes}`; // Añade segundos si los necesitas
}

// Función para convertir fecha a formato YYYY-MM-DD
formatDate(date: { day: number, month: number, year: number }): string {
  const day = this.padNumber(date.day);
  const month = this.padNumber(date.month);
  return `${date.year}-${month}-${day}`;
}

// Función auxiliar para añadir ceros a la izquierda si el número es menor de 10
padNumber(value: number): string {
  return value < 10 ? '0' + value : value.toString();
}

  addEventSubmit() {
    const horaInicio = this.formatTime(this.newProgramacion.horaInicio);
    const horaFin = this.formatTime(this.newProgramacion.horaFin);
    const fecha = this.formatDate(this.newProgramacion.fecha);
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    const programacionToSave: Programarsesion = {
      ...this.newProgramacion,
      horaInicio, // Ahora es una cadena "HH:mm:ss"
      horaFin,    // Ahora es una cadena "HH:mm:ss"
      fecha //Ahora es una cadena "YYYY-MM-DD"
    };
  
console.log(programacionToSave);

    this.http.post<Programarsesion>(this.apiUrl, programacionToSave, { headers }).subscribe(
      (response) => {
        console.log('Programación añadida:', response);
        this.getProgramaciones(); // Actualizar la lista de programaciones
        this.addEventWrapper.nativeElement.classList.remove("active");
        this.addEventTitle.nativeElement.value = "";
        this.addEventFrom.nativeElement.value = "";
        this.addEventTo.nativeElement.value = "";
      },
      (error) => {
        console.error('Error al añadir la programación:', error);
      }
    );
  }

  convertTime(time: string): string {
    let timeArr = time.split(":");
    let timeHour = parseInt(timeArr[0]);
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
  }
}