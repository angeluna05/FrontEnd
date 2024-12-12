import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BasicComponent } from "../../table/bootstrap-tables/basic/basic.component";
import { TableComponentsComponent } from "./table-components/table-components.component";
import { EncargadosComponent } from "./encargados.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "bootstrap-tables",
        children: [
          {
            path: "basic",
            component: BasicComponent,
          },
          {
            path: "table-components",
            component: TableComponentsComponent,
          },
        ],
      },
      {
        path: '',

        component: EncargadosComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class EncargadosRoutingModule { }
