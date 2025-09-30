import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly apiUrl = '/api/products';

  constructor(private http: HttpClient) {}

  list(query?: string): Observable<Product[]> {
    const params = query ? { params: { q: query } } : {};
    return this.http.get<Product[]>(this.apiUrl, params);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
