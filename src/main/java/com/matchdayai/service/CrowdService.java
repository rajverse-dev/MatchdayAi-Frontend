package com.matchdayai.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.matchdayai.dto.CrowdZoneResponse;

@Service
public class CrowdService {

    public List<CrowdZoneResponse> getCrowdZones() {

        return List.of(

                CrowdZoneResponse.builder()
                        .id("crowd-001")
                        .zone("North Gate")
                        .density(35)
                        .capacity(5000)
                        .status("safe")
                        .trend(2.5)
                        .lastUpdated("2 minutes ago")
                        .build(),

                CrowdZoneResponse.builder()
                        .id("crowd-002")
                        .zone("South Gate")
                        .density(58)
                        .capacity(4500)
                        .status("moderate")
                        .trend(5.2)
                        .lastUpdated("1 minute ago")
                        .build(),

                CrowdZoneResponse.builder()
                        .id("crowd-003")
                        .zone("East Concourse")
                        .density(78)
                        .capacity(6000)
                        .status("busy")
                        .trend(9.4)
                        .lastUpdated("30 seconds ago")
                        .build(),

                CrowdZoneResponse.builder()
                        .id("crowd-004")
                        .zone("West Food Court")
                        .density(94)
                        .capacity(3000)
                        .status("critical")
                        .trend(15.7)
                        .lastUpdated("Just now")
                        .build(),

                CrowdZoneResponse.builder()
                        .id("crowd-005")
                        .zone("Upper Seating Area")
                        .density(42)
                        .capacity(10000)
                        .status("safe")
                        .trend(-3.5)
                        .lastUpdated("3 minutes ago")
                        .build(),

                CrowdZoneResponse.builder()
                        .id("crowd-006")
                        .zone("Lower Seating Area")
                        .density(69)
                        .capacity(12000)
                        .status("moderate")
                        .trend(4.8)
                        .lastUpdated("1 minute ago")
                        .build()
        );
    }
}
