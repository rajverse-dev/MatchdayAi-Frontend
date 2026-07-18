package com.matchdayai.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/operator")
public class OperatorController {

    @GetMapping("/dashboard")
    @PreAuthorize("hasAnyRole('ADMIN','OPERATOR')")
    public String operatorDashboard() {
        return "Operator Dashboard";
    }
}