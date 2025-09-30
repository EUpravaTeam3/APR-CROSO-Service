package com.backend.aprcroso.model;

import com.backend.aprcroso.model.enums.RequestStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class WorkFieldChangeRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long companyId;
    private Long workFieldId; // ID WorkField-a koji se menja
    private String oldValue;  // JSON string sa starim vrednostima
    private String newValue;  // JSON string sa novim vrednostima

    @Enumerated(EnumType.STRING)
    private RequestStatus status = RequestStatus.PENDING;

    private String createdBy;
    private LocalDateTime createdAt = LocalDateTime.now();
}
