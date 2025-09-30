package com.example.productmanagementapp.order;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class OrderRequest {

    @NotEmpty
    private List<OrderLine> items;

    public List<OrderLine> getItems() {
        return items;
    }

    public void setItems(List<OrderLine> items) {
        this.items = items;
    }

    public static class OrderLine {
        @NotNull
        private Long productId;
        @Min(1)
        private int quantity;

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
    }
}
