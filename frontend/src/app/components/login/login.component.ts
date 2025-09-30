import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService, Credentials } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  credentials: Credentials = {
    username: '',
    password: '',
  };
  error: string | null = null;

  constructor(private authService: AuthService) {}

  submit(): void {
    this.error = null;
    this.authService.login(this.credentials).subscribe({
      next: () => window.location.assign('/products'),
      error: () => (this.error = 'Invalid username or password'),
    });
  }
}
