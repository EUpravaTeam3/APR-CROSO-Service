package com.backend.aprcroso.model;


import com.backend.aprcroso.model.enums.InsuranceType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class InsuredPerson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name is mandatory")
    private String firstName;

    @NotBlank(message = "Last name is mandatory")
    private String lastName;

    @NotBlank(message = "JMBG is mandatory")
    @Column(unique = true)
    private String jmbg;

    @NotNull(message = "Employment status is mandatory")
    private boolean employed;

    private String employerName;        //--> Company

    @ElementCollection(fetch = FetchType.EAGER)
    //Koristićemo @ElementCollection za mapiranje lista osnovnih tipova.

    @CollectionTable(name = "insured_person_insurance_types", joinColumns = @JoinColumn(name = "insured_person_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "insurance_type")
    private List<InsuranceType> insuranceTypes;
}
