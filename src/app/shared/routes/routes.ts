import { JovenesModule } from './../../components/apps/jovenes/jovenes.module';
import { InstitucionesModule } from './../../components/apps/instituciones/instituciones.module';
import { CelulasComponent } from './../../components/apps/celulas/celulas.component';
import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "dashboard",
    loadChildren: () => import("../../components/dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "widgets",
    loadChildren: () => import("../../components/widgets/widgets.module").then((m) => m.WidgetsModule),
  },
  {
    path: "ui-kits",
    loadChildren: () => import("../../components/ui-kits/ui-kits.module").then((m) => m.UiKitsModule),
  },
  {
    path: "base",
    loadChildren: () => import("../../components/bonus-ui/base/base.module").then((m) => m.BaseModule),
  },
  {
    path: "advance",
    loadChildren: () => import("../../components/bonus-ui/advance/advance.module").then((m) => m.AdvanceModule),
  },
  {
    path: "project",
    loadChildren: () => import("../../components/apps/project/project.module").then((m) => m.ProjectModule),
  },
  {
    path: "ecommerce",
    loadChildren: () => import("../../components/apps/e-commerce/e-commerce.module").then((m) => m.ECommerceModule),
  },
  {
    path: "email",
    loadChildren: () => import("../../components/apps/email/email.module").then((m) => m.EmailModule),
  },
  {
    path: "chat",
    loadChildren: () => import("../../components/apps/chat/chat.module").then((m) => m.ChatModule),
  },
  {
    path: "user",
    loadChildren: () => import("../../components/apps/users/users.module").then((m) => m.UsersModule),
  },
  {
    path: "bookmarks",
    loadChildren: () => import("../../components/apps/bookmarks/bookmarks.module").then((m) => m.BookmarksModule),
  },
  {
    path: "file-manager",
    loadChildren: () => import("../../components/apps/file-manager/file-manager.module").then((m) => m.FileManagerModule),
  },
  {
    path: "contacts",
    loadChildren: () => import("../../components/apps/contacts/contacts.module").then((m) => m.ContactsModule),
  },
  {
    path: "tasks",
    loadChildren: () => import("../../components/apps/tasks/tasks.module").then((m) => m.TasksModule),
  },

  {
    path: "social-app",
    loadChildren: () => import("../../components/apps/social-app/social-app.module").then((m) => m.SocialAppModule),
  },
  {
    path: "todo",
    loadChildren: () => import("../../components/apps/todo/todo.module").then((m) => m.TodoModule),
  },
  {
    path: "buttons",
    loadChildren: () => import("../../components/buttons/buttons.module").then((m) => m.ButtonsModule),
  },
  {
    path: "editor",
    loadChildren: () => import("../../components/editors/editor.module").then((m) => m.EditorModule),
  },
  {
    path: "chart",
    loadChildren: () => import("../../components/charts/charts.module").then((m) => m.ChartModule),
  },
  {
    path: "icons",
    loadChildren: () => import("../../components/icons/icons.module").then((m) => m.IconsModule),
  },
  {
    path: "form",
    loadChildren: () => import("../../components/forms/forms.module").then((m) => m.FormModule),
  },

  {
    path: "cards",
    loadChildren: () => import("../../components/cards/cards.module").then((m) => m.CardsModule),
  },
  {
    path: "sample-page",
    loadChildren: () => import("../../components/others/sample/sample.module").then((m) => m.SampleModule),
  },
  {
    path: "gallery",
    loadChildren: () => import("../../components/apps/gallery/gallery.module").then((m) => m.GalleryDemoModule),
  },
  {
    path: "blog",
    loadChildren: () => import("../../components/apps/blog/blog.module").then((m) => m.BlogModule),
  },
  {
    path: "faq",
    loadChildren: () => import("../../components/apps/faq/faq.module").then((m) => m.FaqModule),
  },
  {
    path: "job",
    loadChildren: () => import("../../components/apps/job-search/job-search.module").then((m) => m.JobSearchModule),
  },
  {
    path: "learning",
    loadChildren: () => import("../../components/apps/learning/learning.module").then((m) => m.LearningModule),
  },
  {
    path: "knowledgebase",
    loadChildren: () => import("../../components/apps/knowledge-base/knowledge-base.module").then((m) => m.KnowledgeBaseModule),
  },
  {
    path: "map",
    loadChildren: () => import("../../components/apps/map/map.module").then((m) => m.MapModule),
  },
  {
    path: "support-ticket",
    loadChildren: () => import("../../components/apps/support-ticket/support-ticket.module").then((m) => m.SupportTicketModule),
  },
  {
    path: "search-pages",
    loadChildren: () => import("../../components/others/search-result/search-result.module").then((m) => m.SearchResultModule),
  },
  {
    path: "usuarios",
    loadChildren: () => import("../../components/apps/usuarios/usuarios.module").then((m) => m.UsuariosModule),
  },
  {
  path: "celulas",
  loadChildren: () => import("../../components/apps/celulas/celulas.module").then((m) => m.CelulasModule),
},
{
  path: "empresas",
  loadChildren: () => import("../../components/apps/empresas/empresas.module").then((m) => m.EmpresasModule),
},{
  path: "instituciones",
  loadChildren: () => import("../../components/apps/instituciones/instituciones.module").then((m) => m.InstitucionesModule),
},{
  path: "empleados",
  loadChildren: () => import("../../components/apps/empleados/empleados.module").then((m) => m.EmpleadosModule),
},{
  path: "jovenes",
  loadChildren: () => import("../../components/apps/jovenes/jovenes.module").then((m) => m.JovenesModule),
},
{
  path: "calender",
  loadChildren: () => import("../../components/apps/calender/calender.module").then((m) => m.CalenderModule),
},
{
  path: "retos",
  loadChildren: () => import("../../components/apps/retos/retos.module").then((m) => m.RetosModule),
},
{
  path: "logros",
  loadChildren: () => import("../../components/apps/logros/logros.module").then((m) => m.LogrosModule),
},{
  path: "encargados",
  loadChildren: () => import("../../components/apps/encargados/encargados.module").then((m) => m.EncargadosModule),
},{
  path: "equipos",
  loadChildren: () => import("../../components/apps/equipos/equipos.module").then((m) => m.EquiposModule),
},{
  path: "index",
  loadChildren: () => import("../../components/apps/users-jovenes/index/index.module").then((m) => m.IndexModule),
},{
  path: "sesiones",
  loadChildren: () => import("../../components/apps/users-jovenes/sesiones/sesiones.module").then((m) => m.SesionesModule),
},{
  path: "asistencia",
  loadChildren: () => import("../../components/apps/users-empleados/sesiones/sesiones.module").then((m) => m.SesionesModule),
},{
  path: "retos-facilitador",
  loadChildren: () => import("../../components/apps/users-empleados/retos/retos.module").then((m) => m.RetosModule),
},{
  path: "celulas-facilitador",
  loadChildren: () => import("../../components/apps/users-empleados/celulas/celulas.module").then((m) => m.CelulasModule),
},{
  path: "retos-jovenes",
  loadChildren: () => import("../../components/apps/users-jovenes/retos/retos.module").then((m) => m.RetosModule),
},{
  path: "celulas-jovenes",
  loadChildren: () => import("../../components/apps/users-jovenes/celulas/celulas.module").then((m) => m.CelulasModule),
},{
  path: "perfil",
  loadChildren: () => import("../../components/apps/perfil/perfil.module").then((m) => m.PerfilModule),
},{
  path: "perfil-joven",
  loadChildren: () => import("../../components/apps/perfil-admin/perfil.module").then((m) => m.PerfilModule),
},{
  path: "roles",
  loadChildren: () => import("../../components/apps/roles/roles.module").then((m) => m.RolesModule),
},{
  path: "programarsesiones",
  loadChildren: () => import("../../components/apps/programar-sesiones/programar-sesiones.module").then((m) => m.programarSesionesModule),
// },{
//   path: "agenda",
//   loadChildren: () => import("../../components/apps/mi-agenda/mi-agenda.module").then((m) => m.MiAgendaModule),
}
];
