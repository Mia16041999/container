import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  logout() {
    // Perform any logout-related tasks here
    // For example, clear session data, reset user authentication state, etc.

    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
