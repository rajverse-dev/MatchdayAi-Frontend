package com.matchdayai.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "announcements")
public class Announcement {

    @Id
    private String id;

    private String title;

    private String message;
}