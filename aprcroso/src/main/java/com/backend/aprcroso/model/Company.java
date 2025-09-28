package com.backend.aprcroso.model;

//Privredni subjekat - Company

import com.backend.aprcroso.model.enums.CompanyStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.*;

@Builder

@NoArgsConstructor
@AllArgsConstructor
@Data

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String PIB;

    @Column
    private String registrationNumber;

    @Column
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate registrationDate;

    @Column
    private String name;

    @Enumerated(EnumType.STRING)
    @Column
    private CompanyStatus companyStatus;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<User> employee = new HashSet<>();

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<Address> addresses = new HashSet<>();

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<WorkField> workFields = new ArrayList<>();

    @Column
    private String ownerUcn;



}




