package com.backend.aprcroso.dto;

import com.backend.aprcroso.model.enums.CompanyStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate registrationDate;
    private CompanyStatus companyStatus;

    private String createdByUserId;

    private String ownerUcn;

}
