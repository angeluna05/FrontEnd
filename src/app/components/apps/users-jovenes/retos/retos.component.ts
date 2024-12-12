import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
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
  logo?: string;
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
interface Equipos {
  id?: number;
  nombre: string;
}

interface Equiposretos {
  id: number;
  equiposid: Equipos;
  retosid: Reto;
}
interface Jovenesequipos {
  id: number;
  jovenesid: Jovenes;
  equiposid: Equipos;
}
interface JovenesPorEquipo {
  id: number;
  equiposid: any; // Puedes reemplazar `any` con el tipo correcto si lo tienes.
  jovenesid: any[]; // Debe ser un array.
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
@Component({
  selector: 'app-retos',
  templateUrl: './retos.component.html',
  styleUrls: ['./retos.component.scss'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers

})
export class RetosComponent implements OnInit {
  private apiUrl = 'https://backend-do1k.onrender.com/retos';
  private token = localStorage.getItem('authToken');
  private joven = localStorage.getItem('correo');
  errorMessages: any = {};

  public tableItem$: Observable<Reto[]>;
  public searchText: string;
  total$: Observable<number>;
  public validate = false;
  public tooltipValidation = false;
  public empleados: Empleado[] = [];
  public encargados: Encargado[] = [];
  public empresas: Empresa[] = [];
  public retos: Reto[] = [];
  public equiposRetos: Equiposretos[] = [];
  public equipos: Equipos[] = [];
  public jovenesEquipos: Jovenesequipos[] = [];
  public jovenes: Jovenes[] = [];
  public retoId: number;
  public equiposAsociados: Equiposretos[] = [];
  public jovenesid?: number;
  public retosid?: number;
  equiposDelJoven: any[] = [];
  retosDelEquipo: any[] = [];
  public newEquipos: Equipos = {
    id: 0,
    nombre: ''
  };
  public jovenesporequitotal: JovenesPorEquipo = {
    id: 0,
    equiposid: null,
    jovenesid: [],
  };
  owlcarousel2Options = {
    loop: true,
    margin: 10,
    lazyLoad: true,
    items: 5,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      }
    }
  }

  constructor(
    private http: HttpClient,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.getRetos();
    this.getEmpresas();
    this.getEquiposretos();
    this.getEquipos();
    this.getJovenesequipos();
    this.getJovenes();
  }
  detalles: any;
  openVerticallyCentered(content, retoId) {
    this.equiposAsociados = this.equiposRetos.filter(equiposReto => equiposReto.retosid.id === retoId);
    this.retosid = retoId;
    this.modalService.open(content);
  }
  detallemodal(detalle, item) {
    this.detalles = item; // Almacena los detalles del reto seleccionado
    this.modalService.open(detalle); // Abre el modal
  }
  owlcarousel1 = [
    { id: 1, img: "assets/images/big-lightgallry/retos-carrusel1.jpg" },
    { id: 2, img: "assets/images/big-lightgallry/retos-carrusel3.jpg" },
    { id: 3, img: "assets/images/big-lightgallry/retos-carrusel3.jpg" },
    { id: 4, img: "assets/images/big-lightgallry/retos-carrusel1.jpg" },
    { id: 5, img: "assets/images/big-lightgallry/retos-carrusel2.jpg" },
    { id: 6, img: "assets/images/big-lightgallry/retos-carrusel3.jpg" },
    { id: 7, img: "assets/images/big-lightgallry/retos-carrusel1.jpg" },
    { id: 8, img: "assets/images/big-lightgallry/retos-carrusel2.jpg" },
    { id: 9, img: "assets/images/big-lightgallry/retos-carrusel3.jpg" },
    { id: 10, img: "assets/images/big-lightgallry/retos-carrusel1.jpg" }
  ];
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

