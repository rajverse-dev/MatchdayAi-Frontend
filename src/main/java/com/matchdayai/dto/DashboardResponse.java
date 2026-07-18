package com.matchdayai.dto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardResponse {

    private Long totalUsers;

    private Long totalCrowds;

    private Long totalQueues;

    private Long totalAnnouncements;

    private Long totalTransport;
}
