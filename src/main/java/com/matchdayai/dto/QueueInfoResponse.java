package com.matchdayai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QueueInfoResponse {

    private String id;

    private String stallName;

    private String location;

    private int waitingTime;

    private int estimatedTime;

    private int peopleInLine;

    private String status;

    private int progress;

    private String category;

    private double rating;
}
