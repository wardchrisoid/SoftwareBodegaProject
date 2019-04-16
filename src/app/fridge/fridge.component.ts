import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

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
  
  items$: Observable<Item[]>;

  constructor(private http:HttpClient) {}
  
  ngOnInit() {

  }

}
