package com.matchdayai.service;

import com.matchdayai.enums.Role;
import com.matchdayai.dto.LoginRequest;
import com.matchdayai.dto.LoginResponse;
import com.matchdayai.dto.RegisterRequest;
import com.matchdayai.entity.User;
import com.matchdayai.repository.UserRepository;
import com.matchdayai.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository repository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String register(RegisterRequest request) {
        String normalizedEmail = request.getEmail() == null ? null : request.getEmail().trim().toLowerCase();

        if(repository.findByEmailIgnoreCase(normalizedEmail).isPresent()){
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(normalizedEmail)
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_VISITOR)
                .phone(request.getPhone())
                .preferredLanguage(request.getPreferredLanguage())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        repository.save(user);

        return "User Registered Successfully";
    }

    public LoginResponse login(LoginRequest request){
        String normalizedEmail = request.getEmail() == null ? null : request.getEmail().trim().toLowerCase();

        User user = repository.findByEmailIgnoreCase(normalizedEmail)
                .orElseThrow(() -> new RuntimeException("Invalid Email"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name());

        return LoginResponse.builder()
                .token(token)
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

}