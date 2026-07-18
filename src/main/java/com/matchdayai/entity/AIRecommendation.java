package com.matchdayai.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIRecommendation {

    private String id;

    private String title;

    private String description;

    private String priority;

    private String action;

    private Integer confidence;
}
