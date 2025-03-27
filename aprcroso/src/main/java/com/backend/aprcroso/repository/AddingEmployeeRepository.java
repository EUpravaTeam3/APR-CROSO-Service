package com.backend.aprcroso.repository;

import com.backend.aprcroso.model.AddingEmployeeRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddingEmployeeRepository extends JpaRepository<AddingEmployeeRequest, Long> {
}
