import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
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

  addToCart = function(){


  	return this.http.post("/api/cart/" + this.user._id, {

  	});
  		  
  };

}


