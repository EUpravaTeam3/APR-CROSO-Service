package com.backend.aprcroso.service.impl;

import com.backend.aprcroso.dto.CompanyDTO;
import com.backend.aprcroso.dto.CreateCompanyDTO;
import com.backend.aprcroso.dto.UserDTO;
import com.backend.aprcroso.exception.NotFoundException;
import com.backend.aprcroso.model.Company;
import com.backend.aprcroso.model.User;
import com.backend.aprcroso.model.enums.CompanyStatus;
import com.backend.aprcroso.repository.CompanyRepository;
import com.backend.aprcroso.repository.UserRepository;
import com.backend.aprcroso.service.CompanyService;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class CompanyServiceImpl {

    private final CompanyRepository companyRepository;


    public CompanyServiceImpl(CompanyRepository companyRepository, UserRepository userRepository){
    this.companyRepository = companyRepository;
    }


    //hardoced Company info
    public Company registerNewCompany(Company company){ return companyRepository.save(company); }

    public void initCompany(){
        Company company = new Company();
        company.setId(null);
        company.setName("Company1");
        company.setPIB("123");
        company.setRegistrationDate(LocalDate.of(2017, 6,23));
        company.setRegistrationNumber("reg123");
        company.setStatus(CompanyStatus.ACTIVE);
        companyRepository.save(company);

        Company company2 = new Company();
        company2.setId(null);
        company2.setName("Company2");
        company2.setPIB("321");
        company2.setRegistrationDate(LocalDate.of(2003, 4,22));
        company2.setRegistrationNumber("reg321");
        company2.setStatus(CompanyStatus.ACTIVE);
        companyRepository.save(company2);

        Company company3 = new Company();
        company3.setId(null);
        company3.setName("Company3");
        company3.setPIB("32123");
        company3.setRegistrationDate(LocalDate.now());
        company3.setRegistrationNumber("reg321233");
        company3.setStatus(CompanyStatus.INACTIVE);
        companyRepository.save(company3);

        Company company4 = new Company();
        company4.setId(null);
        company4.setName("Company4");
        company4.setPIB("234567");
        company4.setRegistrationDate(LocalDate.now());
        company4.setRegistrationNumber("reg31215678");
        company4.setStatus(CompanyStatus.INACTIVE);
        companyRepository.save(company4);

    }





    //......
}
