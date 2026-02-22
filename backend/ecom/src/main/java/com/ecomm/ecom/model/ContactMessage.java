package com.ecomm.ecom.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@Table(name = "contact_message")
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reference_code", nullable = false, unique = true)
    private String referenceCode;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column
    private String phone;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    @Column(name = "product_ids")
    private String productIds; // Comma-separated product IDs

    @Column(name = "product_names", columnDefinition = "TEXT")
    private String productNames; // Comma-separated product names for easy display

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "is_read", nullable = false)
    private Boolean isRead = false;

    @Column(name = "status", nullable = false)
    private String status = "PENDING";

    public ContactMessage() {}

    public ContactMessage(String name, String email, String phone, String message, String productIds, String productNames) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.message = message;
        this.productIds = productIds;
        this.productNames = productNames;
        this.createdAt = LocalDateTime.now();
        this.isRead = false;
        this.status = "PENDING";
        this.referenceCode = generateReferenceCode();
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (referenceCode == null) {
            referenceCode = generateReferenceCode();
        }
    }

    private String generateReferenceCode() {
        // Format: SE-YYYYMMDD-XXXX (e.g., SE-20260209-A7B3)
        String datePart = java.time.LocalDate.now().toString().replace("-", "");
        String randomPart = UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        return "SE-" + datePart + "-" + randomPart;
    }
}
