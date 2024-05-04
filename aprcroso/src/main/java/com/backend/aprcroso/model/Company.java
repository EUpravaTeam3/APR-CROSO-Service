package com.backend.aprcroso.model;

//Privredni subjekat - Company

import jakarta.persistence.*;

import java.time.LocalDate;

public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String PIB;

    @Column
    private String registrationNumber;               // ili registration number  //ovo je za maticniBr

    @Column
    private LocalDate registrationDate;

    @Column
    private String name;                             //naziv

    @Column
    private String address;

    @Enumerated(EnumType.STRING)
    @Column
    private CompanyStatus status;
}




