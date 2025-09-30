import { CartService } from './cart.service';
import { Product } from './product.service';

describe('CartService', () => {
  let service: CartService;
  const product: Product = { id: 1, name: 'Laptop', description: '', price: 10, stockQuantity: 5 };

  beforeEach(() => {
    service = new CartService();
  });

  it('adds items to the cart', () => {
    service.addItem(product);
    expect(service.getItems().length).toBe(1);
    expect(service.getItems()[0].quantity).toBe(1);
  });

  it('updates quantity', () => {
    service.addItem(product);
    service.updateQuantity(1, 3);
    expect(service.getItems()[0].quantity).toBe(3);
  });

  it('clears cart', () => {
    service.addItem(product);
    service.clear();
    expect(service.getItems().length).toBe(0);
  });
});
