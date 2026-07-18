package com.matchdayai.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "queues")
public class Queue {

    @Id
    private String id;

    private String location;

    private Integer waitingTime;

    private Integer people;

    private LocalDateTime updatedAt;

}
