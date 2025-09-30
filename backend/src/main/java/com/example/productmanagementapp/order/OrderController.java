package com.example.productmanagementapp.order;

import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public Order placeOrder(@AuthenticationPrincipal UserDetails userDetails,
                            @Valid @RequestBody OrderRequest request) {
        return orderService.placeOrder(userDetails.getUsername(), request);
    }

    @GetMapping("/me")
    public List<Order> myOrders(@AuthenticationPrincipal UserDetails userDetails) {
        return orderService.userOrders(userDetails.getUsername());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Order> allOrders() {
        return orderService.allOrders();
    }
}
