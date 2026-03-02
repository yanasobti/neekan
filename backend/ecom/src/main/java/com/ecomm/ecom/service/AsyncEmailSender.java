package com.ecomm.ecom.service;

import com.ecomm.ecom.model.ContactMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Separate bean so that @Async is honoured by Spring's proxy.
 * (Self-invocation within the same bean bypasses the proxy and runs synchronously.)
 */
@Service
public class AsyncEmailSender {

    private static final Logger log = LoggerFactory.getLogger(AsyncEmailSender.class);

    private static final String COMPANY_NAME = "Sobti Enterprises";

    @Value("${app.admin.email}")
    private String adminEmail;

    private final JavaMailSender mailSender;

    public AsyncEmailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendAdminNotification(ContactMessage msg) {
        try {
            log.info("Attempting to send admin notification for ref {}", msg.getReferenceCode());
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(adminEmail);
            mail.setSubject("New Quote Request [" + msg.getReferenceCode() + "] from " + msg.getName());
            mail.setText(buildAdminBody(msg));
            mailSender.send(mail);
            log.info("✅ Admin notification sent for ref {}", msg.getReferenceCode());
        } catch (Exception e) {
            log.error("❌ Failed to send admin notification for ref {}: {}", msg.getReferenceCode(), e.getMessage(), e);
        }
    }

    @Async
    public void sendAutoReply(ContactMessage msg) {
        try {
            log.info("Attempting to send auto-reply to {}", msg.getEmail());
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(msg.getEmail());
            mail.setSubject("Quote Request Received [" + msg.getReferenceCode() + "] - " + COMPANY_NAME);
            mail.setText(buildUserBody(msg));
            mailSender.send(mail);
            log.info("✅ Auto-reply sent to {}", msg.getEmail());
        } catch (Exception e) {
            log.error("❌ Failed to send auto-reply to {}: {}", msg.getEmail(), e.getMessage(), e);
        }
    }

    // ── Email bodies ────────────────────────────────────────────────────────────

    private String buildAdminBody(ContactMessage msg) {
        StringBuilder sb = new StringBuilder();
        sb.append("NEW QUOTE REQUEST\n");
        sb.append("====================================\n\n");
        sb.append("Reference Code: ").append(msg.getReferenceCode()).append("\n\n");
        sb.append("Name:  ").append(msg.getName()).append("\n");
        sb.append("Email: ").append(msg.getEmail()).append("\n");
        if (msg.getPhone() != null && !msg.getPhone().isBlank())
            sb.append("Phone: ").append(msg.getPhone()).append("\n");
        if (msg.getProductNames() != null && !msg.getProductNames().isBlank())
            sb.append("\nProducts: ").append(msg.getProductNames()).append("\n");
        sb.append("\nMessage:\n").append(msg.getMessage()).append("\n\n");
        sb.append("====================================\n");
        sb.append("Reply using reference code: ").append(msg.getReferenceCode());
        return sb.toString();
    }

    private String buildUserBody(ContactMessage msg) {
        StringBuilder sb = new StringBuilder();
        sb.append("Dear ").append(msg.getName()).append(",\n\n");
        sb.append("Thank you for contacting ").append(COMPANY_NAME).append(".\n\n");
        sb.append("Your Reference Code: ").append(msg.getReferenceCode()).append("\n\n");
        if (msg.getProductNames() != null && !msg.getProductNames().isBlank())
            sb.append("Products Selected:\n").append(msg.getProductNames()).append("\n\n");
        sb.append("Your Message:\n\"").append(msg.getMessage()).append("\"\n\n");
        sb.append("We will contact you within 24-48 business hours.\n\n");
        sb.append("For urgent inquiries, call us at +91 98120 52133.\n\n");
        sb.append("Best Regards,\n").append(COMPANY_NAME).append("\n\n");
        sb.append("This is an automated email. Please do not reply directly.\n");
        sb.append("Always mention reference code: ").append(msg.getReferenceCode());
        return sb.toString();
    }
}
