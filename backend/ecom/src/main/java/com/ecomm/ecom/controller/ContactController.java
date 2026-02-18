package com.ecomm.ecom.controller;

import com.ecomm.ecom.dto.ContactRequest;
import com.ecomm.ecom.model.ContactMessage;
import com.ecomm.ecom.repo.ContactMessageRepository;
import com.ecomm.ecom.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {
    private final EmailService emailService;
    private final ContactMessageRepository contactMessageRepository;

    public ContactController(EmailService emailService, ContactMessageRepository contactMessageRepository){
        this.emailService = emailService;
        this.contactMessageRepository = contactMessageRepository;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> sendContact(@Valid @RequestBody ContactRequest request){
        ContactMessage savedMessage = emailService.sendContactMail(
                request.getName(),
                request.getEmail(),
                request.getPhone(),
                request.getMessage(),
                request.getProductIds()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Quote request submitted successfully!");
        response.put("referenceCode", savedMessage.getReferenceCode());
        response.put("messageId", savedMessage.getId());

        return ResponseEntity.ok(response);
    }

    // Customer can track their inquiry by reference code
    @GetMapping("/track/{referenceCode}")
    public ResponseEntity<?> trackInquiry(@PathVariable String referenceCode) {
        Optional<ContactMessage> messageOpt = contactMessageRepository.findByReferenceCode(referenceCode);

        if (messageOpt.isEmpty()) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "No inquiry found with this reference code");
            return ResponseEntity.status(404).body(error);
        }

        ContactMessage msg = messageOpt.get();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("referenceCode", msg.getReferenceCode());
        response.put("status", msg.getStatus());
        response.put("createdAt", msg.getCreatedAt());
        response.put("productNames", msg.getProductNames());
        response.put("message", msg.getMessage());

        return ResponseEntity.ok(response);
    }

    // Admin endpoints
    @GetMapping("/admin/all")
    public ResponseEntity<List<ContactMessage>> getAllInquiries() {
        return ResponseEntity.ok(contactMessageRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/admin/unread")
    public ResponseEntity<List<ContactMessage>> getUnreadInquiries() {
        return ResponseEntity.ok(contactMessageRepository.findByIsReadFalseOrderByCreatedAtDesc());
    }

    @GetMapping("/admin/{referenceCode}")
    public ResponseEntity<?> getInquiryDetails(@PathVariable String referenceCode) {
        Optional<ContactMessage> messageOpt = contactMessageRepository.findByReferenceCode(referenceCode);

        if (messageOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "Inquiry not found"));
        }

        return ResponseEntity.ok(messageOpt.get());
    }

    @PutMapping("/admin/{referenceCode}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String referenceCode, @RequestBody Map<String, String> body) {
        Optional<ContactMessage> messageOpt = contactMessageRepository.findByReferenceCode(referenceCode);

        if (messageOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "Inquiry not found"));
        }

        ContactMessage msg = messageOpt.get();
        msg.setStatus(body.get("status"));
        msg.setIsRead(true);
        contactMessageRepository.save(msg);

        return ResponseEntity.ok(Map.of("success", true, "message", "Status updated successfully"));
    }

    @PutMapping("/admin/{referenceCode}/read")
    public ResponseEntity<?> markAsRead(@PathVariable String referenceCode) {
        Optional<ContactMessage> messageOpt = contactMessageRepository.findByReferenceCode(referenceCode);

        if (messageOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "Inquiry not found"));
        }

        ContactMessage msg = messageOpt.get();
        msg.setIsRead(true);
        contactMessageRepository.save(msg);

        return ResponseEntity.ok(Map.of("success", true));
    }
}
