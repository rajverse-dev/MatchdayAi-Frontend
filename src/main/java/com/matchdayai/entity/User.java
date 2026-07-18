package com.matchdayai.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.matchdayai.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")

public class User {
    @Id
    private String id;

    private String name;
    
    private String email;

    private String password;

    private Role role;

    private String phone;

    private String preferredLanguage;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public Role getRole() {
        return role;
        }

    public void setRole(Role role) {
        this.role = role;
}


}
