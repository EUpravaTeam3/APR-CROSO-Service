package com.backend.aprcroso.dto;

import com.backend.aprcroso.model.Employee;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddingEmployeeResponse {
    private Long id;
    private Employee employee;
    private String status;

    private String createdByUserId;
    private String createdByUsername;

    private String companyId;
    private String companyName;
}
