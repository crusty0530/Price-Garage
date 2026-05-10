package com.crusty.pricegarage.controller;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crusty.pricegarage.dto.PublicUserResponse;
import com.crusty.pricegarage.dto.UpdateProfileRequest;
import com.crusty.pricegarage.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<PublicUserResponse> getUser(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUser(id));
    }

    @PatchMapping("/me")
    public ResponseEntity<PublicUserResponse> updateUserProfile(
                                                @Valid @RequestBody UpdateProfileRequest request,
                                                Authentication authentication){
        
        String username = authentication.getName();
        return ResponseEntity.ok(userService.updateUserProfile(username, request));
    }

    @GetMapping("/me")
    public ResponseEntity<PublicUserResponse> getCurrentUser(Authentication authentication){
        String username = authentication.getName();
        return ResponseEntity.ok(userService.getCurrentUser(username));
    }
    
}
