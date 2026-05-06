package com.crusty.pricegarage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.crusty.pricegarage.dto.PublicUserResponse;
import com.crusty.pricegarage.model.User;
import com.crusty.pricegarage.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public PublicUserResponse getUser(Long id){
        User user = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return PublicUserResponse.fromEntity(user);
    }
}
