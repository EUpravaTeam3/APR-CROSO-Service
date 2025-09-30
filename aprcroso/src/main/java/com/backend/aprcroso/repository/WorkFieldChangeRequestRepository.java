package com.backend.aprcroso.repository;

import com.backend.aprcroso.model.WorkFieldChangeRequest;
import com.backend.aprcroso.model.enums.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkFieldChangeRequestRepository extends JpaRepository<WorkFieldChangeRequest, Long> {
    List<WorkFieldChangeRequest> findByStatus(RequestStatus status);
    List<WorkFieldChangeRequest> findByCreatedBy(String createdBy);
}
