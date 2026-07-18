package com.matchdayai.service;

import java.time.LocalDateTime;
import java.util.List;
import com.matchdayai.enums.Role;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.matchdayai.dto.UserRequest;

import com.matchdayai.dto.UserResponse;
import com.matchdayai.entity.User;
import com.matchdayai.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse createUser(UserRequest request) {

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.valueOf(request.getRole()))
                .phone(request.getPhone())
                .preferredLanguage(request.getPreferredLanguage())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        User savedUser = repository.save(user);

        return UserResponse.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .phone(savedUser.getPhone())
                .preferredLanguage(savedUser.getPreferredLanguage())
                .createdAt(savedUser.getCreatedAt())
                .build();
    }

    public List<UserResponse> getAllUsers() {
        
        return repository.findAll().stream()
                .map(user -> UserResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .phone(user.getPhone())
                        .preferredLanguage(user.getPreferredLanguage())
                        .createdAt(user.getCreatedAt())
                        .build())
                .toList();
    }

}