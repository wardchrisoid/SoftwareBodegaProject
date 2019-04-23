import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-vendor-view',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  model: any = {};

  private user: any = {};
  public fridgeInventory: any = [];
  public inventoryReady: boolean = false;

   constructor(private http : HttpClient, private authService: AuthService) {}
  ngOnInit() {
    this.authService.me().subscribe( data => {this.user = data["user"];
    
    this.http.get("/api/fridge/" + this.user._id).subscribe(data => {
        let items = [].slice.call(data)
        items.forEach(element => {
          let inventory = []
          element["inventory"].forEach(item => {
            item["vendorId"] = element["_id"]
              inventory = inventory.concat(item)
          })
          this.fridgeInventory = this.fridgeInventory.concat(inventory)
        });     
        this.inventoryReady = true;
    });
   });  
  }

  addToFridge = function(){
  
  	const body = new HttpParams()
      .set('name', this.model.item_name)
      .set('price', this.model.item_price)
      .set('quantity', this.model.item_quantity);

    this.http.post('/api/fridge/'+ this.user._id,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    ).subscribe(data => {
      console.log(data)
      alert("Added to fridge inventory " + JSON.stringify(this.model));
    });
  };

  removeFromFridge = function(item_id){
    this.http.delete('/api/fridge/'+ this.user._id + '/' + item_id).subscribe(data => {
      console.log(data)
      alert("Item " + item_id + " was removed from the fridge");
    });
  }

}

