package com.crusty.pricegarage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crusty.pricegarage.dto.CarRequest;
import com.crusty.pricegarage.model.Car;
import com.crusty.pricegarage.service.CarService;

@RestController
@RequestMapping("/api/cars")
public class CarController {
    
    @Autowired
    private CarService carService;

    @GetMapping
    public ResponseEntity<List<Car>> getAllCars(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(carService.getCars(username));
    }

    @PostMapping
    public ResponseEntity<Car> saveCar(@RequestBody CarRequest request){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(carService.saveCar(request, username));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        carService.deleteCar(id, username);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCar(@PathVariable Long id){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(carService.getCarById(id, username));
    }
}
