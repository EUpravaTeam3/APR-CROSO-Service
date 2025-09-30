package com.backend.aprcroso.controller;


import com.backend.aprcroso.repository.CompanyRepository;
import com.backend.aprcroso.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
public class StatsController {
    private final CompanyRepository companyRepo;
    private final UserRepository userRepo;

    public StatsController(CompanyRepository companyRepo, UserRepository userRepo) {
        this.companyRepo = companyRepo;
        this.userRepo = userRepo;
    }

    // Ukupan broj firmi
    @GetMapping("/companies/count")
    public long getCompanyCount() {
        return companyRepo.count();
    }

    // Ukupan broj korisnika
    @GetMapping("/users/count")
    public long getUserCount() {
        return userRepo.count();
    }

    // Broj firmi po delatnostima
    @GetMapping("/companies/by-workfield")
    public List<Map<String, Object>> getCompaniesByWorkfield() {
        List<Object[]> result = companyRepo.countCompaniesByWorkfield();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Object[] row : result) {
            Map<String, Object> map = new HashMap<>();
            map.put("name", row[0]);   // workfield.name
            map.put("count", row[1]);  // broj firmi
            response.add(map);
        }

        return response;
    }


}
