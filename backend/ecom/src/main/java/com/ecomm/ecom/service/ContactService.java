package com.ecomm.ecom.service;

import com.ecomm.ecom.model.ContactMessage;
import com.ecomm.ecom.repo.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactMessageRepository repository;

    public ContactService(ContactMessageRepository repository) {
        this.repository = repository;
    }

    public ContactMessage findByReferenceCode(String referenceCode) {
        return repository.findByReferenceCode(referenceCode)
                .orElseThrow(() ->
                        new RuntimeException("Inquiry not found"));
    }

    public List<ContactMessage> getAll() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    public List<ContactMessage> getUnread() {
        return repository.findByIsReadFalseOrderByCreatedAtDesc();
    }

    public ContactMessage updateStatus(String referenceCode, String status) {
        ContactMessage msg = findByReferenceCode(referenceCode);
        msg.setStatus(status);
        msg.setIsRead(true);
        return repository.save(msg);
    }

    public ContactMessage markAsRead(String referenceCode) {
        ContactMessage msg = findByReferenceCode(referenceCode);
        msg.setIsRead(true);
        return repository.save(msg);
    }
}