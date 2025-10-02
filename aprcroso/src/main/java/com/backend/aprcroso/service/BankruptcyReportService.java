package com.backend.aprcroso.service;

import com.backend.aprcroso.model.BankruptcyReport;
import com.backend.aprcroso.repository.BankruptcyReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BankruptcyReportService {

    private final BankruptcyReportRepository bankruptcyReportRepository;

    @Autowired
    public BankruptcyReportService(BankruptcyReportRepository bankruptcyReportRepository) {
        this.bankruptcyReportRepository = bankruptcyReportRepository;
    }

    public List<BankruptcyReport> getAllBankruptcyReports() { return bankruptcyReportRepository.findAll(); }

    public BankruptcyReport getBankruptcyReportById(Long id) {
        return bankruptcyReportRepository.findById(id).orElse(null);
    }

    public BankruptcyReport saveBankruptcyReport(BankruptcyReport bankruptcyReport) {
        return bankruptcyReportRepository.save(bankruptcyReport);
    }

    public List<BankruptcyReport> getReportsByUserUcn(String ucn) {
        return bankruptcyReportRepository.findBySubmittedByUcn(ucn);
    }


}