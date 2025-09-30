package com.backend.aprcroso.controller;

import com.backend.aprcroso.model.WorkFieldChangeRequest;
import com.backend.aprcroso.service.WorkFieldChangeRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workfield-requests")
public class WorkFieldChangeRequestController {
    @Autowired
    private WorkFieldChangeRequestService service;

    // User salje zahtev
    @PostMapping
    public ResponseEntity<WorkFieldChangeRequest> createRequest(
            @RequestBody WorkFieldChangeRequest request) {
        return ResponseEntity.ok(service.createRequest(request));
    }


    // Admin - vidi sve pending
    @GetMapping("/pending")
    public ResponseEntity<List<WorkFieldChangeRequest>> getPendingRequests() {
        return ResponseEntity.ok(service.getPendingRequests());
    }

    // Admin - odobri
    @PutMapping("/{id}/approve")
    public ResponseEntity<WorkFieldChangeRequest> approve(@PathVariable Long id) {
        return ResponseEntity.ok(service.approveRequest(id));
    }

    // Admin - odbij
    @PutMapping("/{id}/reject")
    public ResponseEntity<WorkFieldChangeRequest> reject(@PathVariable Long id) {
        return ResponseEntity.ok(service.rejectRequest(id));
    }
}
