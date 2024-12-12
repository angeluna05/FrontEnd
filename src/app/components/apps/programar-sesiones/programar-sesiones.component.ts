import { Component, ViewEncapsulation, QueryList, ViewChild, TemplateRef, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbModalConfig, NgbModal, NgbTimeStruct, NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModalRef, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UntypedFormControl } from '@angular/forms';

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
interface inscripcionSesiones {
  id: number;
  programarSesionid: Programarsesion;
  jovenesid: joven;
  estado: string;
}

@Component({
  selector: 'app-programar-sesiones',
  templateUrl: './programar-sesiones.component.html',
  styleUrls: ['./programar-sesiones.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProgramarSesionesComponent implements OnInit, AfterViewInit {
  @ViewChild('content1') content1: any;
  @ViewChild('cambiarestado') cambiarestado: any;
  @ViewChild('daysContainer') daysContainer!: ElementRef;
  @ViewChild('date') dateElement!: ElementRef;
  @ViewChild('dateInput') dateInput!: ElementRef;
  @ViewChild('eventDay') eventDay!: ElementRef;
  @ViewChild('eventsContainer') eventsContainer!: ElementRef;
  @ViewChild('addEventWrapper') addEventWrapper!: ElementRef;
  @ViewChild('addEventTitle') addEventTitle!: ElementRef;
  @ViewChild('addEventFrom') addEventFrom!: ElementRef;
  @ViewChild('addEventTo') addEventTo!: ElementRef;
  @ViewChild('addEventDescription') addEventDescription!: ElementRef;
  @ViewChild('addEventAccess') addEventAccess!: ElementRef;
  @ViewChild(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @ViewChild('particiantes') partTemplate!: TemplateRef<any>;
  @ViewChild('detalle') detalle!: TemplateRef<any>;
  pageSize = 10; // Tamaño de página por defecto
  pageIndex = 0; // Página actual
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  time = { hour: 12, minute: 12 }
  private apiUrl = 'https://backend-do1k.onrender.com/programarsesion';
  private token = localStorage.getItem('authToken');
  meridian = true;
  errorMessages: any = {};

  public validate = false;
  public tooltipValidation = false;
  programaciones: Programarsesion[] = [];
  inscripcionsesiones: inscripcionSesiones[] = [];
  newProgramacion = {
    id: 0,
    titulo: '',
    fecha: { day: 0, month: 0, year: 0 },
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
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10); config.backdrop = 'static';
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
        this.validate = false;
        this.tooltipValidation = false;
        this.errorMessages = '';
        console.log('Estado actualizado correctamente');
        // Aquí puedes agregar alguna notificación de éxito
      },
      error: (error) => {
        console.error('Error al actualizar el estado:', error);
        // Aquí puedes agregar alguna notificación de error
      }
    });
  }

  asistenciaedit() {
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
      day: new Date(prog.fecha).getDate() + 1,
      month: new Date(prog.fecha).getMonth() + 1,
      year: new Date(prog.fecha).getFullYear(),
      events: [{
        id: prog.id,
        titulo: prog.titulo,
        fecha: prog.fecha,
        horaInicio: `${prog.horaInicio}`,
        horaFin: `${prog.horaFin}`,
        descripcion: prog.descripcion,
        lugar: prog.lugar,
        link: prog.link,
        tipo_acceso: prog.tipo_acceso,
        estado: prog.estado
      }]
    }));
  }
  private estadosesion;
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
          this.estadosesion = eventObj.events[0].estado
          event = true;
        }
      });
      if (
        i === new Date().getDate() &&
        this.year === new Date().getFullYear() &&
        this.month === new Date().getMonth()
      ) {
        this.activeDay = i + 1;
        this.getActiveDay(i);
        this.updateEvents(i);
        if (event) {
          days += `<div class="day today active event ${this.estadosesion}" style>${i}</div>`;
        } else {
          days += `<div class="day today active">${i}</div>`;
        }
      } else {
        if (event) {
          days += `<div class="day event ${this.estadosesion}">${i}</div>`;
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

  Crear(content) {
    this.newProgramacion = {
      id: 0,
      titulo: '',
      fecha: { day: 0, month: 0, year: 0 },
      horaInicio: { hour: 12, minute: 0 },  // Objeto de hora
      horaFin: { hour: 12, minute: 0 },     // Objeto de hora
      link: 'No aplica',
      lugar: 'No aplica',
      descripcion: '',
      tipo_acceso: '',
      estado: 'Activo',
    };

    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }


  addEventListeners() {
    const eventElements = this.eventsContainer.nativeElement.querySelectorAll('.event');
    eventElements.forEach((element: HTMLElement) => {
      element.addEventListener('click', (e: Event) => {
        const eventIndex = parseInt(element.getAttribute('data-event-index'), 10);
        const subIndex = parseInt(element.getAttribute('data-event-subindex'), 10);
        const event = this.eventsArr[eventIndex].events[subIndex];
        this.verEvento(event, this.cambiarestado);

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
    this.modalService.dismissAll();

    Swal.fire({
      title: 'Elige una opción',
      text: 'Selecciona uno de los siguientes botones:',
      icon: 'info',
      showConfirmButton: false,
      showCancelButton: false,
      footer: `
        <div class="swal2-footer-buttons">
          <button id="option4" class="swal2-confirm swal2-styled">Ver detalle</button>
          <button id="option1" class="swal2-confirm swal2-styled">Editar</button>
          <button id="option2" class="swal2-confirm swal2-styled">Asistencia</button>
          <button id="option3" class="swal2-confirm swal2-styled">Cambiar estado</button>
        </div>
      `
    });
    this.modalService.dismissAll();
    setTimeout(() => {
      // Agregar eventos para los botones
      document.getElementById('option1')?.addEventListener('click', () => {
        Swal.close();
        this.selectedSesion = { ...sesion };

        try {
          // Convertir y estructurar la fecha
          if (this.selectedSesion.fecha) {
            const [year, month, day] = this.selectedSesion.fecha.split('-').map(Number);
            this.selectedSesion.fecha = {
              year,
              month, 
              day
            };
          }
        
          // Convertir y estructurar horaInicio
          if (this.selectedSesion.horaInicio) {
            const [inicioHour, inicioMinute] = this.selectedSesion.horaInicio.split(':').map(Number);
            this.selectedSesion.horaInicio = {
              hour: inicioHour,
              minute: inicioMinute
            };
          }
        
          // Convertir y estructurar horaFin
          if (this.selectedSesion.horaFin) {
            const [finHour, finMinute] = this.selectedSesion.horaFin.split(':').map(Number);
            this.selectedSesion.horaFin = {
              hour: finHour,
              minute: finMinute
            };
          }
        
          // Abrir el modal
          this.modalService.open(content1, { backdropClass: 'light-blue-backdrop' });
        } catch (error) {
          console.error('Error al formatear la sesión:', error);
        }
      });

    }, 0);

    document.getElementById('option2')?.addEventListener('click', () => {
      Swal.close();
      this.modalService.open(this.partTemplate, { backdropClass: 'light-blue-backdrop' });

    });

    document.getElementById('option3')?.addEventListener('click', () => {
      this.getProgramaciones();

      // Opciones de estado disponibles
      const opciones = {
        Activo: 'Activo',
        Pospuesto: 'Pospuesto',
        Finalizado: 'Finalizado'
      };

      // Muestra el SweetAlert con selector
      Swal.fire({
        title: '¿Estás seguro?',
        html: `
          <p>Selecciona el nuevo estado para la sesión:</p>
          <select class="form-select" id="estadoSesion" name="departamento" [(ngModel)]="selectedSesion.estado">

          <option selected disabled>Escoge una opción</option>
          <option value="Activo">Activo</option>
          <option value="Pospuesto">Pospuesto</option>
          <option value="Finalizado">Finalizado</option>

          </select>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false,
        backdrop: false
      }).then((result) => {
        if (result.isConfirmed) {
          // Aseguramos que el elemento es un HTMLSelectElement
          const selectElement = <HTMLSelectElement>document.getElementById('estadoSesion');
          const nuevoEstado = selectElement.value; // Ahora 'value' está disponible
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          });

          // Enviar solicitud para actualizar el estado
          this.http.put<Programarsesion[]>(`${this.apiUrl}/${this.selectedSesion.id}/estado`, nuevoEstado, { headers })
            .subscribe(
              (data) => {
                this.validate = false;
                this.tooltipValidation = false;
                this.errorMessages = '';
                Swal.fire(
                  '¡Estado actualizado!',
                  `El estado de la sesión ahora es ${nuevoEstado}.`,
                  'success'
                );
                this.getProgramaciones();
              },
              (error) => {
                Swal.fire(
                  'Error',
                  'Hubo un problema al actualizar el estado. Por favor, intenta nuevamente.',
                  'error'
                );
                this.getProgramaciones();
              }
            );
        }
      });

    });
    document.getElementById('option4')?.addEventListener('click', () => {
      Swal.close();
      this.selectedSesion = { ...sesion };

        this.modalService.open(this.detalle, { backdropClass: 'light-blue-backdrop' });

    });
  }
  padNumber1(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }
  padNumber2(num: number): number {
    return num < 10 ? Number(`0${num}`) : num;
  }

  // Función que se ejecuta cuando el modelo cambia
  onDateChange(event: any): void {
    const { year, month, day } = event;
    this.selectedSesion.fecha = `${year}-${this.padNumber1(month)}-${this.padNumber1(day)}`;
    console.log('Fecha formateada:', this.selectedSesion.fecha);
  }
  // Función para formatear la fecha a formato 'yyyy-mm-dd'
  formatFechaObject(event: any): { year: number; month: number; day: number } {
    const year = event?.year ?? new Date().getFullYear();
    const month = event?.month ?? new Date().getMonth() + 1;
    const day = event?.day ?? new Date().getDate();

    return {
      year,
      month,
      day,
    };
  }

  // Formateamos la fecha para mostrarla en formato 'yyyy-mm-dd'
  formatFecha(event: any): void {
    // Solo formatea la fecha para mostrarla sin modificar `selectedSesion.fecha` directamente
    const { year, month, day } = this.formatFechaObject(event);
    // Guardamos el valor formateado de la fecha en una propiedad separada, no en `selectedSesion.fecha`
    this.selectedSesion.fechaFormateada = `${year}-${this.padNumber1(month)}-${this.padNumber1(day)}`;
  }



  // Función para convertir a formato de 12 horas (AM/PM)
  format12Hour(hour: number, minute: number): string {
    // Si la hora es 0 (medianoche) o 24 (final del día), se muestra como 12 AM
    if (hour === 0 || hour === 24) {
      return `12:${this.padNumber1(minute)} AM`;
    }

    // Si la hora es 12 (mediodía), se muestra como 12 PM
    if (hour === 12) {
      return `12:${this.padNumber1(minute)} PM`;
    }

    // Convertir al formato de 12 horas
    const period = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${this.padNumber1(adjustedHour)}:${this.padNumber1(minute)} ${period}`;
  }


  formatTimeObject(hour: number | undefined, minute: number | undefined): { hour: number; minute: number; second: number } {
    const hora = this.padNumber1(hour)
    const minuto = this.padNumber1(minute)
    return {
      hour: Number(hora) ?? 0,
      minute: Number(minuto) ?? 0,
      second: 0, // Siempre asignamos 0 a los segundos
    };
  }
  formatHoraInicio(event: any): void {
    const hour = event?.hour ?? 0;
    const minute = event?.minute ?? 0;
    this.selectedSesion.horaInicio = this.formatTimeObject(hour, minute);
  }

  // Función para formatear hora de fin
  formatHoraFin(event: any): void {
    const hour = event?.hour ?? 0;
    const minute = event?.minute ?? 0;
    this.selectedSesion.horaFin = this.formatTimeObject(hour, minute);
  }
  convert12HourTo24Hour(time: string): string {
    const [hour, minuteWithPeriod] = time.split(':');
    const [minute, period] = minuteWithPeriod.split(' ');

    let hour24 = parseInt(hour);
    if (period === 'AM' && hour24 === 12) {
      hour24 = 0; // 12 AM es igual a 00:00 en formato de 24 horas
    } else if (period === 'PM' && hour24 !== 12) {
      hour24 += 12; // Convertimos la hora PM (excepto las 12 PM) a formato de 24 horas
    }

    const formattedHour = this.padNumber1(hour24); // Formateamos la hora para asegurar que tenga dos dígitos
    const formattedMinute = this.padNumber1(parseInt(minute)); // Formateamos los minutos para asegurar que tengan dos dígitos

    return `${formattedHour}:${formattedMinute}`;
  }

  editarEvento() {
    // Verificar si la horaInicio ha sido modificada y convertirla a 24 horas
    let horaInicio = this.selectedSesion.horaInicio;
    if (typeof this.selectedSesion.horaInicio === 'string') {
      // Convertimos la hora de 12 horas a 24 horas
      horaInicio = this.convert12HourTo24Hour(this.selectedSesion.horaInicio);
    } else {
      horaInicio = `${this.padNumber1(this.selectedSesion.horaInicio.hour)}:${this.padNumber1(this.selectedSesion.horaInicio.minute)}`;
    }

    // Verificar si la horaFin ha sido modificada y convertirla a 24 horas
    let horaFin = this.selectedSesion.horaFin;
    if (typeof this.selectedSesion.horaFin === 'string') {
      // Convertimos la hora de 12 horas a 24 horas
      horaFin = this.convert12HourTo24Hour(this.selectedSesion.horaFin);
    } else {
      horaFin = `${this.padNumber1(this.selectedSesion.horaFin.hour)}:${this.padNumber1(this.selectedSesion.horaFin.minute)}`;
    }

    // Verificar si la fecha ha sido modificada y formatearla
    let fecha = this.selectedSesion.fecha;
    if (typeof this.selectedSesion.fecha !== 'string') {
      // Si la fecha es una cadena, significa que fue modificada, entonces la formateamos
      fecha = this.formatDate(this.selectedSesion.fecha);
    }

    // Crear el objeto para guardar
    const programacionToSave: Programarsesion = {
      ...this.selectedSesion,
      fecha,    // La fecha formateada
      horaInicio, // La hora de inicio en formato 24 horas
      horaFin     // La hora de fin en formato 24 horas
    };

    // Petición PUT para actualizar el evento
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.put<Programarsesion[]>(`${this.apiUrl}/${this.selectedSesion.id}`, programacionToSave, { headers }).subscribe(
      (response) => {
        this.validate = false;
        this.tooltipValidation = false;
        this.errorMessages = '';
        console.log('Evento actualizado:', response);
        this.modalService.dismissAll();
        this.getProgramaciones(); // Actualizar lista de eventos
        Swal.fire("Cambios Guardados", "", "success");
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  addEvent() {
    this.newProgramacion;
    this.addEventWrapper.nativeElement.classList.toggle("active");
  }

  newProgramacioes = {
    horaInicio: { hour: 0, minute: 0, second: 0 },
    horaFin: { hour: 0, minute: 0, second: 0 },
    fecha: { day: 0, month: 0, year: 0 }
  };
  // Convierte el objeto de tiempo a una cadena de formato HH:mm:ss
  // Función para convertir hora a formato HH:mm:ss
  formatTime(time: { hour: number, minute: number }): string {
    const hours = this.padNumber(time.hour);
    const minutes = this.padNumber(time.minute);
    return `${hours}:${minutes}`; // Añade segundos si los necesitas
  }

  // Función auxiliar para convertir Date a { day, month, year }
  convertDateToObject(date: Date): { day: number; month: number; year: number } {
    return {
      day: date.getDate(),
      month: date.getMonth() + 1, // Los meses en Date van de 0 a 11
      year: date.getFullYear()
    };
  }

  // Método formatDate
  formatDate(date: { day: number; month: number; year: number }): string {
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
    const fechaActual = this.formatDate(this.convertDateToObject(new Date()));
    const fecha = this.formatDate(this.newProgramacion.fecha);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    // Validaciones
    if (horaInicio >= horaFin) {
      this.errorMessages = 'La hora de inicio no puede ser igual o posterior a la hora de fin.';
      Swal.fire({
        icon: 'error',
        title: 'Error de Horario',
        text: this.errorMessages,
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if (horaFin <= horaInicio) {
      this.errorMessages = 'La hora de fin no puede ser igual o anterior a la hora de inicio.';
      Swal.fire({
        icon: 'error',
        title: 'Error de Horario',
        text: this.errorMessages,
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if (fecha < fechaActual) {
      this.errorMessages = 'La fecha de la sesión no puede ser anterior a la fecha actual.';
      Swal.fire({
        icon: 'error',
        title: 'Error de Fecha',
        text: this.errorMessages,
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    // Construir el objeto para enviar
    const programacionToSave: Programarsesion = {
      ...this.newProgramacion,
      horaInicio,
      horaFin,
      fecha
    };

    console.log(programacionToSave);
    this.validate = !this.validate;
    this.tooltipValidation = !this.tooltipValidation;

    // Enviar la solicitud HTTP
    this.http.post<Programarsesion>(this.apiUrl, programacionToSave, { headers }).subscribe(
      (response) => {
        this.validate = false;
        this.tooltipValidation = false;
        this.errorMessages = '';
        console.log('Programación añadida:', response);
        this.getProgramaciones(); // Actualizar la lista de programaciones
        this.addEventWrapper.nativeElement.classList.remove("active");
        Swal.fire(
          'Felicidades',
          'Sesión creada con éxito.',
          'success'
        );
        this.modalService.dismissAll();
      },
      (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessages = error.error; // Captura los mensajes de error de validación
        } else {
          console.error('Error al crear la programación:', error);
        }
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