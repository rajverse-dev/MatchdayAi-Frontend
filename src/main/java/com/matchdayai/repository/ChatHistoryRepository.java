package com.matchdayai.repository;

import com.matchdayai.entity.ChatHistory;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatHistoryRepository
        extends MongoRepository<ChatHistory, String> {

    List<ChatHistory>
    findByConversationIdOrderByTimestampAsc(
            String conversationId
    );
}