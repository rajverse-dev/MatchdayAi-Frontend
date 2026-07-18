package com.matchdayai.controller;

import com.matchdayai.dto.*;
import com.matchdayai.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service){
        this.service = service;
    }

    @PostMapping("/register")
    public ApiResponse<String> register(
            @Valid @RequestBody RegisterRequest request){

        return ApiResponse.<String>builder()
                .success(true)
                .message(service.register(request))
                .build();
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(
            @Valid @RequestBody LoginRequest request){

        return ApiResponse.<LoginResponse>builder()
                .success(true)
                .message("Login Successful")
                .data(service.login(request))
                .build();
    }

}