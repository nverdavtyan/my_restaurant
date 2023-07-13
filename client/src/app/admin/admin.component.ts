import { Component, OnInit, ViewChild } from '@angular/core';
import { RestaurantService } from '../core/services/restaurant.service';
import { AdminService } from '../core/services/admin.service'; // Assumant que vous avez un service d'authentification.
import {
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  restaurant: any;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.currentRestaurant.subscribe(restaurant => this.restaurant = restaurant);
  }
}
