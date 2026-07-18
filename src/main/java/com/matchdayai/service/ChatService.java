package com.matchdayai.service;

import com.matchdayai.dto.ChatRequest;
import com.matchdayai.dto.ChatResponse;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ChatService {

    private final GeminiService
            geminiService;

    private final StadiumContextService
            stadiumContextService;

    private final SuggestionService
            suggestionService;

    private final ChatMemoryService
            chatMemoryService;

    public ChatService(

            GeminiService geminiService,

            StadiumContextService
                    stadiumContextService,

            SuggestionService
                    suggestionService,

            ChatMemoryService
                    chatMemoryService
    ) {

        this.geminiService =
                geminiService;

        this.stadiumContextService =
                stadiumContextService;

        this.suggestionService =
                suggestionService;

        this.chatMemoryService =
                chatMemoryService;
    }

    public ChatResponse getResponse(
            ChatRequest request
    ) {

        String conversationId =
                request.getConversationId();

        if (conversationId == null
                || conversationId.isBlank()) {

            conversationId =
                    UUID.randomUUID()
                            .toString();
        }

        String language =
                request.getLanguage();

        if (language == null
                || language.isBlank()) {

            language = "en";
        }

        String conversationHistory =
                chatMemoryService
                        .buildConversationContext(
                                conversationId
                        );

        String stadiumContext =
                stadiumContextService
                        .getStadiumContext();

        chatMemoryService.saveMessage(

                conversationId,

                "user",

                request.getMessage(),

                language
        );

        String aiReply =
                geminiService
                        .generateResponse(

                                request.getMessage(),

                                language,

                                stadiumContext,

                                conversationHistory
                        );

        chatMemoryService.saveMessage(

                conversationId,

                "assistant",

                aiReply,

                language
        );

        List<String> suggestions =
                suggestionService
                        .generateSuggestions(
                                request.getMessage()
                        );

        return ChatResponse.builder()

                .reply(aiReply)

                .conversationId(
                        conversationId
                )

                .suggestions(
                        suggestions
                )

                .build();
    }
}