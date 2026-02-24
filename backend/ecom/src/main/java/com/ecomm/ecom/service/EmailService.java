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

    private final AsyncEmailSender asyncEmailSender;
    private final ContactMessageRepository contactMessageRepository;
    private final ProductRepository productRepository;

    public EmailService(AsyncEmailSender asyncEmailSender,
                        ContactMessageRepository contactMessageRepository,
                        ProductRepository productRepository) {
        this.asyncEmailSender = asyncEmailSender;
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

        // Delegated to a SEPARATE bean so @Async proxy is actually triggered
        asyncEmailSender.sendAdminNotification(savedMessage);
        asyncEmailSender.sendAutoReply(savedMessage);

        return savedMessage;
    }
}

