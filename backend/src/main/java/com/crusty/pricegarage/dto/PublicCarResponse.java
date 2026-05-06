package com.crusty.pricegarage.dto;

import com.crusty.pricegarage.model.Car;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PublicCarResponse {
    
    private Long id;
    private String make;
    private String model;
    private Integer year;
    private String trim;
    private Double mileage;
    private Double condition;
    private String transmission;
    private String body;
    private String color;
    private String interior;
    private Double estimatedPrice;

    public static PublicCarResponse fromEntity(Car car){
        return new PublicCarResponse(
            car.getId(),
            car.getMake(),
            car.getModel(),
            car.getYear(),
            car.getTrim(),
            car.getMileage(),
            car.getCondition(),
            car.getTransmission(),
            car.getBody(),
            car.getColor(),
            car.getInterior(),
            car.getEstimatedPrice()
        );
    }
}
