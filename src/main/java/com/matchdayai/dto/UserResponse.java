package com.matchdayai.dto;

import java.time.LocalDateTime;
import com.matchdayai.enums.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {

    private String id;

    private String name;
    
    private String email;

    private Role role;

    private String phone;

    private String preferredLanguage;

    private LocalDateTime createdAt;

}
