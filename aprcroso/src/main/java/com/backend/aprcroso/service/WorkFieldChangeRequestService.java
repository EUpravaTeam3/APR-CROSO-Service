package com.backend.aprcroso.service;

import com.backend.aprcroso.exception.NotFoundException;
import com.backend.aprcroso.model.Company;
import com.backend.aprcroso.model.WorkField;
import com.backend.aprcroso.model.WorkFieldChangeRequest;
import com.backend.aprcroso.model.enums.RequestStatus;
import com.backend.aprcroso.repository.CompanyRepository;
import com.backend.aprcroso.repository.WorkFieldChangeRequestRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class WorkFieldChangeRequestService {
    @Autowired
    private WorkFieldChangeRequestRepository requestRepo;

    @Autowired
    private CompanyRepository companyRepo;

    private final ObjectMapper mapper = new ObjectMapper();

    // Kreiranje zahteva
    public WorkFieldChangeRequest createRequest(WorkFieldChangeRequest request) {
        request.setStatus(RequestStatus.PENDING);
        request.setCreatedAt(LocalDateTime.now());
        return requestRepo.save(request);
    }

    // Dobavljanje svih pending zahteva
    public List<WorkFieldChangeRequest> getPendingRequests() {
        return requestRepo.findByStatus(RequestStatus.PENDING);
    }

    // Odobravanje zahteva
    public WorkFieldChangeRequest approveRequest(Long requestId) {
        WorkFieldChangeRequest request = requestRepo.findById(requestId)
                .orElseThrow(() -> new NotFoundException("Request not found"));

        Company company = companyRepo.findById(request.getCompanyId())
                .orElseThrow(() -> new NotFoundException("Company not found"));

        WorkField wf = company.getWorkFields().stream()
                .filter(w -> w.getId().equals(request.getWorkFieldId()))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("WorkField not found"));

        try {
            // newValue je JSON string sa novim poljima
            Map<String, String> newValues = mapper.readValue(request.getNewValue(), Map.class);

            wf.setName(newValues.get("name"));
            wf.setDescription(newValues.get("description"));
            wf.setCode(newValues.get("code"));

            companyRepo.save(company);

            request.setStatus(RequestStatus.APPROVED);
            return requestRepo.save(request);

        } catch (Exception e) {
            throw new RuntimeException("Failed to apply workfield changes: " + e.getMessage());
        }
    }

    // Odbijanje zahteva
    public WorkFieldChangeRequest rejectRequest(Long requestId) {
        WorkFieldChangeRequest request = requestRepo.findById(requestId)
                .orElseThrow(() -> new NotFoundException("Request not found"));
        request.setStatus(RequestStatus.REJECTED);
        return requestRepo.save(request);
    }


    //User deo
    public List<WorkFieldChangeRequest> getRequestsByUser(String username) {
        return requestRepo.findByCreatedBy(username);
    }

}
