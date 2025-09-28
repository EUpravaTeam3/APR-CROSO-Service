package com.backend.aprcroso.controller;


import com.backend.aprcroso.dto.CompanyDTO;
import com.backend.aprcroso.dto.CreateCompanyDTO;
import com.backend.aprcroso.dto.UpdateCompanyStatusRequest;
import com.backend.aprcroso.exception.NotFoundException;
import com.backend.aprcroso.model.Address;
import com.backend.aprcroso.model.Company;
import com.backend.aprcroso.model.WorkField;
import com.backend.aprcroso.model.enums.CompanyStatus;
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
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
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

  @Autowired
  private CompanyService companyService;

  //posting hardcoded company info
  @PostConstruct
  public void initCompany(){
    companyServiceImpl.initCompany();
  }



  //create company
  @PostMapping("/companies")
  public CompanyDTO createCompany(@RequestBody @Validated CreateCompanyDTO dto) {
    System.out.println("Received DTO: " + dto);

    // delegiraj na servis koji pravi entitet i čuva u bazi
    CompanyDTO saved = companyServiceImpl.createCompany(dto);

    try {
      RestTemplate restTemplate = new RestTemplate();
      String url = "http://localhost:8000/company";

      restTemplate.postForEntity(url, saved, Company.class);
      System.out.println("Company sent to external service.");
    } catch (Exception e) {
      System.err.println("Error sending company to external service: " + e.getMessage());
    }

    return saved;
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

  //adding Address to Company
  @PostMapping("/companies/{companyId}/address")
  public ResponseEntity<Void> addAddressToCompany(@PathVariable Long companyId, @RequestBody @Validated Address address) {
    companyServiceImpl.addAddressToCompany(companyId, address);
    return ResponseEntity.ok().build();
  }

  //getting Addresses By Company ID
  @GetMapping("/companies/{companyId}/address")
  public ResponseEntity<Address> getAddressByCompanyId(@PathVariable Long companyId) {
    Address address = companyServiceImpl.getAddressByCompanyId(companyId);
    if (address == null) {
      throw new NotFoundException("Address not found for company ID: " + companyId);
    }
    return ResponseEntity.ok(address);
  }

  //getting addresses
  @GetMapping("/companies/{id}/details")
  public ResponseEntity<CompanyDTO> getCompanyWithAddresses(@PathVariable Long id) {
    CompanyDTO company = companyService.findCompanyById(id);
    if (company == null) {
      throw new NotFoundException("Company not found with ID: " + id);
    }
    return ResponseEntity.ok(company);
  }

  //update status-by-pib
  @PutMapping("/companies/update-status-by-pib")
  public ResponseEntity<Company> updateCompanyStatus(@RequestBody UpdateCompanyStatusRequest request) {
    Optional<Company> optionalCompany = companyRepository.findByPIB(request.getPib());

    if (optionalCompany.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    Company company = optionalCompany.get();

    try {
      company.setCompanyStatus(CompanyStatus.valueOf(request.getStatus().toUpperCase()));
      companyRepository.save(company);
      return ResponseEntity.ok(company);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
  }

  //dodavanje WorkField u kompanije
  @PostMapping("/companies/{companyId}/workfields")
  public ResponseEntity<Void> addWorkFieldToCompany(@PathVariable Long companyId, @RequestBody @Validated WorkField workField) {
    companyServiceImpl.addWorkFieldToCompany(companyId, workField);
    return ResponseEntity.ok().build();
  }

  //dobavljanje WorkField iz kompanije
  @GetMapping("/companies/{companyId}/workfields")
  public ResponseEntity<List<WorkField>> getWorkFieldsByCompanyId(@PathVariable Long companyId) {
    List<WorkField> workFields = companyServiceImpl.getWorkFieldsByCompanyId(companyId);
    return ResponseEntity.ok(workFields);
  }

  @DeleteMapping("/companies/{id}")
  public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
    try {
      companyService.deleteCompany(id);
      return ResponseEntity.noContent().build(); // 204 No Content
    } catch (NotFoundException e) {
      return ResponseEntity.notFound().build();
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }








}
