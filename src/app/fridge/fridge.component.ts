import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-fridge-view',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss']
})
export class FridgeComponent implements OnInit {
  private user: any = {};
  private fridge: any = [];
  private fridgeReady: boolean = false;
  constructor(private http : HttpClient, private authService: AuthService) {}
  ngOnInit() {
    this.authService.me().subscribe( data => {this.user = data["user"];
    });
    this.http.get("/api/fridge").subscribe(data => {
      data.forEach(element => {
        let inventory = []
        element["inventory"].forEach(item => {
          item["vendorId"] = element["_id"]
          inventory = inventory.concat(item)
        })
        this.fridge = this.fridge.concat(inventory)
      });
      this.fridgeReady = true;
    });
  }

}
