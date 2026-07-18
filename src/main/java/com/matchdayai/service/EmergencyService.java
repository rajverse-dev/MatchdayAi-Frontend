package com.matchdayai.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.matchdayai.dto.EmergencyIncidentResponse;

@Service
public class EmergencyService {

    public List<EmergencyIncidentResponse> getEmergencyIncidents() {

        return List.of(

                EmergencyIncidentResponse.builder()
                        .id("emergency-001")
                        .type("medical")
                        .location("North Stand - Section 102")
                        .severity("high")
                        .status("responding")
                        .reportedAt("2 minutes ago")
                        .description(
                                "A visitor reported chest pain. " +
                                "The medical response team has been dispatched."
                        )
                        .responder("Medical Team Alpha")
                        .build(),

                EmergencyIncidentResponse.builder()
                        .id("emergency-002")
                        .type("crowd")
                        .location("Gate B Entrance")
                        .severity("critical")
                        .status("active")
                        .reportedAt("4 minutes ago")
                        .description(
                                "Crowd density has exceeded the safe threshold. " +
                                "Fans should be redirected to Gate C."
                        )
                        .responder("Crowd Control Unit")
                        .build(),

                EmergencyIncidentResponse.builder()
                        .id("emergency-003")
                        .type("security")
                        .location("West Concourse")
                        .severity("medium")
                        .status("responding")
                        .reportedAt("8 minutes ago")
                        .description(
                                "An unattended bag was reported near the food court."
                        )
                        .responder("Security Team Bravo")
                        .build(),

                EmergencyIncidentResponse.builder()
                        .id("emergency-004")
                        .type("infrastructure")
                        .location("East Stand - Level 2")
                        .severity("low")
                        .status("active")
                        .reportedAt("12 minutes ago")
                        .description(
                                "A lighting fault has been reported in the corridor."
                        )
                        .responder("Maintenance Team")
                        .build(),

                EmergencyIncidentResponse.builder()
                        .id("emergency-005")
                        .type("fire")
                        .location("South Food Court")
                        .severity("high")
                        .status("resolved")
                        .reportedAt("25 minutes ago")
                        .description(
                                "Smoke was detected near a food stall. " +
                                "The source was isolated and the area is safe."
                        )
                        .responder("Fire Response Team")
                        .build()
        );
    }
}
