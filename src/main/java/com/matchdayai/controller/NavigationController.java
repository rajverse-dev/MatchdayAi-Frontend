package com.matchdayai.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.matchdayai.dto.MapPointResponse;
import com.matchdayai.dto.RouteInfoResponse;
import com.matchdayai.service.NavigationService;

@RestController
@RequestMapping("/api/navigation")
public class NavigationController {

    private final NavigationService navigationService;

    public NavigationController(
            NavigationService navigationService
    ) {
        this.navigationService = navigationService;
    }

    /*
     * GET /api/navigation/points
     */
    @GetMapping("/points")
    public List<MapPointResponse> getMapPoints() {

        return navigationService.getMapPoints();
    }

    /*
     * GET /api/navigation/routes
     */
    @GetMapping("/routes")
    public List<RouteInfoResponse> getRoutes() {

        return navigationService.getRoutes();
    }
}