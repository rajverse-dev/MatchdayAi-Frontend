package com.matchdayai.dto;

import java.util.List;

public class DashboardTrendResponse {

    private List<TrendPoint> crowdTrend;
    private List<TrendPoint> queueTrend;

    public DashboardTrendResponse() {
    }

    public DashboardTrendResponse(
            List<TrendPoint> crowdTrend,
            List<TrendPoint> queueTrend) {

        this.crowdTrend = crowdTrend;
        this.queueTrend = queueTrend;
    }

    public List<TrendPoint> getCrowdTrend() {
        return crowdTrend;
    }

    public void setCrowdTrend(List<TrendPoint> crowdTrend) {
        this.crowdTrend = crowdTrend;
    }

    public List<TrendPoint> getQueueTrend() {
        return queueTrend;
    }

    public void setQueueTrend(List<TrendPoint> queueTrend) {
        this.queueTrend = queueTrend;
    }
}