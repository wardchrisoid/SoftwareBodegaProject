import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user: any = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    //console.log("----- header.component.ts -> ngOnInit() -----");
    //console.log("this.user != undefined");
    //console.log("this.user:");
    //console.log(this.user);
    //console.log("authService.getUser()");
    //console.log(this.authService.getUser());
    //console.log("this.authService.me()");
    //console.log(this.authService.me());
    //console.log("---------------------------------------------");
  }

  ngOnChanges() {
    //if (this.user) {
      //console.log("----- header.component.ts -> ngOnChanges() -----");
      //console.log("this.user != undefined");
      //console.log("this.user:");
      //console.log(this.user);
      //console.log("------------------------------------------------");
    //}
  }

  profile(): void {
    this.navigate('/profile');
  }

  logout(): void {
    this.authService.signOut();
    this.navigate('/auth/login');
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

}
