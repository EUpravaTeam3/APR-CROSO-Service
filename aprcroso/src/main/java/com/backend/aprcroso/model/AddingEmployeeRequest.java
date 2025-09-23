package com.backend.aprcroso.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddingEmployeeRequest implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    private Employee employee;

    private String status; // PENDING, APPROVED, REJECTED

    private Long createdByUserId;
    private String createdByUsername;

    private String companyName;

    @ManyToOne
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

}