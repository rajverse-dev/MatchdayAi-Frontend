package com.matchdayai.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDataResponse {

    private DashboardStats stats;

    private List<TrendData> crowdTrend;

    private List<TrendData> queueTrend;

    private List<TrendData> energyTrend;

    private List<TrendData> transportTrend;

    private List<DashboardAnnouncement> announcements;

    private AIRecommendation aiRecommendation;
}
