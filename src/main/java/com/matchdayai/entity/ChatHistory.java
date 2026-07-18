package com.matchdayai.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "chat_history")
public class ChatHistory {

    @Id
    private String id;

    private String conversationId;

    private String role;

    private String content;

    private String language;

    private LocalDateTime timestamp;
}