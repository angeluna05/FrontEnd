import { ApexAnnotations, ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexNonAxisChartSeries, ApexOptions, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexXAxis, ApexYAxis } from "ng-apexcharts";

interface Celula {
  id: number;
  nombre: string;
  objetivo: string;
  fechaInicio: Date;
  fechaFin: Date;
  maximoPersonas: number;
  tipo_acceso: string;
  estado: string;
  inicioInscripcion: Date;
  finInscripcion: Date;
  empleadoid: Empleado;
  encargadoid: Encargado;
  empresaid: Empresa;
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

interface Empleado {
  id: number;
  nombre: string;
  apellido: string;

}

interface Encargado {
  id: number;
  nombre: string;
  apellido: string;
}

interface Empresa {
  id: number;
  nombre: string;
}
interface inscripcionCelulas {
  id: number;
  celulasId: Celula;
  jovenid: Jovenes;
  estado: String;
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

interface Jovenes {
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
interface Equipos {
  id: number;
  nombre: string;
}

interface Jovenesequipos {
  id: number;
  jovenesid: Jovenes;
  equiposid: Equipos;
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

export interface InscripcionSesiones {
  id?: number;
  programarSesionid: Programarsesion;
  jovenesid: Jovenes;
  estado: string;

}

let trigoStrength = 3;
let primary_color = localStorage.getItem("primary_color") || "#7366ff";
let secondary_color = localStorage.getItem("secondary_color") || "#f73164";

var iteration = 11;


function getRandom() {
  var i = iteration;
  return (Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2);
}

export type ChartOptions = {
  series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis | ApexXAxis[];
  stroke?: ApexStroke;
  tooltip?: any;
  dataLabels?: ApexDataLabels;
  yaxis?: ApexYAxis | ApexYAxis[];
  legend?: ApexLegend;
  labels?: string[];
  plotOptions?: ApexPlotOptions;
  fill?: ApexFill;
  responsive?: ApexResponsive[];
  pieseries?: ApexNonAxisChartSeries;
  title?: ApexTitleSubtitle;
  theme?: ApexTheme;
  colors?: string[];
  markers?: ApexMarkers;
  annotations?: ApexAnnotations;
  grid?: ApexGrid;
  options?: ApexOptions;
  subtitle?: ApexTitleSubtitle;
};

export let optionslinechart: ChartOptions | any = {
  chart: {
    toolbar: {
      show: false,
    },
    height: 200,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 3,
    curve: "smooth",
  },
  xaxis: {
    show: false,
    type: "datetime",
    categories: ["2018-09-19T00:00:00", "2018-09-19T01:30:00", "2018-09-19T02:30:00", "2018-09-19T03:30:00", "2018-09-19T04:30:00", "2018-09-19T05:30:00", "2018-09-19T06:30:00", "2018-09-19T07:30:00", "2018-09-19T08:30:00", "2018-09-19T09:30:00", "2018-09-19T10:30:00"],
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  grid: {
    show: false,
    padding: {
      left: -10,
      top: -25,
      right: -60,
      bottom: -40,
    },
  },
  fill: {
    opacity: 0.2,
  },
  colors: [primary_color],
  series: [
    {
      data: [70, 60, 82, 80, 60, 90, 70, 120, 50, 60, 0],
    },
  ],
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
  responsive: [
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 100,
        },
      },
    },
  ],
  title: "Total Sale",
  count: "$3654.00",
  subTitle: "Compare to last month",
  growth: "+65%",
  colorClass: "success",
};

export let chart2: any = {
  chart: {
    toolbar: {
      show: false,
    },
    height: 200,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 3,
    curve: "smooth",
  },
  xaxis: {
    show: false,
    type: "datetime",
    categories: ["2018-09-19T00:00:00", "2018-09-19T01:30:00", "2018-09-19T02:30:00", "2018-09-19T03:30:00", "2018-09-19T04:30:00", "2018-09-19T05:30:00", "2018-09-19T06:30:00", "2018-09-19T07:30:00", "2018-09-19T08:30:00", "2018-09-19T09:30:00", "2018-09-19T10:30:00"],
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
    padding: {
      left: -10,
      top: -25,
      right: -60,
      bottom: -40,
    },
  },
  fill: {
    opacity: 0.2,
  },
  colors: [secondary_color],
  series: [
    {
      name: "series1",
      data: [70, 60, 82, 80, 60, 90, 70, 120, 50, 60, 0],
    },
  ],
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
  responsive: [
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 100,
        },
      },
    },
  ],
  title: "Total Project",
  count: "12569",
  subTitle: "Compare to last month",
  growth: "+65%",
  colorClass: "success",
};

export let chart3: any = {
  chart: {
    toolbar: {
      show: false,
    },
    height: 200,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 3,
    curve: "smooth",
  },
  xaxis: {
    show: false,
    type: "datetime",
    categories: ["2018-09-19T00:00:00", "2018-09-19T01:30:00", "2018-09-19T02:30:00", "2018-09-19T03:30:00", "2018-09-19T04:30:00", "2018-09-19T05:30:00", "2018-09-19T06:30:00", "2018-09-19T07:30:00", "2018-09-19T08:30:00", "2018-09-19T09:30:00", "2018-09-19T10:30:00"],
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
    padding: {
      left: -10,
      top: -25,
      right: -60,
      bottom: -40,
    },
  },
  fill: {
    opacity: 0.2,
  },
  colors: ["#51bb25"],
  series: [
    {
      data: [70, 60, 82, 80, 60, 90, 70, 120, 50, 60, 0],
    },
  ],
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
  responsive: [
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 100,
        },
      },
    },
  ],
  title: "Total Product",
  count: "93M",
  subTitle: "Compare to last month",
  growth: "+65%",
  colorClass: "success",
};


