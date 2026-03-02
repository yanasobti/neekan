package com.ecomm.ecom.service;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import com.ecomm.ecom.model.ContactMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
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
    private static final String FROM_ADDRESS = "Sobti Enterprises <onboarding@resend.dev>";

    @Value("${app.admin.email}")
    private String adminEmail;

    private final Resend resend;

    public AsyncEmailSender(@Value("${resend.api.key}") String apiKey) {
        this.resend = new Resend(apiKey);
    }

    @Async
    public void sendAdminNotification(ContactMessage msg) {
        try {
            log.info("Attempting to send admin notification for ref {}", msg.getReferenceCode());
            CreateEmailOptions params = CreateEmailOptions.builder()
                    .from(FROM_ADDRESS)
                    .to(adminEmail)
                    .subject("New Quote Request [" + msg.getReferenceCode() + "] from " + msg.getName())
                    .text(buildAdminBody(msg))
                    .build();
            CreateEmailResponse response = resend.emails().send(params);
            log.info("✅ Admin notification sent for ref {}, id={}", msg.getReferenceCode(), response.getId());
        } catch (ResendException e) {
            log.error("❌ Failed to send admin notification: {}", e.getMessage(), e);
        }
    }

    @Async
    public void sendAutoReply(ContactMessage msg) {
        try {
            log.info("Attempting to send customer copy for {} to admin", msg.getEmail());
            // Until domain is verified on Resend, we forward the customer copy to admin
            // The customer sees their reference code on the website confirmation screen
            CreateEmailOptions params = CreateEmailOptions.builder()
                    .from(FROM_ADDRESS)
                    .to(adminEmail)
                    .subject("Customer Copy [" + msg.getReferenceCode() + "] - Please forward to " + msg.getEmail())
                    .text("PLEASE FORWARD THIS TO: " + msg.getEmail() + "\n\n" + buildUserBody(msg))
                    .build();
            CreateEmailResponse response = resend.emails().send(params);
            log.info("✅ Customer copy sent to admin for forwarding, id={}", response.getId());
        } catch (ResendException e) {
            log.error("❌ Failed to send customer copy: {}", e.getMessage(), e);
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
        sb.append("Reply to customer at: ").append(msg.getEmail());
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
        sb.append("Best Regards,\n").append(COMPANY_NAME);
        return sb.toString();
    }
}
