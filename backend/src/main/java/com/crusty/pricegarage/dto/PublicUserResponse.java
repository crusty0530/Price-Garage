package com.crusty.pricegarage.dto;

import java.time.LocalDateTime;

import com.crusty.pricegarage.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PublicUserResponse {
    
    private Long id;
    private String username;
    private LocalDateTime createdAt;

    public static PublicUserResponse fromEntity(User user){
        return new PublicUserResponse(
            user.getId(),
            user.getUsername(),
            user.getCreatedAt()
        );
    }
}
