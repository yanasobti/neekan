package com.ecomm.ecom.service;
import com.ecomm.ecom.model.Product;
import com.ecomm.ecom.repo.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;

@Service
public class ProductService
{
    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public Product addProduct(Product product) {
        return repo.save(product);
    }
    public Optional<Product> getProductById(int id) {
        return repo.findById(id);
    }

    public void deleteProduct(int id) {
        repo.deleteById(id);
    }
}
