package com.matchdayai.service;

import com.matchdayai.dto.DashboardStats;

import com.matchdayai.entity.Crowd;
import com.matchdayai.entity.Queue;
import com.matchdayai.entity.EmergencyIncident;
import com.matchdayai.entity.Transport;

import com.matchdayai.repository.CrowdRepository;
import com.matchdayai.repository.QueueRepository;
import com.matchdayai.repository.EmergencyRepository;
import com.matchdayai.repository.TransportRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    private final CrowdRepository crowdRepository;

    private final QueueRepository queueRepository;

    private final EmergencyRepository emergencyRepository;

    private final TransportRepository transportRepository;

    public DashboardService(
            CrowdRepository crowdRepository,
            QueueRepository queueRepository,
            EmergencyRepository emergencyRepository,
            TransportRepository transportRepository
    ) {

        this.crowdRepository =
                crowdRepository;

        this.queueRepository =
                queueRepository;

        this.emergencyRepository =
                emergencyRepository;

        this.transportRepository =
                transportRepository;
    }

    public DashboardStats getDashboardStats() {

        List<Crowd> crowds =
                crowdRepository.findAll();

        List<Queue> queues =
                queueRepository.findAll();

        List<EmergencyIncident> emergencies =
                emergencyRepository.findAll();

        List<Transport> transports =
                transportRepository.findAll();


        /*
         * Calculate average crowd percentage.
         */
        int averageCrowd = (int) crowds
                .stream()

                .filter(
                        crowd ->
                                crowd.getCrowdPercentage()
                                        != null
                )

                .mapToInt(
                        Crowd::getCrowdPercentage
                )

                .average()

                .orElse(0);


        /*
         * Calculate average queue time.
         */
        int averageQueue = (int) queues
                .stream()

                .filter(
                        queue ->
                                queue.getWaitingTime()
                                        != null
                )

                .mapToInt(
                        Queue::getWaitingTime
                )

                .average()

                .orElse(0);


        /*
         * Count active or responding emergencies.
         */
        int activeEmergencies = (int) emergencies
                .stream()

                .filter(
                        emergency ->

                                "active".equalsIgnoreCase(
                                        emergency.getStatus()
                                )

                                ||

                                "responding".equalsIgnoreCase(
                                        emergency.getStatus()
                                )
                )

                .count();


        /*
         * Calculate transport availability.
         *
         * Example:
         * 2 available routes out of 4
         * means 50% availability.
         */
        long availableTransport =
                transports.stream()

                        .filter(
                                transport ->

                                        "available"
                                                .equalsIgnoreCase(

                                                        transport
                                                                .getStatus()
                                                )
                        )

                        .count();


        int transportPercentage =

                transports.isEmpty()

                        ? 0

                        : (int) (

                        availableTransport
                                * 100

                                / transports.size()
                );


        /*
         * Build dashboard statistics.
         *
         * Some values are temporary because
         * their MongoDB modules are not
         * connected yet.
         */
        return DashboardStats.builder()

                .visitors(48250)

                .visitorsTrend(8)

                .crowdDensity(
                        averageCrowd
                )

                .crowdDensityTrend(5)

                .averageQueueTime(
                        averageQueue
                )

                .averageQueueTimeTrend(-3)

                .emergencyAlerts(
                        activeEmergencies
                )

                .energyUsage(1250)

                .energyUsageTrend(-4)

                .transportation(
                        transportPercentage
                )

                .transportationTrend(6)

                .wasteCollection(78)

                .wasteCollectionTrend(4)

                .announcements(3)

                .build();
    }
}