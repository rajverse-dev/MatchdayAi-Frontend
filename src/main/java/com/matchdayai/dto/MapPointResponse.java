package com.matchdayai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MapPointResponse {

    private String id;

    private String label;

    private String type;

    private double lat;

    private double lng;

    private String description;
}