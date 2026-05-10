package com.crusty.pricegarage.dto;

import java.time.LocalDateTime;
import java.util.List;

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
    private String displayName;
    private String bio;
    private String avatarUrl;
    private String location;
    private int carCount;
    private double totalGarageValue;
    private int followerCount;
    private List<PublicCarResponse> cars;

    public static PublicUserResponse fromEntity(User user, List<PublicCarResponse> cars, double totalGarageValue){
        return new PublicUserResponse(
            user.getId(),
            user.getUsername(),
            user.getCreatedAt(),
            user.getDisplayName(),
            user.getBio(),
            user.getAvatarUrl(),
            user.getLocation(),
            cars.size(),
            totalGarageValue,
            0, //follower count
            cars
        );
    }
}
