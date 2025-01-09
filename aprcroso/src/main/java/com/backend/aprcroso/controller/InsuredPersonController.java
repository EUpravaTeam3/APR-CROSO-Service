package com.backend.aprcroso.controller;

import com.backend.aprcroso.model.InsuredPerson;
import com.backend.aprcroso.service.InsuredPersonService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insured-persons")
public class InsuredPersonController {

    private final InsuredPersonService insuredPersonService;

    @Autowired
    public InsuredPersonController(InsuredPersonService insuredPersonService) {
        this.insuredPersonService = insuredPersonService;
    }

    @PostMapping("/register")
    public ResponseEntity<InsuredPerson> registerInsuredPerson(@Valid @RequestBody InsuredPerson insuredPerson) {
        InsuredPerson savedPerson = insuredPersonService.registerInsuredPerson(insuredPerson);
        return ResponseEntity.ok(savedPerson);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InsuredPerson> getInsuredPersonById(@PathVariable Long id) {
        return insuredPersonService.getInsuredPersonById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<InsuredPerson>> getAllInsuredPersons() {
        List<InsuredPerson> persons = insuredPersonService.getAllInsuredPersons();
        return ResponseEntity.ok(persons);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInsuredPerson(@PathVariable Long id) {
        insuredPersonService.deleteInsuredPerson(id);
        return ResponseEntity.noContent().build();
    }
}