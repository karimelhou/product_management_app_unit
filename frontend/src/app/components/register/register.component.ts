import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService, Credentials } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  credentials: Credentials = {
    username: '',
    password: '',
    role: 'USER',
  };
  error: string | null = null;

  constructor(private authService: AuthService) {}

  submit(): void {
    this.error = null;
    this.authService.register(this.credentials).subscribe({
      next: () => window.location.assign('/products'),
      error: (err) => (this.error = err.error?.message ?? 'Registration failed'),
    });
  }
}
