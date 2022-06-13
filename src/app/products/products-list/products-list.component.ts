import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { products } from "../database";
import { Product } from "../product";
import { MatDialog } from "@angular/material/dialog";
import { AddEditProductComponent } from "../modals/add-edit-product/add-edit-product.component";
import { RemoveProductComponent } from "../modals/remove-product/remove-product.component";
import { Subscription } from "rxjs";

@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.scss"],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = products;
  newProductsList: Product[] = [];
  private subscriptions = new Subscription();
  showMoreArray: boolean[] = [];
  isUser: boolean = false;
  searchInput: string = "";

  constructor(private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.assignCopy();
    const isUserSubscription = this.authService.userName.subscribe((resp) => {
      if (resp != "") {
        this.isUser = true;
      } else {
        this.isUser = false;
      }
    });
    this.subscriptions.add(isUserSubscription);
  }
  addNewProduct() {
    const addNewProduct = this.dialog.open(AddEditProductComponent, {
      maxWidth: "650px",
      minWidth: "600px",
      data: { header: "Dodaj produkt" },
    });
    addNewProduct.afterClosed().subscribe(() => {
      this.assignCopy();
      this.searchInput = "";
    });
  }
  editProduct(product: Product) {
    const editDialog = this.dialog.open(AddEditProductComponent, {
      maxWidth: "650px",
      minWidth: "600px",
      data: { header: "Edutyj produkt", product },
    });

    editDialog.afterClosed().subscribe((product_id) => {
      this.assignCopy();
      this.searchInput = "";
      if (product_id) {
        const removeDialog = this.dialog.open(RemoveProductComponent, {
          maxWidth: "400px",
          minWidth: "350px",
          data: { header: "Usuń produkt", product_id },
        });
        removeDialog.afterClosed().subscribe((resp) => {
          this.assignCopy();
        });
      }
    });
  }
  assignCopy() {
    this.newProductsList = Object.assign([], this.products);
  }
  searchProduct(value: Event) {
    let searchValue = (value.target as HTMLInputElement).value
      .toLowerCase()
      .trim();

    if (!value) {
      this.assignCopy();
    }
    this.newProductsList = Object.assign([], this.products).filter(
      (item: Product) => item.name.toLowerCase().indexOf(searchValue) > -1
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
