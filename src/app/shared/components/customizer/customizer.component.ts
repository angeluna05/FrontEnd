import { Component, OnInit, HostListener,AfterViewChecked, ElementRef } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LayoutService } from "../../services/layout.service";
import { HttpClient } from "@angular/common/http";
import Swal from 'sweetalert2';
interface HelpDocument {
  module: string;
  title: string;
  htmlContent: string;
  downloadLink?: string;
}

@Component({
  selector: "app-customizer",
  templateUrl: "./customizer.component.html",
  styleUrls: ["./customizer.component.scss"],
})
export class CustomizerComponent implements OnInit {
  public screenwidth: any = window.innerWidth;
  public customizer: string = "";
  public layoutType: string = "ltr";
  public sidebarType: string = "compact-wrapper";
  public sidebarSetting: string = "default-sidebar";
  public MIXLayout: string = "default";
  public icon: string = "stroke-svg";

  public primary_color: string = "#7366ff";
  public secondary_color: string = "#f73164";

  constructor(private modalService: NgbModal, public layout: LayoutService,private authService: LayoutService,private http: HttpClient,private el: ElementRef
  ) {this.checkMobileView();
  }
  @HostListener('window:resize')
  checkMobileView() {
    this.isMobileView = window.innerWidth < 768;
    
    // Reset view state on screen resize
    if (!this.isMobileView) {
      this.showModuleList = true;
    }
  }
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.screenwidth = event.target.innerWidth;
  }

  ngOnInit() {
  const userRole = localStorage.getItem('rolName');
  this.loadAvailableHelp(userRole);}


  // Open Modal
  openModal(popup) {
    this.modalService.open(popup, { backdropClass: "dark-modal", centered: true });
  }

  // Open customizer
  Customizer(val) {
    this.customizer = val;
  }

  // Customize Layout Type
  customizeLayoutType(val) {
    this.layoutType = val;
    this.layout.config.settings.layout_type = val;
    if (val == "rtl") {
      document.getElementsByTagName("html")[0].setAttribute("dir", val);
      document.body.className = "rtl";
    } else if (val == "box-layout") {
      document.getElementsByTagName("html")[0].setAttribute("dir", val);
      document.body.className = "box-layout";
    } else {
      document.getElementsByTagName("html")[0].removeAttribute("dir");
      document.body.className = "";
    }
  }

  svgIcon(val: string) {
    this.icon = val;
    this.layout.config.settings.icon = val;
    if (val == "stroke-svg") {
      document.getElementsByTagName("sidebar-wrapper")[0]?.setAttribute("icon", val);
    } else {
      document.getElementsByTagName("sidebar-wrapper")[0]?.setAttribute("icon", val);
    }
  }

  // Customize Sidebar Type
  customizeSidebarType(val) {
    this.sidebarType = val;
    this.layout.config.settings.layout = val;
  }

  // Customize Mix Layout
  customizeMixLayout(val) {
    this.MIXLayout = val;
    this.layout.config.settings.layout_version = val;
    document.body?.classList.remove("light-only", "dark-sidebar", "dark-only");
    document.body.classList.add(val);
    if (val === "default") {
      document.body?.classList.add("light-only");
    } else if (val === "dark-sidebar") {
      document.body?.classList.add("dark-sidebar");
    } else {
      document.body?.classList.add("dark-only");
    }
  }

  applyColor() {
    this.layout.setColor(this.primary_color, this.secondary_color);
  }

  resetColor() {
    this.layout.resetColor();
  }








  private allHelps: HelpDocument[] = [
    // Administrador Modules
    { 
      module: 'retos', 
      title: 'Ayuda de Retos', 
      htmlContent: `
      
      <div><h3>1. Ingresar al módulo Retos</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/f6470acc-4931-4a49-9031-31fc8409bee5/b46229cc-84f9-4a77-aa63-6c38fa45d0fb.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ingresar al módulo Retos" />
      </div>
      
      <div><h3>2. Presionar el botón "Registrar reto"</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/0c37690f-292b-4c5a-86e0-632578529457/64ec8b36-e2bc-4642-9bf9-e081e6a3d338.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8650&fp-y=0.5473&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=574&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zODEmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Registrar reto&quot;" />
      </div>
      
      <div><h3>3. Rellenar el campo "Nombre"</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/0351289a-f2f3-4a0c-b9fb-86b6c267fee4/2a645da5-bce9-4d81-8439-3b737b772780.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4087&fp-y=0.2608&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenar el campo &quot;Nombre&quot;" />
      </div>
      
      <div><h3>4. Rellenar el campo "Descripción"</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/5d69d5d6-acd4-4580-b9a0-628a0e8d62b2/fc665d82-7e6d-42b9-af7b-4fece2b22adb.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5920&fp-y=0.2949&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=191&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD0xNjYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenar el campo &quot;Descripción&quot;" />
      </div>
      
      <div><h3>5. Seleccionar la fecha de inicio del reto</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/45fa9ad3-bca8-49a1-a364-bf864529ae5b/fbd24599-115e-4db3-95e7-873e3958a9c7.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4087&fp-y=0.4336&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar la fecha de inicio del reto" />
      </div>
      
      <div><h3>6. Seleccionar la fecha de finalización del reto</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/353d9135-c30b-4537-983f-26d2860717f4/8dd454f1-7519-4a45-8317-747caf0f01d1.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5920&fp-y=0.3654&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar la fecha de finalización del reto" />
      </div>
      
      <div><h3>7. Seleccionar la fecha de inicio de inscripciones<br> del reto</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/fccfc577-e9fc-4d44-810b-530ee1f2d86d/19f6173a-209e-4de1-8b15-766b2746e105.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4087&fp-y=0.4701&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar la fecha de inicio de inscripciones del reto" />
      </div>
      
      <div><h3>8. Seleccionar la fecha de finalización de <br>inscripciones del reto</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/661124b4-6f4e-421a-a370-254aff75327d/7481189c-c4cf-4516-8e07-618c8cafe91f.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5920&fp-y=0.4701&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar la fecha de finalización de inscripciones del reto" />
      </div>
      
      <div><h3>9. Seleccionar el tipo de acceso del reto</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/a55f73bc-0333-4a8b-9f63-e3bd32c08fd2/ad75c889-e6e5-47e6-b284-41c58dc82a9d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4087&fp-y=0.6429&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar el tipo de acceso del reto" />
      </div>
      
      <div><h3>10. Seleccionar el facilitador del reto</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/783ca92b-4299-4146-9daf-8eeae1f5ed47/290eeb39-ccd5-4922-ae17-675f9b5e1678.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5920&fp-y=0.6429&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar el facilitador del reto" />
      </div>
      
      <div><h3>11. Seleccionar la empresa asociada al reto</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/2fef45ea-c7c4-49d5-bcea-d561a9412c2a/fa784414-dee6-43fa-a047-08d89e2ac385.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4087&fp-y=0.7475&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar la empresa asociada al reto" />
      </div>
      
      <div><h3>12. Seleccionar el encargado de la empresa</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/9db19664-229a-4c23-8219-3a37605a4d26/1d2924f9-6550-44d6-9dba-33d63ea3e694.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5920&fp-y=0.7475&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar el encargado de la empresa" />
      </div>
      
      <div><h3>13. Presionar el botón "Registrar"</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/011c28ae-ab0a-4db0-8947-d4a1936b89c7/d39f947f-355d-4233-81ba-4b699f597ec6.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6327&fp-y=0.8630&fp-z=2.5264&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=455&mark-y=310&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yOTAmaD05OSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Registrar&quot;" />
      </div>
      
      <div><h2># Ver equipos</h2></div>
      
      <div><h3>14. Presionar el botón "Ver equipos"</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/4a8b5863-c6e2-4f25-b106-562e90483415/b24f0689-2585-4160-8e03-08d20fc0910f.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8049&fp-y=0.8015&fp-z=4.0000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=522&mark-y=196&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xNTcmaD0xNTcmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Ver equipos&quot;" />
      </div>
      
      <div><h3>15. Vista de los equipos participantes en el reto</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/ec08de8d-a9be-4383-9364-a5ddea6d9a29/62d8b93d-5352-4da7-95b8-7befbd7b6b07.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Vista de los equipos participantes en el reto" />
      </div>
      
      <div><h2># Ver detalles de un reto</h2></div>
      
      <div><h3>16. Presionamos el botón "Ver detalle"</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/5edcf1e7-86a3-4650-b586-12efdf5725f1/41f7844a-77e6-4362-9f85-3cf77dd9ed0c.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8430&fp-y=0.5806&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=640&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDYmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Ver detalle&quot;" />
      </div>
      
      <div><h3>17. Vista del detalle del reto</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/24c4ff63-b865-450b-bedf-b8d870dff9b7/71a817cd-8dd4-437d-a706-f1a0a6a51a63.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Vista del detalle del reto" />
      </div>
      
      <div><h2># Editar un reto</h2></div>
      
      <div><h3>18. Presionar el botón "Editar reto"</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/9e328dca-b6a0-41aa-aa40-43d15330343b/c46fb00d-020a-4a3a-be98-16890457c2e3.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8810&fp-y=0.6586&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=763&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDYmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Editar reto&quot;" />
      </div>
      
      <div><h3>19. Editar el campo "Nombre"</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/3fca27ad-cd57-4338-b00b-0c46298adf69/f3e4e4fe-4b04-4f78-9a91-50cb3cce612d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4087&fp-y=0.2608&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Editar el campo &quot;Nombre&quot;" />
      </div>
      
      <div><h3>20. Editar la fecha de finalización de inscripción al reto</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/3480c752-059b-47d2-b676-174f26684c7e/2a32bd45-8112-4df2-9cbc-5836a03295f3.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5920&fp-y=0.4701&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Editar la fecha de finalización de inscripción al reto" />
      </div>
      
      <div><h3>21. Presionamos el botón "Guardar Cambios"</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/b03b0719-fd7b-4bdc-9554-be9a4abde648/f272bd0a-bb24-4b35-b495-6f24b51abbf8.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6129&fp-y=0.7949&fp-z=2.2969&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=413&mark-y=245&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zNzMmaD05MCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Guardar Cambios&quot;" />
      </div>
      
      <div><h2># Cambiar estado de un reto</h2></div>
      
      <div><h3>22. Presionamos el botón "Cambiar estado"</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/30032be1-cf35-4ca2-beee-a07c9134752e/8f9f9485-9043-4326-9d7e-9f5d114315f9.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.9228&fp-y=0.6586&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=898&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDYmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Cambiar estado&quot;" />
      </div>
      
      <div><h3>23. Mensaje de advertencia de cambio de estado</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/26c91d91-6e08-420b-8942-bfec9a25f03d/d644502d-b36f-4a0d-ac23-d5ac65bc2c18.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de advertencia de cambio de estado" />
      </div>
      
      <div><h3>24. Presionamos el botón "Sí, cambiar estado"</h3>
      <img src="https://images.tango.us/workflows/4be607bb-13cd-4d2b-a3c0-65b8083e94c2/steps/f5fd0081-edfd-4618-b414-655aad200749/53c83ea5-b5c2-4d86-b9ad-2a7e7203f67f.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4563&fp-y=0.7492&fp-z=2.2731&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=409&mark-y=221&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zODImaD0xMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Sí, cambiar estado&quot;" />
      </div>
      
      <br/>
      <hr/>`, 
      downloadLink: '/assets/helps/Registrar, ver equipos, ver detalle, editar información y cambiar el estado de un Reto.pdf' 
    },
    { 
      module: 'retos-jovenes', 
      title: 'Ayuda de Retos', 
      htmlContent: `
      
      <div><h3>1. Click en Servicios</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/0d08bc28-58ef-4e4f-b5a8-f29181ba0611/4a161e35-86d1-49ec-87ef-f9b9422a2377.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.1068&fp-y=0.4518&fp-z=1.9700&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=7&mark-y=226&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00OTEmaD05NyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Servicios" />
      </div>
      
      <div><h3>2. Click en Retos</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/299fe970-d739-4f3a-a1e7-b64dea2c86c9/85cb5460-0ce5-4933-a9a3-83ce0d8cb781.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.1068&fp-y=0.5191&fp-z=1.9700&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=7&mark-y=236&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00OTEmaD03NyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Retos" />
      </div>
      
      <div><h3>3. ver Retos activos</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/75776b76-79c2-4c4c-b5c3-00713fe40cc6/895319e6-c0a3-4d8b-a62e-27ed542e0551.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5943&fp-y=0.5000&fp-z=1.0067&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=234&mark-y=2&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz05NTEmaD01NDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="ver Retos activos" />
      </div>
      
      <div><h3>4. Click en el Reto deseado</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/20802f4c-4529-4e67-a10b-5b73a99758be/70a2f053-ad62-4215-a298-f78d78c46d5d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5947&fp-y=0.3654&fp-z=1.5179&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=298&mark-y=125&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MDQmaD0yOTkmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en el Reto deseado" />
      </div>
      
      <div><h3>5. Click en Participar</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/a6f19153-cdb6-49e2-82a1-472746020216/667eaceb-6f49-45f9-85b4-a6f5295cc974.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6787&fp-y=0.3098&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=442&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMTcmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Participar" />
      </div>
      
      <div><h3>6. ver los equipos disponibles</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/2c10b079-2bcb-49bd-bfb6-f5d0a2f9c9f8/9b0adf33-319c-4e54-85f6-b9c804f10b8e.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4068&fp-y=0.3007&fp-z=1.8661&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=438&mark-y=154&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMjQmaD0yNDImZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="ver los equipos disponibles" />
      </div>
      
      <div><h3>7. Click en el equipo deseado…</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/2c4a43ac-4cf4-4252-a2aa-fdecd1f9f1e5/a5a29faa-82d3-4845-8e25-ef3429a3f338.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4068&fp-y=0.3364&fp-z=2.3190&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=420&mark-y=191&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zNjAmaD0xNjcmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en el equipo deseado…" />
      </div>
      
      <div><h3>8. Ver participantes del equipo</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/56238b0a-2ab2-42ba-b2fe-a9e08a988be7/cfe5d714-ffcd-4daf-849a-b3f33b7566a8.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.3787&fp-z=1.3242&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=294&mark-y=109&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MTEmaD0zMzEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ver participantes del equipo" />
      </div>
      
      <div><h3>9. Click en Ingresar</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/4b779741-5356-428f-8ba1-1c1c31d2d74d/675df4fe-2684-4314-9ffc-bd83c7462723.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6350&fp-y=0.6570&fp-z=2.5559&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=460&mark-y=225&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yODAmaD0xMDAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Ingresar" />
      </div>
      
      <div><h3>10. Click en Sí, ingresar</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/83d8f6a7-18fa-48ca-b51b-c40e71a5da6e/b48e2a84-4ffb-4d2b-9df3-6a283c1ac4f1.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4464&fp-y=0.7010&fp-z=2.5071&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=451&mark-y=215&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yOTcmaD0xMTkmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Sí, ingresar" />
      </div>
      
      <div><h3>11. ingreso exitoso</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/bea94c58-e9e7-40aa-a81b-a3e5c4cca047/68f4690c-839d-4776-9c47-34e3bf30c5b1.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="ingreso exitoso" />
      </div>
      
      <div><h3>12. Click en el reto deseado</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/ec9820db-8907-44ac-8a83-f8ad4712efb7/bd3609db-0d9a-42d0-b198-974a25c13c28.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.7688&fp-y=0.6528&fp-z=1.8991&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=316&mark-y=88&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz03MTQmaD0zNzQmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en el reto deseado" />
      </div>
      
      <div><h3>13. detalle del reto</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/f7840a14-8e68-4e34-8b64-89785af5ea44/18a5fd2c-5b9f-42bb-b620-051292027749.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4935&fp-y=0.3123&fp-z=1.5425&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=278&mark-y=151&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02NDUmaD0yMjgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="detalle del reto" />
      </div>
      
      <div><h3>14. Click en en la X para salir</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/11bc2b21-231a-4400-8218-2640c6ba2667/94c13e34-6a85-4ea1-a2b1-5384a391da89.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6593&fp-y=0.1179&fp-z=2.7539&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=552&mark-y=131&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz05NSZoPTk1JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en en la X para salir" />
      </div>
      
      <div><h3>15. Click en Participar</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/cb526e78-5a55-4208-b053-f915ece7511b/c3c57d98-c57d-4955-bca2-2e7e9635c783.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8529&fp-y=0.5972&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=566&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMTcmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Participar" />
      </div>
      
      <div><h3>16. Si no esta nuestro equipo</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/4ecc74fa-6049-47c5-8bba-22d4adf5c1b1/4cd392c3-a4d3-40e2-9a67-5858082da717.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.2949&fp-z=1.5003&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=270&mark-y=133&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02NjAmaD0yMjAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Si no esta nuestro equipo" />
      </div>
      
      <div><h3>17. Click en Crear Equipo</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/4bd64d54-7ef2-4331-9070-6379e388b218/7502b13d-dd63-42ab-9353-8f38bd9456da.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6232&fp-y=0.5125&fp-z=2.4195&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=436&mark-y=227&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMjkmaD05NSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Crear Equipo" />
      </div>
      
      <div><h3>18. Copiamos el nombre del equipo</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/7cb16ea0-933f-47ec-9429-573c59a1078b/060dd76f-7348-4206-9255-559914041c34.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.2608&fp-z=1.5141&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=273&mark-y=185&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02NTUmaD02NCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Copiamos el nombre del equipo" />
      </div>
      
      <div><h3>19. Click en Crear Equipo</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/5a41fee5-63a8-4f98-98ea-9c1ee7785d27/f0366f9a-78a3-44a0-995c-09a96d98cad3.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.3768&fp-y=0.3480&fp-z=2.4195&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=436&mark-y=227&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMjkmaD05NSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Crear Equipo" />
      </div>
      
      <div><h3>20. Creación exitosa</h3>
      <p>Al crear un equipo automáticamente quedas registrado en el equipo</p>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/83eea289-1807-417f-b3ed-b0347d14637e/88679a43-8c7a-4c86-8bc5-510ffac39a17.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Creación exitosa" />
      </div>
      
      <div><h3>21. Click en Retirarme</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/b8e0ca8c-65cb-4d2c-bdb6-0ec96e9aef6d/39dfb932-ff89-4785-bd55-131727e638d7.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8525&fp-y=0.5274&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=564&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMTkmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Retirarme" />
      </div>
      
      <div><h3>22. Click en Sí, retirar</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/d3269f63-7b5e-4abe-870b-047815f7e07a/67250259-7b50-4b7d-9a22-ce32a5dadea8.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5433&fp-y=0.7193&fp-z=2.5810&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=465&mark-y=213&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNzEmaD0xMjImZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Sí, retirar" />
      </div>
      
      <div><h3>23. Retirado con exito</h3>
      <img src="https://images.tango.us/workflows/dfb1ebdb-a224-4011-a135-a142e25a3ef6/steps/3c60d7c4-2afa-4489-ac65-ecb62569aeda/cbffe5c0-092f-4ccb-b6da-3fa21f6ad5f1.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4916&fp-y=0.5141&fp-z=1.5854&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=242&mark-y=14&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz03NDQmaD00OTUmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Retirado con exito" />
      </div>
      
      <br/>
      <hr/>
      <div>
      <span>Created with </span><a href="https://tango.us?utm_source=magicCopy&utm_medium=magicCopy&utm_campaign=workflow%20export%20links" target='_blank' style='color: #256EFF'>Tango.us
          </a>
      </div>`, 
      downloadLink: '/assets/helps/Guía para Participar en Retos.pdf' 
    },
    { 
      module: 'celulas', 
      title: 'Ayuda de Células', 
      htmlContent: `
      <div><h3>1. Ingresar al módulo Células</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/31a741c7-1cda-4214-8e51-f7e4a522ac70/47002311-10a1-4aa0-910c-1b3fea4332aa.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ingresar al módulo Células" />
      </div>
      
      <div><h3>2. Presionar el botón "Registrar célula"</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/7b301bb1-6cae-4c77-9edf-7c8847f5d1d0/4bcb59fe-8d37-404f-bf4c-883d29075b5e.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8605&fp-y=0.5507&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=544&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MTAmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Registrar célula&quot;" />
      </div>
      
      <div><h3>3. Rellenar el campo "Nombre"</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/7635366f-168b-4c3d-97cc-4c99bda05d1b/b619c5c3-2fb8-452b-b4d4-195eaeeff40c.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4019&fp-y=0.2625&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenar el campo &quot;Nombre&quot;" />
      </div>
      
      <div><h3>4. Rellenar el campo "Objetivo"</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/a94d1382-17fa-4f53-90f7-e6e9faadbf35/dbbcc3ea-4436-483a-beab-89daea02f927.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5852&fp-y=0.2625&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenar el campo &quot;Objetivo&quot;" />
      </div>
      
      <div><h3>5. Seleccionar la fecha de inicio de la célula</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/64588e89-940e-45fd-9482-2e564403c6c8/e1f32dd6-9a7a-4df8-94e0-783245aac845.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4019&fp-y=0.3671&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar la fecha de inicio de la célula" />
      </div>
      
      <div><h3>6. Seleccionar la fecha de fin de la célula</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/67b0956d-cfb6-40c6-8f36-770cf1965d5b/55d04b6b-f52a-45c7-ae56-a3db57c50529.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5852&fp-y=0.3671&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar la fecha de fin de la célula" />
      </div>
      
      <div><h3>7. Rellenar el campo "Máximo de personas"</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/066519c0-4eef-4027-a1d4-52a8c553afdb/9f949f7a-0b04-4ddb-9b05-18e1f472f965.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4019&fp-y=0.4718&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenar el campo &quot;Máximo de personas&quot;" />
      </div>
      
      <div><h3>8. Seleccionar el tipo de acceso a célula</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/7f6c3652-c088-4316-a866-7b35e6956b40/65d3233c-e94a-403f-ab8f-c2ec08219fd8.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5852&fp-y=0.4718&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar el tipo de acceso a célula" />
      </div>
      
      <div><h3>9. Seleccionar la fecha de inicio de <br>inscripción de la célula</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/b052def2-fc79-4d8a-a6b3-9189c31b39f0/1b42e454-588f-40e0-a7a8-7e7ef18fd73c.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4019&fp-y=0.5764&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar la fecha de inicio de inscripción de la célula" />
      </div>
      
      <div><h3>10. Seleccionar la fecha de finalización de <br>inscripción de la célula</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/a18647de-4910-4461-8539-8ebf1cf47ec1/c17ab717-78cd-44e6-a18f-b7e7c4c41c1a.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5852&fp-y=0.5764&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar la fecha de finalización de inscripción de la célula" />
      </div>
      
      <div><h3>11. Seleccionar el facilitador de la célula</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/dac1ae37-72a2-4757-b9bc-04d4298eb0f9/394cf591-5d37-4810-98da-b2e0c2ad25b2.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4019&fp-y=0.7076&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar el facilitador de la célula" />
      </div>
      
      <div><h3>12. Seleccionar el encargado de la empresa</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/8cb6c21b-1311-4e58-8945-58ff15d6b52d/b8f3281e-7b5a-4852-9d04-f59dd5807b0d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5852&fp-y=0.7076&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar el encargado de la empresa" />
      </div>
      
      <div><h3>13. Seleccionar la empresa asociada a la célula</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/bdc5e5f1-753f-45ec-a3cb-753e228fbb13/107b823d-fe0e-4091-9698-59915fe76cd9.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4019&fp-y=0.8389&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=320&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar la empresa asociada a la célula" />
      </div>
      
      <div><h3>14. Presionar el botón "Registrar"</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/270f5331-5dc3-4091-963a-6b93aedefc3f/3360ec0a-c816-4c30-a3eb-a606e0f74474.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6259&fp-y=0.9543&fp-z=2.5264&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=455&mark-y=436&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yOTAmaD05OSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Registrar&quot;" />
      </div>
      
      <div><h3>15. Mensaje de confirmación de registro</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/43256202-3f67-4d1b-977d-7818bdb61cdb/bd6848ba-79b8-482f-9dda-15d2def34553.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de confirmación de registro" />
      </div>
      
      <div><h2># Ver detalle de una célula</h2></div>
      
      <div><h3>16. Presionar el botón "Ver detalle"</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/ef50d2ba-9237-4124-9bb5-38dbebbc321d/f0a8acfd-4bb1-4181-9045-6c9105679a08.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8049&fp-y=0.5839&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=547&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDYmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Ver detalle&quot;" />
      </div>
      
      <div><h3>17. Vista del detalle de la célula</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/534ff27b-69c5-4762-b9d5-e0c409da5f62/9f0e4bbe-3b5e-4019-8aa1-a9695f354064.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Vista del detalle de la célula" />
      </div>
      
      <div><h2># Editar una célula</h2></div>
      
      <div><h3>18. Presiona el botón "Editar célula"</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/14a68434-dddd-4194-afed-ed2a797151ff/681c448c-3670-4a02-aa63-d2f87d6acf60.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8361&fp-y=0.6736&fp-z=2.7615&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=603&mark-y=220&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDgmaD0xMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presiona el botón &quot;Editar célula&quot;" />
      </div>
      
      <div><h3>19. Type "Célula de desarrollo Metro"</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/7fe87d81-99cf-48dd-9fb6-4e65de9e4e97/13d2ed51-cbf7-4d33-97eb-84bf9a0b2520.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4019&fp-y=0.2625&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Type &quot;Célula de desarrollo Metro&quot;" />
      </div>
      
      <div><h3>20. Editar el campo "Máximo de personas"</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/79a7e47e-c33d-4b5e-b405-1e4a30155e17/7e651e1e-6475-4a02-8e23-fecd6810fd60.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4019&fp-y=0.5764&fp-z=2.0956&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=377&mark-y=231&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDYmaD04OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Editar el campo &quot;Máximo de personas&quot;" />
      </div>
      
      <div><h3>21. Presionar el botón "Actualizar"</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/cf45590e-e2b3-439b-9ed5-0b0eb606fcc5/3cf054a9-68d6-4f93-ba9c-1c8fe5d66baa.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6236&fp-y=0.9277&fp-z=2.4976&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=450&mark-y=401&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMDEmaD05OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Actualizar&quot;" />
      </div>
      
      <div><h3>22. Mensaje de edición exitosa</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/0ca07d87-fb34-4b4c-ae1e-d59fa1a0fe28/6ded6b84-0df0-4cae-892e-ec92ff00aca1.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de edición exitosa" />
      </div>
      
      <div><h2># Cambiar estado de una célula</h2></div>
      
      <div><h3>23. Presionar el botón "Cambiar estado"</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/1fc068c2-3de4-4521-9cf1-b28b59e2689e/8ccf5166-f0d4-4bcc-bd4f-7b74feda4e1a.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8848&fp-y=0.7085&fp-z=3.0558&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=718&mark-y=215&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMjAmaD0xMjAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Cambiar estado&quot;" />
      </div>
      
      <div><h3>24. Mensaje de advertencia de cambio de estado</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/a8e11cfe-1354-4bb2-877a-f786039a1dfd/eed7e674-031c-41af-b6ca-96ec55295426.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de advertencia de cambio de estado" />
      </div>
      
      <div><h3>25. Presionar el botón "Sí, cambiar estado"</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/5df70604-4e57-4f3b-9522-7dad1a68af9f/7d143d78-2671-4d6c-ba5e-32f3d8d4bcff.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4563&fp-y=0.7010&fp-z=2.2731&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=409&mark-y=221&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zODImaD0xMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Sí, cambiar estado&quot;" />
      </div>
      
      <div><h3>26. Presionar el botón "OK"</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/c2b62c09-d4c4-49f7-97a9-935951657160/0ffb7c2d-9278-4443-a33a-03fc2de46ebf.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4996&fp-y=0.7010&fp-z=2.8680&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=516&mark-y=207&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xNjgmaD0xMzYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;OK&quot;" />
      </div>
      
      <div><h2> Descargar el registro de los <br>jóvenes inscritos en la célula</h2></div>
      
      <div><h3>27. Presionar el botón "Descargar"</h3>
      <img src="https://images.tango.us/workflows/e6e478f3-63c2-4af4-95b5-dd7f086ab54a/steps/a4b64655-3a71-4eec-a04d-630df8889e73/f5f00315-7158-453a-bfc6-ffd9d15d0663.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.9228&fp-y=0.6736&fp-z=2.7615&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=890&mark-y=220&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDgmaD0xMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Descargar&quot;" />
      </div>
      
      <br/>
      <hr/>`, 
      downloadLink: '/assets/helps/Registrar, ver detalle,  y Actualización de Células en Jóvenes Talento.pdf' 
    },
    { 
      module: 'celulas-jovenes', 
      title: 'Ayuda de Células', 
      htmlContent: `
      
      
      <div><h3>1. Click en Servicios</h3>
      <img src="https://images.tango.us/workflows/3960718d-31ec-44a7-b1c6-96d07bbf6aaa/steps/7864d51c-9802-42f8-97ee-c887d03ec616/a0c9a4e0-f10b-4094-a9a2-47f0c7cf9f6e.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.1068&fp-y=0.4518&fp-z=1.9700&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=7&mark-y=226&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00OTEmaD05NyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Servicios" />
      </div>
      
      <div><h3>2. Click en Células</h3>
      <img src="https://images.tango.us/workflows/3960718d-31ec-44a7-b1c6-96d07bbf6aaa/steps/3fc83374-1a6c-47b4-b90c-6e2b4f7a209d/abb42007-6348-4ee1-b231-3e76326cf626.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.1068&fp-y=0.4610&fp-z=1.9700&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=7&mark-y=236&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00OTEmaD03NyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Células" />
      </div>
      
      <div><h3>3. Aquí las células activas</h3>
      <img src="https://images.tango.us/workflows/3960718d-31ec-44a7-b1c6-96d07bbf6aaa/steps/ccef518a-56f3-4b7b-8237-8f013fbe9c9d/fea83b03-db68-46d8-b14d-87a075af2444.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5943&fp-y=0.4967&fp-z=1.2438&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=13&mark-y=69&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMTc1Jmg9NDExJmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Aquí las células activas" />
      </div>
      
      <div><h3>4. Click en la Célula deseada para ver mas información</h3>
      <img src="https://images.tango.us/workflows/3960718d-31ec-44a7-b1c6-96d07bbf6aaa/steps/44ba69f0-355c-4a3d-8cd5-9951576eb352/9e86b52d-0447-421c-bd3d-2a00c5bf720f.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4205&fp-y=0.5947&fp-z=1.6305&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=293&mark-y=132&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MTMmaD0yODYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en la Célula deseada para ver mas información" />
      </div>
      
      <div><h3>5. Detalle de la célula</h3>
      <img src="https://images.tango.us/workflows/3960718d-31ec-44a7-b1c6-96d07bbf6aaa/steps/2dc2b074-b3f9-4ff4-8bd6-ce4c5b0e57de/3a231a1d-387b-4f0f-8b93-ca2cd6992792.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4935&fp-y=0.6071&fp-z=1.2836&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=332&mark-y=2&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz01MzYmaD01NDUmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Detalle de la célula" />
      </div>
      
      <div><h3>6. Click en X para salir</h3>
      <img src="https://images.tango.us/workflows/3960718d-31ec-44a7-b1c6-96d07bbf6aaa/steps/72c60379-d9b8-47a6-877f-f3a3ad7eb141/423c9eb4-5e7c-4623-a29e-cc5c46cbec2a.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6593&fp-y=0.1179&fp-z=2.7539&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=552&mark-y=131&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz05NSZoPTk1JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en X para salir" />
      </div>
      
      <div><h3>7. Click en Participar</h3>
      <img src="https://images.tango.us/workflows/3960718d-31ec-44a7-b1c6-96d07bbf6aaa/steps/2fe6b88a-1aad-46dd-b3e9-0a618f50ee6c/5a0c44c2-d771-470e-a62e-35cce9d03136.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5046&fp-y=0.5573&fp-z=2.5119&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=452&mark-y=225&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yOTYmaD05OSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Participar" />
      </div>
      
      <div><h3>8. Click en ¡Inscribirme!</h3>
      <img src="https://images.tango.us/workflows/3960718d-31ec-44a7-b1c6-96d07bbf6aaa/steps/8e4d649b-8fc2-4c10-8505-d64fd03b9cec/4dd3d56c-7c26-4954-a008-5095c858fd2f.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4567&fp-y=0.7309&fp-z=2.4649&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=444&mark-y=216&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMTMmaD0xMTcmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en ¡Inscribirme!" />
      </div>
      
      <div><h3>9. Inscripción exitosa…</h3>
      <img src="https://images.tango.us/workflows/3960718d-31ec-44a7-b1c6-96d07bbf6aaa/steps/7c2af7ea-2276-49f7-85a3-df0dfc8fb77b/8c683311-261b-4173-ad8a-70e0b66268a8.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.5008&fp-z=1.2727&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=298&mark-y=74&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MDQmaD00MDEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Inscripción exitosa…" />
      </div>
      
      <div><h3>10. Click en Retirarme</h3>
      <img src="https://images.tango.us/workflows/3960718d-31ec-44a7-b1c6-96d07bbf6aaa/steps/4d5c0d63-8edd-49dd-9cad-b7b56398e1a0/f8dbc9d4-6d65-4137-852e-89492f3014cc.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5042&fp-y=0.5573&fp-z=2.5071&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=451&mark-y=225&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yOTcmaD05OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Retirarme" />
      </div>
      
      <div><h3>11. tener en cuenta la advertencia</h3>
      <p>darle en Si, retirar de lo contrario en cancelar</p>
      <img src="https://images.tango.us/workflows/3960718d-31ec-44a7-b1c6-96d07bbf6aaa/steps/88636ec5-62f5-4c11-8ae9-841af2fda317/7ecdc83f-f411-4a40-afb7-5676b7a7dc92.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.5855&fp-z=1.4379&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=259&mark-y=225&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02ODImaD05OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="tener en cuenta la advertencia" />
      </div>
      
      <br/>
      <hr/>
      <div>
      <span>Created with </span><a href="https://tango.us?utm_source=magicCopy&utm_medium=magicCopy&utm_campaign=workflow%20export%20links" target='_blank' style='color: #256EFF'>Tango.us
          </a>
      </div>`, 
      downloadLink: '/assets/helps/Guía de Inscripción en Célula de Desarrollo Metro.pdf' 
    },
    { 
      module: 'equipos', 
      title: 'Ayuda de Equipos', 
      htmlContent: `
      <div><h3>1. Ingresamos al módulo Equipos</h3>
      <img src="https://images.tango.us/workflows/a5d11395-34d2-4b73-afb1-64064aeff572/steps/3181120f-44ab-44af-8723-517a0094aca4/baab62cb-1c48-4877-bf83-6d61c52f8bf4.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ingresamos al módulo Equipos" />
      </div>
      
      <div><h3>2. Presionamos el botón "Registrar Equipo"</h3>
      <img src="https://images.tango.us/workflows/a5d11395-34d2-4b73-afb1-64064aeff572/steps/18fe7eaa-cd1f-4b73-836a-876ff01fc41e/616eb674-0ebd-4496-ab07-b939106444e8.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8578&fp-y=0.4394&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=527&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MjcmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Registrar Equipo&quot;" />
      </div>
      
      <div><h3>3. Rellenar el campo "Nombre"</h3>
      <img src="https://images.tango.us/workflows/a5d11395-34d2-4b73-afb1-64064aeff572/steps/c6f4014c-d254-4350-8dc8-baf9f6cb9cc1/079403da-fe69-4868-b1dc-8862e98437ab.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.3123&fp-z=1.6265&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=293&mark-y=241&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MTQmaD02OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenar el campo &quot;Nombre&quot;" />
      </div>
      
      <div><h3>4. Seleccionamos el reto al cual asociaremos el equipo</h3>
      <img src="https://images.tango.us/workflows/a5d11395-34d2-4b73-afb1-64064aeff572/steps/25763b7f-6776-431d-882d-3a210334a481/327f6b6b-fc1b-4a8e-81ae-b8cf2479b556.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4779&fp-y=0.4693&fp-z=2.8721&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=557&mark-y=237&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz04NiZoPTc2JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionamos el reto al cual asociaremos el equipo" />
      </div>
      
      <div><h3>5. Seleccionamos los jóvenes que incluiremos en el equipo</h3>
      <img src="https://images.tango.us/workflows/a5d11395-34d2-4b73-afb1-64064aeff572/steps/6ca557e5-ab7b-4b19-abe0-3be050cde13b/981fdeb4-4edb-4834-966b-85c51e502fed.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5563&fp-y=0.4659&fp-z=2.4929&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=449&mark-y=242&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMDMmaD02NiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionamos los jóvenes que incluiremos en el equipo" />
      </div>
      
      <div><h3>6. Presionamos el botón "Guardar"</h3>
      <img src="https://images.tango.us/workflows/a5d11395-34d2-4b73-afb1-64064aeff572/steps/7e846588-1f02-4186-a74e-bfa5c31a880a/41da90b5-6b35-422e-ba72-40a680ade021.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6228&fp-y=0.8646&fp-z=2.5659&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=462&mark-y=308&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNzYmaD0xMDEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Guardar&quot;" />
      </div>
      
      <div><h3>7. Mensaje de confirmación de registro</h3>
      <img src="https://images.tango.us/workflows/a5d11395-34d2-4b73-afb1-64064aeff572/steps/22c2fb72-1114-4fc4-9ca2-835a489d62d0/c2f850c0-1279-4cb6-ad62-88f21dcb41be.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de confirmación de registro" />
      </div>
      
      <div><h2># Editar un equipo</h2></div>
      
      <div><h3>8. Presionamos el botón "Editar equipo"</h3>
      <img src="https://images.tango.us/workflows/a5d11395-34d2-4b73-afb1-64064aeff572/steps/4ae65604-b14e-4584-a48c-f583b9ee5572/e12dfe16-5fc0-49fc-ae30-0de844e405b8.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8886&fp-y=0.6736&fp-z=2.7615&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=777&mark-y=220&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDgmaD0xMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Editar equipo&quot;" />
      </div>
      
      <div><h3>9. Eliminamos el joven Samuel del equipo</h3>
      <img src="https://images.tango.us/workflows/a5d11395-34d2-4b73-afb1-64064aeff572/steps/c9b968e5-7518-4df4-b19a-3e0195e93d6d/a47ac2de-2535-4087-97dd-0928045dea73.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4202&fp-y=0.5573&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=227&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05NCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Eliminamos el joven Samuel del equipo" />
      </div>
      
      <div><h3>10. Añadimos al joven Juan al equipo</h3>
      <img src="https://images.tango.us/workflows/a5d11395-34d2-4b73-afb1-64064aeff572/steps/2872f374-27c3-4e56-a968-f286f2ba1b2d/1979fec9-fd2f-42bf-9563-dc641420e8ec.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4137&fp-y=0.5640&fp-z=2.2731&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=409&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zODImaD05MyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Añadimos al joven Juan al equipo" />
      </div>
      
      <div><h3>11. Presionar el botón "Guardar cambios"</h3>
      <img src="https://images.tango.us/workflows/a5d11395-34d2-4b73-afb1-64064aeff572/steps/d43e68ed-b998-4e57-87be-16f9740d245e/01dbcb77-4fa3-41b2-ba42-81dc21524180.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6129&fp-y=0.8646&fp-z=2.2969&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=413&mark-y=333&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zNzMmaD05MCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Guardar cambios&quot;" />
      </div>
      
      <div><h3>12. Mensaje de confirmación de edición </h3>
      <img src="https://images.tango.us/workflows/a5d11395-34d2-4b73-afb1-64064aeff572/steps/2d4bb1ce-2190-4278-bc7b-7ecef4207dff/80216a81-8214-4712-a615-9d8de8c6598b.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de confirmación de edición " />
      </div>
      
      <br/>
      <hr/>
      `, 
      downloadLink: '/assets/helps/Registrar y editar los Equipos.pdf' 
    },
    { 
      module: 'usuarios', 
      title: 'Ayuda de Usuarios', 
      htmlContent: `
      <div><h3>1. Ingresamos al módulo "Usuarios"</h3>
      <img src="https://images.tango.us/workflows/0bb0f87e-c015-4346-8a11-561de64b7253/steps/e9f68e56-28ba-4a2e-940a-7e293788ca98/59903466-87d2-4448-a67c-92a078e1f593.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ingresamos al módulo &quot;Usuarios&quot;" />
      </div>
      
      <div><h3>2. Presionamos el botón "Registrar usuario"</h3>
      <img src="https://images.tango.us/workflows/0bb0f87e-c015-4346-8a11-561de64b7253/steps/888abd45-00ae-4961-b0ac-8d365472500e/1c91fd63-9474-43e8-a2e4-5935d3cff414.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8567&fp-y=0.5922&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=519&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MzUmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Registrar usuario&quot;" />
      </div>
      
      <div><h3>3. Rellenamos el campo "Nombre"</h3>
      <img src="https://images.tango.us/workflows/0bb0f87e-c015-4346-8a11-561de64b7253/steps/a838f1fd-57e8-43af-b7e3-2b1f24d13ab8/5521b7e3-5094-40f4-b718-c16ad26dd711.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4202&fp-y=0.3123&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Nombre&quot;" />
      </div>
      
      <div><h3>4. Rellenamos el campo "Correo"</h3>
      <img src="https://images.tango.us/workflows/0bb0f87e-c015-4346-8a11-561de64b7253/steps/971b5693-d2fb-4ec7-872b-c6205d2c8729/a7b26ce8-0dd8-41fc-bfd7-e54446354850.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5806&fp-y=0.3123&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Correo&quot;" />
      </div>
      
      <div><h3>5. Rellenamos el campo "Contraseña"</h3>
      <img src="https://images.tango.us/workflows/0bb0f87e-c015-4346-8a11-561de64b7253/steps/4bd9fc64-fe35-476f-92bb-b4f515f7b2d4/a796ddb4-d800-4639-9c43-2c5051f52109.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4202&fp-y=0.4169&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Contraseña&quot;" />
      </div>
      
      <div><h3>6. Seleccionar el rol del usuario</h3>
      <img src="https://images.tango.us/workflows/0bb0f87e-c015-4346-8a11-561de64b7253/steps/92dc7fea-7378-49b9-9bd8-828f9955223a/853d7eb8-5181-4bdf-94c1-ad169454507b.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5806&fp-y=0.4169&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar el rol del usuario" />
      </div>
      
      <div><h3>7. Presionamos el botón "Registrar"</h3>
      <img src="https://images.tango.us/workflows/0bb0f87e-c015-4346-8a11-561de64b7253/steps/aa294e57-2c90-47e1-ad4c-d7614923f2d0/e1ed0e7b-193a-49ca-8b5a-e1270aefdad4.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6327&fp-y=0.6321&fp-z=2.5264&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=455&mark-y=225&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yOTAmaD05OSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Registrar&quot;" />
      </div>
      
      <div><h3>8. Editar un usuario</h3>
      </div>
      
      <div><h3>9. Presionamos el botón "Editar usuario"</h3>
      <img src="https://images.tango.us/workflows/0bb0f87e-c015-4346-8a11-561de64b7253/steps/8454e50a-9eb8-40a1-9b20-3edebd73e5dc/5a287e5c-8a88-4e97-888d-bcf35758e076.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8582&fp-y=0.5905&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=689&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDYmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Editar usuario&quot;" />
      </div>
      
      <div><h3>10. Editamos el campo "Contraseña"</h3>
      <img src="https://images.tango.us/workflows/0bb0f87e-c015-4346-8a11-561de64b7253/steps/c9d32043-6938-4d1a-8d75-f20f6d8724bc/75154f46-0426-4313-98d9-4afac00b40c5.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4202&fp-y=0.4169&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Editamos el campo &quot;Contraseña&quot;" />
      </div>
      
      <div><h3>11. Editamos el campo "Nombre"</h3>
      <img src="https://images.tango.us/workflows/0bb0f87e-c015-4346-8a11-561de64b7253/steps/2f646743-b34c-4d29-b01c-fb9c22c8b83f/95fa2dcd-e0a5-4895-891b-075fd4d0045e.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4202&fp-y=0.3123&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Editamos el campo &quot;Nombre&quot;" />
      </div>
      
      <div><h3>12. Presionamos el botón "Actualizar"</h3>
      <img src="https://images.tango.us/workflows/0bb0f87e-c015-4346-8a11-561de64b7253/steps/60906743-589f-4d3e-9030-2b4b8a760716/e764c567-6e49-4318-9d30-218232751743.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6304&fp-y=0.6321&fp-z=2.4976&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=450&mark-y=226&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMDEmaD05OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Actualizar&quot;" />
      </div>
      
      <div><h3>13. Mensaje de edición exitosa</h3>
      <img src="https://images.tango.us/workflows/0bb0f87e-c015-4346-8a11-561de64b7253/steps/c84ba118-037f-4281-ab99-b97c075bc7a5/e2d9b893-6bfb-4057-8b51-f03935777ce3.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de edición exitosa" />
      </div>
      
      <div><h3>14. Cambiar estado de un usuario</h3>
      </div>
      
      <div><h3>15. Presionamos el botón "Cambiar estado"</h3>
      <img src="https://images.tango.us/workflows/0bb0f87e-c015-4346-8a11-561de64b7253/steps/df2fbc93-5e9e-45a4-acc6-174942cb1188/2ed5a870-a7c7-4c41-9917-0b9c82812fd5.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.9038&fp-y=0.5905&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=836&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDYmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Cambiar estado&quot;" />
      </div>
      
      <div><h3>16. Presionamos el botón "Sí, cambiar estado"</h3>
      <img src="https://images.tango.us/workflows/0bb0f87e-c015-4346-8a11-561de64b7253/steps/3830826d-b6ca-42a1-8fdd-150ed13a9684/d2791ff4-6918-46e0-a138-e5fb68801dfd.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4563&fp-y=0.7010&fp-z=2.2731&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=409&mark-y=221&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zODImaD0xMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Sí, cambiar estado&quot;" />
      </div>
      
      <div><h3>17. Presionamos el botón "Ok"</h3>
      <img src="https://images.tango.us/workflows/0bb0f87e-c015-4346-8a11-561de64b7253/steps/0ce49dae-79e9-4e3c-8141-1869de3d4fc0/f942cf0a-de31-421b-9974-83a5919b754f.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4996&fp-y=0.7010&fp-z=2.8680&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=516&mark-y=207&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xNjgmaD0xMzYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Ok&quot;" />
      </div>
      
      <div><h3>18. Verificamos que ahora el estado del Administrador es Inactivo</h3>
      <img src="https://images.tango.us/workflows/0bb0f87e-c015-4346-8a11-561de64b7253/steps/d4945d5b-cbc0-4164-b005-7b1d8e21cdeb/100cdab3-50d1-42b2-9df5-8d8c864bd4e9.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6738&fp-y=0.5905&fp-z=2.4511&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=468&mark-y=202&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNjQmaD0xNDUmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Verificamos que ahora el estado del Administrador es Inactivo" />
      </div>
      
      <br/>
      <hr/>`, 
      downloadLink: '/assets/helps/Registrar, Editar y cambiar el estado de un usuario.pdf' 
    },
    { 
      module: 'roles', 
      title: 'Ayuda de Roles', 
      htmlContent: `
      
      <div><h3>1. Ingresar correo y contraseña de administrador</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/b1b51bac-84a2-4618-9de4-3bfdfb300aab/9428a53e-6a71-48fa-9fdb-7d721685ff92.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.2084&fp-y=0.6204&fp-z=1.5988&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=88&mark-y=235&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD04MCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ingresar correo y contraseña de administrador" />
      </div>
      
      <div><h3>2. Click en "Iniciar sesión"</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/11de5e33-0de9-45c6-8f40-007d54287861/2ebc6763-6b1b-4495-a9d6-0d939bb850e0.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.2084&fp-y=0.7749&fp-z=1.5988&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=88&mark-y=320&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD02MyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en &quot;Iniciar sesión&quot;" />
      </div>
      
      <div><h3>3. Click en la opción "Roles" del menú</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/ca901a0e-8cd7-4bf2-9858-f337633ddecc/1271b29e-de32-4c8b-888e-5b2ca24557a7.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.1068&fp-y=0.4427&fp-z=1.9700&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=7&mark-y=236&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00OTEmaD03NyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en la opción &quot;Roles&quot; del menú" />
      </div>
      
      <div><h3>4. Click en el botón "Registrar Rol"</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/156edeb4-5cc4-4da1-ab73-cb2db14076dc/cf155f7e-b857-49e3-bc46-96eb1ce09cfb.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8779&fp-y=0.3148&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=623&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zNjYmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en el botón &quot;Registrar Rol&quot;" />
      </div>
      
      <div><h3>5. Ingresar el nombre del Rol</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/74c1c92c-d289-4473-9121-781cc990e155/aad4cfd8-316d-450d-a069-062c5844190c.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.3123&fp-z=1.6265&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=293&mark-y=241&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MTQmaD02OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ingresar el nombre del Rol" />
      </div>
      
      <div><h3>6. Presionar el botón "Registrar"</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/5d13def9-c96c-4fef-9117-dabd853e6a12/20a05cb4-ab91-4855-bccc-17ca729d4f5d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6327&fp-y=0.5274&fp-z=2.5264&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=455&mark-y=225&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yOTAmaD05OSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Registrar&quot;" />
      </div>
      
      <div><h3>7. Mensaje de confirmación del registro</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/943c05bf-caef-4d2e-8ae3-487634baee9c/7acac7d3-4b04-460f-861a-7a59200bc90e.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de confirmación del registro" />
      </div>
      
      <div><h3>8. Editar un rol</h3>
      </div>
      
      <div><h3>9. Presionamos el botón "Editar rol"</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/07b81d09-4a91-4785-b241-0c37d769d2d3/469e77a1-fbca-4576-8330-41b65f14fd48.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.7304&fp-y=0.5108&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=547&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDYmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Editar rol&quot;" />
      </div>
      
      <div><h3>10. Editamos el nombre del Rol</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/7dfa8317-f07a-4887-82ee-3009bdc69acf/9d528fd8-5932-494f-892f-a3585c75144e.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.3123&fp-z=1.6265&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=293&mark-y=241&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MTQmaD02OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Editamos el nombre del Rol" />
      </div>
      
      <div><h3>11. Presionamos el botón "Actualizar"</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/a515f71d-13ae-41f4-9009-392a6f4cee94/ac1221b9-cf2f-4c93-92bb-cf03a6694cc8.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6304&fp-y=0.5274&fp-z=2.4976&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=450&mark-y=226&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMDEmaD05OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Actualizar&quot;" />
      </div>
      
      <div><h3>12. Mensaje de confirmación de edición</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/16f64154-8b78-4eeb-936c-d6c46c9c7793/57105e49-0011-4981-922a-2ee48efaa321.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de confirmación de edición" />
      </div>
      
      <div><h3>13. Cambiar el estado de un Rol</h3>
      </div>
      
      <div><h3>14. Presionamos el botón "Cambiar estado"</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/2f5d82d6-6599-48bf-8a43-0103b80e113e/24d7ad2a-9993-49e4-a3b2-47b7e867d3d7.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.7722&fp-y=0.3945&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=547&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDYmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Cambiar estado&quot;" />
      </div>
      
      <div><h3>15. Presionamos el botón "Cambiar estado"</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/6f975c71-e2f8-4fdf-8094-6cfd4a3018db/ad33d84a-1791-4d27-ba12-359de4dfdaca.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4563&fp-y=0.7010&fp-z=2.2731&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=409&mark-y=221&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zODImaD0xMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Cambiar estado&quot;" />
      </div>
      
      <div><h3>16. Mensaje de confirmación de cambio de estado</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/aa7d90c6-076b-47e0-8f9d-2cd329ae9652/ca667e3f-53c4-4dc6-ab61-78f4db3752b5.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.5008&fp-z=1.2727&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=298&mark-y=74&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MDQmaD00MDEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de confirmación de cambio de estado" />
      </div>
      
      <div><h3>17. Presionamos el botón "Ok"</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/ad286e0d-e4cc-4d17-863b-8317cadd3dc7/c8223e5d-fe86-4016-814c-1e845361c71f.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4996&fp-y=0.7010&fp-z=2.8680&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=516&mark-y=207&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xNjgmaD0xMzYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Ok&quot;" />
      </div>
      
      <div><h3>18. Edición de los permisos del Rol</h3>
      </div>
      
      <div><h3>19. Presionamos el botón "Permisos"</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/1fdea452-be0d-41fd-97b7-83c28f166fcd/3e932fd1-ce7b-4211-bfab-cc3b88bc6e0f.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8118&fp-y=0.3945&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=547&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDYmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Permisos&quot;" />
      </div>
      
      <div><h3>20. Chequeamos la opción "Ver"</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/5d266888-dd1f-4dc0-bd3a-0a0d59ea00c7/b3d81c58-91be-4d8d-ad67-5e552b61b1fa.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.3878&fp-y=0.2741&fp-z=2.6334&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=542&mark-y=217&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMTUmaD0xMTUmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Chequeamos la opción &quot;Ver&quot;" />
      </div>
      
      <div><h3>21. Chequeamos la opción "Crear"</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/7633f295-d5fc-4fc3-a2f1-fc710df922a1/06c73c8b-7936-4f9d-aeed-0648f832e32b.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4540&fp-y=0.2741&fp-z=2.6334&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=542&mark-y=217&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMTUmaD0xMTUmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Chequeamos la opción &quot;Crear&quot;" />
      </div>
      
      <div><h3>22. Y finalmente chequeamos la opción "Actualizar"</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/16186e4c-53b3-4c94-b475-9c029ce5210c/ca0adb12-f2bd-42e0-adc4-25d9d865ad40.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5316&fp-y=0.2741&fp-z=2.6334&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=542&mark-y=217&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMTUmaD0xMTUmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Y finalmente chequeamos la opción &quot;Actualizar&quot;" />
      </div>
      
      <div><h3>23. Presionamos el botón "Actualizar"</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/db553a5b-1852-4933-ab47-577ecf37d2c3/67c7ec6e-e75c-4b3d-bcae-80998f119959.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6084&fp-y=0.8945&fp-z=2.4976&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=450&mark-y=356&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMDEmaD05OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Actualizar&quot;" />
      </div>
      
      <div><h3>24. Mensaje de confirmación de los cambios</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/79abc64e-b56b-4290-a8e3-24048a84d803/5564876f-024c-4f78-9b99-ddc72932f827.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de confirmación de los cambios" />
      </div>
      
      <div><h3>25. Presionamos el botón "Ok"</h3>
      <img src="https://images.tango.us/workflows/5ca3707c-b0bf-496d-98e3-5023e10b9a05/steps/6d694a76-18d7-4cdf-919a-cb56b9ba86eb/22831a02-0a08-465a-94e0-3c5e65fa3d61.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4996&fp-y=0.7010&fp-z=2.8680&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=516&mark-y=207&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xNjgmaD0xMzYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Ok&quot;" />
      </div>
      
      <br/>
      <hr/>`, 
      downloadLink: '/assets/helps/Guía para Registrar un Rol, Editarlo y Editar los permisos.pdf' 
    },
    { 
      module: 'logros', 
      title: 'Ayuda de Logros', 
      htmlContent: `
      <div><h3>1. Ingresamos al módulo Logros</h3>
      <img src="https://images.tango.us/workflows/17eff217-abfa-4dd3-ad0b-e2b7317603bc/steps/2ca23bb2-01e7-4452-91d2-c9b04c1de1f9/d835c90e-8f77-4e85-99c3-ae19b6e9d0bd.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ingresamos al módulo Logros" />
      </div>
      
      <div><h3>2. Presionamos el botón "Registrar logro"</h3>
      <img src="https://images.tango.us/workflows/17eff217-abfa-4dd3-ad0b-e2b7317603bc/steps/15a9f054-4717-4be6-8fb9-c518729b35cd/776966e2-14b0-49ea-9479-2bbb08c1bb9d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8624&fp-y=0.5507&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=556&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zOTgmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Registrar logro&quot;" />
      </div>
      
      <div><h3>3. Seleccionamos el joven al que le asignaremos el logro</h3>
      <img src="https://images.tango.us/workflows/17eff217-abfa-4dd3-ad0b-e2b7317603bc/steps/a5421dad-38eb-461a-b8e5-33e814243a42/f6ba5173-646b-43ce-9b3d-913417ef24b8.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4852&fp-y=0.3081&fp-z=1.7616&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=317&mark-y=251&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz01NjYmaD00NyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionamos el joven al que le asignaremos el logro" />
      </div>
      
      <div><h3>4. Rellenamos el campo "Descripción"</h3>
      <img src="https://images.tango.us/workflows/17eff217-abfa-4dd3-ad0b-e2b7317603bc/steps/93d2ab9f-dddf-4f80-8c04-90443c325c4e/90978668-e6ec-4fbf-b929-9bfcfa9eee94.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.4535&fp-z=1.6265&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=293&mark-y=205&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MTQmaD0xNDAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Descripción&quot;" />
      </div>
      
      <div><h3>5. Click on Registrar</h3>
      <img src="https://images.tango.us/workflows/17eff217-abfa-4dd3-ad0b-e2b7317603bc/steps/ed350275-19b3-42ef-992a-ca21089298b1/8e858f40-e367-4472-b4cb-6159f71d0023.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6327&fp-y=0.7085&fp-z=2.5264&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=455&mark-y=225&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yOTAmaD05OSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click on Registrar" />
      </div>
      
      <div><h3>6. Mensaje de registro exitoso</h3>
      <img src="https://images.tango.us/workflows/17eff217-abfa-4dd3-ad0b-e2b7317603bc/steps/7ec170c4-d992-4b37-8081-1888e01bb124/63e7375f-8cdd-439e-b536-16a7c0181e8c.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de registro exitoso" />
      </div>
      
      <div><h2># Editar un logro</h2></div>
      
      <div><h3>7. Presionamos el botón "Editar logro"</h3>
      <img src="https://images.tango.us/workflows/17eff217-abfa-4dd3-ad0b-e2b7317603bc/steps/6583232d-37e0-4269-a6fc-6b83bf4eb049/40662a14-5aca-463a-a3f0-8b2732a84e6d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.9076&fp-y=0.6620&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=849&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDYmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Editar logro&quot;" />
      </div>
      
      <div><h3>8. Editamos el joven al que le asignamos el reto</h3>
      <img src="https://images.tango.us/workflows/17eff217-abfa-4dd3-ad0b-e2b7317603bc/steps/8ed72fa0-62c5-46ad-b87d-2975efa5e494/fb458ac7-c050-44ac-b2f2-9e66d939acce.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4852&fp-y=0.3081&fp-z=1.7616&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=317&mark-y=251&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz01NjYmaD00NyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Editamos el joven al que le asignamos el reto" />
      </div>
      
      <div><h3>9. Editamos el campo "Descripción"</h3>
      <img src="https://images.tango.us/workflows/17eff217-abfa-4dd3-ad0b-e2b7317603bc/steps/6b2ab177-d6c5-4fe7-a140-7ed12ef8873c/7bb40535-70ab-4b40-b3ff-058a8c87f158.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.4535&fp-z=1.6265&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=293&mark-y=205&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MTQmaD0xNDAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Editamos el campo &quot;Descripción&quot;" />
      </div>
      
      <div><h3>10. Presionamos el botón "Actualizar"</h3>
      <img src="https://images.tango.us/workflows/17eff217-abfa-4dd3-ad0b-e2b7317603bc/steps/6c741e4c-aa9e-428f-92e5-b9dede1d6b7f/142b0cab-d298-4246-833e-3d01826ccbc0.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6304&fp-y=0.7085&fp-z=2.4976&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=450&mark-y=226&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMDEmaD05OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Actualizar&quot;" />
      </div>
      
      <div><h3>11. Mensaje de confirmación de la edición</h3>
      <img src="https://images.tango.us/workflows/17eff217-abfa-4dd3-ad0b-e2b7317603bc/steps/b1806e00-8d67-4d7f-abc4-4125c0865cd9/7e1a0498-60a3-4a76-a0de-b4d29cc54f39.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de confirmación de la edición" />
      </div>
      
      <br/>
      <hr/>`, 
      downloadLink: '/assets/helps/Registro de Logros para Jóvenes Talento.pdf' 
    },
    { 
      module: 'sesiones', 
      title: 'Ayuda de Sesiones', 
      htmlContent: `
      
      <div><h3>1. Click en Sesiones</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/87c70bca-c6cf-416b-81b6-3a8efbdf8924/e5a79cef-bed5-47e8-8c6c-ffec6119f6b1.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.1068&fp-y=0.6138&fp-z=1.9700&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=7&mark-y=236&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00OTEmaD03NyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Sesiones" />
      </div>
      
      <div><h3>2. Click en el icono para crear una sesión</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/25ce1757-94d9-4629-8b38-2be2ca262847/db2d8468-93df-4280-bb2c-2362d1249c6c.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8875&fp-y=0.3239&fp-z=2.6334&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=787&mark-y=217&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMTUmaD0xMTUmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en el icono para crear una sesión" />
      </div>
      
      <div><h3>3. Digitamos el titulo para la sesión</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/69dab11d-9401-43ee-8943-d158006c6b41/a9348f36-5969-4791-a4de-4a0c861f2534.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4133&fp-y=0.3123&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Digitamos el titulo para la sesión" />
      </div>
      
      <div><h3>4. Click en Fecha</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/2fd38058-f207-4f03-9c76-b4bd2b5361a0/2383b551-ec98-4e13-825e-a658f3dcf73a.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5738&fp-y=0.3123&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Fecha" />
      </div>
      
      <div><h3>5. Click en la fecha deseada</h3>
      <p>Si se selecciona una fecha anterior a la actual esta se finalizara automáticamente a las 12:00 am o 12:00</p>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/95fec25c-3ce4-4c59-a738-4c26e7d1ace3/ea10fbc9-87a2-419c-accc-55a39b84e5ff.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6608&fp-y=0.6661&fp-z=2.7289&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=550&mark-y=225&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDAmaD0xMDAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en la fecha deseada" />
      </div>
      
      <div><h3>6. digitamos la hora de inicio</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/35fad656-6710-4a4a-8805-0b1361d1ac63/f698a975-e87a-440e-9b0b-d3e069569405.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4510&fp-y=0.4336&fp-z=2.6567&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=513&mark-y=219&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xNzUmaD0xMTImZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="digitamos la hora de inicio" />
      </div>
      
      <div><h3>7. digitamos la hora de inicio</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/d99c8684-9ce5-4251-bf5b-2880db0fe39f/977c8731-8cae-4712-9a31-e8990b83d36c.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5118&fp-y=0.4336&fp-z=2.6567&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=513&mark-y=219&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xNzUmaD0xMTImZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="digitamos la hora de inicio" />
      </div>
      
      <div><h3>8. Click en a.m. o p.m. según sea necesario </h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/4c6c7fb8-39e8-4469-80b0-50fc60c61b97/6e6cd3e0-2145-4d64-9787-0d0def7ca16e.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5821&fp-y=0.4344&fp-z=2.6755&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=482&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yMzcmaD0xMDUmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en a.m. o p.m. según sea necesario " />
      </div>
      
      <div><h3>9. También se puede dar click en las flechas para<br> subir o disminuir la hora</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/58942f22-d2cd-44b5-abba-1a3aaebc5791/0a65877f-806e-4010-ae66-9ae743f09bea.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4510&fp-y=0.5789&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=507&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xODcmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="También se puede dar click en las flechas para subir o disminuir la hora" />
      </div>
      
      <div><h3>10. También se puede dar click en las flechas<br> para subir o disminuir los minutos</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/01664ace-2853-4ccf-9858-c05c324a63c8/614fcdef-d449-4ff4-a56d-74a81dd4bf7b.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5118&fp-y=0.7002&fp-z=2.7949&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=503&mark-y=220&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xOTQmaD0xMTAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="También se puede dar click en las flechas para subir o disminuir los minutos" />
      </div>
      
      <div><h3>11. Click en a.m. o p.m. según sea necesario </h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/4a6c2868-225b-4cf7-b1e9-9975a3b25563/89b00c62-154a-4eee-810f-ff2760d06d8d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5814&fp-y=0.6404&fp-z=2.6755&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=482&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yMzcmaD0xMDUmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en a.m. o p.m. según sea necesario " />
      </div>
      
      <div><h3>12. Click en lugar</h3>
      <p>Este campo no es requerido y por defecto será "No aplica", si la sesión no es virtual entonces editar este campo</p>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/2ccd1ecd-94d4-4b8f-a621-66a3eb2497af/85b4dd30-07d4-4fd8-9f29-9c2a3b2d881d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5738&fp-y=0.6420&fp-z=2.1434&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=386&mark-y=205&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MjgmaD0xMzkmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en lugar" />
      </div>
      
      <div><h3>13. Click en link</h3>
      <p>Este campo no es requerido y por defecto será "No aplica", si la sesión es virtual entonces editar este campo</p>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/32e0ce34-65d7-4419-a0d3-f9483d592b31/fcbbb5be-54f6-4c3c-ad34-402ca5bdfdf1.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4133&fp-y=0.6420&fp-z=2.1434&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=386&mark-y=205&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MjgmaD0xMzkmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en link" />
      </div>
      
      <div><h2><a href="https://www.bing.com/search?&q=google+meet"># Bing</a></h2></div>
      
      <div><h3>14. Ir a nuestro proveedor de reuniones</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/4be42389-0677-44b5-a73d-a298401a1b06/1ee37bce-fc03-4dc9-960d-933683b37584.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.3890&fp-y=0.5457&fp-z=1.2342&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=198&mark-y=255&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz03NTYmaD0zOSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ir a nuestro proveedor de reuniones" />
      </div>
      
      <div><h2><a href="http://localhost:4200/programarsesiones"># Jóvenes Talento</a></h2></div>
      
      <div><h3>15. pegamos el enlace de nuestra reunión en el campo link</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/21307801-8c19-4015-b469-9b8ef2948621/ccdfd81e-0f95-41bb-9a26-46b23718ab0d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4133&fp-y=0.6628&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="pegamos el enlace de nuestra reunión en el campo link" />
      </div>
      
      <div><h3>16. Digitamos la descripción de la sesión</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/457f5aab-d1ed-4e7a-bd20-f03c1138f44c/d7361c36-ac9d-46d8-8cfe-3747c727e85d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4133&fp-y=0.7874&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD0xNDEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Digitamos la descripción de la sesión" />
      </div>
      
      <div><h3>17. Elegimos el tipo de acceso que queremos para esta sesión</h3>
      <p>La sesión abierta se le reflejara a todos los jovenes y las sesiones cerradas<br> no se le reflejara a ningún joven, aún no existe ninguna funcionalidad<br> que interactué con este tipo de estado</p>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/52fec6fe-8c29-4055-bf2c-7cf51ac96b3e/3f3f3df1-7665-42bc-a9e1-cb36053d39ce.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5738&fp-y=0.7674&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Elegimos el tipo de acceso que queremos para esta sesión" />
      </div>
      
      <div><h3>18. Click en Guardar</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/4e6dcc91-919b-4c66-af94-e079425a80ce/cde2bd44-e4f3-4209-8705-627a52b36b9f.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6171&fp-y=0.8696&fp-z=2.5709&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=463&mark-y=315&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNzQmaD0xMDEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Guardar" />
      </div>
      
      <div><h3>19. Registro exitoso</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/755e7b2c-bd32-4f7f-a661-fc8d39f664f2/24084956-9458-4fcd-9055-c7ad5500b9ff.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.5000&fp-z=1.2727&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=298&mark-y=75&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MDQmaD00MDAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Registro exitoso" />
      </div>
      
      <div><h2># Ver sesiones</h2></div>
      
      <div><h3>20. Click en la fecha que se creo la sesión</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/378625f6-f326-4999-8e7e-f95b384b6293/f1eb74bd-54cd-4d0f-878a-1518ae43011a.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.3065&fp-y=0.7558&fp-z=2.8068&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=505&mark-y=149&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xOTAmaD0yNTEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en la fecha que se creo la sesión" />
      </div>
      
      <div><h3>21. Click en la sesión deseada</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/da9a42c0-fb09-4925-aebc-af5d0d232311/dde52b76-a78f-4707-b438-832a3e550646.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.7951&fp-y=0.4900&fp-z=2.3279&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=259&mark-y=192&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz03MzcmaD0xNjYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en la sesión deseada" />
      </div>
      
      <div><h2># Ver detalle de una sesión</h2></div>
      
      <div><h3>22. Click on Ver detalle</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/89ea2f21-d045-4cfd-9edc-6eae6c49bc93/6881290e-eaa7-49b2-b526-05be4c55d593.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.3658&fp-y=0.7076&fp-z=2.5759&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=464&mark-y=218&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNzMmaD0xMTMmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click on Ver detalle" />
      </div>
      
      <div><h3>23. Se reflejara la información de la sesión</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/2909f4d1-bf2e-4600-8601-5c084a752f41/3c144224-000b-4f83-8fbf-44d3f7a2c6a5.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.3762&fp-z=1.3571&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=288&mark-y=112&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD0zMjYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Se reflejara la información de la sesión" />
      </div>
      
      <div><h3>24. Al dar click en Ver enlace redirigirá en una nueva<br> pestaña al link ingresado </h3>
      <p>Las sesiones que no tengan link no tendrán este botón</p>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/b7f00992-336a-4b40-a4b1-6fafd19794ed/19fe0140-b7b6-41f1-87f5-e4afae908dfc.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5349&fp-z=2.4929&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=449&mark-y=229&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMDMmaD05MSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Al dar click en Ver enlace redirigirá en una nueva pestaña  al link ingresado " />
      </div>
      
      <div><h3>25. Click en Cerrar</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/4b331c70-ab21-4ac8-b77b-e8a5699fe6a9/745cf981-126f-4fcc-8e80-bf01ceaf2ae6.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6395&fp-y=0.6453&fp-z=2.6274&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=473&mark-y=223&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNTQmaD0xMDMmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Cerrar" />
      </div>
      
      <div><h2># Editar sesiones</h2></div>
      
      <div><h3>26. Click en la sesión deseada</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/6fd5803e-b626-4ebd-8ea1-e0dda4e51554/d2cbcffd-049f-4636-9600-55146e66dd4d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.7951&fp-y=0.4900&fp-z=2.3279&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=259&mark-y=192&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz03MzcmaD0xNjYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en la sesión deseada" />
      </div>
      
      <div><h3>27. Click en Editar</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/2ccf18b7-cd05-4bc7-a15c-0bb30284ad23/2eb6ca07-dc09-4b9c-b216-d97b601b78f2.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4418&fp-y=0.7076&fp-z=2.7597&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=497&mark-y=214&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yMDcmaD0xMjEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Editar" />
      </div>
      
      <div><h3>28. Click en el campo a editar</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/11e6d4b6-76d6-4d82-bb3c-7c7cfb44e40b/aafb4cf3-a227-4480-a205-0d036a2a0903.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4510&fp-y=0.6238&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=507&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xODcmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en el campo a editar" />
      </div>
      
      <div><h3>29. Click en Guardar</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/7f3495fd-f4b4-4c8c-9bc2-f9acdb5c5e79/7057d685-70d5-4e0a-ae8b-19c3b5980883.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6171&fp-y=0.8696&fp-z=2.5709&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=463&mark-y=315&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNzQmaD0xMDEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Guardar" />
      </div>
      
      <div><h3>30. Edición exitosa</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/40ed3e1a-4d37-4a8e-848b-571b5b147564/53c98a7b-f7a9-4dfc-bdd5-5c95ca2ebd98.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.5000&fp-z=1.3348&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=283&mark-y=92&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MzMmaD0zNjUmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Edición exitosa" />
      </div>
      
      <div><h2># Cambiar estado</h2></div>
      
      <div><h3>31. Click en la sesión deseada</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/09c43201-0425-4e8f-ac1b-651324a1d129/7360d786-2833-456e-864f-f3ca93623e72.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.7951&fp-y=0.3239&fp-z=2.3279&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=259&mark-y=192&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz03MzcmaD0xNjYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en la sesión deseada" />
      </div>
      
      <div><h3>32. Click en Cambiar estado</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/7ca5f386-1387-4faf-acd4-3139244668c7/16fc431e-1134-40c7-ae23-5b4fc4dee34a.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6202&fp-y=0.7076&fp-z=2.4018&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=432&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMzUmaD0xMDUmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Cambiar estado" />
      </div>
      
      <div><h3>33. Seleccionar el estado deseado</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/5d60dd3c-9503-4460-8ae1-74a1a140dfb0/3225a952-9cef-4964-87b6-55a49e68dd06.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4935&fp-y=0.6296&fp-z=1.5353&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=276&mark-y=242&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02NDcmaD02NCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar el estado deseado" />
      </div>
      
      <div><h3>34. Click en Actualizar</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/5328cb19-aeb6-49a6-8744-6781cbfb445a/fac7e874-99e1-45f9-9deb-d4f72100666e.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4521&fp-y=0.7475&fp-z=2.5911&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=466&mark-y=213&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNjcmaD0xMjMmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Actualizar" />
      </div>
      
      <div><h3>35. Cambio de estado exitoso</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/e351c76c-a11f-4102-9f6b-4561046a346a/29db369a-1432-4e64-9061-32d8eec08cd4.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.5000&fp-z=1.2727&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=298&mark-y=75&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MDQmaD00MDAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Cambio de estado exitoso" />
      </div>
      
      <div><h3>36. Estados</h3>
      <p>Acá se puede visualizar la referencia del estado por color</p>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/4dde2ef2-a6e5-4d58-a20f-4655a118b0d7/7ee92e13-beea-43b0-9b4b-81884a455b17.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4570&fp-y=0.7865&fp-z=1.4538&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=262&mark-y=360&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02NzcmaD0zOCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Estados" />
      </div>
      
      <div><h2># Asistencia</h2></div>
      
      <div><h3>37. Click en la sesión deseada</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/08c6a09c-8488-4fad-aa77-947d256f28ae/ab8e365d-1e2d-4ad2-b0ed-3182f943afb4.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.7951&fp-y=0.2691&fp-z=2.3279&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=259&mark-y=192&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz03MzcmaD0xNjYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en la sesión deseada" />
      </div>
      
      <div><h3>38. Click en Asistencia</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/c65ade2f-6f88-4f3a-9270-f567231704e0/b2daf313-8a74-4172-abcb-c6e582847932.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5175&fp-y=0.7076&fp-z=2.5911&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=466&mark-y=218&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNjcmaD0xMTMmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Asistencia" />
      </div>
      
      <div><h3>39. seleccionar si el joven asistió a la sesión</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/4ebb8cd0-e934-4a22-a396-9d455ce1499e/b5f5988b-0d72-491b-a545-9eaee4675a36.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5536&fp-y=0.3023&fp-z=2.6334&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=542&mark-y=217&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMTUmaD0xMTUmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="seleccionar si el joven asistió a la sesión" />
      </div>
      
      <div><h3>40. seleccionar si el joven no asistió a la sesión</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/00b836f0-ad32-4826-90bd-653a5234a9cb/3863b8fa-db3b-47c6-a058-6c2e3b5f8f9b.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6266&fp-y=0.6811&fp-z=2.7870&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=539&mark-y=214&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMjImaD0xMjImZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="seleccionar si el joven no asistió a la sesión" />
      </div>
      
      <div><h3>41. Click en > para ver mas jovenes</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/3ce9659c-19f8-46da-9b07-833db15351f0/e87fdc82-53b4-4f97-9fcb-2eb939a97ea2.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6456&fp-y=0.7442&fp-z=2.9190&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=525&mark-y=200&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xNDkmaD0xNDkmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en &gt; para ver mas jovenes" />
      </div>
      
      <div><h3>42. Click en Actualizar</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/5236d94b-10a1-4551-a759-02627b2882e1/b19cba53-e3aa-4ce7-9a51-6432efe79148.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5441&fp-y=0.9493&fp-z=2.5216&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=454&mark-y=430&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yOTImaD05OSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Actualizar" />
      </div>
      
      <div><h3>43. Asistencia cargada exitosamente</h3>
      <img src="https://images.tango.us/workflows/25483b9b-0308-4380-a4bd-0a173f8ec48a/steps/ede94410-320d-4645-86c0-d5734650e5cb/98fe4e11-e11a-45e6-b003-a3aebf166710.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.5000&fp-z=1.2727&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=298&mark-y=75&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MDQmaD00MDAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Asistencia cargada exitosamente" />
      </div>
      
      <br/>
      <hr/>
`, 
      downloadLink: '/assets/helps/Guía para Registrar y Gestionar Sesiones en Jóvenes Talento.pdf' 
    },
        { 
      module: 'sesiones-jovenes', 
      title: 'Ayuda de Sesiones', 
      htmlContent: `
      
      
      <div><h3>1. Click en Calendario</h3>
      <img src="https://images.tango.us/workflows/ddee36ce-7702-42a8-86f4-e00157268e5a/steps/9004b829-dbb8-4627-ab15-99a0cd8ccacf/08a9c6e2-7b67-43f0-8077-2d749de4335a.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.1068&fp-y=0.5282&fp-z=1.9700&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=7&mark-y=226&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00OTEmaD05NyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Calendario" />
      </div>
      
      <div><h3>2. Click en Sesiones</h3>
      <img src="https://images.tango.us/workflows/ddee36ce-7702-42a8-86f4-e00157268e5a/steps/477c507d-6676-4160-a08a-9c5278abdcdd/c29e69a2-63a8-496a-b699-44f2387acdf9.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.1068&fp-y=0.5374&fp-z=1.9700&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=7&mark-y=236&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00OTEmaD03NyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Sesiones" />
      </div>
      
      <div><h3>3. Click en la fecha deseada</h3>
      <img src="https://images.tango.us/workflows/ddee36ce-7702-42a8-86f4-e00157268e5a/steps/dc0a62f5-f6cd-41f8-8648-c0456c48e175/3f03e82a-f87a-425e-a20d-34ba4dc38931.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5270&fp-y=0.9003&fp-z=2.8068&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=505&mark-y=270&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xOTAmaD0yNTEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en la fecha deseada" />
      </div>
      
      <div><h3>4. Click en la sesión deseada</h3>
      <img src="https://images.tango.us/workflows/ddee36ce-7702-42a8-86f4-e00157268e5a/steps/e1cb50f0-eb9a-4abc-9ced-b0f5c37a8f34/802aaed0-abf6-4ca8-a053-02508baefd71.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.7646&fp-y=0.4236&fp-z=2.3279&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=231&mark-y=192&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz03MzcmaD0xNjYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en la sesión deseada" />
      </div>
      
      <div><h3>5. Podemos ver el detalle de la sesión</h3>
      <img src="https://images.tango.us/workflows/ddee36ce-7702-42a8-86f4-e00157268e5a/steps/735b0d06-f17a-4666-8e26-a3e0d88e47c9/5b039b27-239b-4557-9b40-fc03b7ae8e5b.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.3497&fp-z=1.4626&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=264&mark-y=121&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02NzMmaD0zMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Podemos ver el detalle de la sesión" />
      </div>
      
      <div><h3>6. Click en Participar</h3>
      <img src="https://images.tango.us/workflows/ddee36ce-7702-42a8-86f4-e00157268e5a/steps/2e117955-7dcf-4c75-bc1d-b8313eabc7f5/1be4a4b2-01f3-45ae-993f-79056c57e529.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6316&fp-y=0.5922&fp-z=2.5313&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=456&mark-y=225&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yODkmaD05OSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Participar" />
      </div>
      
      <div><h3>7. Participación exitosa</h3>
      <img src="https://images.tango.us/workflows/ddee36ce-7702-42a8-86f4-e00157268e5a/steps/d8e4b92f-9c1b-4b6e-8c77-0e3c4901c6ad/8a405a9e-4773-4c0f-bf01-2b4f0829ce1a.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.5000&fp-z=1.2727&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=298&mark-y=75&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MDQmaD00MDAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Participación exitosa" />
      </div>
      
      <div><h3>8. Click en la fecha deseada</h3>
      <img src="https://images.tango.us/workflows/ddee36ce-7702-42a8-86f4-e00157268e5a/steps/c1dafd0e-dd37-478e-957d-9c65ab55e9ad/b9352fe8-d5db-4bf1-a348-ef1e67bee238.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5270&fp-y=0.8439&fp-z=2.8068&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=505&mark-y=183&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xOTAmaD0yNTEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en la fecha deseada" />
      </div>
      
      <div><h3>9. Click en la sesión deseada</h3>
      <img src="https://images.tango.us/workflows/ddee36ce-7702-42a8-86f4-e00157268e5a/steps/4503e1cb-dd29-49d2-8a45-8f0cb2fb8010/b3a7d1c2-5235-4b7d-8d27-9ec3ac292a72.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.7646&fp-y=0.4236&fp-z=2.3279&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=231&mark-y=192&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz03MzcmaD0xNjYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en la sesión deseada" />
      </div>
      
      <div><h3>10. si el lugar no esta definido es porque la sesión va a ser virtual</h3>
      <img src="https://images.tango.us/workflows/ddee36ce-7702-42a8-86f4-e00157268e5a/steps/2aaa184d-3478-4f13-b05a-fe756cfd0433/e7a48928-5a3d-4cf4-8a24-6efe154c3ff1.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4065&fp-y=0.4718&fp-z=2.1227&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=382&mark-y=244&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MzYmaD02MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="si el lugar no esta definido es porque la sesión va a ser virtual" />
      </div>
      
      <div><h3>11. Click en Ver enlace</h3>
      <p>esto los redirigiría al enlace en otra pestaña</p>
      <img src="https://images.tango.us/workflows/ddee36ce-7702-42a8-86f4-e00157268e5a/steps/7060097c-b00a-42ca-b3ed-5150cd57f3e8/1b832d5a-40b0-437b-873f-660dbdbdb8e7.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5349&fp-z=2.4929&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=449&mark-y=229&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMDMmaD05MSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Ver enlace" />
      </div>
      
      <div><h3>12. Click en Retirarme</h3>
      <img src="https://images.tango.us/workflows/ddee36ce-7702-42a8-86f4-e00157268e5a/steps/6fcf2839-5e85-49a5-a733-bc33b448c553/7331c40b-2fb3-4906-8a2c-c32bf3a0cf2f.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6308&fp-y=0.6453&fp-z=2.5216&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=454&mark-y=225&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yOTImaD05OSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Retirarme" />
      </div>
      
      <div><h3>13. Retiro exitoso</h3>
      <img src="https://images.tango.us/workflows/ddee36ce-7702-42a8-86f4-e00157268e5a/steps/de43d8a9-1dba-43b3-ae90-84faf3a9cda5/4afac509-fc1a-477d-b0e8-3629eca1fbb7.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.5000&fp-z=1.3348&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=283&mark-y=92&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MzMmaD0zNjUmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Retiro exitoso" />
      </div>
      
      <div><h3>14. Aqui se van a ver los tipo de estados de las sesiones</h3>
      <img src="https://images.tango.us/workflows/ddee36ce-7702-42a8-86f4-e00157268e5a/steps/2d823396-4941-40a2-9599-3b36773ea724/6fd0d388-4d17-4d7c-b956-283b07de58a7.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4266&fp-y=0.7267&fp-z=1.4538&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=262&mark-y=312&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02NzcmaD0zOCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Aqui se van a ver los tipo de estados de las sesiones" />
      </div>
      
      <div><h3>15. Click en la fecha deseada</h3>
      <img src="https://images.tango.us/workflows/ddee36ce-7702-42a8-86f4-e00157268e5a/steps/23592cb0-de95-4812-97b8-339f5a6b33e8/2b9bbddb-2405-416f-b108-30d7c353ff38.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5270&fp-y=0.7126&fp-z=2.7117&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=508&mark-y=153&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xODMmaD0yNDMmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en la fecha deseada" />
      </div>
      
      <div><h3>16. Si la sesión es finalizada no te podrás inscribir en una sesión</h3>
      <img src="https://images.tango.us/workflows/ddee36ce-7702-42a8-86f4-e00157268e5a/steps/520eae6d-f94e-4e7f-864d-9317bc0588a6/c2442a36-0839-4a3e-8c21-4713acaecac5.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=704&mark-y=306&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz0xMTEmaD0zOSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Si la sesión es finalizada no te podrás inscribir en una sesión" />
      </div>
      
      <div><h3>17. Click en la fecha deseada</h3>
      <img src="https://images.tango.us/workflows/ddee36ce-7702-42a8-86f4-e00157268e5a/steps/e9f25b8b-19fe-413d-b6be-d3ab830fdd2f/44ece119-d151-42a6-83e7-62e0a85d1949.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5772&fp-y=0.7890&fp-z=2.8068&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=505&mark-y=149&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xOTAmaD0yNTEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en la fecha deseada" />
      </div>
      
      <div><h3>18. Si la sesión esta pospuesta no te podrás inscribir en una sesión</h3>
      <img src="https://images.tango.us/workflows/ddee36ce-7702-42a8-86f4-e00157268e5a/steps/0b2ecba8-9c34-4de8-9f90-a87afa21a14c/661b28f2-7bc4-467a-9e94-19b57c470736.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.5914&fp-z=1.4636&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=263&mark-y=224&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02NzMmaD0xMDImZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Si la sesión esta pospuesta no te podrás inscribir en una sesión" />
      </div>
      
      <br/>
      <hr/>
      <div>
      <span>Created with </span><a href="https://tango.us?utm_source=magicCopy&utm_medium=magicCopy&utm_campaign=workflow%20export%20links" target='_blank' style='color: #256EFF'>Tango.us
          </a>
      </div>`, 
      downloadLink: '/assets/helps/Guía de Participación en Sesiones.pdf' 
    },
    { 
      module: 'perfil', 
      title: 'Ayuda de Perfil', 
      htmlContent:  `
      <div><h3>1. Click en tu nombre</h3>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/dd02b14c-05a7-4ab7-b9f0-8e601696aa99/49cedda2-a0ce-4889-9ff3-36fc7530c93e.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.9437&fp-y=0.0664&fp-z=2.7044&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=916&mark-y=47&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yMDImaD0xMDQmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en tu nombre" />
      </div>
      
      <div><h3>2. Click en PERFIL</h3>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/5297f3c2-215a-42e6-999c-1743ac1aa77c/820d0624-e73e-4aa0-a59b-c8dde572d97d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8928&fp-y=0.1669&fp-z=2.9280&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=716&mark-y=235&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yMTQmaD02NyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en PERFIL" />
      </div>
      
      <div><h3>3. Aquí podrás ver tu información</h3>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/ff56f34e-5694-4636-bc33-ec20e3c54da1/8c54e988-6d59-44a1-a6b7-64cd1b3cd0c3.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5943&fp-y=0.6071&fp-z=1.2656&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=16&mark-y=8&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMTY4Jmg9NTM3JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Aquí podrás ver tu información" />
      </div>
      
      <div><h3>4. Click en Editar</h3>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/a7111576-ff4c-4e49-9861-eba02c064d9f/d6466edb-c5cb-4a0b-aecb-7a6f30f0f893.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.2863&fp-y=0.8995&fp-z=2.6326&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=474&mark-y=352&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNTImaD0xMDMmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Editar" />
      </div>
      
      <div><h3>5. Editaremos los campos necesarios</h3>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/99092283-7d68-4b28-a862-145b1221b084/c96426df-f8bf-428d-8df6-e531f5b00d88.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4935&fp-y=0.4668&fp-z=1.6265&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=293&mark-y=223&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MTQmaD0xMDQmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Editaremos los campos necesarios" />
      </div>
      
      <div><h3>6. Editaremos los campos necesarios</h3>
      <p>Es importante que este campo este bien detallado porque te puede abrir muchas oportunidades</p>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/f9edec98-db97-4bca-9769-d57e92c2ec93/d98cdc66-bac5-4c82-b472-7fce992da009.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4935&fp-y=0.6304&fp-z=1.6265&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=293&mark-y=203&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MTQmaD0xNDQmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Editaremos los campos necesarios" />
      </div>
      
      <div><h3>7. Editaremos los campos necesarios</h3>
      <p>Es importante que este campo este bien detallado porque te puede abrir muchas oportunidades</p>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/df411352-c5dd-4752-9736-2de273ad080d/f2bacfa0-9617-4472-838b-fcda0736c729.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4935&fp-y=0.7450&fp-z=1.6265&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=293&mark-y=217&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MTQmaD0yMDkmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Editaremos los campos necesarios" />
      </div>
      
      <div><h3>8. Click en Guardar</h3>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/d3f4af83-98bd-4e86-87c0-2c61f6adcec2/6c01588b-e4c5-41cd-9c44-04b274380b03.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6167&fp-y=0.8696&fp-z=2.5659&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=462&mark-y=315&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNzYmaD0xMDEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Guardar" />
      </div>
      
      <div><h3>9. Tus Logros</h3>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/28b6ab29-3b16-4525-8542-6836b8e686a1/6c222530-aea3-4884-8ddc-4668aa8fe25d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5943&fp-y=0.3264&fp-z=1.3190&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=42&mark-y=211&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMTE2Jmg9NTImZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Tus Logros" />
      </div>
      
      <div><h3>10. Aquí podrás ver los logros que te han creado</h3>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/909ee588-d129-4404-a287-81429a6364b8/f0cbfeb3-e2f0-4c99-863b-2c291c39859a.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5913&fp-y=0.3995&fp-z=1.2755&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=26&mark-y=110&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMTQ5Jmg9MzI5JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Aquí podrás ver los logros que te han creado" />
      </div>
      
      <div><h3>11. Paginador para tus logros</h3>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/5c38c9d8-1edd-4e51-b415-5f7c668250c3/4de645cd-6e48-436f-aef0-7181c593ccaf.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.9030&fp-y=0.7525&fp-z=3.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=721&mark-y=201&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xNDQmaD0xNDcmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Paginador para tus logros" />
      </div>
      
      <div><h3>12. Aquí podrás ver los equipos en los que estas en un reto</h3>
      <p>Click en el equipo</p>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/37b2fff0-527a-4647-b3de-05a5d953eb1c/08a6edc9-8c2c-47c6-98ad-941d62e82b55.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4480&fp-y=0.5903&fp-z=2.0000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=143&mark-y=195&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTYlMkNGRjc0NDImdz03NTMmaD0yMjMmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Aquí podrás ver los equipos en los que estas en un reto" />
      </div>
      
      <div><h3>13. aquí vas a ver los participantes de tu equipo</h3>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/780cefb2-7d33-404b-a220-a9c90a45f9f8/95f2a12f-9e51-49a1-a851-caab3cc263ac.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.4252&fp-z=1.3420&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=327&mark-y=111&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz01NDYmaD0zMjgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="aquí vas a ver los participantes de tu equipo" />
      </div>
      
      <div><h3>14. Aquí podrás ver solo los retos en los <br>que estas inscritos y aun están activos</h3>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/34a05009-4bc0-437f-8732-7ca0d9f8104e/92fb29e2-ad43-44af-8e32-147edcc6c0e0.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5788&fp-y=0.5061&fp-z=2.0794&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=266&mark-y=105&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz03NTkmaD00MTAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Aquí podrás ver solo los retos en los que estas inscritos y aun están activos" />
      </div>
      
      <div><h3>15. Detalle del reto seleccionado</h3>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/f4141a04-3774-4fe4-b27d-5a54c6290571/f3c2adc0-fa15-4898-835c-24d53e1e88f9.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4935&fp-y=0.3538&fp-z=1.5425&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=278&mark-y=161&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02NDUmaD0yMjgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Detalle del reto seleccionado" />
      </div>
      
      <div><h3>16. Click en la x para salir</h3>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/7d986493-d6c9-480b-911e-ec2f371b62df/d8032945-a733-4c01-8cd5-efcaf3144595.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6593&fp-y=0.1179&fp-z=2.7539&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=552&mark-y=131&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz05NSZoPTk1JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en la x para salir" />
      </div>
      
      <div><h3>17. Click en Retirarme</h3>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/d1d31d85-35c8-4a79-a5c2-94cf55ff1351/226a4cb4-5cf9-4d36-a456-bba1afe06206.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5650&fp-y=0.5341&fp-z=2.5071&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=451&mark-y=225&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yOTcmaD05OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Retirarme" />
      </div>
      
      <div><h3>18. Tener en cuenta la advertencia</h3>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/1588e0aa-f637-4fa4-a2c6-0807124a2a40/031f2a49-883d-468b-a291-5037e3614c6b.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.5855&fp-z=1.4379&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=259&mark-y=225&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02ODImaD05OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Tener en cuenta la advertencia" />
      </div>
      
      <div><h3>19. Click en Sí, retirar</h3>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/2bb5dae0-a98e-4813-bba4-9b71280c7944/9a6fe8cb-fa43-4642-8f10-2c79f8126eec.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5433&fp-y=0.7193&fp-z=2.5810&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=465&mark-y=213&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNzEmaD0xMjImZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Sí, retirar" />
      </div>
      
      <div><h3>20. Retiro exitoso</h3>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/26c5ecef-f879-4ead-a192-e003b00544a8/d8422c89-f79a-4b33-8ec1-27fb1771c3c3.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4935&fp-y=0.4818&fp-z=1.5854&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=241&mark-y=49&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz03NDUmaD00ODkmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Retiro exitoso" />
      </div>
      
      <div><h3>21. Aquí podrás ver tus células</h3>
      <p>Si no tienes células retos o equipos, saldrá un mensaje de este tipo. <br>te inscribiste a una célula el proceso de retiro es el mismo que en retos</p>
      <img src="https://images.tango.us/workflows/f2563bb8-7ef6-46c7-82b9-1162d7d30dbb/steps/559bd32f-1640-410f-ad26-0d969de454e5/ef7580e0-60f1-4b66-8927-38910b7addc7.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5947&fp-y=0.6271&fp-z=1.4563&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=108&mark-y=198&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz05ODMmaD0xNTMmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Aquí podrás ver tus células" />
      </div>
      
      <br/>
      <hr/>
      <div>
      <span>Created with </span><a href="https://tango.us?utm_source=magicCopy&utm_medium=magicCopy&utm_campaign=workflow%20export%20links" target='_blank' style='color: #256EFF'>Tango.us
          </a>
      </div>`, 
      downloadLink: '/assets/helps/Guía para Actualizar Perfil.pdf' 
    },
    { 
      module: 'jovenes', 
      title: 'Ayuda de Jóvenes', 
      htmlContent: `
      <div><h3>1. Ingresar al módulo "Jóvenes"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/1bbd2554-5b4a-4c12-83ec-ed20a927d2a4/32c6376f-da18-49e7-9d4f-b8c540f05856.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ingresar al módulo &quot;Jóvenes&quot;" />
      </div>
      
      <div><h3>2. Presionamos el botón "Registrar Jóvenes"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/6a22d245-a6c4-4cc8-85a6-baba152023f8/b1e79a12-6795-474d-9284-79a9d9f7f3c8.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8540&fp-y=0.5922&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=502&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NTImaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Registrar Jóvenes&quot;" />
      </div>
      
      <div><h3>3. Rellenamos el campo "Nombre"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/695799e3-c9fd-4dde-bee3-db6b38541125/821dae72-3e9f-4953-a0d7-42e79d2511df.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4133&fp-y=0.3123&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Nombre&quot;" />
      </div>
      
      <div><h3>4. Rellenamos el campo "Apellido"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/f17d91aa-3323-408c-b9d1-7d8ac2e23628/a38d9cf6-191f-48ee-9988-6d72634de640.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5738&fp-y=0.3123&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Apellido&quot;" />
      </div>
      
      <div><h3>5. Seleccionamos el tipo de documento</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/844725fa-cf3e-40c2-a8cd-9f88c52b9cda/a3be55d3-784a-4bba-95ee-2b63d509e02f.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4133&fp-y=0.4169&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionamos el tipo de documento" />
      </div>
      
      <div><h3>6. Rellenamos el campo "Documento"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/949c7f76-6464-41e1-a97e-3da83928e05c/07655148-9b49-4ea5-8bec-e7b3b2944586.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5738&fp-y=0.4169&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Documento&quot;" />
      </div>
      
      <div><h3>7. Seleccionamos la fecha de nacimiento del joven</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/de44b7b3-2966-453d-b96f-f2fdbc87eb1a/723a48b3-1690-4dee-a10a-a23817ac8ea2.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4133&fp-y=0.5216&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionamos la fecha de nacimiento del joven" />
      </div>
      
      <div><h3>8. Rellenamos el campo  "Número de contacto"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/1ea9bbf6-afd7-4384-8df7-e40d93bc8aef/1369cf3c-b3fd-480a-a9f1-1e354ad4512b.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5738&fp-y=0.5216&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo  &quot;Número de contacto&quot;" />
      </div>
      
      <div><h3>9. Rellenamos el campo "Correo"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/e4acedc2-e403-453e-9acd-e1cd95713bc8/c3692409-aa87-4e40-b867-8fd995e4798c.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4935&fp-y=0.6262&fp-z=1.6265&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=293&mark-y=241&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MTQmaD02OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Correo&quot;" />
      </div>
      
      <div><h3>10. Seleccionamos el tipo de institución </h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/15461337-fae4-4534-ad6d-d844b13854f3/9880bedb-a651-4e83-bd56-697e1cd4956a.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4133&fp-y=0.7309&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionamos el tipo de institución " />
      </div>
      
      <div><h3>11. Seleccionamos la institución en la que está el joven</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/d261f826-9aa5-49bd-8c48-5494b3885dec/c1c98437-745d-4bcf-ad76-7fdcdde0a5ed.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5673&fp-y=0.3929&fp-z=2.2731&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=409&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zODImaD05MyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionamos la institución en la que está el joven" />
      </div>
      
      <div><h3>12. Rellenamos el campo "Habilidades"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/42ea6863-c542-4283-b362-ea57110ad5f2/d19f877f-86a1-47f9-b57c-34f05b91673a.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4935&fp-y=0.8555&fp-z=1.6265&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=293&mark-y=368&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MTQmaD0xMDQmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Habilidades&quot;" />
      </div>
      
      <div><h3>13. Rellenamos el campo "Características"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/1c8d5256-f85e-40e7-b909-4e1bb55aa3ea/1273bd26-632c-4933-ba39-cf02b649291a.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4935&fp-y=0.7226&fp-z=1.6265&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=293&mark-y=250&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MTQmaD0xMDQmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Características&quot;" />
      </div>
      
      <div><h3>14. Rellenamos el campo "Descripción"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/b8bfe8c1-03c2-4486-a1cf-08c1f1cbd5c5/7bd51189-c56b-4e58-8c93-edeaa18a09e9.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4935&fp-y=0.8870&fp-z=1.6265&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=293&mark-y=379&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MTQmaD0xNDAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Descripción&quot;" />
      </div>
      
      <div><h3>15. Presionamos el botón "Guardar"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/7335e7c8-0a94-4c01-acda-aae5cd78f58e/f783a6c9-7270-45fb-a727-642214476f2c.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6167&fp-y=0.8397&fp-z=2.5659&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=462&mark-y=273&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNzYmaD0xMDEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Guardar&quot;" />
      </div>
      
      <div><h3>16. Editar un joven</h3>
      </div>
      
      <div><h3>17. Presionamos el botón "Editar joven"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/e04a3942-8db8-4d87-89f8-4e7aa7cbc07b/5ca4240a-e7e5-4030-910e-0d5b0f9d3bf7.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8802&fp-y=0.8115&fp-z=4.0000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=547&mark-y=196&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xNTcmaD0xNTcmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Editar joven&quot;" />
      </div>
      
      <div><h3>18. Editamos el campo "Documento"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/86c25392-31dd-4707-9949-27902e58e607/a63074be-5117-4a74-b10f-fe06756a0675.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5738&fp-y=0.4169&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Editamos el campo &quot;Documento&quot;" />
      </div>
      
      <div><h3>19. Editamos el campo "Correo"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/bb3fcbc8-f8f2-4bdd-9bf2-e578758a0ce7/67c247e1-3eed-42ce-8d1b-fde5424056ce.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4935&fp-y=0.6262&fp-z=1.6265&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=293&mark-y=241&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MTQmaD02OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Editamos el campo &quot;Correo&quot;" />
      </div>
      
      <div><h3>20. Presionamos el botón "Guardar"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/e1a2116f-5392-439a-8a33-513afdd72509/843f6551-1d90-422f-ad9e-8b38ee1d918c.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6167&fp-y=0.8696&fp-z=2.5659&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=462&mark-y=315&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNzYmaD0xMDEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Guardar&quot;" />
      </div>
      
      <div><h3>21. Presionamos el botón "Ver perfil"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/5708dc37-bda2-4067-a787-c279ba101604/f5f62604-f465-4cce-8d2d-86144092887a.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8422&fp-y=0.5341&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=637&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDYmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Ver perfil&quot;" />
      </div>
      
      <div><h3>22. Vista del perfil del joven</h3>
      </div>
      
      <div><h3>23. Aquí se puede ver la información del joven</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/62475253-3c69-4103-8ca2-eda350391a1e/0cdf0952-1949-4b21-a5e9-e9bc119a4e3a.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5943&fp-y=0.6611&fp-z=1.2656&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=16&mark-y=83&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMTY4Jmg9NDYyJmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Aquí se puede ver la información del joven" />
      </div>
      
      <div><h3>24. Aquí se puede ver los logros del joven</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/87b739a5-20ef-46c0-9bb5-35220aff50a6/ee96b3ef-d313-4c2a-b419-80b131e692a6.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5943&fp-y=0.4676&fp-z=1.2804&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=23&mark-y=109&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMTUzJmg9MzMxJmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Aquí se puede ver los logros del joven" />
      </div>
      
      <div><h3>25. Aquí se ven los equipos del joven</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/c290b7c7-51aa-44e1-951b-33f21bd82355/dcdb60f6-88ea-4cf7-918e-30eb08c4323d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5909&fp-y=0.2932&fp-z=1.4482&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=111&mark-y=157&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz05NzgmaD0xNTImZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Aquí se ven los equipos del joven" />
      </div>
      
      <div><h3>26. Aquí se ven los retos del joven</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/603973a7-fd7f-4c91-9eaf-ff267880f9aa/a0473bfa-e43b-474d-9b16-c04f22c35156.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=373&mark-y=273&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02OTgmaD0xMDMmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Aquí se ven los retos del joven" />
      </div>
      
      <div><h3>27. Aquí se ven las células del joven</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/22984ce9-ecb7-4c15-9f97-810bc8f2fb00/fe16ee94-2164-4f1f-a815-c1ea3efa25e1.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5943&fp-y=0.6910&fp-z=1.8088&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=281&mark-y=116&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MzkmaD0zMTcmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Aquí se ven las células del joven" />
      </div>
      
      <div><h3>28. Click on Regresar</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/ab7151bb-f9f4-4713-854c-aaa52ada6293/1cc7dff2-2f55-4d3f-a2fd-7b2d361cbca6.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.2574&fp-y=0.1968&fp-z=2.5313&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=456&mark-y=224&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yODkmaD05OSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click on Regresar" />
      </div>
      
      <div><h3>29. Presionamos el botón "Regresar"</h3>
      <p>El botón "Regresar" lo presionamos para regresar al listado de los jóvenes</p>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/278897d1-7ae8-4979-a350-08d380dd2cd5/c4382b6a-cb43-4c54-8173-7b47c3de76b6.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.2574&fp-y=0.1968&fp-z=2.5313&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=456&mark-y=224&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yODkmaD05OSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Regresar&quot;" />
      </div>
      
      <div><h3>30. Presionamos el botón "Cambiar de estado"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/14507e74-4226-405a-b3cb-60cb7cdd5326/cfa669a1-ba57-4b00-bf4d-6a4a8e184dcb.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.9221&fp-y=0.5341&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=895&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDYmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Cambiar de estado&quot;" />
      </div>
      
      <div><h3>31. Presionamos el botón "Sí, cambiar estado"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/82e78ee0-1b8c-4a92-b350-fa982f6efe5f/84b12462-9953-4d23-a3fe-1272385a5c84.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4563&fp-y=0.7010&fp-z=2.2731&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=409&mark-y=221&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zODImaD0xMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Sí, cambiar estado&quot;" />
      </div>
      
      <div><h3>32. Mensaje de confirmación del cambio de estado</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/452cdb3d-a7c4-40d3-98ab-4e059acf31d2/d19f2e70-b9e7-443d-957c-4a25b3fe7488.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de confirmación del cambio de estado" />
      </div>
      
      <div><h3>33. Presionamos el botón "OK"</h3>
      <img src="https://images.tango.us/workflows/cb3deda1-8bf3-4535-9b98-ef0445769b31/steps/39534cbc-1f13-4bec-ab86-230fd84f95a4/e97951c7-fdd3-412e-9772-d759ddf81c79.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4996&fp-y=0.7010&fp-z=2.8680&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=516&mark-y=207&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xNjgmaD0xMzYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;OK&quot;" />
      </div>
      
      <br/>
      <hr/>`, 
      downloadLink: '/assets/helps/Registrar, Editar, Cambiar de estado y ver el perfil de un joven.pdf' 
    },
    { 
      module: 'facilitadores', 
      title: 'Ayuda de Facilitadores', 
      htmlContent: `
      <div><h3>1. Click en Facilitadores</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/2cf6a31b-d84a-44f0-85fc-68a89128c9ce/2b7962d9-0827-412a-b1ca-eea94af299f9.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.1068&fp-y=0.5772&fp-z=1.9700&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=7&mark-y=236&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00OTEmaD03NyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Facilitadores" />
      </div>
      
      <div><h3>2. Click en Registrar facilitador</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/60360cca-cba2-41df-978e-4b53264d7a2a/7f64279a-3961-4043-94a8-f317a370d481.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8502&fp-y=0.5922&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=478&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NzcmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Registrar facilitador" />
      </div>
      
      <div><h3>3. Escribir el nombre</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/5ac605d8-027b-4998-8609-1721c8e363a2/d164550b-931b-41ef-a579-3680e199adab.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4202&fp-y=0.3123&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Escribir el nombre" />
      </div>
      
      <div><h3>4. Escribir el apellido</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/5ccb72ee-eb36-4c6a-9f8c-cab0f4b9c5e1/38b8ef6b-26f1-4f03-a424-e082eaae7c38.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5806&fp-y=0.3123&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Escribir el apellido" />
      </div>
      
      <div><h3>5. seleccionar el tipo de documento</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/abea9df2-8b9c-4d7b-843c-b2d26a75c62b/cc53a7d4-b5e7-4348-9444-7b622144e679.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4202&fp-y=0.4169&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="seleccionar el tipo de documento" />
      </div>
      
      <div><h3>6. Escribir el número de documento</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/7b341211-17fc-4e7e-97e0-8d645e69419d/ec34c718-68f6-47e2-a17e-f58e9908d595.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5806&fp-y=0.4169&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Escribir el número de documento" />
      </div>
      
      <div><h3>7. Seleccionar la fecha de nacimiento</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/88c81999-ccdf-4e0d-8f22-f6dc9a9bb785/3628d427-1bab-4f58-a2fd-740127868a4a.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4202&fp-y=0.5482&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar la fecha de nacimiento" />
      </div>
      
      <div><h3>8. Escribir el correo</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/d1c69f27-4b0c-4813-9aa5-c2d120921f5a/b66f3819-7bce-4f59-979f-fb9b3330fb22.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5806&fp-y=0.5482&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Escribir el correo" />
      </div>
      
      <div><h3>9. Escribir el número de contacto</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/8579efbe-5851-4f51-90c0-bfed92874baf/59f790c0-4014-47ae-87ee-c6fc1502a69a.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4202&fp-y=0.6528&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Escribir el número de contacto" />
      </div>
      
      <div><h3>10. Escribir el cargo</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/617fb60a-7db3-483e-80ac-83e05689e9a0/b20f4a8d-4cf5-4da6-b8e4-3216d5bf84cc.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5806&fp-y=0.6528&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Escribir el cargo" />
      </div>
      
      <div><h3>11. Click en Guardar</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/50c26aca-5c1a-4a27-9adc-d2eab19de7dc/7462bfc3-6eec-4ff1-b657-0dfc8190f14d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6228&fp-y=0.8414&fp-z=2.5659&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=462&mark-y=275&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNzYmaD0xMDEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Guardar" />
      </div>
      
      <div><h3>12. Verificar los errores por validación</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/c50c1c01-4aff-44e8-b8aa-d9e7cbb21567/d26a49dd-ec15-425b-b7ab-79e030ae3d46.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5738&fp-y=0.4859&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=229&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Verificar los errores por validación" />
      </div>
      
      <div><h3>13. corregir</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/aba61aaa-26f7-46a2-8668-d266a07c4d72/c5ce5206-2829-4b72-9c81-6e21a0a2e0fd.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5738&fp-y=0.4169&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="corregir" />
      </div>
      
      <div><h3>14. Click en Guardar</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/5b1f1e16-67c2-445f-b482-27062187ccf3/34f382de-2f92-4496-918a-33291d538fd1.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6167&fp-y=0.8696&fp-z=2.5659&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=462&mark-y=315&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNzYmaD0xMDEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Guardar" />
      </div>
      
      <div><h3>15. Click en el icono para editar</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/040928a9-0488-422d-8a9a-f0d9e54a5d5e/9368c991-18bb-4a96-b7a2-aea3598faa76.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8810&fp-y=0.6736&fp-z=2.7615&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=751&mark-y=220&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDgmaD0xMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en el icono para editar" />
      </div>
      
      <div><h3>16. Editar el campo deseado</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/f6096b74-426f-4b47-99ff-6de82824b3fe/eb4a5a33-8219-417d-a60f-ea56d86ec172.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4202&fp-y=0.6528&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Editar el campo deseado" />
      </div>
      
      <div><h3>17. Click en Actualizar</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/d0021d73-1460-40bb-8f74-dee7191d88d2/b79ecf1a-f2c0-4863-a559-320a7e3edc3c.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6183&fp-y=0.8414&fp-z=2.4976&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=450&mark-y=283&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMDEmaD05OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Actualizar" />
      </div>
      
      <div><h3>18. Edición exitosa</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/2ad2268e-6131-47fe-8d81-f5214c1d5874/2fd9634c-3f7d-4c2e-887f-aead96c23873.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.5000&fp-z=1.4379&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=259&mark-y=126&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02ODImaD0yOTcmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Edición exitosa" />
      </div>
      
      <div><h3>19. Click en el icono para cambiar de estado</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/f9ec70c4-fcd4-4328-aee9-0d4d8b957a01/2cca8ee3-8e22-4702-be9d-d4db18cc0a6b.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.9228&fp-y=0.6736&fp-z=2.7615&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=890&mark-y=220&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDgmaD0xMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en el icono para cambiar de estado" />
      </div>
      
      <div><h3>20. Click en Sí, cambiar estado</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/f64984ea-548e-4d3c-82fd-eaba74ea6c42/6e74e12b-3904-4fa9-aaf2-a03296e54753.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4563&fp-y=0.7010&fp-z=2.2731&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=409&mark-y=221&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zODImaD0xMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Sí, cambiar estado" />
      </div>
      
      <div><h3>21. ¡Estado actualizado!…</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/0ff3e8dd-35ed-4139-9fed-fbc5ae68028f/b2731192-46fc-4ee0-9068-cc61428e8840.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.5008&fp-z=1.2727&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=298&mark-y=74&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MDQmaD00MDEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="¡Estado actualizado!…" />
      </div>
      
      <div><h3>22. Click en OK</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/8744bdce-0437-4cbc-ac39-a739f1aa6211/9fc090cd-1f83-4bc9-95d9-8db22ef7f30f.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4996&fp-y=0.7010&fp-z=2.8680&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=516&mark-y=207&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xNjgmaD0xMzYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en OK" />
      </div>
      
      <div><h3>23. Click el icono para descargar los registros</h3>
      <img src="https://images.tango.us/workflows/ce77bb6b-0f6f-4e41-ae96-98f29c084429/steps/f3563081-1abb-4d36-97b7-02cea95ca98a/e5111053-4b4d-4995-bf1e-84623145a180.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.9084&fp-y=0.2799&fp-z=2.5337&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=805&mark-y=209&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yMzQmaD0xMzImZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click el icono para descargar los registros" />
      </div>
      
      <br/>
      <hr/>`, 
      downloadLink: '/assets/helps/Registro y Actualización de Facilitadores.pdf' 
    },
    { 
      module: 'encargado', 
      title: 'Ayuda de Encargados', 
      htmlContent: `
      
      <div><h3>1. Ingresamos al módulo Encargados</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/d23e69cf-acb7-4eaf-bcd6-e2730314ae42/81cde7f2-32b6-4f23-a0bc-e017627674e0.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ingresamos al módulo Encargados" />
      </div>
      
      <div><h3>2. Presionamos el botón "Registrar encargado"</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/33c29fe2-027e-4c2a-bd4a-162923347d16/3eb7b1f9-4b76-40ca-bd49-d9428f18c170.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8487&fp-y=0.5507&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=468&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00ODYmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Registrar encargado&quot;" />
      </div>
      
      <div><h3>3. Rellenamos el campo "Nombre"</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/b7dc8c24-8efd-4edc-8b13-1e5d92a0bb38/31a0dbb8-378c-4d2e-8657-b79dc5f91f88.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4133&fp-y=0.3123&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Nombre&quot;" />
      </div>
      
      <div><h3>4. Rellenamos el campo "Apellido"</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/c6629252-b627-4c6b-89f3-93530f83418f/2f21c2be-5d39-4a25-89a7-319b3d7ed347.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5738&fp-y=0.3123&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Apellido&quot;" />
      </div>
      
      <div><h3>5. Seleccionamos el tipo de documento del encargado</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/bf810fd2-5c31-4523-a4d1-d633b9fb8eb5/41fd8910-8920-42f3-b912-1577fbd1d299.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4133&fp-y=0.4435&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionamos el tipo de documento del encargado" />
      </div>
      
      <div><h3>6. Rellenamos el campo "Documento"</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/7cbe5486-3caf-40f4-aff2-c5f0e8c7b99d/d7b7ba5a-3d94-4188-96cb-654754ae0fee.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5738&fp-y=0.4435&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Documento&quot;" />
      </div>
      
      <div><h3>7. Seleccionamos la fecha de nacimiento del encargado</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/583e83f5-fe45-49e0-9a90-cabdb03fe19e/a3163340-3ba4-4e9b-9d2e-118469c38d66.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4133&fp-y=0.5748&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionamos la fecha de nacimiento del encargado" />
      </div>
      
      <div><h3>8. Rellenamos el campo "Número de contacto"</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/bd17cd3d-bfc5-407d-a313-3332a9e09bac/5e700574-a5d9-429e-88b0-f4695194e5ab.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5738&fp-y=0.5748&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Número de contacto&quot;" />
      </div>
      
      <div><h3>9. Rellenamos el campo "Cargo"</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/0db0566d-c919-4f6b-a040-81adc895b878/281e40b2-a47f-4063-892e-c1205d6c23f6.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4133&fp-y=0.7060&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Cargo&quot;" />
      </div>
      
      <div><h3>10. Seleccionamos la empresa a la que pertenece el joven</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/518b7f09-e62d-44ea-8e1a-8dd52b6f2b75/208852d1-1d00-4513-965c-208a2c1c309f.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5738&fp-y=0.7060&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionamos la empresa a la que pertenece el joven" />
      </div>
      
      <div><h3>11. Presionamos el botón "Guardar"</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/86d7f2e3-6da7-466d-b258-dda999677b0d/2de7362b-6429-40bd-a3c2-0c4b9e390455.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6289&fp-y=0.9211&fp-z=2.5659&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=462&mark-y=388&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNzYmaD0xMDEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Guardar&quot;" />
      </div>
      
      <div><h3>12. Mensaje de confirmación de registro</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/d38d0107-3e19-43e0-b9ef-dacb75059d7f/770952e2-6862-4878-99f8-5a6cdfa44523.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de confirmación de registro" />
      </div>
      
      <div><h3>13. Editar un encargado</h3>
      </div>
      
      <div><h3>14. Presionamos el botón "Editar encargado"</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/db1addf8-2d62-40c8-9831-f32edbff4cd3/5da6c2b4-230a-4644-b1c2-65640618504a.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8719&fp-y=0.7350&fp-z=3.3260&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=623&mark-y=209&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMzEmaD0xMzEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Editar encargado&quot;" />
      </div>
      
      <div><h3>15. Editar el campo "Cargo"</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/57e557b2-e6a4-4d7f-a307-1c9db453cb18/9b051b64-1978-4bdf-aab2-debbbb60b536.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4133&fp-y=0.7060&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Editar el campo &quot;Cargo&quot;" />
      </div>
      
      <div><h3>16. Presionamos el botón "Actualizar"</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/70842051-b6fb-4e7a-a594-1ac77b73dcff/92a3bd08-fbfb-4880-9c05-424b89ac0151.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6236&fp-y=0.9211&fp-z=2.4976&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=450&mark-y=392&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMDEmaD05OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Actualizar&quot;" />
      </div>
      
      <div><h3>17. Mensaje de confirmación de la edición</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/f43b4056-58d6-432c-b663-11af673e8078/e48d04ec-3e24-4c94-b5ee-9f45a560a973.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de confirmación de la edición" />
      </div>
      
      <div><h3>18. Cambiar el estado de un encargado</h3>
      </div>
      
      <div><h3>19. Presionamos el botón "Cambiar estado"</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/9a325a5d-2f08-4e23-af52-ff6474f1c855/9129b1e1-0243-4678-b629-09b401b54a93.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.9152&fp-y=0.7350&fp-z=3.3260&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=796&mark-y=209&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMzEmaD0xMzEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Cambiar estado&quot;" />
      </div>
      
      <div><h3>20. Presionamos el botón "Sí, cambiar estado"</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/5ab0679c-7488-4a22-93be-1f2b6e769151/5068012d-42ca-4252-a15e-a1210b3341a8.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4563&fp-y=0.7010&fp-z=2.2731&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=409&mark-y=221&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zODImaD0xMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Sí, cambiar estado&quot;" />
      </div>
      
      <div><h3>21. Mensaje de confirmación de cambio de estado</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/9b8e8acb-264e-434f-876b-f802a1cdab63/109a5e86-a53d-4391-8b27-49d5190b41cf.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de confirmación de cambio de estado" />
      </div>
      
      <div><h3>22. Presionamos el botón "OK"</h3>
      <img src="https://images.tango.us/workflows/0bf11d11-5be5-4dfd-82fb-6f65cf305251/steps/20fa06a8-cc8d-4058-a6c7-b5dfdade20a8/37aa87d6-cf2a-4b53-957e-1bc666f43c37.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4996&fp-y=0.7010&fp-z=2.8680&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=516&mark-y=207&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xNjgmaD0xMzYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;OK&quot;" />
      </div>
      
      <br/>
      <hr/>`, 
      downloadLink: '/assets/helps/Registrar, editar y cambiar estado de Encargados.pdf' 
    },
    { 
      module: 'empresas', 
      title: 'Ayuda de Empresas', 
      htmlContent: `
      
      <div><h3>1. Ingresar al módulo Empresas</h3>
      <img src="https://images.tango.us/workflows/37ab69e3-f7c6-4d05-8bfc-995593d6553b/steps/a8a16628-ae0c-4a7e-9e03-0a4aafe1d94b/91e6bb9a-816e-47be-b94f-7342eb45b6e5.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ingresar al módulo Empresas" />
      </div>
      
      <div><h3>2. Presionar el botón "Registrar empresa"</h3>
      <img src="https://images.tango.us/workflows/37ab69e3-f7c6-4d05-8bfc-995593d6553b/steps/e032497d-fb36-4a76-b583-fe6dde3f0bcf/1df66781-f82b-461e-9b79-5d90f34a5c1b.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8536&fp-y=0.5922&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=500&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NTUmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Registrar empresa&quot;" />
      </div>
      
      <div><h3>3. Rellenar el campo "Nombre"</h3>
      <img src="https://images.tango.us/workflows/37ab69e3-f7c6-4d05-8bfc-995593d6553b/steps/9b8541fc-5a3c-4c4f-aee0-1ff4f6e13a01/79b00edd-21ee-4a1b-adbf-0996d9b2fa38.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4202&fp-y=0.3123&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenar el campo &quot;Nombre&quot;" />
      </div>
      
      <div><h3>4. Rellenar el campo "Correo"</h3>
      <img src="https://images.tango.us/workflows/37ab69e3-f7c6-4d05-8bfc-995593d6553b/steps/bc9b2a72-b5b1-46e9-a48d-251a6738b7a0/c78ed36e-0d33-4cdf-b28e-fc090fc98ba2.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5806&fp-y=0.3123&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenar el campo &quot;Correo&quot;" />
      </div>
      
      <div><h3>5. Rellenar el campo "Número de contacto"</h3>
      <img src="https://images.tango.us/workflows/37ab69e3-f7c6-4d05-8bfc-995593d6553b/steps/5173cdf2-6615-4a2e-a0bf-3b8419192994/f21af5d5-e42d-4ef7-8214-5aac138805d0.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4202&fp-y=0.4169&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenar el campo &quot;Número de contacto&quot;" />
      </div>
      
      <div><h3>6. Seleccionar el área a la que pertenece la empresa</h3>
      <img src="https://images.tango.us/workflows/37ab69e3-f7c6-4d05-8bfc-995593d6553b/steps/d6c4ce25-d289-428f-9447-4f478d12c129/9f48677a-9401-48e9-87e4-4ce24c564082.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5806&fp-y=0.4169&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionar el área a la que pertenece la empresa" />
      </div>
      
      <div><h3>7. Presionar el botón "Registrar"</h3>
      <img src="https://images.tango.us/workflows/37ab69e3-f7c6-4d05-8bfc-995593d6553b/steps/eb968f90-37bf-4594-b6ef-b4bfbd73eb0e/20a25e00-2385-49c8-8e30-0e3152ce2b4e.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6327&fp-y=0.6321&fp-z=2.5264&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=455&mark-y=225&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yOTAmaD05OSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Registrar&quot;" />
      </div>
      
      <div><h3>8. Mensaje de registro exitoso</h3>
      <img src="https://images.tango.us/workflows/37ab69e3-f7c6-4d05-8bfc-995593d6553b/steps/be1e23d1-4a10-4d51-a269-5543c1c061c1/c1866b5c-c1d8-4e87-86b3-392b44622c33.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de registro exitoso" />
      </div>
      
      <div><h3>9. Editar una empresa</h3>
      </div>
      
      <div><h3>10. Presionar el botón "Editar empresa"</h3>
      <img src="https://images.tango.us/workflows/37ab69e3-f7c6-4d05-8bfc-995593d6553b/steps/c6858c6f-d5eb-4aa4-b63a-c2152f2f729c/23e70f41-e8fb-4fa7-a31e-500a94491991.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8726&fp-y=0.6736&fp-z=2.7615&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=724&mark-y=220&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDgmaD0xMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Editar empresa&quot;" />
      </div>
      
      <div><h3>11. Editar el campo "Nombre"</h3>
      <img src="https://images.tango.us/workflows/37ab69e3-f7c6-4d05-8bfc-995593d6553b/steps/000043fb-8885-430f-9a2f-942ed99526a2/64f21247-f1d9-430b-8388-ee893fd3ba3f.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4202&fp-y=0.3123&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Editar el campo &quot;Nombre&quot;" />
      </div>
      
      <div><h3>12. Editar el campo "Número de contacto"</h3>
      <img src="https://images.tango.us/workflows/37ab69e3-f7c6-4d05-8bfc-995593d6553b/steps/1c864c90-4130-4db4-a2e6-c2c262d74375/0bede08c-8147-4cb9-8b60-bdfc4e6c8059.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4202&fp-y=0.4169&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Editar el campo &quot;Número de contacto&quot;" />
      </div>
      
      <div><h3>13. Presionar el botón "Actualizar"</h3>
      <img src="https://images.tango.us/workflows/37ab69e3-f7c6-4d05-8bfc-995593d6553b/steps/11fbc5b2-5132-4d0c-a025-097dc3978288/375b4521-bcc1-4225-8232-5742ba5acdea.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6304&fp-y=0.6321&fp-z=2.4976&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=450&mark-y=226&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMDEmaD05OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Actualizar&quot;" />
      </div>
      
      <div><h3>14. Mensaje de confirmación de edición</h3>
      <img src="https://images.tango.us/workflows/37ab69e3-f7c6-4d05-8bfc-995593d6553b/steps/ab341163-08ee-4b4f-b114-d635f44d9c57/fd8bacf5-b139-4ad6-aa51-1b131efa417e.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de confirmación de edición" />
      </div>
      
      <div><h3>15. Cambiar estado de una empresa</h3>
      </div>
      
      <div><h3>16. Presionar el botón "Cambiar estado"</h3>
      <img src="https://images.tango.us/workflows/37ab69e3-f7c6-4d05-8bfc-995593d6553b/steps/6c8edcdd-683b-4c73-bd61-8e6cf8b3311f/cebe3266-8eaa-40bd-acde-ed2ff9a2ae21.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.9144&fp-y=0.5341&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=871&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDYmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Cambiar estado&quot;" />
      </div>
      
      <div><h3>17. Presionar el botón "Sí, cambiar estado"</h3>
      <img src="https://images.tango.us/workflows/37ab69e3-f7c6-4d05-8bfc-995593d6553b/steps/06e67a9d-ed80-4209-87df-22a79f08cf31/7ef40c3e-9c0e-4066-9dff-c8551a1b258b.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4563&fp-y=0.6645&fp-z=2.2731&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=409&mark-y=221&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zODImaD0xMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Sí, cambiar estado&quot;" />
      </div>
      
      <div><h3>18. Presionar el botón "OK"</h3>
      <img src="https://images.tango.us/workflows/37ab69e3-f7c6-4d05-8bfc-995593d6553b/steps/67438ff8-f1fe-4426-988b-8d23463aa1aa/4e6f9161-726e-4239-b469-5d95b25a5dbb.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4996&fp-y=0.7010&fp-z=2.8680&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=516&mark-y=207&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xNjgmaD0xMzYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;OK&quot;" />
      </div>
      
      <div><h3>19. Descargar registro de las empresas</h3>
      </div>
      
      <div><h3>20. Presionar el botón "Descargar registros"</h3>
      <img src="https://images.tango.us/workflows/37ab69e3-f7c6-4d05-8bfc-995593d6553b/steps/d281c1d5-916e-42b0-893e-1afbc357751f/f20497e3-e352-44a6-b38a-a0138cb378a1.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.9084&fp-y=0.3414&fp-z=2.5337&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=805&mark-y=209&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yMzQmaD0xMzImZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionar el botón &quot;Descargar registros&quot;" />
      </div>
      
      <br/>
      <hr/>`, 
      downloadLink: '/assets/helps/Registrar, editar, cambiar de estado y descargar registros de Empresa.pdf' 
    },
    { 
      module: 'iniciar-sesion', 
      title: 'Ayuda de Inicio de Sesión', 
      htmlContent: `
<div><h3>1. Correo</h3>
<p>Se ingresa el correo electrónico</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/2b3f8b7d-be9c-4281-8924-d7d585d58f1a/f57d6a58-6423-40c3-b384-654989f699da.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.2084&fp-y=0.4726&fp-z=1.5988&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=88&mark-y=235&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD04MCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Correo" />
</div>

<div><h3>2. Contraseña</h3>
<p>Se ingresa la contraseña</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/0dbdbcf4-61a9-40f5-b40e-5277165507b6/a6e4e596-89fb-4988-b01e-44c2b30985d6.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.2084&fp-y=0.6204&fp-z=1.5988&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=88&mark-y=235&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD04MCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Contraseña" />
</div>

<div><h3>3. Click en Iniciar sesión</h3>
<p>Presionamos en botón iniciar sesión</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/a898a269-cc6e-48f0-857d-fbb8e0a87361/c28d2d63-53c6-4cdc-800f-da300cca6406.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.2084&fp-y=0.7749&fp-z=1.5988&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=88&mark-y=320&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD02MyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Iniciar sesión" />
</div>

<div><h3>4. Click en ¿Olvidaste tu contraseña?</h3>
<p>Click en ¿Olvidaste tu contraseña? si olvidaste tu contraseña</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/81e978d0-dd2b-40ea-a1df-36bf9d4c76ab/8815c829-61ec-4cf5-a850-f4534418822c.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.2943&fp-y=0.7101&fp-z=2.2045&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=397&mark-y=246&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDYmaD01OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en ¿Olvidaste tu contraseña?" />
</div>

<div><h3>5. Correo</h3>
<p>Ingresamos nuestro correo electrónico</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/3dd0ddb5-c3b9-4c5a-b215-a67f0ed394e7/fe923e5d-228a-42ca-a90d-c195dbfec0d9.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.4626&fp-z=1.5988&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=288&mark-y=235&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD04MCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Correo" />
</div>

<div><h3>6. Click en Reenviar</h3>
<p>Si al darle click en el botón Enviar, no llega el correo con el código,<br> damos click en el botón Reenviar al lado del mensaje "¿No recibiste tu código? "</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/af4f8343-b749-4789-8d29-aa00816aed90/408dc6cf-b3bd-4a8b-a77d-29af594fc859.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5570&fp-y=0.6404&fp-z=2.8128&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=506&mark-y=243&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xODcmaD02NCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Reenviar" />
</div>

<div><h3>7. Ir al correo electrónico</h3>
<p>Debemos verificar nuestra bandeja de entrada para visualizar el correo con el código</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/b8a75bb9-57ca-4ab8-875e-c37a5aadea3d/6e46c862-6dd5-488b-a095-79c28e9fe156.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ir al correo electrónico" />
</div>

<div><h3>8. Ingresamos el código y presionamos en verificar</h3>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/0f2d15ad-f8b2-49a1-8a71-4e3d782f3358/41c6ce0b-5c8c-4e49-955d-a32fbbc6dc44.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5064&fp-y=0.5379&fp-z=1.5988&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=276&mark-y=249&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD02MyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ingresamos el código y presionamos en verificar" />
</div>

<div><h3>9. Contraseña</h3>
<p>Insertamos nuestra nueva contraseña</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/70219837-5a7c-450d-a606-a6492c3f2d69/dd2ad0d7-e72e-4ccb-ad59-74f28ba181a0.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4862&fp-y=0.5719&fp-z=1.5988&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=315&mark-y=121&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD04MCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Contraseña" />
</div>

<div><h3>10. Confirmar contraseña</h3>
<p>Ingresamos nuevamente la contraseña</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/9882b897-04ca-448f-81f6-c9df0e48b8f5/b8eb8897-a608-48a8-a8aa-a9affbe36e8d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.5905&fp-z=1.5988&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=288&mark-y=235&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD04MCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Confirmar contraseña" />
</div>

<div><h3>11. Ver contraseñas</h3>
<p>Al dar click en "hide", vemos la contraseña digitada</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/27ec5836-248d-4734-b2ad-21e77a91b718/f92a5e62-6ddd-4c8b-a331-613b5fde163c.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6342&fp-y=0.4460&fp-z=2.8721&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=555&mark-y=237&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz04OSZoPTc2JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ver contraseñas" />
</div>

<div><h3>12. Presionamos el botón "Restablecer"</h3>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/cb738d2d-67d6-45b8-9459-0cd7526a93e0/e7869210-45f1-45d1-af16-426d76e89b1d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.6752&fp-z=1.5988&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=288&mark-y=243&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD02MyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Restablecer&quot;" />
</div>

<div><h3>13. Iniciar sesión</h3>
<p>Volvemos a repetir el paso 1 al reestablecer contraseña</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/ed67a264-2c7c-4c07-9fb6-31b39cbb2fff/3046aacb-d045-4dd4-bc24-6c6d8da7aaab.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.2084&fp-y=0.5623&fp-z=1.2040&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=22&mark-y=15&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz01NTgmaD01MjAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Iniciar sesión" />
</div>

<br/>
<hr/>
<div>
<span>Created with </span><a href="https://tango.us?utm_source=magicCopy&utm_medium=magicCopy&utm_campaign=workflow%20export%20links" target='_blank' style='color: #256EFF'>Tango.us
    </a>
</div>`, 
      downloadLink: '/assets/helps/Iniciar sesión y recuperar contraseña.pdf' 
    },
    { 
      module: 'recuperar-contrasena', 
      title: 'Ayuda de Recuperación de Contraseña', 
      htmlContent: `

<div><h3>1. Correo</h3>
<p>Se ingresa el correo electrónico</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/2b3f8b7d-be9c-4281-8924-d7d585d58f1a/f57d6a58-6423-40c3-b384-654989f699da.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.2084&fp-y=0.4726&fp-z=1.5988&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=88&mark-y=235&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD04MCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Correo" />
</div>

<div><h3>2. Contraseña</h3>
<p>Se ingresa la contraseña</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/0dbdbcf4-61a9-40f5-b40e-5277165507b6/a6e4e596-89fb-4988-b01e-44c2b30985d6.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.2084&fp-y=0.6204&fp-z=1.5988&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=88&mark-y=235&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD04MCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Contraseña" />
</div>

<div><h3>3. Click en Iniciar sesión</h3>
<p>Presionamos en botón iniciar sesión</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/a898a269-cc6e-48f0-857d-fbb8e0a87361/c28d2d63-53c6-4cdc-800f-da300cca6406.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.2084&fp-y=0.7749&fp-z=1.5988&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=88&mark-y=320&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD02MyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Iniciar sesión" />
</div>

<div><h3>4. Click en ¿Olvidaste tu contraseña?</h3>
<p>Click en ¿Olvidaste tu contraseña? si olvidaste tu contraseña</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/81e978d0-dd2b-40ea-a1df-36bf9d4c76ab/8815c829-61ec-4cf5-a850-f4534418822c.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.2943&fp-y=0.7101&fp-z=2.2045&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=397&mark-y=246&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDYmaD01OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en ¿Olvidaste tu contraseña?" />
</div>

<div><h3>5. Correo</h3>
<p>Ingresamos nuestro correo electrónico</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/3dd0ddb5-c3b9-4c5a-b215-a67f0ed394e7/fe923e5d-228a-42ca-a90d-c195dbfec0d9.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.4626&fp-z=1.5988&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=288&mark-y=235&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD04MCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Correo" />
</div>

<div><h3>6. Click en Reenviar</h3>
<p>Si al darle click en el botón Enviar, no llega el correo con el código,<br> damos click en el botón Reenviar al lado del mensaje "¿No recibiste tu código? "</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/af4f8343-b749-4789-8d29-aa00816aed90/408dc6cf-b3bd-4a8b-a77d-29af594fc859.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5570&fp-y=0.6404&fp-z=2.8128&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=506&mark-y=243&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xODcmaD02NCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Click en Reenviar" />
</div>

<div><h3>7. Ir al correo electrónico</h3>
<p>Debemos verificar nuestra bandeja de entrada para visualizar el correo con el código</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/b8a75bb9-57ca-4ab8-875e-c37a5aadea3d/6e46c862-6dd5-488b-a095-79c28e9fe156.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ir al correo electrónico" />
</div>

<div><h3>8. Ingresamos el código y presionamos en verificar</h3>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/0f2d15ad-f8b2-49a1-8a71-4e3d782f3358/41c6ce0b-5c8c-4e49-955d-a32fbbc6dc44.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5064&fp-y=0.5379&fp-z=1.5988&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=276&mark-y=249&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD02MyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ingresamos el código y presionamos en verificar" />
</div>

<div><h3>9. Contraseña</h3>
<p>Insertamos nuestra nueva contraseña</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/70219837-5a7c-450d-a606-a6492c3f2d69/dd2ad0d7-e72e-4ccb-ad59-74f28ba181a0.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4862&fp-y=0.5719&fp-z=1.5988&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=315&mark-y=121&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD04MCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Contraseña" />
</div>

<div><h3>10. Confirmar contraseña</h3>
<p>Ingresamos nuevamente la contraseña</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/9882b897-04ca-448f-81f6-c9df0e48b8f5/b8eb8897-a608-48a8-a8aa-a9affbe36e8d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.5905&fp-z=1.5988&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=288&mark-y=235&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD04MCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Confirmar contraseña" />
</div>

<div><h3>11. Ver contraseñas</h3>
<p>Al dar click en "hide", vemos la contraseña digitada</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/27ec5836-248d-4734-b2ad-21e77a91b718/f92a5e62-6ddd-4c8b-a331-613b5fde163c.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6342&fp-y=0.4460&fp-z=2.8721&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=555&mark-y=237&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz04OSZoPTc2JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ver contraseñas" />
</div>

<div><h3>12. Presionamos el botón "Restablecer"</h3>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/cb738d2d-67d6-45b8-9459-0cd7526a93e0/e7869210-45f1-45d1-af16-426d76e89b1d.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5004&fp-y=0.6752&fp-z=1.5988&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=288&mark-y=243&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjQmaD02MyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Restablecer&quot;" />
</div>

<div><h3>13. Iniciar sesión</h3>
<p>Volvemos a repetir el paso 1 al reestablecer contraseña</p>
<img src="https://images.tango.us/workflows/71b8b2a0-d82c-4dd1-b0fd-67223f078432/steps/ed67a264-2c7c-4c07-9fb6-31b39cbb2fff/3046aacb-d045-4dd4-bc24-6c6d8da7aaab.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.2084&fp-y=0.5623&fp-z=1.2040&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=22&mark-y=15&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz01NTgmaD01MjAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Iniciar sesión" />
</div>

<br/>
<hr/>
<div>
<span>Created with </span><a href="https://tango.us?utm_source=magicCopy&utm_medium=magicCopy&utm_campaign=workflow%20export%20links" target='_blank' style='color: #256EFF'>Tango.us
    </a>
</div>`, 
      downloadLink: '/assets/helps/Iniciar sesión y recuperar contraseña.pdf' 
    },{ 
      module: 'asistencia', 
      title: 'Ayuda de Recuperación de Contraseña', 
      htmlContent: ``, 
      downloadLink: '/assets/helps/Guía de Asistencia para Jóvenes Talento en Diciembre 2024.pdf' 
    },{ 
      module: 'instituciones', 
      title: 'Ayuda de Instituciones', 
      htmlContent: `
      
      <div><h3>1. Ingresamos al módulo Instituciones</h3>
      <img src="https://images.tango.us/workflows/da8cdb00-e30f-41b6-83d2-781080dc1bde/steps/d91316f5-1d41-4d3b-9936-0944937baddc/e73114a3-ed40-4a23-9619-5b2a98018786.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Ingresamos al módulo Instituciones" />
      </div>
      
      <div><h3>2. Presionamos el botón "Registrar Institución"</h3>
      <img src="https://images.tango.us/workflows/da8cdb00-e30f-41b6-83d2-781080dc1bde/steps/277e4050-34ae-4e2c-a970-611f191d902c/bc847c6a-a156-4595-a69a-8740ff9c0709.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8487&fp-y=0.5507&fp-z=2.6923&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=468&mark-y=222&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00ODYmaD0xMDYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Registrar Institución&quot;" />
      </div>
      
      <div><h3>3. Rellenamos el campo "Nombre"</h3>
      <img src="https://images.tango.us/workflows/da8cdb00-e30f-41b6-83d2-781080dc1bde/steps/05a7b14f-0bfd-4976-a4aa-f7b33ee48dac/9f6951ee-b8b4-41aa-a5f2-3158139850b8.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4202&fp-y=0.3123&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Nombre&quot;" />
      </div>
      
      <div><h3>4. Rellenamos el campo "Rector"</h3>
      <img src="https://images.tango.us/workflows/da8cdb00-e30f-41b6-83d2-781080dc1bde/steps/571c53df-eb48-41db-bb04-7de86e0c8690/84412029-e104-483d-8fd5-d57d4c8fd3ee.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5806&fp-y=0.3123&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Rector&quot;" />
      </div>
      
      <div><h3>5. Rellenamos el campo "Número de contacto"</h3>
      <img src="https://images.tango.us/workflows/da8cdb00-e30f-41b6-83d2-781080dc1bde/steps/722b955c-db57-4bab-a389-95fcd7721cd8/99da5e7f-37d3-428d-b001-398f0c3bd17f.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4202&fp-y=0.4169&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Rellenamos el campo &quot;Número de contacto&quot;" />
      </div>
      
      <div><h3>6. Seleccionamos al facilitador asociado a la institución</h3>
      <img src="https://images.tango.us/workflows/da8cdb00-e30f-41b6-83d2-781080dc1bde/steps/6d5f3c98-92ac-41e0-beed-53013556a66d/f8d27b17-3bc5-42ee-a5e6-328812dff807.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5806&fp-y=0.4169&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Seleccionamos al facilitador asociado a la institución" />
      </div>
      
      <div><h3>7. Presionamos el botón "Guardar"</h3>
      <img src="https://images.tango.us/workflows/da8cdb00-e30f-41b6-83d2-781080dc1bde/steps/7aac5225-98d6-4755-ba9c-32e56153d5ff/bfcfa9e2-1923-43b9-9c77-2503db2c33df.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6228&fp-y=0.6055&fp-z=2.5659&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=462&mark-y=224&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNzYmaD0xMDEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Guardar&quot;" />
      </div>
      
      <div><h3>8. Mensaje de confirmación del registro</h3>
      <img src="https://images.tango.us/workflows/da8cdb00-e30f-41b6-83d2-781080dc1bde/steps/2eabb840-d02f-4eee-9469-395d98aa2a63/c8b08d0a-e71d-4f9f-9027-0bd52b56aaca.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de confirmación del registro" />
      </div>
      
      <div><h2># Editar una institución</h2></div>
      
      <div><h3>9. Presionamos el botón "Editar institución"</h3>
      <img src="https://images.tango.us/workflows/da8cdb00-e30f-41b6-83d2-781080dc1bde/steps/6898c982-aca9-4347-8fa5-f4b15ead5adf/3c16b994-589f-4802-95d7-ae040fdb68c5.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8498&fp-y=0.6736&fp-z=2.7615&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=648&mark-y=220&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDgmaD0xMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Editar institución&quot;" />
      </div>
      
      <div><h3>10. Editamos el campo "Rector"</h3>
      <img src="https://images.tango.us/workflows/da8cdb00-e30f-41b6-83d2-781080dc1bde/steps/9b30ee2c-0834-4ce4-9372-29e2d06a98db/82cb2304-e780-44fb-891c-0df8353ab75e.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5806&fp-y=0.3123&fp-z=2.2008&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=396&mark-y=228&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00MDgmaD05MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Editamos el campo &quot;Rector&quot;" />
      </div>
      
      <div><h3>11. Presionamos el botón "Actualizar"</h3>
      <img src="https://images.tango.us/workflows/da8cdb00-e30f-41b6-83d2-781080dc1bde/steps/d010e35d-0dd6-433a-9881-f85f58e4fe93/0b51910f-6691-4083-b150-c899bc37b0db.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.6183&fp-y=0.6055&fp-z=2.4976&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=450&mark-y=226&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMDEmaD05OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Actualizar&quot;" />
      </div>
      
      <div><h3>12. Mensaje de confirmación de la edición</h3>
      <img src="https://images.tango.us/workflows/da8cdb00-e30f-41b6-83d2-781080dc1bde/steps/72ecff65-f921-4d17-a4be-3dacd7409895/407caf67-8173-456c-82b4-54d06470c4a7.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de confirmación de la edición" />
      </div>
      
      <div><h2># Cambiar estado de una isntitución</h2></div>
      
      <div><h3>13. Presionamos el botón "Cambiar estado"</h3>
      <img src="https://images.tango.us/workflows/da8cdb00-e30f-41b6-83d2-781080dc1bde/steps/21620001-41c0-429b-acd0-370314df9d43/babacb98-eac6-41a7-8d20-c0391eb244d6.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.8886&fp-y=0.6736&fp-z=2.7615&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=777&mark-y=220&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDgmaD0xMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Cambiar estado&quot;" />
      </div>
      
      <div><h3>14. Mensaje de advertencia de cambio de estado</h3>
      <img src="https://images.tango.us/workflows/da8cdb00-e30f-41b6-83d2-781080dc1bde/steps/2f4f5bf5-86aa-4e7f-adee-d661cc8c718b/a797e6b4-d65f-4b15-8494-53e72a5d83b0.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Mensaje de advertencia de cambio de estado" />
      </div>
      
      <div><h3>15. Presionamos el botón "Sí, cambiar estado"</h3>
      <img src="https://images.tango.us/workflows/da8cdb00-e30f-41b6-83d2-781080dc1bde/steps/8533ba92-c858-47f0-9e76-0e0638388fa8/04eb7c60-c3e4-403f-8915-cf74b10b6428.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4563&fp-y=0.7010&fp-z=2.2731&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=409&mark-y=221&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zODImaD0xMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;Sí, cambiar estado&quot;" />
      </div>
      
      <div><h3>16. Presionamos el botón "OK"</h3>
      <img src="https://images.tango.us/workflows/da8cdb00-e30f-41b6-83d2-781080dc1bde/steps/73af836a-0eee-4495-81f2-a83e830c77f6/e23b22cc-d148-47dc-95a0-6a73e92bb8e5.png?fm=png&crop=focalpoint&fit=crop&fp-x=0.4996&fp-y=0.7010&fp-z=2.8680&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=516&mark-y=207&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xNjgmaD0xMzYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D" style="border-radius: 8px; border: 1px solid #F4F2F7;" width="600" alt="Presionamos el botón &quot;OK&quot;" />
      </div>
      
      <br/>
      <hr/>`, 
      downloadLink: '/assets/helps/Proceso de Registro y Actualización de Institución en Jóvenes Talento.pdf' 
    }
  ];

  availableHelp: HelpDocument[] = [];
  selectedHelp: HelpDocument | null = null;

  isMobileView: boolean = false;
  showModuleList: boolean = true;


  loadAvailableHelp(role: string | null) {
    switch(role) {
      case 'ADMIN':
        this.availableHelp = this.allHelps.filter(help => 
          ['retos','celulas','sesiones','encargados','facilitadores','empresas','equipos','instituciones','usuarios', 'logros', 'equipos','roles','iniciar-sesion', 'recuperar-contrasena','perfil'].includes(help.module)
        );
        break;
      case 'JOVEN':
        this.availableHelp = this.allHelps.filter(help => 
          ['retos-jovenes', 'celulas-jovenes', 'sesiones-jovenes','perfil', 'iniciar-sesion', 'recuperar-contrasena'].includes(help.module)
        );
        break;

      case 'EMPLEADO':
        this.availableHelp = this.allHelps.filter(help => 
          ['asistencia','iniciar-sesion', 'recuperar-contrasena'].includes(help.module)
        );
        break;
      default:
        this.availableHelp = [];
    }
  }

  selectHelp(help: HelpDocument) {
    this.selectedHelp = help;
  
    // Usar SweetAlert para mostrar el contenido
    if (help.htmlContent || help.downloadLink) {
      Swal.fire({
        title: help.title,
        html: help.htmlContent || '<p>No hay contenido disponible.</p>',
        showCloseButton: true,
        showCancelButton: !!help.downloadLink, // Muestra el botón si hay enlace de descarga
        cancelButtonText: 'Descargar Ayuda',
        confirmButtonText: 'Cerrar',
        customClass: {
          popup: 'modal-dialog', // Clase personalizada para el ancho
        },
        didOpen: () => {
          // Opcional: acciones adicionales al abrir el modal
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel && help.downloadLink) {
          this.downloadHelp(help); // Llamar al método de descarga
        }
      });
    }
     else {
      Swal.fire({
        title: 'Sin contenido',
        text: 'Este módulo no tiene ayuda disponible.',
        icon: 'info',
        confirmButtonText: 'Cerrar',
      });
    }
  }
  

  ngAfterViewChecked() {
    this.processImages();
  }

  processImages() {
    if (!this.selectedHelp) return;

    const helpContent = this.el.nativeElement.querySelector('.help-text');
    if (!helpContent) return;

    const images = helpContent.querySelectorAll('img');
    images.forEach((img: HTMLImageElement) => {
      // Add classes for responsive behavior
      if (this.isMobileView) {
        // Check for specific image classes or data attributes
        if (img.classList.contains('no-resize')) {
          // Keep original size for specific images
          return;
        }

        if (img.classList.contains('full-width')) {
          // Full viewport width images
          img.classList.add('full-width');
        } else {
          // Default responsive behavior
          img.style.maxWidth = '100%';
          img.style.height = 'auto';
        }
      }
    });
  }
 // Existing mobile navigation methods
 toggleModuleList() {
  this.showModuleList = !this.showModuleList;
}

backToModules() {
  this.showModuleList = true;
}
  downloadHelp(help: HelpDocument) {
    if (help.downloadLink) {
      // Trigger file download
      const link = document.createElement('a');
      link.href = help.downloadLink;
      link.download = `${help.module}-help.pdf`;
      link.click();
    }
  }

}
