package com.matchdayai.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequest {

    private String message;

    private String language;

    private String conversationId;
}