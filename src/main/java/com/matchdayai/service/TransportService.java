package com.matchdayai.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.matchdayai.dto.TransportOptionResponse;

@Service
public class TransportService {

    public List<TransportOptionResponse> getTransportOptions() {

        return List.of(

                TransportOptionResponse.builder()
                        .id("transport-001")
                        .type("metro")
                        .label("Metro Blue Line")
                        .availability(85)
                        .nextArrival(4)
                        .capacity(1200)
                        .status("available")
                        .route("Stadium Station → City Centre")
                        .build(),

                TransportOptionResponse.builder()
                        .id("transport-002")
                        .type("bus")
                        .label("World Cup Express Bus")
                        .availability(62)
                        .nextArrival(7)
                        .capacity(80)
                        .status("available")
                        .route("Stadium → Central Bus Terminal")
                        .build(),

                TransportOptionResponse.builder()
                        .id("transport-003")
                        .type("parking")
                        .label("North Stadium Parking")
                        .availability(28)
                        .nextArrival(0)
                        .capacity(2500)
                        .status("limited")
                        .route("North Entrance")
                        .build(),

                TransportOptionResponse.builder()
                        .id("transport-004")
                        .type("rideshare")
                        .label("Ride Pickup Zone A")
                        .availability(45)
                        .nextArrival(6)
                        .capacity(300)
                        .status("limited")
                        .route("East Stadium Exit")
                        .build(),

                TransportOptionResponse.builder()
                        .id("transport-005")
                        .type("shuttle")
                        .label("Airport Shuttle")
                        .availability(76)
                        .nextArrival(12)
                        .capacity(60)
                        .status("available")
                        .route("Stadium → International Airport")
                        .build(),

                TransportOptionResponse.builder()
                        .id("transport-006")
                        .type("parking")
                        .label("South Stadium Parking")
                        .availability(0)
                        .nextArrival(0)
                        .capacity(1800)
                        .status("full")
                        .route("South Entrance")
                        .build()
        );
    }
}