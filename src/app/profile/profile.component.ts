import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() user: any = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.user) {
      this.router.navigate(['/auth/login']);
    }
    console.log("----- header.component.ts -----");
    console.log("this.user:");
    console.log(JSON.stringify(this.user));
    console.log("authService.getUser()");
    console.log(this.authService.getUser());
    console.log("this.authService.me()");
    console.log(this.authService.me());
    console.log("-------------------------------");
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
