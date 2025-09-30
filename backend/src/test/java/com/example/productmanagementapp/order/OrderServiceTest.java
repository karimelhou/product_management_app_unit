package com.example.productmanagementapp.order;

import com.example.productmanagementapp.product.Product;
import com.example.productmanagementapp.product.ProductRepository;
import com.example.productmanagementapp.user.Role;
import com.example.productmanagementapp.user.User;
import com.example.productmanagementapp.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private OrderService orderService;

    private User user;
    private Product product;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User("john", "pass", Role.USER);
        product = new Product("Laptop", "Gaming", 1000.0, 10);
    }

    @Test
    void placeOrderReducesStockAndPersistsOrder() {
        OrderRequest request = new OrderRequest();
        OrderRequest.OrderLine line = new OrderRequest.OrderLine();
        line.setProductId(1L);
        line.setQuantity(2);
        request.setItems(List.of(line));

        when(userRepository.findByUsername("john")).thenReturn(Optional.of(user));
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Order result = orderService.placeOrder("john", request);

        assertThat(result.getItems()).hasSize(1);
        assertThat(result.getTotalPrice()).isEqualTo(2000.0);
        assertThat(product.getStockQuantity()).isEqualTo(8);
        verify(orderRepository).save(result);
        verify(productRepository).save(product);
    }

    @Test
    void placeOrderUnknownUserThrowsException() {
        OrderRequest request = new OrderRequest();
        when(userRepository.findByUsername("missing")).thenReturn(Optional.empty());
        assertThrows(UsernameNotFoundException.class, () -> orderService.placeOrder("missing", request));
    }
}
