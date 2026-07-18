package com.matchdayai.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "transport_options")
public class Transport {

    @Id
    private String id;

    private String route;

    private String status;

    private Integer eta;
}
