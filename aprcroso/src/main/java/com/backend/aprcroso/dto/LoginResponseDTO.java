package com.backend.aprcroso.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponseDTO {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String role;
    private Long companyId;
}