export let skillStatus: any = {
  chart: {
    type: "radialBar",
    height: 375,
    offsetY: -30,
    offsetX: 20,
  },
  plotOptions: {
    radialBar: {
      size: undefined,
      inverseOrder: false,
      hollow: {
        margin: 10,
        size: "30%",
        background: "transparent",
      },
      track: {
        show: true,
        background: "#f2f2f2",
        strokeWidth: "10%",
        opacity: 1,
        margin: 3,
      },
    },
  },
  series: [90, 63, 50],
  labels: ["Skill 01", "Skill 02", "Skill 03"],
  legend: {
    show: true,
    fontSize: "16px",
    fontFamily: "Roboto, sans-serif",
    fontWeight: 500,
    labels: {
      colors: "#2C323F",
    },
    markers: {
      width: 86,
      height: 18,
      radius: 3,
    },
  },
  colors: [secondary_color, primary_color, "#51bb25"],
  responsive: [
    {
      breakpoint: 767,
      options: {
        title: {
          style: {
            fontSize: "16px",
          },
        },
      },
    },
  ],
};

export var barChartOptions: any = {
  scaleShowVerticalLines: false,
  responsive: true
};
export var barChartLabels: string[] = ["January", "February", "March", "April", "May", "June", "July"];
export var barChartType = 'bar';
export var barChartLegend = false;
export var barChartData: any[] = [
  { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
];
export var barChartColors: Array<any> = [
  {
    backgroundColor: "rgba(145, 46, 252, 0.6)",
    borderColor: '#7366ff',
    borderWidth: 1,
  },
  {
    backgroundColor: "rgba(247, 49, 100, 0.6)",
    borderColor: '#f73164',
    borderWidth: 1,
  },
];





import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root',  // Esto asegura que el servicio esté disponible a nivel de toda la aplicación
})

export class OrderStatusComponent1 {
  private token = localStorage.getItem('authToken');
  public inscripcionCelulas: inscripcionCelulas[] = [];
  public jovenesEquipos: Jovenesequipos[] = [];
  public inscripcionSesiones: InscripcionSesiones[] = [];
  public jovenes: Jovenes[] = [];

  constructor(private http: HttpClient) {}

