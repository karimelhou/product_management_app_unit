package com.example.productmanagementapp.order;

import com.example.productmanagementapp.user.User;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product_order")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private User user;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "order_id")
    private List<OrderItem> items = new ArrayList<>();

    private double totalPrice;

    private Instant orderDate = Instant.now();

    public Order() {
    }

    public Order(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
        recalculateTotal();
    }

    public void addItem(OrderItem item) {
        this.items.add(item);
        recalculateTotal();
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public Instant getOrderDate() {
        return orderDate;
    }

    public void recalculateTotal() {
        this.totalPrice = this.items.stream().mapToDouble(OrderItem::getSubtotal).sum();
    }
}
