package com.ecomm.ecom.controller;

import com.ecomm.ecom.dto.ContactRequest;
import com.ecomm.ecom.model.ContactMessage;
import com.ecomm.ecom.service.ContactService;
import com.ecomm.ecom.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private final EmailService emailService;
    private final ContactService contactService;

    public ContactController(EmailService emailService,
                             ContactService contactService) {
        this.emailService = emailService;
        this.contactService = contactService;
    }

    // 🔹 Public: Send Inquiry
    @PostMapping
    public ResponseEntity<?> sendContact(@Valid @RequestBody ContactRequest request) {

        ContactMessage savedMessage = emailService.sendContactMail(
                request.getName(),
                request.getEmail(),
                request.getPhone(),
                request.getMessage(),
                request.getProductIds()
        );

        return ResponseEntity.ok(Map.of(
                "success", true,
                "referenceCode", savedMessage.getReferenceCode(),
                "messageId", savedMessage.getId()
        ));
    }

    // 🔹 Public: Track Inquiry
    @GetMapping("/track/{referenceCode}")
    public ResponseEntity<?> trackInquiry(@PathVariable String referenceCode) {

        ContactMessage msg = contactService.findByReferenceCode(referenceCode);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "referenceCode", msg.getReferenceCode(),
                "status", msg.getStatus(),
                "createdAt", msg.getCreatedAt(),
                "productNames", msg.getProductNames(),
                "message", msg.getMessage()
        ));
    }

    // 🔹 Admin: All Inquiries
    @GetMapping("/admin/all")
    public List<ContactMessage> getAll() {
        return contactService.getAll();
    }

    // 🔹 Admin: Unread
    @GetMapping("/admin/unread")
    public List<ContactMessage> getUnread() {
        return contactService.getUnread();
    }

    // 🔹 Admin: Update Status
    @PutMapping("/admin/{referenceCode}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable String referenceCode,
            @RequestBody Map<String, String> body) {

        contactService.updateStatus(referenceCode, body.get("status"));

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Status updated"
        ));
    }

    // 🔹 Admin: Mark as Read
    @PutMapping("/admin/{referenceCode}/read")
    public ResponseEntity<?> markAsRead(
            @PathVariable String referenceCode) {

        contactService.markAsRead(referenceCode);

        return ResponseEntity.ok(Map.of("success", true));
    }
}