  // Función para obtener las inscripciones y jóvenes
  catInstitucionesByJovenes() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });

    // Crear observables para cada consulta
    const inscripcionCelulas$ = this.http.get<inscripcionCelulas[]>('https://backend-do1k.onrender.com/inscripcion-celulas', { headers });
    const jovenesEquipos$ = this.http.get<Jovenesequipos[]>('https://backend-do1k.onrender.com/jovenesequipos', { headers });
    const inscripcionSesiones$ = this.http.get<InscripcionSesiones[]>('https://backend-do1k.onrender.com/inscripcionsesiones', { headers });
    const jovenes$ = this.http.get<Jovenes[]>('https://backend-do1k.onrender.com/jovenes', { headers });

    // Usar forkJoin para esperar a que todas las consultas se completen
    forkJoin([inscripcionCelulas$, jovenesEquipos$, inscripcionSesiones$, jovenes$]).subscribe(
      ([inscripcionCelulasData, jovenesEquiposData, inscripcionSesionesData, jovenesData]) => {
        this.inscripcionCelulas = inscripcionCelulasData;
        this.jovenesEquipos = jovenesEquiposData;
        this.inscripcionSesiones = inscripcionSesionesData;
        this.jovenes = jovenesData;

        // Mostrar datos para depuración
        console.log('Inscripción Células:', this.inscripcionCelulas);
        console.log('Jóvenes Equipos:', this.jovenesEquipos);
        console.log('Inscripción Sesiones:', this.inscripcionSesiones);
        console.log('Jóvenes:', this.jovenes);

        // Procesar instituciones
        this.obtenerTopInstituciones();
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  // Función para procesar los datos y obtener las 5 instituciones principales
  obtenerTopInstituciones() {
    const institucionesCount: { [key: string]: { total: number, participando: number } } = {};
    const jovenesParticipantes = new Set<number>(); // Para evitar duplicados
    const jovenesUnicos = new Set<number>(); // Para contar jóvenes únicos por institución
  
    // Procesar inscripciones a células
    this.inscripcionCelulas.forEach((inscripcion) => {
      const jovenId = inscripcion.jovenid?.id;
      const institucion = inscripcion.jovenid?.institucion;
  
      if (jovenId && institucion) {
        jovenesUnicos.add(jovenId);
        if (!institucionesCount[institucion]) {
          institucionesCount[institucion] = { total: 0, participando: 0 };
        }
        institucionesCount[institucion].total++;
        if (!jovenesParticipantes.has(jovenId)) {
          jovenesParticipantes.add(jovenId);
          institucionesCount[institucion].participando++;
        }
      }
    });
  
    // Procesar jóvenes en equipos
    this.jovenesEquipos.forEach((jovenEquipo) => {
      const jovenId = jovenEquipo.jovenesid?.id;
      const institucion = jovenEquipo.jovenesid?.institucion;
  
      if (jovenId && institucion) {
        jovenesUnicos.add(jovenId);
        if (!institucionesCount[institucion]) {
          institucionesCount[institucion] = { total: 0, participando: 0 };
        }
        institucionesCount[institucion].total++;
        if (!jovenesParticipantes.has(jovenId)) {
          jovenesParticipantes.add(jovenId);
          institucionesCount[institucion].participando++;
        }
      }
    });
  
    // Procesar inscripciones a sesiones
    this.inscripcionSesiones.forEach((inscripcion) => {
      const jovenId = inscripcion.jovenesid?.id;
      const institucion = inscripcion.jovenesid?.institucion;
  
      if (jovenId && institucion) {
        jovenesUnicos.add(jovenId);
        if (!institucionesCount[institucion]) {
          institucionesCount[institucion] = { total: 0, participando: 0 };
        }
        institucionesCount[institucion].total++;
        if (!jovenesParticipantes.has(jovenId)) {
          jovenesParticipantes.add(jovenId);
          institucionesCount[institucion].participando++;
        }
      }
    });
  
    // Obtener las 5 instituciones principales
    const topInstituciones = Object.entries(institucionesCount)
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 5);
  
    // Mostrar resultados en consola
    topInstituciones.forEach(([institucion, counts]) => {
      console.log(`${institucion}: ${counts.total} jóvenes`);
    });
  
    topInstituciones.forEach(([institucion, counts]) => {
      const porcentaje = ((counts.participando / counts.total) * 100).toFixed(2);
      console.log(`${institucion}: ${porcentaje}% de jóvenes participando`);
    });
  
    // Actualizar los gráficos
    this.actualizarProgress(topInstituciones);
  }
  

  // Función para actualizar los gráficos de progreso
  actualizarProgress(topInstituciones: any[]) {
    const progressCharts = [progress, progress1, progress2, progress3, progress4];
    const colors = ["#5A9BD5", "#ED7D31", "#A5A5A5", "#FFC000", "#4472C4"];
  
    topInstituciones.forEach(([institucion, counts], index) => {
      if (progressCharts[index]) {
        // Evitar división por cero.
        const total = counts.total > 0 ? counts.total : 1;
        const participando = counts.participando || 0;
        const porcentajeParticipacion = Math.round((participando / total) * 100);
  
        // Actualizar datos del gráfico.
        progressCharts[index].series = [
          {
            name: "Jóvenes Participando",
            data: [porcentajeParticipacion], // Usar porcentaje calculado.
          },
        ];
        progressCharts[index].title.text = institucion;
        progressCharts[index].subtitle.text = `Total: ${total} | Participando: ${participando} (${porcentajeParticipacion}%)`;
        progressCharts[index].colors = [colors[index]];
        progressCharts[index].xaxis.categories = [institucion];
      }
    });
  }
  

  actualizarGraph(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });
  
    // Primero obtenemos las instituciones y luego los jóvenes
    this.http.get<Institucion[]>('https://backend-do1k.onrender.com/instituciones', { headers }).subscribe((instituciones) => {
      this.http.get<Jovenes[]>('https://backend-do1k.onrender.com/jovenes', { headers }).subscribe((jovenes: Jovenes[]) => {
        
        // Creamos un objeto para contar los jóvenes activos por institución
        const jovenesActivosPorInstitucion: { [key: string]: number } = {};
  
        // Filtramos los jóvenes activos y los agrupamos por institución
        jovenes.forEach((joven) => {
          if (joven.estadoid.nombre === "Activo") {  // Aseguramos que solo se cuenten los jóvenes activos
            if (jovenesActivosPorInstitucion[joven.institucion]) {
              // Si la institución ya existe, sumamos 1
              jovenesActivosPorInstitucion[joven.institucion]++;
            } else {
              // Si es la primera vez que encontramos esta institución, inicializamos el contador
              jovenesActivosPorInstitucion[joven.institucion] = 1;
            }
          }
        });
  
        // Creamos un array de instituciones con los contadores de jóvenes activos
        const institucionesConJovenesActivos = instituciones.map((institucion) => {
          return {
            institucion: institucion.nombre,
            jovenesActivos: jovenesActivosPorInstitucion[institucion.nombre] || 0,
          };
        });
  
        // Ordenamos las instituciones por la cantidad de jóvenes activos de mayor a menor
        institucionesConJovenesActivos.sort((a, b) => b.jovenesActivos - a.jovenesActivos);
  
        // Tomamos solo las 10 principales instituciones
        const topInstituciones = institucionesConJovenesActivos.slice(0, 10);
  
        // Colores definidos para los gráficos
        const colores = ["#5A9BD5", "#ED7D31", "#A5A5A5", "#FFC000", "#4472C4", "#70AD47", "#264478", "#9E480E", "#636363", "#FFD966"];
  
        // Actualizamos el gráfico con los datos procesados y aplicamos los colores
        monthlyHistory.series = topInstituciones.map((institucion, index) => ({
          name: institucion.institucion,
          data: [institucion.jovenesActivos],
          color: colores[index],  // Asignamos un color para cada institución
        }));
  
        // Actualizamos las categorías (nombres de las instituciones) en el eje X
        monthlyHistory.xaxis.categories = topInstituciones.map((institucion) => institucion.institucion);
        
        // Si estás usando un gráfico como ApexCharts, puedes actualizar la configuración del gráfico aquí
        // chart.updateOptions(monthlyHistory);
      });
    });
  }
  getJovenesMasActivos() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });
  
    // Hacemos las solicitudes a las APIs en paralelo
    const inscripcionCelulas$ = this.http.get<inscripcionCelulas[]>('https://backend-do1k.onrender.com/inscripcion-celulas', { headers });
    const jovenesEquipos$ = this.http.get<Jovenesequipos[]>('https://backend-do1k.onrender.com/jovenesequipos', { headers });
    const inscripcionSesiones$ = this.http.get<InscripcionSesiones[]>('https://backend-do1k.onrender.com/inscripcionsesiones', { headers });
    const jovenes$ = this.http.get<Jovenes[]>('https://backend-do1k.onrender.com/jovenes', { headers });
  
    // Usamos forkJoin para esperar todas las respuestas de las solicitudes
    return forkJoin([inscripcionCelulas$, jovenesEquipos$, inscripcionSesiones$, jovenes$]).pipe(
      map(([inscripcionesCelulas, jovenesEquipos, inscripcionesSesiones, jovenes]) => {
        // Calculamos la actividad de cada joven
        const actividadJovenes = jovenes.map(joven => {
          const jovenInscripcionesCelulas = inscripcionesCelulas.filter(i => i.jovenid.id === joven.id).length;
          const jovenInscripcionesEquipos = jovenesEquipos.filter(i => i.jovenesid.id === joven.id).length;
          const jovenInscripcionesSesiones = inscripcionesSesiones.filter(i => i.jovenesid.id === joven.id).length;
          
          const totalActividad = jovenInscripcionesCelulas + jovenInscripcionesEquipos + jovenInscripcionesSesiones;
          
          // Log para depurar los resultados
          console.log(`Joven: ${joven.nombre} ${joven.apellido}`);
          console.log(`Inscripciones en Células: ${jovenInscripcionesCelulas}`);
          console.log(`Inscripciones en Equipos: ${jovenInscripcionesEquipos}`);
          console.log(`Inscripciones en Sesiones: ${jovenInscripcionesSesiones}`);
          console.log(`Total Actividad: ${totalActividad}`);
  
          return {
            nombre: joven.nombre,
            correo: joven.correo,  // Aseguramos que se incluye el correo
            actividad: totalActividad,
          };
        });
  
        // Ordenar a los jóvenes por actividad de mayor a menor
        actividadJovenes.sort((a, b) => b.actividad - a.actividad);
  
        // Tomar los 10 más activos
        const top10Jovenes = actividadJovenes.slice(0, 10);
  
        // Dividir los 10 más activos en dos grupos de 5
        const group1 = top10Jovenes.slice(0, 5);
        const group2 = top10Jovenes.slice(5, 10);
  
        // Llenamos los datos para la gráfica de ambos grupos
        const barChartLabelsGroup1 = group1.map(joven => joven.correo); // Correo de los 5 primeros
        const dataSerieGroup1 = group1.map(joven => joven.actividad); // Actividad de los 5 primeros
  
        const barChartLabelsGroup2 = group2.map(joven => joven.correo); // Correo de los 5 últimos
        const dataSerieGroup2 = group2.map(joven => joven.actividad); // Actividad de los 5 últimos
  
        let index = 0; // Inicializa el índice
        const barChartData12 = [];
        
        const barChartData = [
          { data: dataSerieGroup1, label: barChartLabelsGroup1 },
          { data: dataSerieGroup2, label: barChartLabelsGroup2 },
        ];
        // Log para ver los top 10 divididos en dos grupos
        console.log('Top 10 Jóvenes Más Activos:', top10Jovenes);
        console.log('Grupo 1 (1-5):', dataSerieGroup1);
        console.log('Grupo 2 (6-10):', dataSerieGroup2);
  
        // Retornar los datos listos para la gráfica
        return { barChartData, barChartLabelsGroup1, barChartLabelsGroup2 };
      })
    );
  }
  
  
}
export let monthlyHistory: any = {
  series: [
    {
      name: "Colegio 1",
      data: [77],
    },
    {
      name: "Colegio 2",
      data: [98],
    },
    {
      name: "Colegio 3",
      data: [98],
    },
    {
      name: "Colegio 4",
      data: [73],
    },
    {
      name: "Colegio 5",
      data: [59],
    },
    {
      name: "Colegio 6",
      data: [69],
    },
    {
      name: "Colegio 7",
      data: [66],
    },
    {
      name: "Colegio 8",
      data: [51],
    },
    {
      name: "Colegio 9",
      data: [78],
    },
    {
      name: "Colegio 10",
      data: [59],
    },
]
,
  chart: {
    type: "bar",
    height: 380,
    toolbar: {
      show: false,
    },
  },
  padding: {
    left: 10,
    right: 10,

  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "60%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 9,
    colors: ["transparent"],
    curve: "smooth",
    lineCap: "butt",
  },
  xaxis: {
    categories: [""],
    floating: false,
    axisTicks: {
      show: false,
    },
    axisBorder: {
      color: "#C4C4C4",
    },
  },
  yaxis: {
    title: {
      text: "Jóvenes inscritos por colegios",
      style: {
        fontSize: "14px",
        fontFamily: "Roboto, sans-serif",
        fontWeight: 500,
      },
    },
  },
  colors: ["#7366ff"],
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.1,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.9,
      stops: [0, 100],
    },
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " Jóvenes";
      },
    },
  },
  responsive: [
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 200,
        },
      },
    },
  ],
};



