import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, FormsModule],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products = signal<Product[]>([]);
  search = '';
  loading = signal(true); // Set initial loading state to true
  error = signal<string | null>(null);

  isAdmin = computed(() => this.authService.isAdmin());

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.error.set(null);
    // Simulate a small delay for demoing the skeleton loader
    setTimeout(() => {
      this.productService.list(this.search).subscribe({
        next: (products) => this.products.set(products),
        error: () => this.error.set('Unable to load products'),
        complete: () => this.loading.set(false),
      });
    }, 500);
  }

  addToCart(product: Product): void {
    this.cartService.addItem(product);
    // You could add toast notifications here for better feedback
  }
}