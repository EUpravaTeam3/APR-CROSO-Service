package com.backend.aprcroso.service;

import com.backend.aprcroso.model.BankruptcyReport;
import com.backend.aprcroso.repository.BankruptcyReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BankruptcyReportService {

    private final BankruptcyReportRepository bankruptcyReportRepository;

    @Autowired
    public BankruptcyReportService(BankruptcyReportRepository bankruptcyReportRepository) {
        this.bankruptcyReportRepository = bankruptcyReportRepository;
    }

    public BankruptcyReport saveBankruptcyReport(BankruptcyReport bankruptcyReport) {
        return bankruptcyReportRepository.save(bankruptcyReport);
    }
}