package com.matchdayai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CrowdZoneResponse {

    private String id;

    private String zone;

    private int density;

    private int capacity;

    private String status;

    private double trend;

    private String lastUpdated;
}