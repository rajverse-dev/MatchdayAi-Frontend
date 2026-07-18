package com.matchdayai.service;

import com.matchdayai.entity.ChatHistory;
import com.matchdayai.repository.ChatHistoryRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatMemoryService {

    private final ChatHistoryRepository
            chatHistoryRepository;

    public ChatMemoryService(
            ChatHistoryRepository
                    chatHistoryRepository
    ) {

        this.chatHistoryRepository =
                chatHistoryRepository;
    }

    /*
     * Save one user or assistant message.
     */
    public void saveMessage(
            String conversationId,
            String role,
            String content,
            String language
    ) {

        ChatHistory message =
                ChatHistory.builder()

                        .conversationId(
                                conversationId
                        )

                        .role(role)

                        .content(content)

                        .language(language)

                        .timestamp(
                                LocalDateTime.now()
                        )

                        .build();

        chatHistoryRepository.save(
                message
        );
    }

    /*
     * Load all previous messages
     * from one conversation.
     */
    public List<ChatHistory>
    getConversationHistory(
            String conversationId
    ) {

        return chatHistoryRepository
                .findByConversationIdOrderByTimestampAsc(
                        conversationId
                );
    }

    /*
     * Convert previous messages
     * into text for Gemini.
     */
    public String buildConversationContext(
            String conversationId
    ) {

        List<ChatHistory> history =
                getConversationHistory(
                        conversationId
                );

        if (history.isEmpty()) {

            return """
                    No previous conversation.
                    """;
        }

        StringBuilder context =
                new StringBuilder();

        for (ChatHistory message : history) {

            context
                    .append(
                            message.getRole()
                                    .toUpperCase()
                    )

                    .append(": ")

                    .append(
                            message.getContent()
                    )

                    .append("\n");
        }

        return context.toString();
    }

    /*
     * Delete one complete conversation.
     */
    public void clearConversation(
            String conversationId
    ) {

        List<ChatHistory> messages =
                getConversationHistory(
                        conversationId
                );

        chatHistoryRepository.deleteAll(
                messages
        );
    }
}