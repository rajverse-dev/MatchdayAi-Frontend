package com.matchdayai.service;

import com.matchdayai.entity.AIRecommendation;
import com.matchdayai.entity.Crowd;
import com.matchdayai.entity.Queue;

import com.matchdayai.repository.CrowdRepository;
import com.matchdayai.repository.QueueRepository;

import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
public class RecommendationService {

    private final CrowdRepository crowdRepository;

    private final QueueRepository queueRepository;

    public RecommendationService(
            CrowdRepository crowdRepository,
            QueueRepository queueRepository
    ) {

        this.crowdRepository =
                crowdRepository;

        this.queueRepository =
                queueRepository;
    }

    public AIRecommendation
    generateRecommendation() {

        List<Crowd> crowds =
                crowdRepository.findAll();

        List<Queue> queues =
                queueRepository.findAll();

        /*
         * Find the gate with the
         * highest crowd percentage.
         */
        Crowd busiestGate =
                crowds.stream()

                        .filter(
                                crowd ->
                                        crowd.getCrowdPercentage()
                                                != null
                        )

                        .max(
                                Comparator.comparing(
                                        Crowd::getCrowdPercentage
                                )
                        )

                        .orElse(null);

        /*
         * High-crowd recommendation
         */
        if (busiestGate != null
                && busiestGate
                .getCrowdPercentage() >= 70) {

            return AIRecommendation.builder()

                    .id(
                            UUID.randomUUID()
                                    .toString()
                    )

                    .title(
                            "Crowd Congestion Warning"
                    )

                    .description(

                            busiestGate.getGate()

                            + " currently has "

                            + busiestGate
                            .getCrowdPercentage()

                            + "% crowd density."
                    )

                    .priority("high")

                    .action(
                            "Redirect visitors to a less crowded gate"
                    )

                    .confidence(95)

                    .build();
        }

        /*
         * Find the queue with the
         * longest waiting time.
         */
        Queue longestQueue =
                queues.stream()

                        .filter(
                                queue ->
                                        queue.getWaitingTime()
                                                != null
                        )

                        .max(
                                Comparator.comparing(
                                        Queue::getWaitingTime
                                )
                        )

                        .orElse(null);

        /*
         * Long-queue recommendation
         */
        if (longestQueue != null
                && longestQueue
                .getWaitingTime() >= 10) {

            return AIRecommendation.builder()

                    .id(
                            UUID.randomUUID()
                                    .toString()
                    )

                    .title(
                            "Long Queue Detected"
                    )

                    .description(

                            longestQueue
                                    .getLocation()

                            + " currently has a "

                            + longestQueue
                                    .getWaitingTime()

                            + "-minute waiting time."
                    )

                    .priority("medium")

                    .action(
                            "Open another service counter"
                    )

                    .confidence(90)

                    .build();
        }

        /*
         * Normal recommendation
         */
        return AIRecommendation.builder()

                .id(
                        UUID.randomUUID()
                                .toString()
                )

                .title(
                        "Stadium Operations Normal"
                )

                .description(
                        "Crowd and queue conditions are currently stable."
                )

                .priority("low")

                .action(
                        "Continue monitoring stadium conditions"
                )

                .confidence(88)

                .build();
    }
}
