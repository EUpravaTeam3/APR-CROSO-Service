package com.backend.aprcroso.controller;

import com.backend.aprcroso.model.AddingEmployeeRequest;
import com.backend.aprcroso.model.Employee;
import com.backend.aprcroso.service.AddingEmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/adding-employee")
@RequiredArgsConstructor
public class AddingEmployeeController {
    private final AddingEmployeeService addingEmployeeService;

    @GetMapping
    public ResponseEntity<List<AddingEmployeeRequest>> getAllRequests() {
        return ResponseEntity.ok(addingEmployeeService.getAllRequests());
    }

    @PostMapping("/request")
    public ResponseEntity<AddingEmployeeRequest> createRequest(@RequestBody Employee employee) {
        return ResponseEntity.ok(addingEmployeeService.createRequest(employee));
    }

    @PostMapping("/process/{id}")
    public ResponseEntity<Map<String, String>> processRequest(@PathVariable Long id, @RequestParam boolean approve) {
        String message = addingEmployeeService.processRequest(id, approve).toString();
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return ResponseEntity.ok(response);
    }

}