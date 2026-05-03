package com.crusty.pricegarage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.crusty.pricegarage.dto.CarRequest;
import com.crusty.pricegarage.model.Car;
import com.crusty.pricegarage.model.User;
import com.crusty.pricegarage.repository.CarRepository;
import com.crusty.pricegarage.repository.UserRepository;

@Service
public class CarService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private PredictionService predictionService;

    public Car saveCar(CarRequest request, String username){
        User foundUser = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Car car = new Car();
        car.setMake(request.getMake());
        car.setModel(request.getModel());
        car.setYear(request.getYear());
        car.setTrim(request.getTrim());
        car.setMileage(request.getMileage());
        car.setCondition(request.getCondition());
        car.setTransmission(request.getTransmission());
        car.setBody(request.getBody());
        car.setColor(request.getColor());
        car.setInterior(request.getInterior());
        car.setState(request.getState());
        car.setUser(foundUser);
        car.setEstimatedPrice(predictionService.predictPrice(request));
        return carRepository.save(car);
    }

    public Car updateCar(Long id, CarRequest request, String username){
        User foundUser = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Car foundCar = carRepository.findById(id).orElseThrow(() -> new RuntimeException("Car not found"));

        if (!foundCar.getUser().getId().equals(foundUser.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        foundCar.setMake(request.getMake());
        foundCar.setModel(request.getModel());
        foundCar.setYear(request.getYear());
        foundCar.setTrim(request.getTrim());
        foundCar.setMileage(request.getMileage());
        foundCar.setCondition(request.getCondition());
        foundCar.setTransmission(request.getTransmission());
        foundCar.setBody(request.getBody());
        foundCar.setColor(request.getColor());
        foundCar.setInterior(request.getInterior());
        foundCar.setState(request.getState());
        foundCar.setEstimatedPrice(predictionService.predictPrice(request));
        return carRepository.save(foundCar);
    }

    public List<Car> getCars(String username){
        User foundUser = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return carRepository.findByUser(foundUser);
    }

    public Car getCarById(Long id, String username){
        User foundUser = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Car car = carRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Car not found"));

        if (!car.getUser().getId().equals(foundUser.getId())){
            throw new RuntimeException("Unauthorized");
        }

        return car;
    }

    public void deleteCar(Long id, String username){
        User foundUser = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    
        Car car = carRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Car not found"));

        // check the car belongs to this user
        if (!car.getUser().getId().equals(foundUser.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        carRepository.deleteById(id);
    }
}
