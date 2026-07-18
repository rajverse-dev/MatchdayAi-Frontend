package com.matchdayai.controller;

import com.matchdayai.dto.DashboardStats;

import com.matchdayai.service.DashboardService;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService
            dashboardService;

    public DashboardController(
            DashboardService dashboardService
    ) {

        this.dashboardService =
                dashboardService;
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStats>
    getDashboardStats() {

        DashboardStats stats =
                dashboardService
                        .getDashboardStats();

        return ResponseEntity.ok(
                stats
        );
    }
}