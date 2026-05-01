package com.crusty.pricegarage.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crusty.pricegarage.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    
    public Optional<User> findByUsername(String username);
    public Optional<User> findByVerificationToken(String token);
    public Optional<User> findByEmail(String email);
    public Optional<User> findByResetToken(String token);
}
