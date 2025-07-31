package com.backend.aprcroso.service;

import com.backend.aprcroso.dto.CompanyDTO;
import com.backend.aprcroso.dto.CreateCompanyDTO;
import com.backend.aprcroso.model.Address;
import com.backend.aprcroso.model.WorkField;

import java.util.List;

public interface CompanyService {
    List<CompanyDTO> findAllCompanies(String search);

    CompanyDTO findCompanyByUser();

    CompanyDTO findCompanyById(Long id);

    CompanyDTO createCompany(CreateCompanyDTO createCompanyDTO);

    void addAddressToCompany(Long companyId, Address address);

    void addWorkFieldToCompany(Long companyId, WorkField workField);

    List<WorkField> getWorkFieldsByCompanyId(Long companyId);

    void deleteCompany(Long id);

}
