import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  restaurants = [
    {
      name: 'Restaurant 1',
      image: 'path/to/image',
      location: 'Location 1',
      rating: '5.0',
    },
    // Add more restaurants here
  ];

  constructor() {}

  ngOnInit(): void {}
}
