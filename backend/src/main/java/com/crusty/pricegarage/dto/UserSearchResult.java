package com.crusty.pricegarage.dto;

import com.crusty.pricegarage.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSearchResult {
    
    private Long id;
    private String username;
    private String displayName;
    private String avatarUrl;

    public static UserSearchResult fromEntity(User user){
        return new UserSearchResult(
            user.getId(),
            user.getUsername(),
            user.getDisplayName(),
            user.getAvatarUrl()
        );
    }
}
