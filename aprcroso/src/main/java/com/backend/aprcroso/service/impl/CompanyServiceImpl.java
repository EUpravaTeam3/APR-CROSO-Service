package com.backend.aprcroso.service.impl;

import com.backend.aprcroso.dto.CompanyDTO;
import com.backend.aprcroso.dto.CreateCompanyDTO;
import com.backend.aprcroso.exception.NotFoundException;
import com.backend.aprcroso.model.Address;
import com.backend.aprcroso.model.Company;
import com.backend.aprcroso.model.WorkField;
import com.backend.aprcroso.model.enums.CompanyStatus;
import com.backend.aprcroso.repository.AddressRepository;
import com.backend.aprcroso.repository.CompanyRepository;
import com.backend.aprcroso.repository.UserRepository;
import com.backend.aprcroso.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService{

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public void addAddressToCompany(Long companyId, Address address) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new NotFoundException("Company not found"));

        if (address == null) {
            throw new IllegalArgumentException("Address cannot be null");
        }

        // Postavite vezu između adrese i kompanije
        address.setCompany(company);

        // Sačuvajte adresu pre nego što je dodate kompaniji
        addressRepository.save(address);

        // Dodajte adresu u kompanijinu kolekciju adresa
        company.getAddresses().add(address);

        // Sačuvajte kompaniju
        companyRepository.save(company);
    }

    public Address getAddressByCompanyId(Long companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new NotFoundException("Company not found with ID: " + companyId));

        return company.getAddresses().stream()
                .findFirst()
                .orElseThrow(() -> new NotFoundException("No addresses found for company ID: " + companyId));

        //vracamo prvu adresu iz skupa
    }

    //dodavanje WorkField-a
    @Override
    public void addWorkFieldToCompany(Long companyId, WorkField workField) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new NotFoundException("Company not found with ID: " + companyId));

        if (workField == null) {
            throw new IllegalArgumentException("WorkField cannot be null");
        }

        workField.setCompany(company);  // OVA LINIJA SADA RADI
        company.getWorkFields().add(workField);

        companyRepository.save(company);
    }

    //dobavljanje WorkField-a
    public List<WorkField> getWorkFieldsByCompanyId(Long companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new NotFoundException("Company not found with ID: " + companyId));

        return company.getWorkFields();
    }







    public CompanyServiceImpl(CompanyRepository companyRepository, UserRepository userRepository){
    this.companyRepository = companyRepository;
    this.userRepository = userRepository;
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
        company.setCompanyStatus(CompanyStatus.ACTIVE);
        company.setEmployee(new Company().getEmployee());
        companyRepository.save(company);

        Company company2 = new Company();
        company2.setId(null);
        company2.setName("Company2");
        company2.setPIB("321");
        company2.setRegistrationDate(LocalDate.of(2003, 4,22));
        company2.setRegistrationNumber("reg321");
        company2.setCompanyStatus(CompanyStatus.ACTIVE);
        companyRepository.save(company2);

        Company company3 = new Company();
        company3.setId(null);
        company3.setName("Company3");
        company3.setPIB("32123");
        company3.setRegistrationDate(LocalDate.now());
        company3.setRegistrationNumber("reg321233");
        company3.setCompanyStatus(CompanyStatus.INACTIVE);
        companyRepository.save(company3);

        Company company4 = new Company();
        company4.setId(null);
        company4.setName("Company4");
        company4.setPIB("234567");
        company4.setRegistrationDate(LocalDate.now());
        company4.setRegistrationNumber("reg31215678");
        company4.setCompanyStatus(CompanyStatus.INACTIVE);
        companyRepository.save(company4);

    }

    @Override
    public List<CompanyDTO> findAllCompanies(String search) {
        return List.of();
    }

    @Override
    public CompanyDTO findCompanyByUser() {
        return null;
    }

    @Override
    public CompanyDTO findCompanyById(Long id) {
        return null;
    }

    @Override
    public CompanyDTO createCompany(CreateCompanyDTO dto) {
        Company company = new Company();
        company.setName(dto.getName());
        company.setPIB(dto.getPib());
        company.setRegistrationNumber(dto.getRegistrationNumber());
        company.setRegistrationDate(dto.getRegistrationDate());
        company.setCompanyStatus(dto.getCompanyStatus());
        company.setOwnerUcn(dto.getOwnerUcn());

        companyRepository.save(company);

        // poveži user-a sa kompanijom (ako je prosleđen)
//        if (dto.getCreatedByUserId() != null) {
//            userRepository.findById(Long.valueOf(dto.getCreatedByUserId())).ifPresent(user -> {
//                user.setCompany(company);
//                userRepository.save(user);
//            });
//        }

        // vraćamo CompanyDTO — konstruktor mora postojati
        return new CompanyDTO(
                company.getId(),
                company.getName(),
                company.getPIB(),
                company.getRegistrationNumber(),
                company.getRegistrationDate(),
                company.getCompanyStatus(),
                null,   // addresses
                null,    // worker
                company.getOwnerUcn()
        );
    }


    @Override
    public void deleteCompany(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Company not found with id: " + id));
        companyRepository.delete(company);
    }

    public WorkField updateWorkField(Long companyId, Long workFieldId, WorkField updatedWorkField) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new NotFoundException("Company not found with id: " + companyId));

        WorkField existing = company.getWorkFields().stream()
                .filter(wf -> wf.getId().equals(workFieldId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("WorkField not found with id: " + workFieldId));

        // azuriranje polja
        existing.setName(updatedWorkField.getName());
        existing.setDescription(updatedWorkField.getDescription());
        existing.setCode(updatedWorkField.getCode());

        companyRepository.save(company);
        return existing;
    }




    //......
}
