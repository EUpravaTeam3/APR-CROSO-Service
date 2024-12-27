package com.backend.aprcroso.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
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
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate dateOfBirth;

    @Column
    private String citizenship;


    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    private Company company;

}

