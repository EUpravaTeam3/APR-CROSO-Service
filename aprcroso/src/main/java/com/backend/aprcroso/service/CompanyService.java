package com.backend.aprcroso.service;

import com.backend.aprcroso.dto.CompanyDTO;
import com.backend.aprcroso.dto.CreateCompanyDTO;

import java.util.List;

public interface CompanyService {
    List<CompanyDTO> findAll(String search, String criteria);

    CompanyDTO findByUser();

    CompanyDTO findById(Long id);

    CompanyDTO createCompany(CreateCompanyDTO createCompanyDTO);
}
