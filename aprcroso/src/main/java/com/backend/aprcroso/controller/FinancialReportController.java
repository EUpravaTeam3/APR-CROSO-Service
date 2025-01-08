package com.backend.aprcroso.controller;

import com.backend.aprcroso.exception.NotFoundException;
import com.backend.aprcroso.model.FinancialReport;
import com.backend.aprcroso.service.FinancialReportService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    //Getting By Id
    @GetMapping("/{id}")
    public ResponseEntity<FinancialReport> getFinancialReportById(@PathVariable Long id) {
        FinancialReport financialReport = financialReportService.getFinancialReportById(id);
        if (financialReport != null) {
            return ResponseEntity.ok(financialReport);
        } else {
            throw new NotFoundException("Financial Report with selected ID not found.");
//            return ResponseEntity.notFound().build();
        }
    }

    //gettin All Financial-reports List
    @GetMapping
    public ResponseEntity<List<FinancialReport>> getAllFinancialReports() {
        List<FinancialReport> financialReports = financialReportService.getAllFinancialReports();
        return ResponseEntity.ok(financialReports);
    }
}