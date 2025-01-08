package com.backend.aprcroso.service;

import com.backend.aprcroso.model.FinancialReport;
import com.backend.aprcroso.repository.FinancialReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FinancialReportService {

    private final FinancialReportRepository financialReportRepository;

    @Autowired
    public FinancialReportService(FinancialReportRepository financialReportRepository) {
        this.financialReportRepository = financialReportRepository;
    }

    public List<FinancialReport> getAllFinancialReports() {
        return financialReportRepository.findAll();
    }

    public FinancialReport getFinancialReportById(Long id) {
        return financialReportRepository.findById(id).orElse(null);
    }

    public FinancialReport saveFinancialReport(FinancialReport financialReport) {
        return financialReportRepository.save(financialReport);
    }


}
