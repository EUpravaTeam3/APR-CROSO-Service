package com.backend.aprcroso.service;

import com.backend.aprcroso.dto.CompanyDTO;
import com.backend.aprcroso.dto.CreateCompanyDTO;

import java.util.List;

public interface CompanyService {
    List<CompanyDTO> findAllCompanies(String search);

    CompanyDTO findCompanyByUser();

    CompanyDTO findCompanyById(Long id);

    CompanyDTO createCompany(CreateCompanyDTO createCompanyDTO);
}
