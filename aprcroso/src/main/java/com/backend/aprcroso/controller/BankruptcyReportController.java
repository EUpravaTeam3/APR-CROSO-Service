package com.backend.aprcroso.controller;

import com.backend.aprcroso.model.BankruptcyReport;
import com.backend.aprcroso.service.BankruptcyReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bankruptcy-reports")
public class BankruptcyReportController {

    private final BankruptcyReportService bankruptcyReportService;

    @Autowired
    public BankruptcyReportController(BankruptcyReportService bankruptcyReportService) {
        this.bankruptcyReportService = bankruptcyReportService;
    }

    @PostMapping
    public ResponseEntity<BankruptcyReport> submitBankruptcyReport(@RequestBody BankruptcyReport bankruptcyReport) {
        BankruptcyReport savedReport = bankruptcyReportService.saveBankruptcyReport(bankruptcyReport);
        return ResponseEntity.ok(savedReport);
    }
}