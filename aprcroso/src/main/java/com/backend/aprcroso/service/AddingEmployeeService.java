package com.backend.aprcroso.service;

import com.backend.aprcroso.model.AddingEmployeeRequest;
import com.backend.aprcroso.model.Employee;
import com.backend.aprcroso.repository.AddingEmployeeRepository;
import com.backend.aprcroso.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AddingEmployeeService {
    private final AddingEmployeeRepository addingEmployeeRepository;
    private final EmployeeRepository employeeRepository;

    public List<AddingEmployeeRequest> getAllRequests() {
        return addingEmployeeRepository.findAll();
    }

    public AddingEmployeeRequest createRequest(Employee employee) {
        AddingEmployeeRequest request = new AddingEmployeeRequest(null, employee, "PENDING");
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
}
