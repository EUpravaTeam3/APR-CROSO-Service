package com.backend.aprcroso.dto;

import com.backend.aprcroso.model.User;
import com.backend.aprcroso.model.enums.CompanyStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.extern.jackson.Jacksonized;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@ToString
@Jacksonized

public class CompanyDTO {

    private Long id;
    private String name;

    @JsonProperty("PIB")
    private String PIB;

    private String registrationNumber;

    private LocalDate registrationDate;

    private CompanyStatus status;

    //postavljanje u listu
    private Set<User> employee = new HashSet<>();

}










//the @Jacksonized annotation is an add-on annotation for @Builder and @SuperBuilder. It automatically configures the generated builder class to be used by Jackson's deserialization