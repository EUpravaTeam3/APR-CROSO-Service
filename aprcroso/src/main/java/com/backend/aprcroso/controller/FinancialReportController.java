package com.backend.aprcroso.controller;

import com.backend.aprcroso.exception.NotFoundException;
import com.backend.aprcroso.model.FinancialReport;
import com.backend.aprcroso.service.FinancialReportService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    //updating Financial-reports
    @PutMapping("/{id}")
    public ResponseEntity<FinancialReport> updateFinancialReport(@PathVariable Long id, @RequestBody FinancialReport updatedReport) {
        FinancialReport existingReport = financialReportService.getFinancialReportById(id);

//                .orElseThrow(() -> new ResourceNotFoundException("FinancialReport not found with id: " + id));

        existingReport.setCompanyName(updatedReport.getCompanyName());
        existingReport.setYear(updatedReport.getYear());
        existingReport.setBalanceSheet(updatedReport.getBalanceSheet());
        existingReport.setIncomeStatement(updatedReport.getIncomeStatement());
        existingReport.setValid(updatedReport.getValid());

        FinancialReport savedReport = financialReportService.saveFinancialReport(existingReport);
        return ResponseEntity.ok(savedReport);
    }

    //delete Financial-reportByID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFinancialReport(@PathVariable Long id){
        try {
            financialReportService.deleteFinancialReport(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //Getting by UserUCN
    @GetMapping("/user/{ucn}")
    public ResponseEntity<List<FinancialReport>> getReportsByUser(@PathVariable String ucn) {
        return ResponseEntity.ok(financialReportService.getReportsByUserUcn(ucn));
    }


}