export let progress: any = {
  chart: {
    height: 70,
    type: "bar",
    stacked: true,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "15%",
      colors: {
        backgroundBarColors: [primary_color],
        backgroundBarOpacity: 0.2,
      },
    },
  },
  colors: [primary_color],
  stroke: {
    width: 0,
  },
  fill: {
    colors: [primary_color],
    type: "gradient",
    gradient: {
      gradientToColors: [primary_color],
    },
  },
  series: [
    {
      name: "Process 1",
      data: [44],
    },
  ],
  title: {
    floating: true,
    offsetX: -10,
    offsetY: 5,
    text: "Jesús Rey",
    style: {
      fontSize: "18px",
      fontFamily: "Roboto, sans-serif",
      fontWeight: 500,
    },
  },
  subtitle: {
    floating: true,
    align: "right",
    offsetY: 0,
    text: "44%",
    style: {
      fontSize: "14px",
    },
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    categories: ["Packed"],
  },
  yaxis: {
    max: 100,
  },
  responsive: [
    {
      breakpoint: 767,
      options: {
        title: {
          style: { 
            fontSize: "16px",
          },
        },
      },
    },
  ],
};

export let progress1: any = {
  chart: {
    height: 70,
    type: "bar",
    stacked: true,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "15%",
      colors: {
        backgroundBarColors: [secondary_color],
        backgroundBarOpacity: 0.2,
        backgroundBarRadius: 10,
      },
    },
  },
  colors: [secondary_color],
  stroke: {
    width: 0,
  },
  series: [
    {
      name: "Dispatched",
      data: [40],
    },
  ],
  title: {
    floating: true,
    offsetX: -10,
    offsetY: 5,
    text: "Madre Laura",
    style: {
      fontSize: "18px",
      fontFamily: "Roboto, sans-serif",
      fontWeight: 500,
    },
  },
  subtitle: {
    floating: true,
    align: "right",
    offsetY: 0,
    text: "44%",
    style: {
      fontSize: "14px",
    },
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    categories: ["Process 2"],
  },
  yaxis: {
    max: 100,
  },
  fill: {
    colors: [secondary_color],
    type: "gradient",
    gradient: {
      inverseColors: false,
      gradientToColors: [secondary_color],
    },
  },
  responsive: [
    {
      breakpoint: 767,
      options: {
        title: {
          style: {
            fontSize: "16px",
          },
        },
      },
    },
  ],
};

