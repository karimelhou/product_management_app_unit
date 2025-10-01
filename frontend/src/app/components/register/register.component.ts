import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Import Router
import { AuthService, Credentials } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  credentials: Credentials = { username: '', password: '', role: 'USER' };
  error: string | null = null;
  // Signal to track form submission state
  submitting = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

  submit(): void {
    this.error = null;
    this.submitting.set(true);
    this.authService.register(this.credentials).subscribe({
      // Use router for smooth SPA navigation
      next: () => this.router.navigate(['/products']),
      error: (err) => {
        this.error = err.error?.message ?? 'Registration failed';
        this.submitting.set(false);
      },
      complete: () => this.submitting.set(false),
    });
  }
}