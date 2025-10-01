package com.backend.aprcroso.dto;

import com.backend.aprcroso.model.Company;
import com.backend.aprcroso.model.enums.CompanyStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyRelatedDTO {
    private Long id;
    private String name;
    private String pib;
    private String registrationNumber;
    private String ownerUcn;
    private CompanyStatus companyStatus;
    private List<WorkFieldDTO> workFields;
}
