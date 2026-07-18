package com.matchdayai.controller;

import com.matchdayai.dto.ApiResponse;
import com.matchdayai.dto.UserRequest;
import com.matchdayai.dto.UserResponse;
import com.matchdayai.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping
    public ApiResponse<UserResponse> createUser(
            @Valid @RequestBody UserRequest request) {

        UserResponse response = service.createUser(request);

        return ApiResponse.<UserResponse>builder()
                .success(true)
                .message("User created successfully")
                .data(response)
                .build();
    }

    @GetMapping
    public List<UserResponse> getAllUsers() {
        return service.getAllUsers();
    }
}
