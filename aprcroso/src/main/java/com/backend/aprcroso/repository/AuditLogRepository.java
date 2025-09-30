package com.backend.aprcroso.repository;

import com.backend.aprcroso.model.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findByEntityNameAndEntityIdOrderByChangedAtDesc(String entityName, Long entityId);
}
