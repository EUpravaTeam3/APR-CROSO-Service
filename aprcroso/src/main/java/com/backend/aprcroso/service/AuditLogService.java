package com.backend.aprcroso.service;

import com.backend.aprcroso.model.AuditLog;
import com.backend.aprcroso.repository.AuditLogRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuditLogService {
    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public void logChange(String entityName, Long entityId, String fieldName,
                          String oldValue, String newValue, String changedBy) {
        AuditLog log = new AuditLog();
        log.setEntityName(entityName);
        log.setEntityId(entityId);
        log.setFieldName(fieldName);
        log.setOldValue(oldValue);
        log.setNewValue(newValue);
        log.setChangedBy(changedBy != null ? changedBy : "SYSTEM");
        log.setChangedAt(LocalDateTime.now());
        auditLogRepository.save(log);
    }
}
