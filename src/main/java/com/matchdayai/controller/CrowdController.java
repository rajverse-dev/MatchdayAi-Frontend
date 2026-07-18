package com.matchdayai.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.matchdayai.dto.CrowdZoneResponse;
import com.matchdayai.service.CrowdService;

@RestController
@RequestMapping("/api/crowd")
public class CrowdController {

    private final CrowdService crowdService;

    public CrowdController(
            CrowdService crowdService
    ) {
        this.crowdService = crowdService;
    }

    @GetMapping
    public List<CrowdZoneResponse> getCrowdZones() {

        return crowdService.getCrowdZones();
    }
}