export let progress2: any = {
  chart: {
    height: 70,
    type: "bar",
    stacked: true,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "15%",
      colors: {
        backgroundBarColors: ["#a927f9"],
        backgroundBarOpacity: 0.2,
        backgroundBarRadius: 10,
      },
    },
  },
  colors: ["#a927f9"],
  stroke: {
    width: 0,
  },
  series: [
    {
      name: "Reach Station",
      data: [50],
    },
  ],
  fill: {
    colors: ["#a927f9"],
    type: "gradient",
    gradient: {
      gradientToColors: ["#a927f9"],
    },
  },
  title: {
    floating: true,
    offsetX: -10,
    offsetY: 5,
    text: "Pedregal",
    style: {
      fontSize: "18px",
      fontFamily: "Roboto, sans-serif",
      fontWeight: 500,
    },
  },
  subtitle: {
    floating: true,
    align: "right",
    offsetY: 0,
    text: "50%",
    style: {
      fontSize: "14px",
    },
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    categories: ["Reach Station"],
  },
  yaxis: {
    max: 100,
  },
  responsive: [
    {
      breakpoint: 767,
      options: {
        title: {
          style: {
            fontSize: "16px",
          },
        },
      },
    },
  ],
};

export let progress3: any = {
  chart: {
    height: 70,
    type: "bar",
    stacked: true,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "15%",
      colors: {
        backgroundBarColors: ["#F8D62B"],
        backgroundBarOpacity: 0.2,
        backgroundBarRadius: 10,
      },
    },
  },
  colors: ["#F8D62B"],
  stroke: {
    width: 0,
  },
  series: [
    {
      name: "Out for delivery",
      data: [60],
    },
  ],
  fill: {
    colors: ["#F8D62B"],
    type: "gradient",
    gradient: {
      gradientToColors: ["#F8D62B"],
    },
  },
  title: {
    floating: true,
    offsetX: -10,
    offsetY: 5,
    text: "Marymounth",
    style: {
      fontSize: "18px",
      fontFamily: "Roboto, sans-serif",
      fontWeight: 500,
    },
  },
  subtitle: {
    floating: true,
    align: "right",
    offsetY: 0,
    text: "60%",
    style: {
      fontSize: "14px",
    },
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    categories: ["Out for delivery"],
  },
  yaxis: {
    max: 100,
  },
  responsive: [
    {
      breakpoint: 767,
      options: {
        title: {
          style: {
            fontSize: "16px",
          },
        },
      },
    },
  ],
};

export let progress4: any = {
  chart: {
    height: 70,
    type: "bar",
    stacked: true,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "15%",
      colors: {
        backgroundBarColors: ["#51BB25"],
        backgroundBarOpacity: 0.2,
        backgroundBarRadius: 10,
      },
    },
  },
  colors: ["#51BB25"],
  stroke: {
    width: 0,
  },
  series: [
    {
      name: "Delivered",
      data: [74],
    },
  ],
  fill: {
    colors: ["#51BB25"],
    type: "gradient",
    gradient: {
      gradientToColors: ["#51BB25"],
    },
  },
  title: {
    floating: true,
    offsetX: -10,
    offsetY: 5,
    text: "Federico Ozanam",
    style: {
      fontSize: "18px",
      fontFamily: "Roboto, sans-serif",
      fontWeight: 500,
    },
  },
  subtitle: {
    floating: true,
    align: "right",
    offsetY: 0,
    text: "74%",
    style: {
      fontSize: "14px",
    },
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    categories: ["Delivered"],
  },
  yaxis: {
    max: 100,
  },
  responsive: [
    {
      breakpoint: 767,
      options: {
        title: {
          style: {
            fontSize: "16px",
          },
        },
      },
    },
  ],
};

export let liveProducts: any = {
  chart: {
    height: 320,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: "smooth",
    width: 0,
  },
  series: [
    {
      name: "TEAM A",
      data: [50, 120, 90, 100, 70, 95, 40, 55, 30, 0],
    },
    {
      name: "TEAM B",
      data: [35, 60, 40, 90, 70, 110, 90, 120, 60, 0],
    },
  ],
  fill: {
    colors: [primary_color, secondary_color],
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 0.9,
      opacityTo: 0.8,
      stops: [0, 100],
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    borderColor: "rgba(196,196,196, 0.3)",
    padding: {
      top: 0,
      right: -120,
      bottom: 10,
    },
  },
  colors: [primary_color, secondary_color],
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  markers: {
    size: 0,
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      color: "rgba(196,196,196, 0.3)",
    },
  },
  yaxis: [
    {
      title: {
        text: "Dollars in thounand",
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y) {
        if (typeof y !== "undefined") {
          return y.toFixed(0) + " points";
        }
        return y;
      },
    },
  },
};

