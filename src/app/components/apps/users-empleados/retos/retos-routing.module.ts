import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BasicComponent } from "../../../table/bootstrap-tables/basic/basic.component";
import { TableComponentsComponent } from "./table-components/table-components.component";
import { RetosComponent } from "./retos.component";
import { OwlCarouselComponent } from '../../../bonus-ui/advance/owl-carousel/owl-carousel.component';

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
        path: 'owl-carousel',
        component: OwlCarouselComponent
      },
      {
        path: '',

        component: RetosComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetosRoutingModule { }
