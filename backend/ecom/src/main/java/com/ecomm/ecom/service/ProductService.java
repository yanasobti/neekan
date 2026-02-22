package com.ecomm.ecom.service;

import com.ecomm.ecom.model.Product;
import com.ecomm.ecom.repo.ProductRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public Product create(Product product) {
        return repo.save(product);
    }

    public List<Product> getAll() {
        return repo.findAll();
    }

    public Product getById(int id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public Product update(int id, Product updatedProduct) {

        Product existing = getById(id);

        existing.setName(updatedProduct.getName());
        existing.setDescription(updatedProduct.getDescription());
        existing.setImageUrl(updatedProduct.getImageUrl());
        existing.setCategory(updatedProduct.getCategory());

        return repo.save(existing);
    }

    public void delete(int id) {
        repo.deleteById(id);
    }

    // ===============================
    // CSV UPLOAD METHOD
    // ===============================

    @Transactional
    public void uploadProductsFromCsv(MultipartFile file) {

        try (
                BufferedReader reader =
                        new BufferedReader(new InputStreamReader(file.getInputStream()));
                CSVParser csvParser =
                        new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader())
        ) {

            List<Product> products = new ArrayList<>();

            for (CSVRecord record : csvParser) {

                Product product = new Product();
                product.setName(record.get("name"));
                product.setDescription(record.get("description"));
                product.setImageUrl(record.get("imageUrl"));
                product.setCategory(record.get("category"));

                products.add(product);
            }

            repo.saveAll(products);

        } catch (Exception e) {
            throw new RuntimeException("Failed to upload CSV file: " + e.getMessage());
        }
    }
}