export let turnOver: any = {
  chart: {
    toolbar: {
      show: false,
    },
    height: 300,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 3,
    curve: "smooth",
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  grid: {
    borderColor: "rgba(196,196,196, 0.3)",
    padding: {
      top: -20,
      right: -55,
      bottom: 0,
    },
  },
  fill: {
    opacity: 0.2,
  },
  colors: [primary_color],
  series: [
    {
      data: [70, 60, 82, 80, 60, 90, 70, 120, 50, 60, 0],
    },
  ],
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
};

export let cryptocurrencyPrices: any = {
  chart: {
    toolbar: {
      show: false,
    },
    height: 400,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 3,
    curve: "smooth",
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Jan", "Feb", "Mar", "Apr", "May"],
    tickAmount: 5,
    tickPlacement: "between",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  grid: {
    borderColor: "rgba(196,196,196, 0.3)",
    padding: {
      top: -20,
      right: -16,
      bottom: 0,
    },
  },
  fill: {
    opacity: 0.2,
  },
  colors: [primary_color],
  series: [
    {
      data: [20, 120, 15, 100, 120, 60, 150, 70, 100, 80, 105, 20, 70, 60, 10, 12, 10, 130, 60, 80, 40, 140, 110, 150, 30, 75, 20, 45, 15, 130, 10, 30, 15, 110, 65, 130, 0],
    },
  ],
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
  responsive: [
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 200,
        },
      },
    },
  ],
};

export let cryptoAnnotations: any = {
  series: [
    {
      data: [8107, 8300, 8260, 8400, 8350, 8500, 8350],
    },
  ],
  chart: {
    height: 400,
    type: "line",
    toolbar: {
      show: false,
    },
  },
  annotations: {
    yaxis: [
      {
        y: 8200,
        y2: 8400,
        borderColor: "#f8d62b",
        fillColor: "#f8d62b",
        opacity: 0.1,
        label: {
          borderColor: "#f8d62b",
          offsetX: -30,
          style: {
            fontSize: "10px",
            color: "#fff",
            background: "#f8d62b",
          },
          text: "Y-axis range",
        },
      },
    ],
    xaxis: [
      {
        x: new Date("15 Nov 2017").getTime(),
        strokeDashArray: 0,
        borderColor: primary_color,
        label: {
          borderColor: primary_color,
          offsetY: 20,
          style: {
            color: "#fff",
            background: primary_color,
          },
          text: "Anno Test",
        },
      },
      {
        x: new Date("17 Nov 2017").getTime(),
        x2: new Date("18 Nov 2017").getTime(),
        fillColor: "#51bb25",
        opacity: 0.1,
        label: {
          borderColor: "##51bb25",
          style: {
            fontSize: "10px",
            color: "#fff",
            background: "#51bb25",
          },
          offsetY: 20,
          text: "X-axis range",
        },
      },
    ],
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 3,
    curve: "smooth",
  },
  grid: {
    padding: {
      right: 30,
      left: 20,
    },
  },
  title: {
    text: "Line with Annotations",
    align: "left",
    style: {
      fontSize: "18px",
      fontFamily: "Rubik, sans-serif",
      fontWeight: 500,
    },
  },
  colors: [secondary_color],
  labels: ["13 Nov 2017", "14 Nov 2017", "15 Nov 2017", "16 Nov 2017", "17 Nov 2017", "20 Nov 2017", "21 Nov 2017"],
  xaxis: {
    type: "datetime",
  },
  responsive: [
    {
      breakpoint: 576,
      options: {
        title: {
          style: {
            fontSize: "16px",
          },
        },
      },
    },
  ],
};

