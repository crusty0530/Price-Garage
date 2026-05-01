package com.crusty.pricegarage.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.Collate;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cars")
public class Car {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank
    private String make;

    @NotBlank
    private String model;

    @NotNull
    private Integer year;

    @Column(name = "car_trim")
    private String trim;
    
    private Double mileage;
    private Double condition;
    private String transmission;
    private String body;
    private String color;
    private String interior;
    private String state;

    @Column(name = "estimated_price")
    private Double estimatedPrice;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
