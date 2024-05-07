package com.backend.aprcroso.model;

//Privredni subjekat - Company

import com.backend.aprcroso.model.enums.CompanyStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Builder

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter


@Entity
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String PIB;

    @Column
    private String registrationNumber;               // ili registration number  //ovo je za maticniBr

    //vratiti na LocalDate
    @Column
    private Date registrationDate;

    @Column
    private String name;                             //naziv

    @Enumerated(EnumType.STRING)
    @Column
    private CompanyStatus status;
}




