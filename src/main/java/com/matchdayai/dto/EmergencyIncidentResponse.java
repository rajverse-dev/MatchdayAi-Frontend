package com.matchdayai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmergencyIncidentResponse {

    private String id;

    private String type;

    private String location;

    private String severity;

    private String status;

    private String reportedAt;

    private String description;

    private String responder;
}
