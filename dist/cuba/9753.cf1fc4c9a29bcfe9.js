"use strict";(self.webpackChunkcuba=self.webpackChunkcuba||[]).push([[9753],{9753:(P,_,l)=>{l.r(_),l.d(_,{RetosModule:()=>z});var m=l(6814),g=l(965),d=l(6223),b=l(4807),q=l(6208),a=l(9862),h=l(8468),v=l(6505),x=l(1659),e=l(5879);let Z=(()=>{class i{constructor(){this.numbers=[1,2,3,4,5]}ngOnInit(){}static#e=this.\u0275fac=function(o){return new(o||i)};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-table-components"]],decls:0,vars:0,template:function(o,s){}})}return i})();function T(i,r){if(1&i){const t=e.EpF();e.TgZ(0,"span",24)(1,"button",25),e.NdJ("click",function(s){e.CHM(t);const n=e.oxw().$implicit,c=e.oxw(2),p=e.MAs(14);return c.openVerticallyCentered(p,n.id),e.KtG(s.stopPropagation())}),e._uU(2," Participar "),e.qZA()()}}function A(i,r){if(1&i){const t=e.EpF();e.TgZ(0,"span",24)(1,"button",26),e.NdJ("click",function(s){e.CHM(t);const n=e.oxw().$implicit;return e.oxw(2).retirarDelReto(n.id),e.KtG(s.stopPropagation())}),e._uU(2,"Retirarme"),e.qZA()()}}function C(i,r){1&i&&e._UZ(0,"span",24)}function E(i,r){if(1&i){const t=e.EpF();e.TgZ(0,"div",19)(1,"a",20),e.NdJ("click",function(){const n=e.CHM(t).$implicit,c=e.oxw(2),p=e.MAs(18);return e.KtG(c.detallemodal(p,n))}),e.TgZ(2,"div",13)(3,"div",0)(4,"div",14),e._UZ(5,"img",21),e.TgZ(6,"div",15)(7,"h6",16)(8,"a",17),e._uU(9),e.qZA()(),e.YNc(10,T,3,0,"span",22),e.YNc(11,A,3,0,"span",22),e.YNc(12,C,1,0,"span",22),e.TgZ(13,"p")(14,"span"),e._uU(15),e.qZA(),e._UZ(16,"br"),e.TgZ(17,"span"),e._uU(18),e.qZA()()()(),e.TgZ(19,"div",23)(20,"p"),e._uU(21),e.qZA()()()()()()}if(2&i){const t=r.$implicit,o=e.oxw(2);e.xp6(5),e.Q6J("src",t.logo,e.LSH),e.xp6(4),e.Oqu(t.nombre),e.xp6(1),e.Q6J("ngIf",!o.isJovenRegistradoEnReto(t.id)&&!o.isInscripcionFinalizada(t.inicioInscripcion,t.finInscripcion)),e.xp6(1),e.Q6J("ngIf",o.isJovenRegistradoEnReto(t.id)),e.xp6(1),e.Q6J("ngIf",!o.isJovenRegistradoEnReto(t.id)&&o.isInscripcionFinalizada(t.inicioInscripcion,t.finInscripcion)),e.xp6(3),e.hij("Desde: ",t.fechaInicio,""),e.xp6(3),e.hij("Hasta: ",t.fechaFin,""),e.xp6(3),e.Oqu(t.descripcion)}}function y(i,r){if(1&i&&(e.TgZ(0,"div",11)(1,"div",12)(2,"div",13)(3,"div",0)(4,"div",14)(5,"div",15)(6,"h6",16)(7,"a",17),e._uU(8,"Retos"),e.qZA()(),e.TgZ(9,"p"),e._uU(10,"Informaci\xf3n sobre los retos actuales..."),e.qZA()()()()()(),e.YNc(11,E,22,8,"div",18),e.qZA()),2&i){const t=e.oxw();e.xp6(11),e.Q6J("ngForOf",t.retos)}}const j=function(i){return[i]};function M(i,r){if(1&i&&e._UZ(0,"img",28),2&i){const t=e.oxw().$implicit;e.Q6J("src",e.VKq(1,j,t.img),e.LSH)}}function k(i,r){1&i&&e.YNc(0,M,1,3,"ng-template",27),2&i&&e.Q6J("id",r.$implicit.id)}function R(i,r){if(1&i){const t=e.EpF();e.TgZ(0,"div",19)(1,"div",13)(2,"a")(3,"div",38)(4,"div",14)(5,"div",15)(6,"h6",16)(7,"a",17),e._uU(8),e.qZA()(),e.TgZ(9,"a",39),e.NdJ("click",function(s){const c=e.CHM(t).$implicit,p=e.oxw(3);return p.detalleEquipo(p.equipoModal,c),e.KtG(s.stopPropagation())}),e.TgZ(10,"p"),e._uU(11,"Presiona aqu\xed para ver a los participantes de este equipo..."),e.qZA()()()()()()()()}if(2&i){const t=r.$implicit;e.xp6(8),e.hij(" ",t.equiposid.nombre,"")}}function w(i,r){if(1&i&&(e.TgZ(0,"div")(1,"div",37),e.YNc(2,R,12,1,"div",18),e.qZA()()),2&i){const t=e.oxw(2);e.xp6(2),e.Q6J("ngForOf",t.equiposAsociados)}}function J(i,r){1&i&&(e.TgZ(0,"p"),e._uU(1,"A\xfan no hay equipos inscritos a este reto."),e.qZA())}function U(i,r){if(1&i){const t=e.EpF();e.TgZ(0,"div",29)(1,"h4",30),e._uU(2,"Elije tu equipo"),e.qZA(),e.TgZ(3,"button",31),e.NdJ("click",function(){const n=e.CHM(t).$implicit;return e.KtG(n.dismiss("Cross click"))}),e.qZA()(),e.TgZ(4,"div",32),e.YNc(5,w,3,1,"div",33),e.YNc(6,J,2,0,"ng-template",null,34,e.W1O),e.qZA(),e.TgZ(8,"div",35)(9,"button",36),e.NdJ("click",function(){e.CHM(t);const s=e.oxw(),n=e.MAs(16);return e.KtG(s.openCreateTeamModal(n))}),e._uU(10,"Crear Equipo"),e.qZA()()}if(2&i){const t=e.MAs(7),o=e.oxw();e.xp6(5),e.Q6J("ngIf",o.equiposAsociados.length>0)("ngIfElse",t)}}function I(i,r){if(1&i){const t=e.EpF();e.TgZ(0,"div",29)(1,"h4",40),e._uU(2,"Crear Nuevo Equipo"),e.qZA(),e.TgZ(3,"button",31),e.NdJ("click",function(){const n=e.CHM(t).$implicit;return e.KtG(n.dismiss("Cross click"))}),e.qZA()(),e.TgZ(4,"div",41)(5,"form",42),e.NdJ("ngSubmit",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.createTeam())}),e.TgZ(6,"div",43)(7,"label",44),e._uU(8,"Nombre del Equipo"),e.qZA(),e.TgZ(9,"input",45),e.NdJ("ngModelChange",function(s){e.CHM(t);const n=e.oxw();return e.KtG(n.newEquipos.nombre=s)}),e.qZA()(),e.TgZ(10,"button",46),e._uU(11,"Crear Equipo"),e.qZA()()()}if(2&i){const t=e.oxw();e.xp6(9),e.Q6J("ngModel",t.newEquipos.nombre)}}function O(i,r){if(1&i&&(e.TgZ(0,"div",53)(1,"div",54)(2,"div",0)(3,"h5",55),e._uU(4,"Descripci\xf3n del Reto"),e.qZA(),e.TgZ(5,"p",56),e._uU(6),e.qZA()()(),e.TgZ(7,"div",57)(8,"div",0)(9,"h5",58),e._uU(10,"L\xednea de Tiempo"),e.qZA(),e.TgZ(11,"div",59)(12,"div",60),e._UZ(13,"div",61),e.TgZ(14,"div",62)(15,"h6",63),e._uU(16,"Per\xedodo de Inscripci\xf3n"),e.qZA(),e.TgZ(17,"div",64)(18,"div")(19,"small",65),e._uU(20,"Inicio:"),e.qZA(),e.TgZ(21,"p",66),e._uU(22),e.ALo(23,"date"),e.qZA()(),e.TgZ(24,"div")(25,"small",65),e._uU(26,"Fin:"),e.qZA(),e.TgZ(27,"p",66),e._uU(28),e.ALo(29,"date"),e.qZA()()()()(),e.TgZ(30,"div",60),e._UZ(31,"div",67),e.TgZ(32,"div",62)(33,"h6",68),e._uU(34,"Desarrollo del Reto"),e.qZA(),e.TgZ(35,"div",64)(36,"div")(37,"small",65),e._uU(38,"Inicio:"),e.qZA(),e.TgZ(39,"p",66),e._uU(40),e.ALo(41,"date"),e.qZA()(),e.TgZ(42,"div")(43,"small",65),e._uU(44,"Fin:"),e.qZA(),e.TgZ(45,"p",66),e._uU(46),e.ALo(47,"date"),e.qZA()()()()()(),e.TgZ(48,"div",69)(49,"div",0)(50,"h5",55),e._uU(51,"Detalles Adicionales"),e.qZA(),e.TgZ(52,"div",70)(53,"div",71)(54,"span",65),e._uU(55,"Empresa"),e.qZA(),e.TgZ(56,"span",72),e._uU(57),e.qZA()(),e.TgZ(58,"div",73)(59,"span",74),e._uU(60,"Encargado"),e.qZA(),e.TgZ(61,"span",72),e._uU(62),e.qZA()(),e.TgZ(63,"div",71)(64,"span",65),e._uU(65,"Facilitador"),e.qZA(),e.TgZ(66,"span",72),e._uU(67),e.qZA()()()()()()()()),2&i){const t=e.oxw(2);e.xp6(6),e.Oqu(null==t.detalles?null:t.detalles.descripcion),e.xp6(16),e.Oqu(e.xi3(23,8,null==t.detalles?null:t.detalles.inicioInscripcion,"dd MMM yyyy")),e.xp6(6),e.Oqu(e.xi3(29,11,null==t.detalles?null:t.detalles.finInscripcion,"dd MMM yyyy")),e.xp6(12),e.Oqu(e.xi3(41,14,null==t.detalles?null:t.detalles.fechaInicio,"dd MMM yyyy")),e.xp6(6),e.Oqu(e.xi3(47,17,null==t.detalles?null:t.detalles.fechaFin,"dd MMM yyyy")),e.xp6(11),e.Oqu(t.detalles.empresaid.nombre),e.xp6(5),e.Oqu(t.detalles.encargadoid.nombre+" "+t.detalles.encargadoid.apellido),e.xp6(5),e.Oqu(t.detalles.empleadoid.nombre+" "+t.detalles.empleadoid.apellido)}}function F(i,r){if(1&i){const t=e.EpF();e.TgZ(0,"div",47)(1,"div",48),e._UZ(2,"i",49),e.TgZ(3,"h4",50),e._uU(4),e.qZA()(),e.TgZ(5,"button",31),e.NdJ("click",function(){const n=e.CHM(t).$implicit;return e.KtG(n.dismiss("Cross click"))}),e.qZA()(),e.TgZ(6,"div",51),e.YNc(7,O,68,20,"div",52),e.qZA()}if(2&i){const t=e.oxw();e.xp6(4),e.Oqu(null==t.detalles?null:t.detalles.nombre),e.xp6(3),e.Q6J("ngIf",t.detalles)}}function D(i,r){1&i&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",11)(3,"div",12)(4,"div",13)(5,"div",0)(6,"div",14)(7,"div",15)(8,"h6",16)(9,"a",17),e._uU(10,"Retos"),e.qZA()(),e.TgZ(11,"p"),e._uU(12,"A\xfan no hay Retos..."),e.qZA()()()()()()()()())}const u=l(3519);let N=(()=>{class i{constructor(t,o,s){this.http=t,this.modalService=s,this.apiUrl="https://backend-do1k.onrender.com/retos",this.token=localStorage.getItem("authToken"),this.joven=localStorage.getItem("correo"),this.errorMessages={},this.validate=!1,this.tooltipValidation=!1,this.empleados=[],this.encargados=[],this.empresas=[],this.retos=[],this.equiposRetos=[],this.equipos=[],this.jovenesEquipos=[],this.jovenes=[],this.equiposAsociados=[],this.equiposDelJoven=[],this.retosDelEquipo=[],this.newEquipos={id:0,nombre:""},this.jovenesporequitotal={id:0,equiposid:null,jovenesid:[]},this.owlcarousel2Options={loop:!0,margin:10,lazyLoad:!0,items:5,nav:!1,responsive:{0:{items:1},576:{items:1},768:{items:2},992:{items:3}}},this.owlcarousel1=[{id:1,img:"assets/images/big-lightgallry/retos-carrusel1.jpg"},{id:2,img:"assets/images/big-lightgallry/retos-carrusel3.jpg"},{id:3,img:"assets/images/big-lightgallry/retos-carrusel3.jpg"},{id:4,img:"assets/images/big-lightgallry/retos-carrusel1.jpg"},{id:5,img:"assets/images/big-lightgallry/retos-carrusel2.jpg"},{id:6,img:"assets/images/big-lightgallry/retos-carrusel3.jpg"},{id:7,img:"assets/images/big-lightgallry/retos-carrusel1.jpg"},{id:8,img:"assets/images/big-lightgallry/retos-carrusel2.jpg"},{id:9,img:"assets/images/big-lightgallry/retos-carrusel3.jpg"},{id:10,img:"assets/images/big-lightgallry/retos-carrusel1.jpg"}],o.backdrop="static",o.keyboard=!1}ngOnInit(){this.getEmpresas(),this.getEquiposretos(),this.getEquipos(),this.getJovenesequipos(),this.getJovenes()}openVerticallyCentered(t,o){this.equiposAsociados=this.equiposRetos.filter(s=>s.retosid.id===o),this.retosid=o,this.modalService.open(t)}detallemodal(t,o){this.detalles=o,this.modalService.open(t)}getEmpresas(){const t=new a.WM({Authorization:`Bearer ${this.token}`});this.http.get("https://backend-do1k.onrender.com/empresas",{headers:t}).subscribe(o=>{this.empresas=o},o=>{console.error("Error fetching empresas:",o)})}getRetos(){const t=new a.WM({Authorization:`Bearer ${this.token}`});this.retos=[],this.http.get(this.apiUrl,{headers:t}).subscribe(o=>{o.forEach(s=>{if("En curso"===s.estado&&s.empleadoid.id===this.jovenesid){const n=["assets/images/job-search/1.jpg","assets/images/job-search/2.jpg","assets/images/job-search/3.jpg","assets/images/job-search/4.jpg","assets/images/job-search/5.jpg","assets/images/job-search/6.jpg"],c=Math.floor(Math.random()*n.length);s.logo=n[c],this.retos.push(s)}})},o=>{console.error("Error fetching retos:",o)})}getJovenesequipos(){const t=new a.WM({Authorization:`Bearer ${this.token}`});this.http.get("https://backend-do1k.onrender.com/jovenesequipos",{headers:t}).subscribe(o=>{this.jovenesEquipos=o,console.log(this.jovenesEquipos)},o=>{console.error("Error fetching empresas:",o)})}getEquiposretos(){const t=new a.WM({Authorization:`Bearer ${this.token}`});this.http.get("https://backend-do1k.onrender.com/equiposretos",{headers:t}).subscribe(o=>{this.equiposRetos=o},o=>{console.error("Error fetching empresas:",o)})}getEquipos(){const t=new a.WM({Authorization:`Bearer ${this.token}`});this.http.get("https://backend-do1k.onrender.com/equipos",{headers:t}).subscribe(o=>{this.equipos=o},o=>{})}getJovenes(){const t=new a.WM({Authorization:`Bearer ${this.token}`});this.http.get("https://backend-do1k.onrender.com/empleados",{headers:t}).subscribe(o=>{const s=o.find(n=>n.correo===this.joven);s&&(this.jovenesid=s.id,this.getRetos())},o=>{})}openCreateTeamModal(t){this.modalService.open(t).result.then(s=>{"saved"===s&&this.getEquipos()})}createTeam(){const t=new a.WM({Authorization:`Bearer ${this.token}`,"Content-Type":"application/json"});this.http.post("https://backend-do1k.onrender.com/equipos",this.newEquipos,{headers:t}).subscribe(o=>{u.fire({icon:"success",title:"\xa1Registro exitoso!",showConfirmButton:!1,timer:1500}),this.newEquipos={nombre:""},this.modalService.dismissAll(),this.getEquiposretos(),this.getEquipos(),this.getJovenesequipos()},o=>{})}confirmarIngreso(t){u.fire({title:"\xbfDeseas ingresar al equipo?",text:"\xa1Est\xe1s a un paso de inscribirte!",icon:"info",showCancelButton:!0,confirmButtonText:"S\xed, ingresar",cancelButtonText:"No, cancelar"}).then(o=>{o.isConfirmed&&(this.registerJovenInEquipo(t),u.fire({title:"Registrado",text:"\xa1Te has registrado en el equipo exitosamente!",icon:"success",confirmButtonText:"OK"}),this.modalService.dismissAll(),this.getEquiposretos(),this.getEquipos(),this.getJovenesequipos())})}registerJovenInEquipo(t){if(void 0===this.jovenesid)return;const o=new a.WM({Authorization:`Bearer ${this.token}`,"Content-Type":"application/json"});this.http.post("https://backend-do1k.onrender.com/jovenesequipos",{jovenesid:this.jovenesid,equiposid:t},{headers:o}).subscribe(()=>{this.modalService.dismissAll(),this.getEquiposretos(),this.getEquipos(),this.getJovenesequipos(),this.getEquiposDelJoven()},s=>{this.modalService.dismissAll(),u.fire("Error","Hubo un problema al inscribirte. Int\xe9ntalo de nuevo m\xe1s tarde.","error")})}registerEquiporeto(t){console.log(this.jovenesid),console.log(t);const o=this.retosid,s=new a.WM({Authorization:`Bearer ${this.token}`,"Content-Type":"application/json"});this.http.post("https://backend-do1k.onrender.com/equiposretos",{equiposid:t,retosid:o},{headers:s}).subscribe(()=>{this.modalService.dismissAll(),this.getEquiposretos(),this.getEquipos(),this.getJovenesequipos()},n=>{})}getEquiposDelJoven(){const t=new a.WM({Authorization:`Bearer ${this.token}`});this.http.get(`https://backend-do1k.onrender.com/jovenesequipos/joven/${this.jovenesid}`,{headers:t}).subscribe(o=>{this.equiposDelJoven=o,console.log("IDs de equipos del joven:",this.equiposDelJoven),this.getRetosDelEquipo()},o=>{console.error("Error obteniendo equipos del joven:",o)})}getRetosDelEquipo(){if(0===this.equiposDelJoven.length)return void console.log("No hay equipos para consultar retos.");const t=new a.WM({Authorization:`Bearer ${this.token}`});this.http.get("https://backend-do1k.onrender.com/equiposretos",{headers:t}).subscribe(o=>{this.retosDelEquipo=o,console.log("IDs de retos asociados a los equipos del joven:",this.retosDelEquipo),console.log("data: ",o)},o=>{console.error("Error obteniendo retos del equipo:",o)})}isJovenRegistradoEnReto(t,o,s){const n=new Date,p=new Date(s+"T00:00:00");return!!this.retosDelEquipo.some(f=>this.equiposDelJoven.some(Y=>Y.equiposid.id===f.equiposid.id&&f.retosid.id===t))||n<=p}isInscripcionFinalizada(t,o){return new Date>=new Date(o+"T23:59:59")}retirarDelReto(t){u.fire({title:"\xbfEst\xe1s seguro?",text:"Si la fecha de inscripci\xf3n ya finaliz\xf3, no podr\xe1s inscribirte de nuevo.",icon:"warning",showCancelButton:!0,confirmButtonText:"S\xed, retirar",cancelButtonText:"Cancelar",reverseButtons:!0}).then(o=>{o.isConfirmed&&(this.modalService.dismissAll(),this.retirarJovenDeReto(t))})}retirarJovenDeReto(t){if(!this.jovenesEquipos)return void console.error("ID del jovenesEquipos no encontrado");const o=new a.WM({Authorization:`Bearer ${this.token}`,"Content-Type":"application/json"}),s=this.equiposDelJoven.find(n=>this.retosDelEquipo.find(c=>n.equiposid.id===c.equiposid.id&&c.retosid.id===t));this.http.delete(`https://backend-do1k.onrender.com/jovenesequipos/${s.id}`,{headers:o}).subscribe(()=>{u.fire("Retirado","Te has retirado del reto con \xe9xito.","success"),this.modalService.dismissAll(),this.getRetos(),this.getEmpresas(),this.getEquiposretos(),this.getEquipos(),this.getJovenesequipos(),this.getJovenes(),this.getEquiposDelJoven(),this.getRetosDelEquipo()},n=>{console.error("Error al retirar al joven del reto:",n),u.fire("Error","Ocurri\xf3 un error al intentar retirar al joven del reto.","error"),this.getRetos(),this.getEmpresas(),this.getEquiposretos(),this.getEquipos(),this.getJovenesequipos(),this.getJovenes(),this.getEquiposDelJoven(),this.modalService.dismissAll()})}getEquiposretos1(t){const o=new a.WM({Authorization:`Bearer ${this.token}`});this.unretoporequipo={},this.http.get(`https://backend-do1k.onrender.com/equiposretos/equipos/${t}`,{headers:o}).subscribe(s=>{this.unretoporequipo=s[0]},s=>{console.error("Error fetching equiposretos:",s)})}static#e=this.\u0275fac=function(o){return new(o||i)(e.Y36(a.eN),e.Y36(g.NM),e.Y36(g.FF))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-retos"]],features:[e._Bn([g.Lu])],decls:21,vars:4,consts:[[1,"card-body"],[1,"col-xl-12","xl-80","order-xl-0","order-1","box-col-12"],["class","row d-flex justify-content-center",4,"ngIf","ngIfElse"],[1,"card"],[1,"card-header"],[3,"options"],[4,"ngFor","ngForOf"],["content",""],["createTeamModal",""],["detalle",""],["noRetos",""],[1,"row","d-flex","justify-content-center"],[1,"card","col-md-10","mb-4",2,"margin-bottom","30px"],[1,"job-search"],[1,"media"],[1,"media-body"],[1,"f-w-600"],["href","javascript:void(0)"],["class","card col-md-5 mb-4","style","margin: 15px;",4,"ngFor","ngForOf"],[1,"card","col-md-5","mb-4",2,"margin","15px"],["href","javascript:void(0)",3,"click"],["alt","Logo",1,"img-40","img-fluid","m-r-20",3,"src"],["class","pull-right",4,"ngIf"],[1,"job-description"],[1,"pull-right"],["type","button",1,"btn","btn-primary",2,"z-index","99",3,"click"],["type","button",1,"btn","btn-danger",3,"click"],["carouselSlide","","class","item",3,"id"],["width","350px","height","350px",3,"src"],[1,"modal-header"],["id","modal-basic-title",1,"modal-title"],["type","button","aria-label","Close",1,"btn-close",3,"click"],[1,"modal-body",2,"padding","20px"],[4,"ngIf","ngIfElse"],["noEquipos",""],[1,"modal-footer"],["type","button",1,"btn","btn-primary",3,"click"],[1,"row","g-3"],[1,"card-body",2,"padding","10px"],["href","javascript:void(0)",2,"z-index","99",3,"click"],[1,"modal-title"],[1,"modal-body"],[3,"ngSubmit"],[1,"mb-3"],["for","teamName",1,"form-label"],["type","text","id","teamName","name","teamName","required","",1,"form-control",3,"ngModel","ngModelChange"],["type","submit",1,"btn","btn-primary"],[1,"modal-header","p-4"],[1,"d-flex","align-items-center"],[1,"fa","fa-trophy","me-2","fs-4"],[1,"modal-title","mb-0"],[1,"modal-body","p-4"],["class","col-sm-12",4,"ngIf"],[1,"col-sm-12"],[1,"card","mb-4","border-0","bg-light"],[1,"text-primary","mb-3"],[1,"lead"],[1,"card","mb-4","shadow-sm"],[1,"text-primary","mb-4"],[1,"timeline"],[1,"timeline-item"],[1,"timeline-marker","bg-info"],[1,"timeline-content"],[1,"fw-bold","text-info"],[1,"d-flex","justify-content-between","align-items-center"],[1,"text-muted"],[1,"mb-0"],[1,"timeline-marker","bg-warning"],[1,"fw-bold","text-warning"],[1,"card","border-0","bg-white"],[1,"list-group","list-group-flush"],[1,"list-group-item","d-flex","justify-content-between","align-items-center",2,"color","black"],[2,"color","black"],[1,"list-group-item","d-flex","justify-content-between","align-items-center"],[1,"text-muted",2,"color","black"]],template:function(o,s){if(1&o&&(e.TgZ(0,"div"),e._UZ(1,"br")(2,"br"),e.TgZ(3,"div",0)(4,"div",1),e.YNc(5,y,12,1,"div",2),e.qZA()()(),e.TgZ(6,"div",3)(7,"div",4)(8,"h5"),e._uU(9,"Retos pasados"),e.qZA()(),e.TgZ(10,"div",0)(11,"owl-carousel-o",5),e.YNc(12,k,1,1,null,6),e.qZA()()(),e.YNc(13,U,11,2,"ng-template",null,7,e.W1O),e.YNc(15,I,12,1,"ng-template",null,8,e.W1O),e.YNc(17,F,8,2,"ng-template",null,9,e.W1O),e.YNc(19,D,13,0,"ng-template",null,10,e.W1O)),2&o){const n=e.MAs(20);e.xp6(5),e.Q6J("ngIf",s.retos.length>0)("ngIfElse",n),e.xp6(6),e.Q6J("options",s.owlcarousel2Options),e.xp6(1),e.Q6J("ngForOf",s.owlcarousel1)}},dependencies:[m.sg,m.O5,d._Y,d.Fj,d.JJ,d.JL,d.Q7,d.On,d.F,h.Fy,h.Mp,m.uU],styles:['@charset "UTF-8";.custom-container[_ngcontent-%COMP%]{width:80%;height:500px}',".timeline[_ngcontent-%COMP%] {\n    position: relative;\n    padding: 1rem 0;\n  }\n\n  .text-muted[_ngcontent-%COMP%] {\n    color: black !important;\n  }\n\n  .timeline[_ngcontent-%COMP%]::before {\n    content: '';\n    position: absolute;\n    left: 0.75rem;\n    top: 0;\n    height: 100%;\n    width: 2px;\n    background: #e9ecef;\n  }\n\n  .lead[_ngcontent-%COMP%] {\n    margin: 0;\n    font-size: 1rem;\n  }\n\n  .timeline-item[_ngcontent-%COMP%] {\n    position: relative;\n    padding-left: 3rem;\n    padding-bottom: 2rem;\n  }\n\n  .timeline-item[_ngcontent-%COMP%]:last-child {\n    padding-bottom: 0;\n  }\n\n  .timeline-marker[_ngcontent-%COMP%] {\n    position: absolute;\n    left: 0;\n    width: 1.5rem;\n    height: 1.5rem;\n    border-radius: 50%;\n  }\n\n  .timeline-content[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n    background: #fff;\n    border-radius: 0.5rem;\n    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  }\n\n  .modal-header[_ngcontent-%COMP%] {\n    border-bottom: none;\n  }\n\n  .card[_ngcontent-%COMP%] {\n    transition: transform 0.2s;\n  }\n\n  .card[_ngcontent-%COMP%]:hover {\n    transform: translateY(-2px);\n  }"]})}return i})();var B=l(9451);const $=[{path:"",children:[{path:"bootstrap-tables",children:[{path:"basic",component:x.A},{path:"table-components",component:Z}]},{path:"owl-carousel",component:B.y},{path:"",component:N}]}];let S=(()=>{class i{static#e=this.\u0275fac=function(o){return new(o||i)};static#t=this.\u0275mod=e.oAB({type:i});static#o=this.\u0275inj=e.cJS({imports:[v.Bz.forChild($),v.Bz]})}return i})(),z=(()=>{class i{static#e=this.\u0275fac=function(o){return new(o||i)};static#t=this.\u0275mod=e.oAB({type:i});static#o=this.\u0275inj=e.cJS({imports:[m.ez,S,d.u5,h.bB,a.JF,d.UX,g.IJ,q.m,b.A0]})}return i})()}}]);