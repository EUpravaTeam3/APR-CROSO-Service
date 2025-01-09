package com.backend.aprcroso.service;


import com.backend.aprcroso.model.InsuredPerson;
import com.backend.aprcroso.model.enums.InsuranceType;
import com.backend.aprcroso.repository.InsuredPersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InsuredPersonService {

    private final InsuredPersonRepository insuredPersonRepository;

    @Autowired
    public InsuredPersonService(InsuredPersonRepository insuredPersonRepository) {
        this.insuredPersonRepository = insuredPersonRepository;
    }

    public InsuredPerson registerInsuredPerson(InsuredPerson insuredPerson) {
        if (insuredPersonRepository.existsByJmbg(insuredPerson.getJmbg())) {
            throw new IllegalArgumentException("Person with this JMBG is already registered.");
        }

        validateInsuranceTypes(insuredPerson.getInsuranceTypes());
        return insuredPersonRepository.save(insuredPerson);
    }

    private void validateInsuranceTypes(List<InsuranceType> insuranceTypes) {
        for (InsuranceType type : insuranceTypes) {
            if (type == null) {
                throw new IllegalArgumentException("Invalid insurance type detected.");
            }
        }
    }

    public Optional<InsuredPerson> getInsuredPersonById(Long id) {
        return insuredPersonRepository.findById(id);
    }

    public List<InsuredPerson> getAllInsuredPersons() {
        return insuredPersonRepository.findAll();
    }

    public void deleteInsuredPerson(Long id) {
        insuredPersonRepository.deleteById(id);
    }

}
