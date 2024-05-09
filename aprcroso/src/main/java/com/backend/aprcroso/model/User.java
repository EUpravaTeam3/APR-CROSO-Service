package com.backend.aprcroso.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

import static jakarta.persistence.InheritanceType.SINGLE_TABLE;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Inheritance(strategy = SINGLE_TABLE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private String JMBG;

    @Column
    private String username;

    @Column
    private String role;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private Date dateOfBirth;

    @Column
    private String citizenship;




}

