package com.ecomm.ecom.service;

import com.ecomm.ecom.model.ContactMessage;
import com.ecomm.ecom.model.Product;
import com.ecomm.ecom.repo.ContactMessageRepository;
import com.ecomm.ecom.repo.ProductRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final ContactMessageRepository contactMessageRepository;
    private final ProductRepository productRepository;

    private static final String COMPANY_EMAIL = "sobtienterprises02@gmail.com";
    private static final String COMPANY_NAME = "Sobti Enterprises";

    public EmailService(JavaMailSender mailSender,
                        ContactMessageRepository contactMessageRepository,
                        ProductRepository productRepository) {
        this.mailSender = mailSender;
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

        // 🔹 Fetch selected products (if any)
        if (productIds != null && !productIds.isEmpty()) {

            List<Product> products = productRepository.findAllById(productIds);

            productIdsStr = productIds.stream()
                    .map(String::valueOf)
                    .collect(Collectors.joining(","));

            productNamesStr = products.stream()
                    .map(Product::getName)
                    .collect(Collectors.joining(", "));
        }

        // 🔹 Save contact message to DB
        ContactMessage contactMessage =
                new ContactMessage(name, email, phone, message,
                        productIdsStr, productNamesStr);

        ContactMessage savedMessage =
                contactMessageRepository.save(contactMessage);

        // 🔹 Send emails
        sendAdminNotification(savedMessage);
        sendAutoReply(savedMessage);

        return savedMessage;
    }

    // =========================================================
    // ADMIN EMAIL
    // =========================================================

    private void sendAdminNotification(ContactMessage msg) {

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(COMPANY_EMAIL);
        mail.setSubject("New Quote Request [" +
                msg.getReferenceCode() + "] from " + msg.getName());

        mail.setText(buildAdminEmailBody(msg));

        mailSender.send(mail);
    }

    private String buildAdminEmailBody(ContactMessage msg) {

        StringBuilder text = new StringBuilder();

        text.append("NEW QUOTE REQUEST\n");
        text.append("====================================\n\n");

        text.append("Reference Code: ").append(msg.getReferenceCode()).append("\n\n");

        text.append("Customer Details:\n");
        text.append("Name: ").append(msg.getName()).append("\n");
        text.append("Email: ").append(msg.getEmail()).append("\n");

        if (msg.getPhone() != null && !msg.getPhone().isBlank()) {
            text.append("Phone: ").append(msg.getPhone()).append("\n");
        }

        if (msg.getProductNames() != null && !msg.getProductNames().isBlank()) {
            text.append("\nProducts Selected:\n");
            text.append(msg.getProductNames()).append("\n");
        }

        text.append("\nMessage:\n");
        text.append(msg.getMessage()).append("\n\n");

        text.append("====================================\n");
        text.append("Please respond using reference code ")
                .append(msg.getReferenceCode());

        return text.toString();
    }

    // =========================================================
    // USER AUTO-REPLY EMAIL
    // =========================================================

    private void sendAutoReply(ContactMessage msg) {

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(msg.getEmail());
        mail.setFrom(COMPANY_EMAIL);
        mail.setSubject("Quote Request Received [" +
                msg.getReferenceCode() + "] - " + COMPANY_NAME);

        mail.setText(buildUserEmailBody(msg));

        mailSender.send(mail);
    }

    private String buildUserEmailBody(ContactMessage msg) {

        StringBuilder text = new StringBuilder();

        text.append("Dear ").append(msg.getName()).append(",\n\n");
        text.append("Thank you for contacting ").append(COMPANY_NAME).append(".\n\n");

        text.append("Your Reference Code: ")
                .append(msg.getReferenceCode()).append("\n\n");

        if (msg.getProductNames() != null && !msg.getProductNames().isBlank()) {
            text.append("Products You Selected:\n");
            text.append(msg.getProductNames()).append("\n\n");
        }

        text.append("Your Message:\n");
        text.append("\"").append(msg.getMessage()).append("\"\n\n");

        text.append("We will contact you within 24-48 business hours.\n\n");

        text.append("For urgent inquiries, call us at +91 98120 52133.\n\n");

        text.append("Best Regards,\n");
        text.append(COMPANY_NAME).append("\n\n");

        text.append("This is an automated email. Please do not reply directly.\n");
        text.append("Always mention reference code ")
                .append(msg.getReferenceCode());

        return text.toString();
    }
}