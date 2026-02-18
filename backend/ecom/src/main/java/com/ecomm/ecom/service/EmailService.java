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

    EmailService(JavaMailSender mailSender, ContactMessageRepository contactMessageRepository, ProductRepository productRepository) {
        this.mailSender = mailSender;
        this.contactMessageRepository = contactMessageRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public ContactMessage sendContactMail(String name, String email, String phone, String message, List<Integer> productIds) {
        // Get product names if products are selected
        String productIdsStr = null;
        String productNamesStr = null;

        if (productIds != null && !productIds.isEmpty()) {
            List<Product> products = productRepository.findAllById(productIds);
            productIdsStr = productIds.stream().map(String::valueOf).collect(Collectors.joining(","));
            productNamesStr = products.stream().map(Product::getName).collect(Collectors.joining(", "));
        }

        // 1. Save the message to database
        ContactMessage contactMessage = new ContactMessage(name, email, phone, message, productIdsStr, productNamesStr);
        ContactMessage savedMessage = contactMessageRepository.save(contactMessage);

        // 2. Send notification email to admin
        sendAdminNotification(savedMessage);

        // 3. Send auto-reply to user with reference code
        sendAutoReply(savedMessage);

        return savedMessage;
    }

    private void sendAdminNotification(ContactMessage msg) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(COMPANY_EMAIL);
        mail.setSubject("🔔 New Quote Request [" + msg.getReferenceCode() + "] from " + msg.getName());

        StringBuilder text = new StringBuilder();
        text.append("NEW QUOTE REQUEST\n");
        text.append("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n");
        text.append("Reference Code: ").append(msg.getReferenceCode()).append("\n\n");
        text.append("CUSTOMER DETAILS:\n");
        text.append("Name: ").append(msg.getName()).append("\n");
        text.append("Email: ").append(msg.getEmail()).append("\n");
        if (msg.getPhone() != null && !msg.getPhone().isEmpty()) {
            text.append("Phone: ").append(msg.getPhone()).append("\n");
        }
        text.append("\n");

        if (msg.getProductNames() != null && !msg.getProductNames().isEmpty()) {
            text.append("PRODUCTS INTERESTED IN:\n");
            text.append("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
            String[] products = msg.getProductNames().split(", ");
            for (int i = 0; i < products.length; i++) {
                text.append("  ").append(i + 1).append(". ").append(products[i]).append("\n");
            }
            text.append("\n");
        }

        text.append("MESSAGE:\n");
        text.append("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        text.append(msg.getMessage()).append("\n\n");
        text.append("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        text.append("Use reference code ").append(msg.getReferenceCode()).append(" when responding to this inquiry.");

        mail.setText(text.toString());
        mailSender.send(mail);
    }

    private void sendAutoReply(ContactMessage msg) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(msg.getEmail());
        mail.setFrom(COMPANY_EMAIL);
        mail.setSubject("Quote Request Received [" + msg.getReferenceCode() + "] - " + COMPANY_NAME);

        StringBuilder text = new StringBuilder();
        text.append("Dear ").append(msg.getName()).append(",\n\n");
        text.append("Thank you for your quote request! We have received your inquiry and our team will review it shortly.\n\n");
        text.append("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        text.append("YOUR REFERENCE CODE: ").append(msg.getReferenceCode()).append("\n");
        text.append("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n");
        text.append("Please save this reference code for future correspondence.\n\n");

        if (msg.getProductNames() != null && !msg.getProductNames().isEmpty()) {
            text.append("PRODUCTS YOU'RE INTERESTED IN:\n");
            String[] products = msg.getProductNames().split(", ");
            for (int i = 0; i < products.length; i++) {
                text.append("  • ").append(products[i]).append("\n");
            }
            text.append("\n");
        }

        text.append("YOUR MESSAGE:\n");
        text.append("\"").append(msg.getMessage()).append("\"\n\n");
        text.append("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n");
        text.append("We will get back to you within 24-48 business hours with a detailed quote.\n\n");
        text.append("If you have any urgent matters, please feel free to call us at +91 98120 52133.\n\n");
        text.append("Best regards,\n");
        text.append("The ").append(COMPANY_NAME).append(" Team\n\n");
        text.append("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        text.append("This is an automated response. Please do not reply directly to this email.\n");
        text.append("Reference your code ").append(msg.getReferenceCode()).append(" in all future communications.");

        mail.setText(text.toString());
        mailSender.send(mail);
    }

}
