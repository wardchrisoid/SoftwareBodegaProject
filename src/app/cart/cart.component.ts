import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'cart-about-view',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  private user: any = {};
  public shoppingCart: any = [];
  public cartReady: boolean = false;

  constructor(private http : HttpClient, private authService: AuthService) {}
  ngOnInit() {
  	this.authService.me().subscribe( data => {this.user = data["user"];
      console.log("User id is: " + this.user._id);
      this.http.get("/api/cart/" + this.user._id).subscribe(data => {
        let items = [].slice.call(data)
        items.forEach(element => {
          let cart = []
          element["cart"].forEach(item => {
            item["vendorId"] = element["_id"]
              cart = cart.concat(item)
          })
          this.shoppingCart = this.shoppingCart.concat(cart)
        });
        this.cartReady = true;
        console.log(this.shoppingCart)
      });
    });
  }
}
