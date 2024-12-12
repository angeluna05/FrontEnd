import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {
  public userName: string;
  public profileImg: "assets/images/dashboard/profile.jpg";
  public name: string | null = '';
  public rol: string | null = '';

  constructor(public router: Router) {
    this.name = localStorage.getItem('username');
    this.rol = localStorage.getItem('rolName');
   
  }

  ngOnInit() {}

  logoutFunc() {
    localStorage.removeItem('authToken');
    
    this.router.navigate(['/auth/login']);
  }
}