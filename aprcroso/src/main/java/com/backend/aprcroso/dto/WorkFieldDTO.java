package com.backend.aprcroso.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkFieldDTO {
    private Long id;
    private String code;
    private String name;
    private String description;
}
