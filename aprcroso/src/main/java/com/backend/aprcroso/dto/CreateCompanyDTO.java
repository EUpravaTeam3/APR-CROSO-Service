package com.backend.aprcroso.dto;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor


public class CreateCompanyDTO {
    private String name;

    private String pio;

}
