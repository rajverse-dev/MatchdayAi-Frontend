package com.matchdayai.dto;

public class TrendPoint {

    private String time;
    private double value;

    public TrendPoint() {
    }

    public TrendPoint(String time, double value) {
        this.time = time;
        this.value = value;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }
}
