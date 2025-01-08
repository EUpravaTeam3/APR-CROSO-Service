package com.backend.aprcroso.controller;

import com.backend.aprcroso.exception.NotFoundException;
import com.backend.aprcroso.model.BankruptcyReport;
import com.backend.aprcroso.service.BankruptcyReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/{id}")
    public ResponseEntity<BankruptcyReport> getBankruptcyReportById(@PathVariable Long id) {
        BankruptcyReport bankruptcyReport = bankruptcyReportService.getBankruptcyReportById(id);
        if (bankruptcyReport != null) {
            return ResponseEntity.ok(bankruptcyReport);
        } else {
            throw new NotFoundException("Bankruptcy Report with selected ID not found.");
//            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<BankruptcyReport>> getAllBankruptcyReports() {
        List<BankruptcyReport> bankruptcyReports = bankruptcyReportService.getAllBankruptcyReports();
        return ResponseEntity.ok(bankruptcyReports);
    }



}