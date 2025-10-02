package com.backend.aprcroso.repository;

import com.backend.aprcroso.model.FinancialReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinancialReportRepository extends JpaRepository<FinancialReport, Long> {
    List<FinancialReport> findBySubmittedByUcn(String ucn);

}
