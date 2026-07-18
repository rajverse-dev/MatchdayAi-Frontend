package com.matchdayai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardAnnouncement {

    private String id;

    private String title;

    private String message;

    private String type;

    private String timestamp;
}
