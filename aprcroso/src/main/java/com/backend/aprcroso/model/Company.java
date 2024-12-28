package com.backend.aprcroso.model;

//Privredni subjekat - Company

import com.backend.aprcroso.model.enums.CompanyStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

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
    private CompanyStatus status;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<User> employee = new HashSet<>();

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<Address> addresses = new HashSet<>();

//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        Company company = (Company) o;
//        return id != null && id.equals(company.id);
//    }
//
//    @Override
//    public int hashCode() {
//        return id != null ? id.hashCode() : 0;
//    }
}






