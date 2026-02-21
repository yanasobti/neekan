package com.ecomm.ecom.service;

import com.ecomm.ecom.model.Product;
import com.ecomm.ecom.repo.ProductRepository;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Data
@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    // GET ALL
    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    // ADD
    public Product addProduct(Product product) {
        return repo.save(product);
    }

    // GET BY ID
    public Optional<Product> getProductById(int id) {
        return repo.findById(id);
    }

    // UPDATE
    public Optional<Product> updateProduct(int id, Product updatedProduct) {

        return repo.findById(id).map(existingProduct -> {

            existingProduct.setName(updatedProduct.getName());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setImageUrl(updatedProduct.getImageUrl());
            existingProduct.setCategory(updatedProduct.getCategory());

            return repo.save(existingProduct);
        });
    }

    // DELETE
    public boolean deleteProduct(int id) {

        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}