package com.matchdayai.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.matchdayai.dto.QueueInfoResponse;

@Service
public class QueueService {

    public List<QueueInfoResponse> getAllQueues() {

        return List.of(

                QueueInfoResponse.builder()
                        .id("queue-001")
                        .stallName("Champions Burger")
                        .location("North Concourse - Level 1")
                        .waitingTime(4)
                        .estimatedTime(6)
                        .peopleInLine(12)
                        .status("low")
                        .progress(25)
                        .category("food")
                        .rating(4.7)
                        .build(),

                QueueInfoResponse.builder()
                        .id("queue-002")
                        .stallName("Main Restroom A")
                        .location("East Stand - Level 2")
                        .waitingTime(8)
                        .estimatedTime(10)
                        .peopleInLine(28)
                        .status("medium")
                        .progress(50)
                        .category("restroom")
                        .rating(4.2)
                        .build(),

                QueueInfoResponse.builder()
                        .id("queue-003")
                        .stallName("Official FIFA Store")
                        .location("West Concourse")
                        .waitingTime(18)
                        .estimatedTime(22)
                        .peopleInLine(65)
                        .status("high")
                        .progress(85)
                        .category("merchandise")
                        .rating(4.8)
                        .build(),

                QueueInfoResponse.builder()
                        .id("queue-004")
                        .stallName("Ticket Support Desk")
                        .location("South Gate")
                        .waitingTime(12)
                        .estimatedTime(15)
                        .peopleInLine(35)
                        .status("medium")
                        .progress(60)
                        .category("ticket")
                        .rating(4.4)
                        .build(),

                QueueInfoResponse.builder()
                        .id("queue-005")
                        .stallName("World Cup Pizza")
                        .location("South Concourse - Level 1")
                        .waitingTime(25)
                        .estimatedTime(30)
                        .peopleInLine(80)
                        .status("high")
                        .progress(92)
                        .category("food")
                        .rating(4.5)
                        .build(),

                QueueInfoResponse.builder()
                        .id("queue-006")
                        .stallName("Upper-Level Restroom")
                        .location("North Stand - Level 3")
                        .waitingTime(0)
                        .estimatedTime(0)
                        .peopleInLine(0)
                        .status("closed")
                        .progress(0)
                        .category("restroom")
                        .rating(4.0)
                        .build()
        );
    }
}
