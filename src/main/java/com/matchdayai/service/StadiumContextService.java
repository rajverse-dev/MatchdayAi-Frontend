package com.matchdayai.service;


import tools.jackson.databind.ObjectMapper;

import com.matchdayai.repository.CrowdRepository;
import com.matchdayai.repository.QueueRepository;
import com.matchdayai.repository.TransportRepository;
import com.matchdayai.repository.NavigationRepository;
import com.matchdayai.repository.EmergencyRepository;

import org.springframework.stereotype.Service;

import tools.jackson.core.JacksonException;

@Service
public class StadiumContextService {

    private final CrowdRepository crowdRepository;

    private final QueueRepository queueRepository;

    private final TransportRepository transportRepository;

    private final NavigationRepository navigationRepository;

    private final EmergencyRepository emergencyRepository;

    private final ObjectMapper objectMapper;

    public StadiumContextService(

            CrowdRepository crowdRepository,

            QueueRepository queueRepository,

            TransportRepository transportRepository,

            NavigationRepository navigationRepository,

            EmergencyRepository emergencyRepository,

            ObjectMapper objectMapper
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

        this.objectMapper =
                objectMapper;
    }

   public String getStadiumContext() {

    try {

        String crowdData =
                objectMapper.writeValueAsString(
                        crowdRepository.findAll()
                );

        String queueData =
                objectMapper.writeValueAsString(
                        queueRepository.findAll()
                );

        String transportData =
                objectMapper.writeValueAsString(
                        transportRepository.findAll()
                );

        String navigationData =
                objectMapper.writeValueAsString(
                        navigationRepository.findAll()
                );

        String emergencyData =
                objectMapper.writeValueAsString(
                        emergencyRepository.findAll()
                );

        System.out.println("Crowd data: " + crowdData);
System.out.println("Queue data: " + queueData);
System.out.println("Transport data: " + transportData);
System.out.println("Navigation data: " + navigationData);
System.out.println("Emergency data: " + emergencyData);

        return """

                CURRENT MATCHDAY STADIUM DATA

                CROWD INFORMATION:
                %s

                QUEUE INFORMATION:
                %s

                TRANSPORT INFORMATION:
                %s

                NAVIGATION INFORMATION:
                %s

                EMERGENCY INFORMATION:
                %s

                """.formatted(
                crowdData,
                queueData,
                transportData,
                navigationData,
                emergencyData
        );
        

    } catch (JacksonException exception) {

        throw new RuntimeException(
                "Unable to prepare stadium context",
                exception
        );
    }


}
}
