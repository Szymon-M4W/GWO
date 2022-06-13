import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { products } from "../../database";
import { Product } from "../../product";

@Component({
  selector: "app-add-edit-product",
  templateUrl: "./add-edit-product.component.html",
  styleUrls: ["./add-edit-product.component.scss"],
})
export class AddEditProductComponent implements OnInit {
  products: Product[] = products;
  prices: { name: string; price: number }[] = [];

  productFormGroup: FormGroup = new FormGroup({
    id: new FormControl(""),
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    thumbUrl: new FormControl("", Validators.required),
    type: new FormControl("", Validators.required),
  });
  pricesFormGroup: FormGroup = new FormGroup({});

  constructor(
    public dialogEvent: MatDialogRef<AddEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { header: string; product: Product },
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.data.product) {
      this.prices = this.data.product.prices;
      this.productFormGroup.patchValue(this.data.product);
      // this.pricesFormGroup.patchValue(this.data.product.prices);
      this.prices.forEach((price, index) => {
        this.pricesFormGroup.addControl(
          "price_" + index,
          new FormControl(price.price, Validators.required)
        );
        this.pricesFormGroup.addControl(
          "price_name_" + index,
          new FormControl(price.name, Validators.required)
        );
      });
    }
  }
  addPrice() {
    this.pricesFormGroup.addControl(
      "price_" + this.prices.length,
      new FormControl("", Validators.required)
    );
    this.pricesFormGroup.addControl(
      "price_name_" + this.prices.length,
      new FormControl("", Validators.required)
    );
    this.prices.push({ name: "", price: 0 });
  }
  removePrice(index: number) {
    this.pricesFormGroup.removeControl(`price_${index}`);
    this.pricesFormGroup.removeControl(`price_name_${index}`);
    this.prices.splice(index, 1);
  }
  saveProduct() {
    if (this.productFormGroup.valid && this.pricesFormGroup.valid) {
      if (this.data.product) {
        this.data.product = this.productFormGroup.value;
        this.data.product.prices = [];
        for (
          let index = 0;
          index < Object.keys(this.pricesFormGroup.value).length / 2;
          index++
        ) {
          this.data.product.prices.push({
            name: this.pricesFormGroup.value["price_name_" + index],
            price: this.pricesFormGroup.value["price_" + index],
          });
        }
        let productIndex = products.findIndex(
          (x) => x.id == this.productFormGroup.value.id
        );
        this.products[productIndex] = this.productFormGroup.value;
        this.toastr.success("Edytowano produkt", "Success");
      } else {
        let productToSave: Product = this.productFormGroup.value;
        productToSave.id = this.products.length + 1;
        productToSave.prices = [];
        for (
          let index = 0;
          index < Object.keys(this.pricesFormGroup.value).length / 2;
          index++
        ) {
          productToSave.prices.push({
            name: this.pricesFormGroup.value["price_name_" + index],
            price: this.pricesFormGroup.value["price_" + index],
          });
        }
        this.products.push(productToSave);
        this.toastr.success("Dodano nowy produkt", "Success");
      }
      this.dialogEvent.close();
    } else {
      this.toastr.error("Uzupełnij wymagane pola", "Error");
    }
  }
  remove() {
    this.dialogEvent.close(this.data.product.id);
  }
  public errorHandling = (control: string, error: string) => {
    return this.productFormGroup.controls[control].hasError(error);
  };
  public errorPriceHandling = (control: string, error: string) => {
    if (this.pricesFormGroup.controls[control]) {
      return this.pricesFormGroup.controls[control].hasError(error);
    } else {
      return false;
    }
  };
}
