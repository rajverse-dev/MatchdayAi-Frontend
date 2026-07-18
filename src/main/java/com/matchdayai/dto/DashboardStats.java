package com.matchdayai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {

    private int visitors;
    private double visitorsTrend;

    private double crowdDensity;
    private double crowdDensityTrend;

    private int averageQueueTime;
    private double averageQueueTimeTrend;

    private int emergencyAlerts;

    private double energyUsage;
    private double energyUsageTrend;

    private double transportation;
    private double transportationTrend;

    private double wasteCollection;
    private double wasteCollectionTrend;

    private int announcements;
}
