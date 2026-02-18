package com.ecomm.ecom.repo;

import com.ecomm.ecom.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

    // Find all messages ordered by creation date (newest first)
    List<ContactMessage> findAllByOrderByCreatedAtDesc();

    // Find unread messages
    List<ContactMessage> findByIsReadFalseOrderByCreatedAtDesc();

    // Count unread messages
    long countByIsReadFalse();

    // Find by reference code
    Optional<ContactMessage> findByReferenceCode(String referenceCode);
}
