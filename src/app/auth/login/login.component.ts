import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });
  // matcher = new ErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  public errorHandling = (control: string, error: string) => {
    return this.loginFormGroup.controls[control].hasError(error);
  };
  login() {
    if (this.loginFormGroup.valid) {
      this.toastr.success("Zalogowano do serwisu", "Success");
      this.authService.userName.next(
        this.loginFormGroup.controls["email"].value
      );
      // this.loginService.bSubject.next(this.loginFormGroup.get("email").value);
      this.router.navigate(["/list-of-products"]);
    } else {
      this.toastr.error("Uzupełnij wymagane pola", "Error");
    }
  }
}
