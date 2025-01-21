package com.backend.aprcroso.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Entity
@Data
public class FinancialReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Naziv kompanije je obavezan.")
    private String companyName;

    @NotNull
    private String PIB;

    @NotNull(message = "Godina je obavezna.")
    @Min(value = 1900, message = "Godina mora biti veća ili jednaka 1900.")
    private Integer year;

    @NotNull(message = "Bilans stanja je obavezan.")
    @Min(value = 0, message = "Bilans stanja mora biti pozitivan.")
    private Double balanceSheet;

    @NotNull(message = "Bilans uspeha je obavezan.")
    @Min(value = 0, message = "Bilans uspeha mora biti pozitivan.")
    private Double incomeStatement;

    private Boolean valid = false;

    }
