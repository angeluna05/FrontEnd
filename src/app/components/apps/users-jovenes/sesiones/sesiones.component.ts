import { Component, ViewEncapsulation, QueryList, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbModalConfig, NgbModal, NgbTimeStruct, NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

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
export interface inscripcionsesiones {
  id?: number;
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

  private apiUrl = 'https://backend-do1k.onrender.com/programarsesion';
  private apiUrl1 = 'https://backend-do1k.onrender.com/inscripcionsesiones';
  private token = localStorage.getItem('authToken');
  private joven = localStorage.getItem('correo');
  meridian = true;
  jovenes: joven = {
    id: 0,
    documento: 0,
    nombre: '',
    apellido: '',
    fechaNacimiento: new Date(),
    numeroContacto: '',
    correo: '',
    tipo_institucion: '',
    institucion: '',
    habilidades: '',
    caracteristicas: '',
    descripcion: '',
    tipoDocumentoid: { id: 0, siglas: '', descripcion: '' },
    estadoid: { id: 0, nombre: '' }
  };
  programaciones: Programarsesion[] = [];
  inscripcionsesiones: inscripcionsesiones[] = [];
  private idinscripcionsesiones = 0;
  newProgramacion = {
    id: 0,
    programarSesionid: {
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
    },
    jovenesid: {
      id: 0, // Puede ser 0 o null si se generará automáticamente
      documento: 0,
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
    },
    estado: 'Inscrito'

  };


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
    this.getJovenes();
    this.processEvents();
    this.initCalendar();
  }

  ngAfterViewInit() {
    // Se elimina la llamada a initCalendar() aquí, ya que se llamará después de obtener los datos
  }

  getProgramaciones() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    this.programaciones = [];
    this.http.get<Programarsesion[]>(`${this.apiUrl}`, { headers }).subscribe(
      (data) => {
        data.forEach(element => {
          // Asignamos el logo aleatorio solo si la celula está "En curso"
          if (element.tipo_acceso === 'Abierta') {
            this.programaciones.push(element);
            this.processEvents();
            this.initCalendar();
          }
        });

      },
      (error) => {
        console.error('Error al obtener las programaciones:', error);
      }
    );
  }
  private activeIndicatorClass;
  isInscrito: boolean = false;
  getinscripcionProgramaciones(programarSesionid: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<inscripcionsesiones[]>(`${this.apiUrl1}`, { headers }).subscribe(
      (data: inscripcionsesiones[]) => {
        // Filtrar los datos para encontrar la inscripción específica
        const inscripcion = data.find(
          inscripcion => inscripcion.programarSesionid.id === programarSesionid.id && inscripcion.jovenesid.id === this.jovenes.id
        );

        // En tu componente TypeScript
        if (inscripcion) {
          this.idinscripcionsesiones = inscripcion.id;
          this.isInscrito = true;
          // this.updateActiveAfterStyle();
        } else {
          this.isInscrito = false;
          // this.resetActiveAfterStyle();
        }
      },
      (error) => {
        console.error('Error al obtener las programaciones:', error);
      }
    );
  }
  private updateActiveAfterStyle() {
    const activeElements = document.querySelectorAll('.event');
    activeElements.forEach((element) => {
      element.classList.add('inscrito'); // Agregar clase
    });
  }

  private resetActiveAfterStyle() {
    const activeElements = document.querySelectorAll('.event');
    activeElements.forEach((element) => {
      element.classList.remove('inscrito'); // Quitar clase
    });
  }



  retirar() {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    this.http.delete(`${this.apiUrl1}/${this.idinscripcionsesiones}`, { headers }).subscribe(
      (response) => {
        console.log('Retirado:', response);
        this.modalService.dismissAll();
        this.getProgramaciones(); // Actualizar lista de eventos
        this.processEvents();
        this.initCalendar();
        Swal.fire("Te retiraste correctamente", "", "success");
      },
      (error) => {
        console.error('Error:', error);
      }
    )
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
  private estadoinscrito;
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
    this.eventDate.nativeElement.innerHTML = "";
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

    // Add click event listeners to the newly created event elements
    this.addEventListeners();
  }


  addEventListeners() {
    const eventElements = this.eventsContainer.nativeElement.querySelectorAll('.event');
    eventElements.forEach((element: HTMLElement) => {
      element.addEventListener('click', (e: Event) => {
        const eventIndex = parseInt(element.getAttribute('data-event-index'), 10);
        const subIndex = parseInt(element.getAttribute('data-event-subindex'), 10);
        const event = this.eventsArr[eventIndex].events[subIndex];
        this.verEvento(event, this.cambiarestado);
        this.getinscripcionProgramaciones(event);

      });
    });
  }


  public selectedSesion;
  verEvento(sesion: any, cambiarestado) {
    this.selectedSesion = { ...sesion };

      
        // Función para formatear números con ceros a la izquierda
        const padNumber = (num: number) => (num < 10 ? `0${num}` : num.toString());
      
        // Función para convertir a formato de 12 horas
        const format12Hour = (hour: number, minute: number) => {
          const period = hour >= 12 ? 'PM' : 'AM';
          const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
          return `${padNumber(adjustedHour)}:${padNumber(minute)} ${period}`;
        };
      
        // Convertir horaInicio (String) a formato 12 horas
        const [inicioHour, inicioMinute] = this.selectedSesion.horaInicio.split(':').map(Number);
        this.selectedSesion.horaInicio = format12Hour(inicioHour, inicioMinute);
      
        // Convertir horaFin (String) a formato 12 horas
        const [finHour, finMinute] = this.selectedSesion.horaFin.split(':').map(Number);
        this.selectedSesion.horaFin = format12Hour(finHour, finMinute);
      
        // Formatear la fecha y agregar ceros si es necesario
        const [year, month, day] = this.selectedSesion.fecha.split('-').map(Number);
        this.selectedSesion.fecha = `${year}-${padNumber(month)}-${padNumber(day)}`;
      

    // Abrir el modal
    this.modalService.open(cambiarestado, { backdropClass: 'light-blue-backdrop' });
  }


  editarEvento() {
    console.log(this.selectedSesion)


    const programacionToSave: Programarsesion = {
      ...this.selectedSesion    // Ahora es una cadena "HH:mm:ss"
    };
    // Petición PUT para actualizar el evento
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    console.log(programacionToSave)
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

  getJovenes() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<joven[]>('https://backend-do1k.onrender.com/jovenes', { headers }).subscribe(
      (data) => {

        const jovenEncontrado = data.find(joven => joven.correo === this.joven);
        if (jovenEncontrado) {
          this.jovenes = jovenEncontrado; // Asigna directamente el joven
        } else {
        }
      },
      (error) => {
      }
    );
  }
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
  addEventSubmit(selectedSesion: any) {
    // Formatear la hora y la fecha
    // const horaInicio = this.formatTime(this.selectedSesion.horaInicio);
    // const horaFin = this.formatTime(this.selectedSesion.horaFin);
    // const fecha = this.formatDate(this.selectedSesion.fecha);

    // Clonar la sesión seleccionada
    this.selectedSesion = { ...selectedSesion };

    // Crear el objeto programarSesionid
    const programarSesionid = {
      id: selectedSesion.id
    };

    // Crear el objeto jovenesid
    const jovenesid = {
      id: this.jovenes.id // Suponiendo que tienes this.jovenes con el id del joven
    };

    // Definir los encabezados
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    // Crear el objeto para enviar
    const programacionToSave = [{
      programarSesionid,
      jovenesid,
      estado: 'Inscrito' // Aquí puedes ajustar el estado si es necesario
    }];

    // Realizar la solicitud POST
    this.http.post<inscripcionsesiones>(this.apiUrl1, programacionToSave, { headers }).subscribe(
      (response) => {
        console.log('Programación añadida:', response);
        this.getProgramaciones(); // Actualizar la lista de programaciones
        this.modalService.dismissAll();
        Swal.fire("Participación exitosa", "Dirigete a tu agenda para ver mas opciones", "success");

      },
      (error) => {
        console.error('Error al añadir la programación:', JSON.stringify(programacionToSave));
        console.error('Error details:', error); // Muestra los detalles del error para depuración
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