export let stockMarket: any = {
  series: [
    {
      name: "line",
      type: "line",
      data: [
        {
          x: new Date(1538778600000),
          y: 6550,
        },
        {
          x: new Date(1538782200000),
          y: 6560,
        },
        {
          x: new Date(1538814600000),
          y: 6640,
        },
        {
          x: new Date(1538884800000),
          y: 6560,
        },
      ],
    },
    {
      name: "candle",
      type: "candlestick",
      data: [
        {
          x: new Date(1538778600000),
          y: [6629.81, 6650.5, 6623.04, 6633.33],
        },
        {
          x: new Date(1538780400000),
          y: [6632.01, 6643.59, 6620, 6630.11],
        },
        {
          x: new Date(1538782200000),
          y: [6630.71, 6648.95, 6623.34, 6635.65],
        },
        {
          x: new Date(1538784000000),
          y: [6635.65, 6651, 6629.67, 6638.24],
        },
        {
          x: new Date(1538785800000),
          y: [6638.24, 6640, 6620, 6624.47],
        },
        {
          x: new Date(1538787600000),
          y: [6624.53, 6636.03, 6621.68, 6624.31],
        },
        {
          x: new Date(1538789400000),
          y: [6624.61, 6632.2, 6617, 6626.02],
        },
        {
          x: new Date(1538791200000),
          y: [6627, 6627.62, 6584.22, 6603.02],
        },
        {
          x: new Date(1538793000000),
          y: [6605, 6608.03, 6598.95, 6604.01],
        },
        {
          x: new Date(1538794800000),
          y: [6604.5, 6614.4, 6602.26, 6608.02],
        },
        {
          x: new Date(1538796600000),
          y: [6608.02, 6610.68, 6601.99, 6608.91],
        },
        {
          x: new Date(1538798400000),
          y: [6608.91, 6618.99, 6608.01, 6612],
        },
        {
          x: new Date(1538800200000),
          y: [6612, 6615.13, 6605.09, 6612],
        },
        {
          x: new Date(1538802000000),
          y: [6612, 6624.12, 6608.43, 6622.95],
        },
        {
          x: new Date(1538803800000),
          y: [6623.91, 6623.91, 6615, 6615.67],
        },
        {
          x: new Date(1538805600000),
          y: [6618.69, 6618.74, 6610, 6610.4],
        },
        {
          x: new Date(1538807400000),
          y: [6611, 6622.78, 6610.4, 6614.9],
        },
        {
          x: new Date(1538809200000),
          y: [6614.9, 6626.2, 6613.33, 6623.45],
        },
        {
          x: new Date(1538811000000),
          y: [6623.48, 6627, 6618.38, 6620.35],
        },
        {
          x: new Date(1538812800000),
          y: [6619.43, 6620.35, 6610.05, 6615.53],
        },
        {
          x: new Date(1538814600000),
          y: [6615.53, 6617.93, 6610, 6615.19],
        },
        {
          x: new Date(1538816400000),
          y: [6615.19, 6621.6, 6608.2, 6620],
        },
        {
          x: new Date(1538818200000),
          y: [6619.54, 6625.17, 6614.15, 6620],
        },
        {
          x: new Date(1538820000000),
          y: [6620.33, 6634.15, 6617.24, 6624.61],
        },
        {
          x: new Date(1538821800000),
          y: [6625.95, 6626, 6611.66, 6617.58],
        },
        {
          x: new Date(1538823600000),
          y: [6619, 6625.97, 6595.27, 6598.86],
        },
        {
          x: new Date(1538825400000),
          y: [6598.86, 6598.88, 6570, 6587.16],
        },
        {
          x: new Date(1538827200000),
          y: [6588.86, 6600, 6580, 6593.4],
        },
        {
          x: new Date(1538829000000),
          y: [6593.99, 6598.89, 6585, 6587.81],
        },
        {
          x: new Date(1538830800000),
          y: [6587.81, 6592.73, 6567.14, 6578],
        },
        {
          x: new Date(1538832600000),
          y: [6578.35, 6581.72, 6567.39, 6579],
        },
        {
          x: new Date(1538834400000),
          y: [6579.38, 6580.92, 6566.77, 6575.96],
        },
        {
          x: new Date(1538836200000),
          y: [6575.96, 6589, 6571.77, 6588.92],
        },
        {
          x: new Date(1538838000000),
          y: [6588.92, 6594, 6577.55, 6589.22],
        },
        {
          x: new Date(1538839800000),
          y: [6589.3, 6598.89, 6589.1, 6596.08],
        },
        {
          x: new Date(1538841600000),
          y: [6597.5, 6600, 6588.39, 6596.25],
        },
        {
          x: new Date(1538843400000),
          y: [6598.03, 6600, 6588.73, 6595.97],
        },
        {
          x: new Date(1538845200000),
          y: [6595.97, 6602.01, 6588.17, 6602],
        },
        {
          x: new Date(1538847000000),
          y: [6602, 6607, 6596.51, 6599.95],
        },
        {
          x: new Date(1538848800000),
          y: [6600.63, 6601.21, 6590.39, 6591.02],
        },
        {
          x: new Date(1538850600000),
          y: [6591.02, 6603.08, 6591, 6591],
        },
        {
          x: new Date(1538852400000),
          y: [6591, 6601.32, 6585, 6592],
        },
        {
          x: new Date(1538854200000),
          y: [6593.13, 6596.01, 6590, 6593.34],
        },
        {
          x: new Date(1538856000000),
          y: [6593.34, 6604.76, 6582.63, 6593.86],
        },
        {
          x: new Date(1538857800000),
          y: [6593.86, 6604.28, 6586.57, 6600.01],
        },
        {
          x: new Date(1538859600000),
          y: [6601.81, 6603.21, 6592.78, 6596.25],
        },
        {
          x: new Date(1538861400000),
          y: [6596.25, 6604.2, 6590, 6602.99],
        },
        {
          x: new Date(1538863200000),
          y: [6602.99, 6606, 6584.99, 6587.81],
        },
        {
          x: new Date(1538865000000),
          y: [6587.81, 6595, 6583.27, 6591.96],
        },
        {
          x: new Date(1538866800000),
          y: [6591.97, 6596.07, 6585, 6588.39],
        },
        {
          x: new Date(1538868600000),
          y: [6587.6, 6598.21, 6587.6, 6594.27],
        },
        {
          x: new Date(1538870400000),
          y: [6596.44, 6601, 6590, 6596.55],
        },
        {
          x: new Date(1538872200000),
          y: [6598.91, 6605, 6596.61, 6600.02],
        },
        {
          x: new Date(1538874000000),
          y: [6600.55, 6605, 6589.14, 6593.01],
        },
        {
          x: new Date(1538875800000),
          y: [6593.15, 6605, 6592, 6603.06],
        },
        {
          x: new Date(1538877600000),
          y: [6603.07, 6604.5, 6599.09, 6603.89],
        },
        {
          x: new Date(1538879400000),
          y: [6604.44, 6604.44, 6600, 6603.5],
        },
        {
          x: new Date(1538881200000),
          y: [6603.5, 6603.99, 6597.5, 6603.86],
        },
        {
          x: new Date(1538883000000),
          y: [6603.85, 6605, 6600, 6604.07],
        },
        {
          x: new Date(1538884800000),
          y: [6604.98, 6606, 6604.07, 6606],
        },
      ],
    },
  ],
  plotOptions: {
    candlestick: {
      colors: {
        upward: "#FF474A",
        downward: "#6540D1",
      },
    },
  },
  legend: {
    show: false,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      shadeIntensity: 0.2,
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  chart: {
    height: 450,
    type: "line",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: "smooth",
    width: [1, 1],
  },
  tooltip: {
    shared: true,
    custom: [
      function ({ seriesIndex, dataPointIndex, w }) {
        return w.globals.series[seriesIndex][dataPointIndex];
      },
      function ({ seriesIndex, dataPointIndex, w }) {
        var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
        var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
        var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
        var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
        return "";
      },
    ],
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  grid: {
    strokeDashArray: 3,
    position: "back",
    row: {
      opacity: 0.5,
    },
    column: {
      opacity: 0.5,
    },
  },
  responsive: [
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 250,
        },
      },
    },
  ],
};

