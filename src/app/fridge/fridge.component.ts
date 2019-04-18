import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
<<<<<<< HEAD
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

=======
import { AuthService } from '../auth/auth.service';
>>>>>>> 6c303ff3b7baaaca26dcec717b84acfb2d410313
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

interface Item{
	description: string;
	name: string;
	quantity: string ;
	price: string;
	url:string;
}

@Component({
  selector: 'app-fridge-view',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss']
})
export class FridgeComponent implements OnInit {
<<<<<<< HEAD
  
  items$: Observable<Item[]>;

  constructor(private http:HttpClient) {}
  
  ngOnInit() {

=======
  private user: any = {};
  public fridge: any = [];
  public fridgeReady: boolean = false;
  constructor(private http : HttpClient, private authService: AuthService) {}
  ngOnInit() {
    this.authService.me().subscribe( data => {this.user = data["user"];
    });
    this.http.get("/api/fridge").subscribe(data => {
      let items = [].slice.call(data)
      items.forEach(element => {
        let inventory = []
        element["inventory"].forEach(item => {
          item["vendorId"] = element["_id"]
          inventory = inventory.concat(item)
        })
        this.fridge = this.fridge.concat(inventory)
      });
      this.fridgeReady = true;
    });
>>>>>>> 6c303ff3b7baaaca26dcec717b84acfb2d410313
  }

}
