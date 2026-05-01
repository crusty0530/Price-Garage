package com.crusty.pricegarage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.url}")
    private String appUrl;

    public void sendVerificationEmail(String to, String token){
        SimpleMailMessage message  = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Verify your Price Garage account");
        message.setText("Click the link to verify your account: "+ appUrl + "/api/auth/verify?token=" + token);

        mailSender.send(message);

    }

    public void sendPasswordResetEmail(String to, String token){
        SimpleMailMessage message  = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Reset your Price Garage password");
        message.setText("Click the link to reset your password: " + "http://localhost:5173/reset-password?token=" + token);

        mailSender.send(message);
    }
}
