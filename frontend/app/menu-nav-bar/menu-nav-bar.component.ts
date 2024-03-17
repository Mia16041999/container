import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'menu-nav-bar',
  templateUrl: './menu-nav-bar.component.html',
  styleUrls: ['./menu-nav-bar.component.css']
})
export class MenuNavBarComponent {
  constructor(private authService: AuthService) {} // Inject AuthService here

  logout() {
    // Call the logout method from the AuthService
    fetch('http://localhost:4001/logout', { method: 'POST' });
  }
}
