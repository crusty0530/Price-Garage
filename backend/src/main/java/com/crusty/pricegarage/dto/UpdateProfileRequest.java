package com.crusty.pricegarage.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileRequest {

    @Size(max = 50, message = "Display must be 50 characters or fewer")
    private String displayName;

    @Size(max = 280, message = "Bio must be 280 characters or fewer")
    private String bio;

    @Size(max = 500, message = "Avatar URL must be 500 characters or fewer")
    private String avatarUrl;

    @Size(max = 100, message = "Location must be 100 character or fewer")
    private String location;
}
