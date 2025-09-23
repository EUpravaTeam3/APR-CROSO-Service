package com.backend.aprcroso.service;

import com.backend.aprcroso.dto.AddingEmployeeResponse;
import com.backend.aprcroso.dto.CreateEmployeeRequest;
import com.backend.aprcroso.model.AddingEmployeeRequest;
import com.backend.aprcroso.model.Employee;
import com.backend.aprcroso.repository.AddingEmployeeRepository;
import com.backend.aprcroso.repository.CompanyRepository;
import com.backend.aprcroso.repository.EmployeeRepository;
import com.backend.aprcroso.repository.UserRepository;
import com.backend.aprcroso.model.User;
import com.backend.aprcroso.model.Company;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AddingEmployeeService {
    private final UserRepository userRepository;
    private final AddingEmployeeRepository addingEmployeeRepository;
    private final EmployeeRepository employeeRepository;

    public List<AddingEmployeeResponse> getAllRequests() {
        return addingEmployeeRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public AddingEmployeeRequest createRequest(CreateEmployeeRequest dto) {
        Employee employee = new Employee();
        employee.setName(dto.getName());
        employee.setPosition(dto.getPosition());
        employee.setEmployed(false);

        // Uzmi kompaniju korisnika koji kreira zaposlenog
        userRepository.findById(dto.getCreatedByUserId()).ifPresent(user -> {
            if (user.getCompany() != null) {
                employee.setCompany(user.getCompany()); // Postavi kompaniju na zaposlenog
            }
        });

        employeeRepository.save(employee);

        AddingEmployeeRequest request = new AddingEmployeeRequest();
        request.setEmployee(employee);
        request.setStatus("PENDING");
        request.setCreatedByUserId(dto.getCreatedByUserId());

        // Poveži i request sa kompanijom radi odgovora na frontend
        request.setCompany(employee.getCompany());

        return addingEmployeeRepository.save(request);
    }


    public Map<String, String> processRequest(Long requestId, boolean approved) {
        Optional<AddingEmployeeRequest> requestOpt = addingEmployeeRepository.findById(requestId);
        Map<String, String> response = new HashMap<>();

        if (requestOpt.isPresent()) {
            AddingEmployeeRequest request = requestOpt.get();
            if (approved) {
                request.setStatus("APPROVED");
                Employee employee = request.getEmployee();
                employee.setEmployed(true);
                employeeRepository.save(employee);
            } else {
                request.setStatus("REJECTED");
            }
            addingEmployeeRepository.save(request);
            response.put("message", "Request processed successfully.");
        } else {
            response.put("message", "Request not found.");
        }

        return response;
    }

    private AddingEmployeeResponse mapToResponse(AddingEmployeeRequest request) {
        String username = null;
        String companyName = null;
        Long companyId = null;

        if (request.getCreatedByUserId() != null) {
            username = userRepository.findById(request.getCreatedByUserId())
                    .map(User::getUsername)
                    .orElse(null);
        }

        if (request.getCompany() != null) {
            companyName = request.getCompany().getName();
            companyId = request.getCompany().getId();
        }

        return new AddingEmployeeResponse(
                request.getId(),
                request.getEmployee(),
                request.getStatus(),
                request.getCreatedByUserId(),
                username,
                companyId,
                companyName
        );
    }



}
