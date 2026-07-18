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
@Document(collection = "crowd")
public class Crowd {

    @Id
    private String id;

    private String gate;

    private Integer crowdPercentage;

    private String status;
    
    private LocalDateTime updatedAt;
}
