package com.backend.aprcroso.dto;

import com.backend.aprcroso.model.enums.CompanyStatus;
import lombok.*;

import java.time.LocalDate;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor


public class CreateCompanyDTO {
    private String name;
    private String pib;
    private String registrationNumber;
    private LocalDate registrationDate;
    private CompanyStatus companyStatus;

    private Long createdByUserId;

}