  getRetos() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    this.retos = [];
    this.http.get<Reto[]>(this.apiUrl, { headers }).subscribe(
      (data) => {
        data.forEach(element => {
          // Asignamos el logo aleatorio solo si la celula está "En curso"
          if (element.estado === 'En curso' && element.tipo_acceso === 'Abierto') {
            const logos = [
              'assets/images/job-search/1.jpg',
              'assets/images/job-search/2.jpg',
              'assets/images/job-search/3.jpg',
              'assets/images/job-search/4.jpg',
              'assets/images/job-search/5.jpg',
              'assets/images/job-search/6.jpg'
            ];

            // Generamos un índice aleatorio
            const randomIndex = Math.floor(Math.random() * logos.length);

            // Asignamos el logo aleatorio
            element.logo = logos[randomIndex];

            // Añadimos la celula al array de celulas
            this.retos.push(element);
          }
        });
      },
      (error) => {
        console.error('Error fetching retos:', error);
      }
    );
  }

  getJovenesequipos() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Jovenesequipos[]>('https://backend-do1k.onrender.com/jovenesequipos', { headers }).subscribe(
      (data) => {
        this.jovenesEquipos = data;
        console.log(this.jovenesEquipos)
      },
      (error) => {
        console.error('Error fetching empresas:', error);
      }
    );
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
  getEquipos() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Equipos[]>('https://backend-do1k.onrender.com/equipos', { headers }).subscribe(
      (data) => {
        this.equipos = data;
      },
      (error) => {
      }
    );
  }
  getJovenes() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<Jovenes[]>('https://backend-do1k.onrender.com/jovenes', { headers }).subscribe(
      (data) => {
        const jovenEncontrado = data.find(joven => joven.correo === this.joven);

        if (jovenEncontrado) {
          this.jovenesid = jovenEncontrado.id;  // Guarda el ID en una variable de clase
          this.getEquiposDelJoven();

        } else {
        }
      },
      (error) => {
      }
    );
  }



  openCreateTeamModal(createTeamModal) {
    const modalRef = this.modalService.open(createTeamModal);
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getEquipos(); // Actualiza la lista de equipos después de crear uno nuevo
      }
    });
  }

  createTeam() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.post<Equipos>('https://backend-do1k.onrender.com/equipos', this.newEquipos, { headers }).subscribe(
      (data) => {
        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          showConfirmButton: false,
          timer: 1500
        });
        this.newEquipos = { nombre: '' }; // Limpiar el formulario
        this.modalService.dismissAll(); // Cerrar el modal
        this.getEquiposretos();
        this.getEquipos();
        this.getJovenesequipos();
        this.registerJovenInEquipo(data.id); // Registrar al joven en la tabla jovenesequipos
        this.registerEquiporeto(data.id); // Registrar al joven en la tabla jovenesequipos
      },
      (error) => {
      }
    );
  }
  confirmarIngreso(equiposid: number) {
    Swal.fire({
      title: '¿Deseas ingresar al equipo?',
      text: '¡Estás a un paso de inscribirte!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Sí, ingresar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llama a la función para registrar al joven en el equipo
        this.registerJovenInEquipo(equiposid);

        // Mostrar alerta de éxito
        Swal.fire({
          title: 'Registrado',
          text: '¡Te has registrado en el equipo exitosamente!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.modalService.dismissAll(); // Cerrar el modal
        this.getEquiposretos();
        this.getEquipos();
        this.getJovenesequipos();
      }
    });
  }


  registerJovenInEquipo(equiposid: number) {
    if (this.jovenesid === undefined) {
      return;
    }


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.post('https://backend-do1k.onrender.com/jovenesequipos', { jovenesid: this.jovenesid, equiposid }, { headers }).subscribe(
      () => {
        this.modalService.dismissAll(); // Cerrar el modal
        this.getEquiposretos();
        this.getEquipos();
        this.getJovenesequipos();
        this.getEquiposDelJoven(); // Actualiza la lista de equipos y retos después del registro
      },
      (error) => {
        this.modalService.dismissAll(); // Cerrar el modal
        Swal.fire('Error', 'Hubo un problema al inscribirte. Inténtalo de nuevo más tarde.', 'error');

      }
    );
  }

  registerEquiporeto(equiposid: number) {


    console.log(this.jovenesid);
    console.log(equiposid);
    const retosid = this.retosid;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.post('https://backend-do1k.onrender.com/equiposretos', { equiposid, retosid }, { headers }).subscribe(
      () => {
        this.modalService.dismissAll(); // Cerrar el modal
        this.getEquiposretos();
        this.getEquipos();
        this.getJovenesequipos();

      },
      (error) => {
      }
    );
  }
  getEquiposDelJoven() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<any[]>(`https://backend-do1k.onrender.com/jovenesequipos/joven/${this.jovenesid}`, { headers }).subscribe(
      (data) => {
        this.equiposDelJoven = data; // Extraer IDs de equipos
        console.log('IDs de equipos del joven:', this.equiposDelJoven);
        this.getRetosDelEquipo(); // Obtener retos asociados después de obtener los equipos
      },
      (error) => {
        console.error('Error obteniendo equipos del joven:', error);
      }
    );
  }

  // Obtener los retos asociados a los equipos del joven
  getRetosDelEquipo() {
    if (this.equiposDelJoven.length === 0) {
      console.log('No hay equipos para consultar retos.');
      return;
    }


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<any[]>(`https://backend-do1k.onrender.com/equiposretos`, { headers }).subscribe(
      (data) => {
        this.retosDelEquipo = data; // Extraer IDs de retos
        console.log('IDs de retos asociados a los equipos del joven:', this.retosDelEquipo);
        console.log('data: ', data);
      },
      (error) => {
        console.error('Error obteniendo retos del equipo:', error);
      }
    );
  }


  // Verificar si el joven está registrado en un reto
  // isJovenRegistradoEnReto(retoId: number): boolean {

  //   return this.retosDelEquipo.some(reto => this.equiposDelJoven.some(joven => joven.equiposid.id === reto.equiposid.id && reto.retosid.id === retoId));
  // }

