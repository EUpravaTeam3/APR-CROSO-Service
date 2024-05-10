package com.backend.aprcroso.dto;

import jakarta.persistence.Entity;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class UserDTO {
    private Long id;

    private String username;

    private String firstName;

    private String lastName;

    private String role;

    private Long companyId;

    private List<UserDTO> worker;

}
