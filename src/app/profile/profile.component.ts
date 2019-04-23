import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private userSubscription: Subscription;
  public user: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    // init this.user on startup
    this.authService.me().subscribe(data => {
      this.user = data.user;
      console.log("----- profile.component.ts -> ngOnInit() -> this.authService.me().subscribe(...) -----");
      console.log("\"this.user\":");
      console.log(this.user);
      console.log("--------------------------------------------------------------------------------------");
    });

    // update this.user after login/register/logout
    this.userSubscription = this.authService.$userSource.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnChanges() {
    //console.log("----- profile.component.ts -> ngOnChanges() -----");
    //if (this.user) {
      //console.log("this.user != undefined");
      //console.log("this.user:");
      //console.log(this.user);
    //} else {
      //console.log("this.user == false");
    //}
    //console.log("------------------------------------------------");
  }

  profileForm = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  })

  get fullname(): any { return this.profileForm.get('fullname'); }
  get email(): any { return this.profileForm.get('email'); }

  saveChanges(): void {
    console.log("save changes button pressed");
  }

}
