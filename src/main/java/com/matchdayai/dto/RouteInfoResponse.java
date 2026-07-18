package com.matchdayai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RouteInfoResponse {

    private String id;

    private String from;

    private String to;

    private double distance;

    private int estimatedTime;

    private boolean accessibility;
}