export let finance: any = {
  chart: {
    height: 350,
    type: "line",

    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 0,
  },
  series: [
    {
      name: "Load Average",
      type: "column",
      data: generateMinuteWiseTimeSeries(new Date("12/12/2016 00:20:00").getTime(), 12, {
        min: 10,
        max: 110,
      }),
    },
    {
      name: "Social Media",
      type: "line",
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
    },
  ],
  title: {
    text: "Average",
    align: "left",
    style: {
      fontSize: "12px",
    },
  },
  subtitle: {
    text: "17%",
    floating: true,
    align: "right",
    offsetY: 0,
    style: {
      fontSize: "20px",
      fontWeight: 500,
    },
  },
  fill: {
    colors: [primary_color],
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.8,
      stops: [0, 100],
    },
  },
  xaxis: {
    type: "datetime",
    range: 2700000,
  },
  yaxis: {
    decimalsInFloat: 1,
  },
  legend: {
    show: true,
  },
  responsive: [
    {
      breakpoint: 1366,
      options: {
        subtitle: {
          style: {
            fontSize: "18px",
          },
        },
      },
    },
    {
      breakpoint: 992,
      options: {
        subtitle: {
          style: {
            fontSize: "16px",
          },
        },
      },
    },
  ],
};

export let orderStatus2: any = {
  chart: {
    height: 350,
    type: "line",
    stacked: true,
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: 1000,
      },
    },
    events: {
      animationEnd: function (chartCtx) {
        const newData1 = chartCtx.w.config.series[0].data.slice();
        newData1.shift();
        const newData2 = chartCtx.w.config.series[1].data.slice();
        newData2.shift();
        window.setTimeout(function () {
          chartCtx.updateOptions(
            {
              series: [
                {
                  data: newData1,
                },
                {
                  data: newData2,
                },
              ],
            //   subtitle: {
            //     text: parseInt(getRandom() * Math.random()).toString(),
            //   },
            },
            false,
            false
          );
        }, 300);
      },
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
    width: 5,
  },
  grid: {
    padding: {
      left: 0,
      right: 0,
    },
  },
  fill: {
    opacity: 0.9,
  },
  colors: [primary_color, secondary_color],
  markers: {
    size: 0,
    hover: {
      size: 0,
    },
  },
  series: [
    {
      name: "Running",
      data: generateMinuteWiseTimeSeries(new Date("12/12/2016 00:20:00").getTime(), 12, {
        min: 30,
        max: 110,
      }),
    },
    {
      name: "Waiting",
      data: generateMinuteWiseTimeSeries(new Date("12/12/2016 00:20:00").getTime(), 12, {
        min: 30,
        max: 110,
      }),
    },
  ],
  xaxis: {
    type: "datetime",
    range: 2700000,
  },
  yaxis: {
    decimalsInFloat: 1,
  },
  title: {
    text: "Processes",
    align: "left",
    style: {
      fontSize: "12px",
    },
  },
  legend: {
    show: true,
    floating: true,
    horizontalAlign: "right",
    onItemClick: {
      toggleDataSeries: false,
    },
    position: "top",
    offsetY: -33,
    offsetX: 60,
  },
  responsive: [
    {
      breakpoint: 1366,
      options: {
        title: {
          style: {
            fontSize: "18px",
          },
        },
      },
    },
    {
      breakpoint: 992,
      options: {
        title: {
          style: {
            fontSize: "16px",
          },
        },
      },
    },
  ],
};

export let monthlySales: any = {
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "Reflected",
      shadeIntensity: 0.1,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.8,
      stops: [0, 100],
    },
  },
  colors: [primary_color, secondary_color],
  chart: {
    height: 300,
    type: "radar",
    dropShadow: {
      enabled: true,
      blur: 1,
      left: 1,
      top: 1,
    },
  },
  series: [
    {
      name: "Series 1",
      data: [80, 50, 30, 40, 100, 20],
    },
    {
      name: "Series 2",
      data: [20, 30, 40, 80, 20, 80],
    },
  ],
  title: {
    text: "Radar Chart - Multi Series",
  },
  stroke: {
    width: 0,
  },
  markers: {
    size: 0,
  },
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
};

export let uses: any = {
  chart: {
    toolbar: {
      show: false,
    },
    height: 320,
    type: "bubble",
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      name: "Bubble1",
      data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: "Bubble2",
      data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: "Bubble3",
      data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: "Bubble4",
      data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
  ],
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizontal",
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.7,
      stops: [0, 100],
    },
  },
  colors: [primary_color, secondary_color, "#51bb25", "#544fff"],
  title: {
    text: "Simple Bubble Chart",
  },
  xaxis: {
    tickAmount: 12,
    type: "category",
  },
  yaxis: {
    max: 70,
  },
};

function generateData(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

    series.push([x, y, z]);
    baseval += 86400000;
    i++;
  }
  return series;
}

function generateMinuteWiseTimeSeries(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y = (Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2);

    series.push([x, y]);
    baseval += 300000;
    i++;
  }
  return series;
}
