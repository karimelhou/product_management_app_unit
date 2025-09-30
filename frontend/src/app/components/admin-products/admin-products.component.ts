import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.component.html',
})
export class AdminProductsComponent implements OnInit {
  products = signal<Product[]>([]);
  draft: Product = { name: '', description: '', price: 0, stockQuantity: 0 };
  editingId: number | null = null;
  error = signal<string | null>(null);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.productService.list().subscribe({
      next: (products) => this.products.set(products),
      error: () => this.error.set('Unable to load products'),
    });
  }

  save(): void {
    const action = this.editingId
      ? this.productService.update(this.editingId, this.draft)
      : this.productService.create(this.draft);
    action.subscribe({
      next: () => {
        this.resetForm();
        this.load();
      },
      error: () => this.error.set('Unable to save product'),
    });
  }

  edit(product: Product): void {
    this.editingId = product.id ?? null;
    this.draft = { ...product };
  }

  remove(product: Product): void {
    if (!product.id) {
      return;
    }
    this.productService.delete(product.id).subscribe({
      next: () => this.load(),
      error: () => this.error.set('Unable to delete product'),
    });
  }

  cancel(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.draft = { name: '', description: '', price: 0, stockQuantity: 0 };
    this.editingId = null;
  }
}
