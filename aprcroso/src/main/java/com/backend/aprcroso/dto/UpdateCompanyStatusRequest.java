package com.backend.aprcroso.dto;

import jakarta.persistence.Entity;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCompanyStatusRequest {
    private String pib;
    private String status;
}