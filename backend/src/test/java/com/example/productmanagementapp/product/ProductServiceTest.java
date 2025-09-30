package com.example.productmanagementapp.product;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product product;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        product = new Product("Laptop", "Gaming laptop", 1000.0, 5);
    }

    @Test
    void createPersistsProduct() {
        when(productRepository.save(product)).thenReturn(product);

        Product saved = productService.create(product);

        assertThat(saved).isEqualTo(product);
        verify(productRepository).save(product);
    }

    @Test
    void findAllWithQueryDelegatesToRepository() {
        when(productRepository.findByNameContainingIgnoreCase("lap")).thenReturn(List.of(product));

        List<Product> results = productService.findAll("lap");

        assertThat(results).containsExactly(product);
        verify(productRepository).findByNameContainingIgnoreCase("lap");
    }

    @Test
    void updateCopiesFields() {
        Product updated = new Product("Phone", "Flagship", 800.0, 3);
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Product result = productService.update(1L, updated);

        assertThat(result.getName()).isEqualTo("Phone");
        assertThat(result.getPrice()).isEqualTo(800.0);
        ArgumentCaptor<Product> captor = ArgumentCaptor.forClass(Product.class);
        verify(productRepository).save(captor.capture());
        assertThat(captor.getValue().getDescription()).isEqualTo("Flagship");
    }

    @Test
    void deleteWhenProductNotFoundThrowsException() {
        when(productRepository.existsById(99L)).thenReturn(false);
        assertThrows(IllegalArgumentException.class, () -> productService.delete(99L));
    }
}
