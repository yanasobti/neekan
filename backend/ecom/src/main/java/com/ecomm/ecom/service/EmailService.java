package com.ecomm.ecom.service;

import com.ecomm.ecom.model.ContactMessage;
import com.ecomm.ecom.model.Product;
import com.ecomm.ecom.repo.ContactMessageRepository;
import com.ecomm.ecom.repo.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmailService {

    private final ContactMessageRepository contactMessageRepository;
    private final ProductRepository productRepository;

    public EmailService(ContactMessageRepository contactMessageRepository,
                        ProductRepository productRepository) {
        this.contactMessageRepository = contactMessageRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public ContactMessage sendContactMail(String name,
                                          String email,
                                          String phone,
                                          String message,
                                          List<Integer> productIds) {

        String productIdsStr = null;
        String productNamesStr = null;

        if (productIds != null && !productIds.isEmpty()) {
            List<Product> products = productRepository.findAllById(productIds);
            productIdsStr = productIds.stream()
                    .map(String::valueOf)
                    .collect(Collectors.joining(","));
            productNamesStr = products.stream()
                    .map(Product::getName)
                    .collect(Collectors.joining(", "));
        }

        ContactMessage savedMessage = contactMessageRepository.save(
                new ContactMessage(name, email, phone, message, productIdsStr, productNamesStr));

        // Emails are sent via EmailJS from frontend - backend only saves the contact message
        return savedMessage;
    }
}
