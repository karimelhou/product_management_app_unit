import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router'; // Import Router
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // Inject the Angular Router
  constructor(public auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    // Use the router for smooth navigation without a page reload
    this.router.navigate(['/login']);
  }
}