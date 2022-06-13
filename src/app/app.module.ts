import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { ToastrModule } from "ngx-toastr";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./auth/login/login.component";
import { ProductsListComponent } from "./products/products-list/products-list.component";
import { AddEditProductComponent } from "./products/modals/add-edit-product/add-edit-product.component";
import { RemoveProductComponent } from "./products/modals/remove-product/remove-product.component";
import { registerLocaleData } from "@angular/common";
import localePl from "@angular/common/locales/pl";

registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsListComponent,
    AddEditProductComponent,
    RemoveProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      closeButton: true,
      progressBar: true,
      progressAnimation: "decreasing",
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
