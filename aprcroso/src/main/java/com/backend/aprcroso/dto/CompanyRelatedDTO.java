package com.backend.aprcroso.dto;

import com.backend.aprcroso.model.Company;

public record CompanyRelatedDTO(Long id, String name, String pib, String registrationNumber) {
    public static CompanyRelatedDTO fromEntity(Company c) {
        return new CompanyRelatedDTO(
                c.getId(),
                c.getName(),
                c.getPIB(),
                c.getRegistrationNumber()
        );
    }
}
