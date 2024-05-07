package com.backend.aprcroso.controller;


import com.backend.aprcroso.dto.CompanyDTO;
import com.backend.aprcroso.model.Company;
import com.backend.aprcroso.repository.CompanyRepository;
import com.backend.aprcroso.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class CompanyController {

  @Autowired
  private CompanyRepository companyRepository;


//    private final CompanyService companyService;
//
//    CompanyController(CompanyService companyService) {
//        this.companyService = companyService;
//    }
//
//    @Autowired
//    private CompanyRepository companyRepository;
//
//    //get all companies
//    @GetMapping("/companies")
//    public List<Company> getAllCompanies(){
//        return companyRepository.findAll();
//    }



    //.....................
}
