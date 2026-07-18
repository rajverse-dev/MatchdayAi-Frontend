package com.matchdayai.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/visitor")
public class VisitorController {

    @GetMapping("/dashboard")
    @PreAuthorize("hasAnyRole('ADMIN','OPERATOR','VISITOR')")
    public String visitorDashboard() {
        return "Visitor Dashboard";
    }
}