// Método para verificar si el joven logueado está inscrito en una célula específica
isJovenRegistradoEnReto(retoId: number, inicioInscripcion: string, finInscripcion: string): boolean {
  // Obtenemos la fecha actual
  const fechaActual = new Date();
  const fechaInicioInscripcion = new Date(inicioInscripcion + 'T00:00:00');
  const fechaFinInscripcion = new Date(finInscripcion + 'T00:00:00');

  // Verificamos si el joven está inscrito
  const estaInscrito = this.retosDelEquipo.some(reto => this.equiposDelJoven.some(joven => joven.equiposid.id === reto.equiposid.id && reto.retosid.id === retoId));

  // Si el joven está inscrito, devolvemos true
  if (estaInscrito) {
    return true;
  }

  // Si el joven no está inscrito, verificamos las fechas de inscripción
  // Devolvemos false si la fecha de fin de inscripción ha pasado
  return fechaActual <= fechaFinInscripcion;
}

// Método para verificar si la inscripción ya finalizó
isInscripcionFinalizada(inicioInscripcion: string, finInscripcion: string): boolean {
  const fechaActual = new Date();
  const fechaFinInscripcion = new Date(finInscripcion + 'T23:59:59'); // Asumimos que la fecha de fin incluye el 16 de noviembre completo

  // Comparamos solo las fechas (sin horas) para asegurarnos de que el día de la fecha fin esté incluido
  return fechaActual >= fechaFinInscripcion;
}


  // Método para retirar al joven del reto
  retirarDelReto(retoId: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si la fecha de inscripción ya finalizó, no podrás inscribirte de nuevo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, retirar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.modalService.dismissAll(); // Cerrar el modal
        this.retirarJovenDeReto(retoId);

      }
    });
  }

  // Realiza la solicitud para retirar al joven del reto
  retirarJovenDeReto(retoId: number) {
    if (!this.jovenesEquipos) {
      console.error('ID del jovenesEquipos no encontrado');
      return;
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    const jovenesequiposdelete = this.equiposDelJoven.find(joven => this.retosDelEquipo.find(reto => joven.equiposid.id === reto.equiposid.id && reto.retosid.id === retoId));

    this.http.delete(`https://backend-do1k.onrender.com/jovenesequipos/${jovenesequiposdelete.id}`, { headers })
      .subscribe(
        () => {
          Swal.fire(
            'Retirado',
            'Te has retirado del reto con éxito.',
            'success'
          );
          this.modalService.dismissAll(); // Cerrar el modal
          this.getRetos();
          this.getEmpresas();
          this.getEquiposretos();
          this.getEquipos();
          this.getJovenesequipos();
          this.getJovenes();
          this.getEquiposDelJoven();
          // Actualiza la lista de retos después de retirar
          this.getRetosDelEquipo();
        },
        (error) => {

          console.error('Error al retirar al joven del reto:', error);
          Swal.fire(
            'Error',
            'Ocurrió un error al intentar retirar al joven del reto.',
            'error'
          );
          this.getRetos();
          this.getEmpresas();
          this.getEquiposretos();
          this.getEquipos();
          this.getJovenesequipos();
          this.getJovenes();
          this.getEquiposDelJoven();
          this.modalService.dismissAll(); // Cerrar el modal

        }

      );
  }
  public unretoporequipo;
  getEquiposretos1(item) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    this.unretoporequipo = {};

    this.http.get<Equiposretos>(`https://backend-do1k.onrender.com/equiposretos/equipos/${item}`, { headers }).subscribe(
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
      id: null,
      equiposid: null,
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
          } else if (element.equiposid.id !== item.equiposid.id && this.jovenesporequitotal.jovenesid.length === 0) {

            this.jovenesporequitotal = {
              id: null,
              equiposid: item.equiposid,
              jovenesid: []
            };
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
