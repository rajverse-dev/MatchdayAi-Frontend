package com.matchdayai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransportOptionResponse {

    private String id;

    private String type;

    private String label;

    private int availability;

    private int nextArrival;

    private int capacity;

    private String status;

    private String route;
}