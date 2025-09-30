import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  placing = false;
  message: string | null = null;

  constructor(private cartService: CartService, private orderService: OrderService) {}

  items() {
    return this.cartService.getItems();
  }

  get total(): number {
    return this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  updateQuantity(productId: number, event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.cartService.updateQuantity(productId, value);
  }

  placeOrder(): void {
    this.placing = true;
    this.message = null;
    const payload = this.items().map((item) => ({
      productId: item.product.id!,
      quantity: item.quantity,
    }));
    this.orderService.placeOrder(payload).subscribe({
      next: () => {
        this.message = 'Order placed successfully!';
        this.cartService.clear();
      },
      error: () => (this.message = 'Could not place order'),
      complete: () => (this.placing = false),
    });
  }
}
