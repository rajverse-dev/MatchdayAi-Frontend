package com.matchdayai.service;

import com.matchdayai.dto.LoginRequest;
import com.matchdayai.dto.LoginResponse;
import com.matchdayai.entity.User;
import com.matchdayai.enums.Role;
import com.matchdayai.repository.UserRepository;
import com.matchdayai.security.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AuthServiceTest {

    @Test
    void loginShouldWorkWithMixedCaseEmail() {
        UserRepository repository = mock(UserRepository.class);
        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
        JwtService jwtService = mock(JwtService.class);
        AuthService authService = new AuthService(repository, passwordEncoder, jwtService);

        User user = User.builder()
                .email("user@example.com")
                .password("encoded-password")
                .role(Role.ROLE_VISITOR)
                .build();

        LoginRequest request = new LoginRequest();
        request.setEmail("USER@Example.com");
        request.setPassword("plain-password");

        when(repository.findByEmailIgnoreCase("user@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("plain-password", "encoded-password")).thenReturn(true);
        when(jwtService.generateToken("user@example.com", Role.ROLE_VISITOR.name())).thenReturn("token");

        LoginResponse response = authService.login(request);

        assertEquals("token", response.getToken());
        assertEquals("user@example.com", response.getEmail());
    }
}
