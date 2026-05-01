package com.crusty.pricegarage.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CarRequest {
    @NotBlank
    private String make;
    
    @NotBlank
    private String model;

    @NotBlank
    private Integer year;

    private String trim;
    private Double mileage;
    private Double condition;
    private String transmission;
    private String body;
    private String color;
    private String interior;
    private String state;
}
