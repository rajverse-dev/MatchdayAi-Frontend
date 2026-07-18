package com.matchdayai.controller;

import com.matchdayai.dto.EmergencyIncidentResponse;
import com.matchdayai.service.EmergencyService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/emergency")
public class EmergencyController {

    private final EmergencyService emergencyService;

    public EmergencyController(
            EmergencyService emergencyService
    ) {
        this.emergencyService = emergencyService;
    }

    @GetMapping
    public List<EmergencyIncidentResponse> getEmergencyIncidents() {

        return emergencyService.getEmergencyIncidents();
    }
}
