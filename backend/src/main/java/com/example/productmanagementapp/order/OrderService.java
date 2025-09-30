package com.example.productmanagementapp.order;

import com.example.productmanagementapp.product.Product;
import com.example.productmanagementapp.product.ProductRepository;
import com.example.productmanagementapp.user.User;
import com.example.productmanagementapp.user.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository,
                        UserRepository userRepository,
                        ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public Order placeOrder(String username, OrderRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Order order = new Order(user);
        for (OrderRequest.OrderLine line : request.getItems()) {
            Product product = productRepository.findById(line.getProductId())
                    .orElseThrow(() -> new IllegalArgumentException("Product not found"));
            if (product.getStockQuantity() < line.getQuantity()) {
                throw new IllegalArgumentException("Insufficient stock for product: " + product.getName());
            }
            product.setStockQuantity(product.getStockQuantity() - line.getQuantity());
            productRepository.save(product);
            OrderItem item = new OrderItem(product, line.getQuantity());
            order.addItem(item);
        }
        order.recalculateTotal();
        return orderRepository.save(order);
    }

    public List<Order> userOrders(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return orderRepository.findByUser(user);
    }

    public List<Order> allOrders() {
        return orderRepository.findAll();
    }
}
