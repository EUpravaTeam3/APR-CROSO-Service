package com.backend.aprcroso.repository;

import com.backend.aprcroso.model.InsuredPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsuredPersonRepository extends JpaRepository<InsuredPerson, Long> {
    boolean existsByJmbg(String jmbg);
}
