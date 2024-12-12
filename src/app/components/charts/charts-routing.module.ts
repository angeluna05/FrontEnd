import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GoogleComponent } from "./google/google.component";
import { ChartistComponent } from "./chartist/chartist.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "google",
        component: GoogleComponent,
      },
      {
        path: "chartist",
        component: ChartistComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}
