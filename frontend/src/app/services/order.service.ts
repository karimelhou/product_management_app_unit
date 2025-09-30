import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.service';

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  items: OrderItem[];
  totalPrice: number;
  orderDate: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly apiUrl = '/api/orders';

  constructor(private http: HttpClient) {}

  placeOrder(items: { productId: number; quantity: number }[]): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, { items });
  }

  myOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/me`);
  }

  allOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }
}
