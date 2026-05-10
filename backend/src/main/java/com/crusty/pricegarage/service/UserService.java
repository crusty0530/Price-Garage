package com.crusty.pricegarage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.crusty.pricegarage.dto.PublicCarResponse;
import com.crusty.pricegarage.dto.PublicUserResponse;
import com.crusty.pricegarage.dto.UpdateProfileRequest;
import com.crusty.pricegarage.model.User;
import com.crusty.pricegarage.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public PublicUserResponse getUser(Long id){
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        List<PublicCarResponse> publicCars = user.getCars().stream()
            .filter(car -> car.isPublic())
            .map(PublicCarResponse::fromEntity)
            .toList();

        double totalGarageValue = publicCars.stream()
        .mapToDouble(PublicCarResponse::getEstimatedPrice)
        .sum();

        return PublicUserResponse.fromEntity(user, publicCars, totalGarageValue);
    }

    @Transactional
    public PublicUserResponse updateUserProfile(String username, UpdateProfileRequest request){
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (request.getDisplayName() != null){
            user.setDisplayName(request.getDisplayName());
        }
        if (request.getBio() != null){
            user.setBio(request.getBio());
        }
        if (request.getAvatarUrl() != null){
            user.setAvatarUrl(request.getAvatarUrl());
        }
        if (request.getLocation() != null){
            user.setLocation(request.getLocation());
        }

        userRepository.save(user);
        return getUser(user.getId());
    }

    @Transactional(readOnly = true)
    public PublicUserResponse getCurrentUser(String username){
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return getUser(user.getId());
    }
}
