import { Injectable, signal } from '@angular/core';
import { Product } from './product.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSignal = signal<CartItem[]>([]);

  items = this.itemsSignal.asReadonly();

  getItems(): CartItem[] {
    return this.itemsSignal();
  }

  addItem(product: Product): void {
    const items = [...this.itemsSignal()];
    const index = items.findIndex((item) => item.product.id === product.id);
    if (index > -1) {
      items[index] = {
        product,
        quantity: items[index].quantity + 1,
      };
    } else {
      items.push({ product, quantity: 1 });
    }
    this.itemsSignal.set(items);
  }

  updateQuantity(productId: number, quantity: number): void {
    const updated = this.itemsSignal().map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this.itemsSignal.set(updated.filter((item) => item.quantity > 0));
  }

  clear(): void {
    this.itemsSignal.set([]);
  }
}
