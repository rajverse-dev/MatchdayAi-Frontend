package com.matchdayai.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.matchdayai.dto.TransportOptionResponse;
import com.matchdayai.service.TransportService;

@RestController
@RequestMapping("/api/transport")
public class TransportController {

    private final TransportService transportService;

    public TransportController(
            TransportService transportService
    ) {
        this.transportService = transportService;
    }

    @GetMapping
    public List<TransportOptionResponse> getTransportOptions() {

        return transportService.getTransportOptions();
    }
}
