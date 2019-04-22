import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
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
  };

  addToCart = function(item_id,vendor_id){
  	const body = new HttpParams()
    .set('vendorId', vendor_id)
    .set('itemId', item_id)
    .set('quantity', "1");

  this.http.post('/api/cart/'+ this.user._id,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    ).subscribe(data => {
      console.log(data)
      alert("Item " + item_id + " was added to your cart");
    });
  };

}


