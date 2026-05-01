package com.crusty.pricegarage.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.crusty.pricegarage.dto.AuthResponse;
import com.crusty.pricegarage.dto.LoginRequest;
import com.crusty.pricegarage.dto.RegisterRequest;
import com.crusty.pricegarage.model.User;
import com.crusty.pricegarage.repository.UserRepository;
import com.crusty.pricegarage.security.JwtUtil;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    public AuthResponse register(RegisterRequest request){
        User user = new User();
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        String verificationToken = UUID.randomUUID().toString();

        user.setUsername(request.getUsername());
        user.setPassword(encodedPassword);
        user.setEmail(request.getEmail());
        user.setVerificationToken(verificationToken);
        user.setVerified(false);
        userRepository.save(user);

        emailService.sendVerificationEmail(user.getEmail(), verificationToken);
        String token = jwtUtil.generateToken(user.getUsername());
        return new AuthResponse(token);
    }

    public AuthResponse login(LoginRequest request){
        authenticationManager.authenticate(
            new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                request.getUsername(), request.getPassword()
            )
        );

        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.isVerified()) {
            throw new RuntimeException("Email not verified");
        }

        String token = jwtUtil.generateToken(request.getUsername());
        return new AuthResponse(token);
    }

    public void verifyEmail(String token){
        User user = userRepository.findByVerificationToken(token).orElseThrow(() -> new RuntimeException("Invalid token"));
        user.setVerified(true);
        user.setVerificationToken(null);
        userRepository.save(user);
    }

    public void forgotPassword(String email){
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        String resetToken = UUID.randomUUID().toString();
        user.setResetToken(resetToken);
        user.setResetTokenExpiry(LocalDateTime.now().plusHours(1));
        userRepository.save(user);

        emailService.sendPasswordResetEmail(user.getEmail(), resetToken);
    }

    public void resetPassword(String token, String newPassword){
        User user = userRepository.findByResetToken(token).orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.getResetTokenExpiry().isAfter(LocalDateTime.now())) {
            throw new RuntimeException("Reset Token Expired");
        }

        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);
    }
}
