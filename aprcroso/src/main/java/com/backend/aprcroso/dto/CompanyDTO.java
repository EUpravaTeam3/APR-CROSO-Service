package com.backend.aprcroso.dto;

import com.backend.aprcroso.model.Address;
import com.backend.aprcroso.model.User;
import com.backend.aprcroso.model.enums.CompanyStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.extern.jackson.Jacksonized;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@ToString
@Jacksonized
@Data
public class CompanyDTO {

    private Long id;
    private String name;

    @JsonProperty("PIB")
    private String PIB;

    private String registrationNumber;

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate registrationDate;

    private CompanyStatus status;

    private Set<Address> addresses; // Adrese se sada uključuju

    //postavljanje u listu //zaposleni u kompaniji
    private Set<User> worker = new HashSet<>();

}










//the @Jacksonized annotation is an add-on annotation for @Builder and @SuperBuilder. It automatically configures the generated builder class to be used by Jackson's deserialization