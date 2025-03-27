package com.backend.aprcroso.repository;

import com.backend.aprcroso.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
