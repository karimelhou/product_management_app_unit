package com.example.productmanagementapp.product;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product create(Product product) {
        return productRepository.save(product);
    }

    public List<Product> findAll(String query) {
        if (query != null && !query.isBlank()) {
            return productRepository.findByNameContainingIgnoreCase(query);
        }
        return productRepository.findAll();
    }

    public Product update(Long id, Product updated) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(updated.getName());
                    product.setDescription(updated.getDescription());
                    product.setPrice(updated.getPrice());
                    product.setStockQuantity(updated.getStockQuantity());
                    return productRepository.save(product);
                })
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
    }

    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new IllegalArgumentException("Product not found");
        }
        productRepository.deleteById(id);
    }
}
