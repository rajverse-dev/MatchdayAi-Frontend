package com.matchdayai.config;

import com.matchdayai.entity.Crowd;
import com.matchdayai.entity.EmergencyIncident;
import com.matchdayai.entity.Queue;

import com.matchdayai.repository.CrowdRepository;
import com.matchdayai.repository.EmergencyRepository;
import com.matchdayai.repository.QueueRepository;

import com.matchdayai.entity.Transport;
import com.matchdayai.repository.TransportRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.matchdayai.entity.MapPoint;
import com.matchdayai.repository.NavigationRepository;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CrowdRepository crowdRepository;
    private final QueueRepository queueRepository;
    private final TransportRepository transportRepository;
    private final NavigationRepository navigationRepository;
    private final EmergencyRepository emergencyRepository;

public DataSeeder(
        CrowdRepository crowdRepository,
        QueueRepository queueRepository,
        TransportRepository transportRepository,
        NavigationRepository navigationRepository,
        EmergencyRepository emergencyRepository
) {

    this.crowdRepository =
            crowdRepository;

    this.queueRepository =
            queueRepository;

    this.transportRepository =
            transportRepository;

    this.navigationRepository =
            navigationRepository;

    this.emergencyRepository =
            emergencyRepository;
} 
   @Override
public void run(String... args) {

    seedCrowdData();

    seedQueueData();

    seedTransportData();

    seedNavigationData();

    seedEmergencyData();
}
    /*
     * Insert crowd data only when
     * the crowd collection is empty.
     */
    private void seedCrowdData() {

        if (crowdRepository.count() == 0) {

            List<Crowd> crowdData = List.of(

                    Crowd.builder()
                            .gate("North Gate")
                            .crowdPercentage(30)
                            .status("LOW")
                            .build(),

                    Crowd.builder()
                            .gate("South Gate")
                            .crowdPercentage(75)
                            .status("HIGH")
                            .build(),

                    Crowd.builder()
                            .gate("East Gate")
                            .crowdPercentage(50)
                            .status("MODERATE")
                            .build(),

                    Crowd.builder()
                            .gate("West Gate")
                            .crowdPercentage(40)
                            .status("LOW")
                            .build()
            );

            crowdRepository.saveAll(crowdData);

            System.out.println(
                    "Crowd sample data inserted successfully."
            );

        } else {

            System.out.println(
                    "Crowd data already exists. Skipping insertion."
            );
        }
    }

    /*
     * Insert queue data only when
     * the queues collection is empty.
     */
    private void seedQueueData() {

        if (queueRepository.count() == 0) {

            List<Queue> queueData = List.of(

                    Queue.builder()
                            .location("Champions Burger")
                            .waitingTime(4)
                            .people(12)
                            .build(),

                    Queue.builder()
                            .location("Stadium Pizza")
                            .waitingTime(9)
                            .people(25)
                            .build(),

                    Queue.builder()
                            .location("East Restroom")
                            .waitingTime(3)
                            .people(8)
                            .build(),

                    Queue.builder()
                            .location("Fan Merchandise Store")
                            .waitingTime(12)
                            .people(30)
                            .build()
            );

            queueRepository.saveAll(queueData);

            System.out.println(
                    "Queue sample data inserted successfully."
            );

        } else {

            System.out.println(
                    "Queue data already exists. Skipping insertion."
            );
        }
    }

    /*
 * Insert transport data only when
 * the transport_options collection is empty.
 */
private void seedTransportData() {

    if (transportRepository.count() == 0) {

        List<Transport> transportData = List.of(

                Transport.builder()
                        .route("Metro Blue Line")
                        .status("AVAILABLE")
                        .eta(5)
                        .build(),

                Transport.builder()
                        .route("Stadium Shuttle")
                        .status("AVAILABLE")
                        .eta(8)
                        .build(),

                Transport.builder()
                        .route("City Bus Route 24")
                        .status("LIMITED")
                        .eta(12)
                        .build(),

                Transport.builder()
                        .route("North Parking Shuttle")
                        .status("DELAYED")
                        .eta(18)
                        .build()
        );

        transportRepository.saveAll(
                transportData
        );

        System.out.println(
                "Transport sample data inserted successfully."
        );

    } else {

        System.out.println(
                "Transport data already exists. Skipping insertion."
        );
    }
}

private void seedNavigationData() {

    if (navigationRepository.count() == 0) {

        List<MapPoint> navigationData =
                List.of(

                        MapPoint.builder()
                                .label("North Gate")
                                .type("gate")
                                .lat(13.0010)
                                .lng(80.0010)
                                .description(
                                        "Main entrance near the North Stand"
                                )
                                .build(),

                        MapPoint.builder()
                                .label("Champions Food Court")
                                .type("food")
                                .lat(13.0020)
                                .lng(80.0020)
                                .description(
                                        "Food court located in the East Concourse"
                                )
                                .build(),

                        MapPoint.builder()
                                .label("Medical Centre")
                                .type("medical")
                                .lat(13.0030)
                                .lng(80.0030)
                                .description(
                                        "Medical assistance centre in the West Concourse"
                                )
                                .build(),

                        MapPoint.builder()
                                .label("East Restroom")
                                .type("restroom")
                                .lat(13.0040)
                                .lng(80.0040)
                                .description(
                                        "Restroom near the East Stand"
                                )
                                .build(),

                        MapPoint.builder()
                                .label("Gate A Accessible Entrance")
                                .type("gate")
                                .lat(13.0050)
                                .lng(80.0050)
                                .description(
                                        "Wheelchair-accessible stadium entrance"
                                )
                                .build(),

                        MapPoint.builder()
                                .label("South Emergency Exit")
                                .type("exit")
                                .lat(13.0060)
                                .lng(80.0060)
                                .description(
                                        "Emergency exit in the South Concourse"
                                )
                                .build()
                );

        navigationRepository.saveAll(
                navigationData
        );

        System.out.println(
                "Navigation sample data inserted successfully."
        );

    } else {

        System.out.println(
                "Navigation data already exists. Skipping insertion."
        );
    }
}

private void seedEmergencyData() {

    if (emergencyRepository.count() == 0) {

        List<EmergencyIncident> emergencyData =
                List.of(

                        EmergencyIncident.builder()
                                .type("medical")
                                .location("East Concourse")
                                .severity("medium")
                                .status("responding")
                                .reportedAt(
                                        "2026-07-11T18:30:00"
                                )
                                .description(
                                        "A visitor requires medical assistance"
                                )
                                .responder(
                                        "Medical Team A"
                                )
                                .build(),

                        EmergencyIncident.builder()
                                .type("infrastructure")
                                .location("North Concourse")
                                .severity("low")
                                .status("resolved")
                                .reportedAt(
                                        "2026-07-11T17:45:00"
                                )
                                .description(
                                        "A temporary lighting issue was reported"
                                )
                                .responder(
                                        "Maintenance Team B"
                                )
                                .build()
                );

        emergencyRepository.saveAll(
                emergencyData
        );

        System.out.println(
                "Emergency sample data inserted successfully."
        );

    } else {

        System.out.println(
                "Emergency data already exists. Skipping insertion."
        );
    }
}
}