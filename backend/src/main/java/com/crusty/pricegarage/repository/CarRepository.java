package com.crusty.pricegarage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crusty.pricegarage.model.Car;
import com.crusty.pricegarage.model.User;

@Repository
public interface CarRepository extends JpaRepository<Car, Long>{
    
    public List<Car> findByUser(User user);
}
