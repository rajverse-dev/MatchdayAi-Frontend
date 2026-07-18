package com.matchdayai.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "emergency_incidents")
public class EmergencyIncident {

    @Id
    private String id;

    private String type;

    private String location;

    private String severity;

    private String status;

    private String reportedAt;

    private String description;

    private String responder;
}