import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../core/services/restaurant.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NzNotificationService } from 'ng-zorro-antd/notification';

const googleApiKey = environment.googleApiKey;

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-details.component.html',
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant: any;
  reviews: any[] = [];
  reviewForm: FormGroup;
  rating: number = 3;
  starCount: number = 10;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;

  color: string = 'primary';

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    private nfService: NzNotificationService
  ) {
    this.reviewForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email]],
      rating: [this.rating, Validators.required],
      comment: [''],
    });
  }

  options: google.maps.MapOptions = {
    center: { lat: 48.8566, lng: 2.3522 }, // Coordonnées de Paris
    zoom: 12, // Niveau de zoom souhaité
  };
  
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 14,
    lng: 12,
  };
  zoom = 4;
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.restaurantService.getRestaurantById(id).subscribe((data) => {
      this.restaurant = data;
      this.reviews = this.restaurant.reviews;
    });
  }

  submitReview() {
    if (this.reviewForm.valid) {
      const newReview = {
        ...this.reviewForm.value,
        restaurantId: this.restaurant.id,
      };
      console.log(newReview);

      this.restaurantService.createReview(newReview).subscribe((response) => {
        console.log(response);
        this.reviews.push(response);
        this.reviewForm.reset();
      });
    } else {
      this.nfService.error('Error', 'Remplissez tous les champs svp !');
    }
  }

  // Star rating component logic
  get ratingArr() {
    return Array.from({ length: this.starCount }, (v, i) => i);
  }

  onClick(rating: number) {
    this.rating = rating;
    this.reviewForm.patchValue({ rating: rating });
  }

  createArray(n: number): number[] {
    return Array(n);
  }

  showIcon(index: number, rating: number) {
    if (rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  showIconForm(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  formatDate(date: string): string {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('fr-FR', options);
    return formattedDate;
  }
}
export enum StarRatingColor {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn',
}
