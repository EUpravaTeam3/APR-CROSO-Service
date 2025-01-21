package com.backend.aprcroso.repository;

import com.backend.aprcroso.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

//@EnableJpaRepositories
@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByPIB(String PIB);
}
