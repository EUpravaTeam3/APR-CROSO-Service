package com.backend.aprcroso.dto;

import lombok.Data;

@Data
public class CreateEmployeeRequest {
    private String name;
    private String position;
    private String createdByUserId;
//    private Long companyId;
}
