package com.backend.aprcroso.controller;

import com.backend.aprcroso.model.Contribution;
import com.backend.aprcroso.service.ContributionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contributions")
@CrossOrigin(origins = "http://localhost:4200")
public class ContributionController {

    private final ContributionService service;

    public ContributionController(ContributionService service) {
        this.service = service;
    }

    @PostMapping
    public Contribution createContribution(@RequestBody Contribution contribution) {
        return service.saveContribution(contribution);
    }

    @GetMapping
    public List<Contribution> getAllContributions() {
        return service.getAllContributions();
    }
}
