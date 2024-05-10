package com.backend.aprcroso.controller;


import com.backend.aprcroso.dto.CompanyDTO;
import com.backend.aprcroso.dto.CreateCompanyDTO;
import com.backend.aprcroso.exception.NotFoundException;
import com.backend.aprcroso.model.Company;
import com.backend.aprcroso.repository.CompanyRepository;
import com.backend.aprcroso.service.CompanyService;
import com.backend.aprcroso.service.impl.CompanyServiceImpl;
import com.backend.aprcroso.service.impl.UserServiceImpl;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class CompanyController {

  @GetMapping("/pocetna")
  public String Pocetna(){
    return "Pozdrav ovo je pocetna";
  }


  @Autowired
  private CompanyRepository companyRepository;

  @Autowired
  private CompanyServiceImpl companyServiceImpl;

  //posting hardcoded company info
  @PostConstruct
  public void initCompany(){
    companyServiceImpl.initCompany();
  }



  //create company
  @PostMapping("/companies")
  public Company createCompany(@RequestBody @Validated Company company){
    return companyRepository.save(company);
  }


  //get all companies
  @GetMapping("/companies")
  public ResponseEntity<List<Company>> getAllCompanies(){

    List<Company> allCompanies = companyRepository.findAll();
    return new ResponseEntity<>(allCompanies, HttpStatus.OK);

  }

  // get company by id
  @GetMapping("/companies/{id}")
  public ResponseEntity<Company> getCompanyById(@PathVariable Long id){
    Company company = companyRepository.findById(id).orElseThrow(()
            -> new NotFoundException("Company not exists with id: " + id));
    return ResponseEntity.ok(company);
  }


    //.....................
}
