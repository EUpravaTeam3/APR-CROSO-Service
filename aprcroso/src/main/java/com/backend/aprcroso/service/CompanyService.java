package com.backend.aprcroso.service;

import com.backend.aprcroso.dto.CompanyDTO;
import com.backend.aprcroso.dto.CreateCompanyDTO;
import com.backend.aprcroso.model.Address;

import java.util.List;

public interface CompanyService {
    List<CompanyDTO> findAllCompanies(String search);

    CompanyDTO findCompanyByUser();

    CompanyDTO findCompanyById(Long id);

    CompanyDTO createCompany(CreateCompanyDTO createCompanyDTO);

    void addAddressToCompany(Long companyId, Address address);
}
