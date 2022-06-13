import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  yearNow = new Date().getFullYear();
  user: boolean = false;
  userName: string = "";
  private subscriptions = new Subscription();

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const userNameSubscription = this.authService.userName.subscribe((resp) => {
      this.userName = resp;
    });
    this.subscriptions.add(userNameSubscription);
  }
  logOut() {
    this.authService.userName.next("");
    this.toastr.success("Wylogowano z serwisu", "Success");
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
