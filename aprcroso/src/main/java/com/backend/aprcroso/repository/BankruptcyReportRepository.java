package com.backend.aprcroso.repository;

import com.backend.aprcroso.model.BankruptcyReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BankruptcyReportRepository extends JpaRepository<BankruptcyReport, Long> {
    List<BankruptcyReport> findBySubmittedByUcn(String ucn);

}
