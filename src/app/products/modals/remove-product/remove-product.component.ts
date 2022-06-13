import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { products } from "../../database";
import { Product } from "../../product";

@Component({
  selector: "app-remove-product",
  templateUrl: "./remove-product.component.html",
  styleUrls: ["./remove-product.component.scss"],
})
export class RemoveProductComponent implements OnInit {
  removeCheckbox: boolean = false;
  products: Product[] = products;
  showError: boolean = false;
  constructor(
    public dialogEvent: MatDialogRef<RemoveProductComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { header: string; product_id: number },
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  removeProduct() {
    if (this.removeCheckbox) {
      this.showError = false;
      let productIndex = products.findIndex(
        (x) => x.id == this.data.product_id
      );
      this.products.splice(productIndex, 1);
      this.dialogEvent.close();
    } else {
      this.showError = true;
    }
  }
}
