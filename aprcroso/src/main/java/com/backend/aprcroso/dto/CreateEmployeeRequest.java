package com.backend.aprcroso.dto;

import lombok.Data;

@Data
public class CreateEmployeeRequest {
    private String name;
    private String position;
    private Long createdByUserId;
//    private Long companyId;
}
