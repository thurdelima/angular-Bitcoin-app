import { LoginComponent } from './../auth/login/login.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PeopleComponent } from "./people/people.component";
import { ProductsComponent } from "./products/products.component";


const routes: Routes = [
  { path: "", redirectTo: "login" },
  { path: "login", component: LoginComponent },
  { path: "people", component: PeopleComponent },
  { path: "bitcoins", component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
