package com.matchdayai.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.matchdayai.dto.MapPointResponse;
import com.matchdayai.dto.RouteInfoResponse;

@Service
public class NavigationService {

    /*
     * Return all stadium locations.
     */
    public List<MapPointResponse> getMapPoints() {

        return List.of(

                MapPointResponse.builder()
                        .id("point-001")
                        .label("North Gate")
                        .type("gate")
                        .lat(51.5552)
                        .lng(-0.1085)
                        .description(
                                "Main entrance for North Stand visitors."
                        )
                        .build(),

                MapPointResponse.builder()
                        .id("point-002")
                        .label("South Gate")
                        .type("gate")
                        .lat(51.5538)
                        .lng(-0.1084)
                        .description(
                                "Entrance for South Stand visitors."
                        )
                        .build(),

                MapPointResponse.builder()
                        .id("point-003")
                        .label("Champions Food Court")
                        .type("food")
                        .lat(51.5547)
                        .lng(-0.1078)
                        .description(
                                "Food court serving meals, snacks and drinks."
                        )
                        .build(),

                MapPointResponse.builder()
                        .id("point-004")
                        .label("Medical Centre")
                        .type("medical")
                        .lat(51.5545)
                        .lng(-0.1091)
                        .description(
                                "Emergency medical support and first aid."
                        )
                        .build(),

                MapPointResponse.builder()
                        .id("point-005")
                        .label("East Restroom")
                        .type("restroom")
                        .lat(51.5546)
                        .lng(-0.1072)
                        .description(
                                "Accessible public restroom."
                        )
                        .build(),

                MapPointResponse.builder()
                        .id("point-006")
                        .label("North Parking Area")
                        .type("parking")
                        .lat(51.5560)
                        .lng(-0.1087)
                        .description(
                                "Parking area for ticket holders."
                        )
                        .build(),

                MapPointResponse.builder()
                        .id("point-007")
                        .label("Section 110")
                        .type("seat")
                        .lat(51.5548)
                        .lng(-0.1083)
                        .description(
                                "Lower-level seating section."
                        )
                        .build(),

                MapPointResponse.builder()
                        .id("point-008")
                        .label("Emergency Exit A")
                        .type("exit")
                        .lat(51.5542)
                        .lng(-0.1090)
                        .description(
                                "Emergency exit. Keep the route clear."
                        )
                        .build()
        );
    }

    /*
     * Return stadium navigation routes.
     */
    public List<RouteInfoResponse> getRoutes() {

        return List.of(

                RouteInfoResponse.builder()
                        .id("route-001")
                        .from("North Gate")
                        .to("Section 110")
                        .distance(350)
                        .estimatedTime(5)
                        .accessibility(true)
                        .build(),

                RouteInfoResponse.builder()
                        .id("route-002")
                        .from("South Gate")
                        .to("Champions Food Court")
                        .distance(220)
                        .estimatedTime(3)
                        .accessibility(true)
                        .build(),

                RouteInfoResponse.builder()
                        .id("route-003")
                        .from("North Gate")
                        .to("Medical Centre")
                        .distance(180)
                        .estimatedTime(2)
                        .accessibility(true)
                        .build(),

                RouteInfoResponse.builder()
                        .id("route-004")
                        .from("Section 110")
                        .to("East Restroom")
                        .distance(120)
                        .estimatedTime(2)
                        .accessibility(true)
                        .build(),

                RouteInfoResponse.builder()
                        .id("route-005")
                        .from("North Parking Area")
                        .to("North Gate")
                        .distance(450)
                        .estimatedTime(7)
                        .accessibility(true)
                        .build(),

                RouteInfoResponse.builder()
                        .id("route-006")
                        .from("Champions Food Court")
                        .to("Emergency Exit A")
                        .distance(200)
                        .estimatedTime(3)
                        .accessibility(false)
                        .build()
        );
    }
}