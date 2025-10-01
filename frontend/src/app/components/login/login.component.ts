import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Import Router
import { AuthService, Credentials } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  credentials: Credentials = { username: '', password: '' };
  error: string | null = null;
  // Signal to track form submission state for spinner
  submitting = signal(false);

  // Inject Router for navigation
  constructor(private authService: AuthService, private router: Router) {}

  submit(): void {
    this.error = null;
    this.submitting.set(true);
    this.authService.login(this.credentials).subscribe({
      // Use router.navigate for SPA navigation
      next: () => this.router.navigate(['/products']),
      error: () => {
        this.error = 'Invalid username or password';
        this.submitting.set(false);
      },
      complete: () => this.submitting.set(false),
    });
  }
}