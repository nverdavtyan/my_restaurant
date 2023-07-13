import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  model: any = {};
  isAuthenticated: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  login(): void {
    this.authService.login(this.model).subscribe(
      (data) => {
        this.router.navigate(['/admin/my-restaurant']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    // Souscrire à l'observable isLoggedIn pour mettre à jour l'état d'authentification dans le composant
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isAuthenticated = loggedIn;
    });
  }
}
