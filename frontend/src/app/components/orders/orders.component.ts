import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Order, OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  orders = signal<Order[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  isAdmin = computed(() => this.authService.isAdmin());

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    const request$ = this.isAdmin() ? this.orderService.allOrders() : this.orderService.myOrders();
    request$.subscribe({
      next: (orders) => this.orders.set(orders),
      error: () => this.error.set('Unable to load orders'),
      complete: () => this.loading.set(false),
    });
  }
}
