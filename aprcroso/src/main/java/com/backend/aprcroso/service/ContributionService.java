package com.backend.aprcroso.service;

import com.backend.aprcroso.model.Contribution;
import com.backend.aprcroso.repository.ContributionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContributionService {
    private final ContributionRepository repository;

    public ContributionService(ContributionRepository repository) {
        this.repository = repository;
    }

    public Contribution saveContribution(Contribution contribution) {
        return repository.save(contribution);
    }

    public List<Contribution> getAllContributions() {
        return repository.findAll();
    }
}
