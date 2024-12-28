package com.backend.aprcroso.controller;

import com.backend.aprcroso.model.FinancialReport;
import com.backend.aprcroso.service.FinancialReportService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/financial-reports")
public class FinancialReportController {

    private final FinancialReportService financialReportService;

    @Autowired
    public FinancialReportController(FinancialReportService financialReportService) {
        this.financialReportService = financialReportService;
    }

    @PostMapping
    public ResponseEntity<FinancialReport> submitFinancialReport(@Valid @RequestBody FinancialReport financialReport) {
        FinancialReport savedReport = financialReportService.saveFinancialReport(financialReport);
        return ResponseEntity.ok(savedReport);
    }
}