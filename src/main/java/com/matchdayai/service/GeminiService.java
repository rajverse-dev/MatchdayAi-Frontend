package com.matchdayai.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.matchdayai.dto.gemini.GeminiResponse;

@Service
public class GeminiService {

    private final RestClient restClient;
    private final String apiKey;
    private final String model;

    public GeminiService(
            @Value("${gemini.api.url}")
            String apiUrl,

            @Value("${gemini.api.key}")
            String apiKey,

            @Value("${gemini.model}")
            String model
    ) {

        this.restClient = RestClient.builder()
                .baseUrl(apiUrl)
                .build();

        this.apiKey = apiKey;
        this.model = model;

        // Safe debugging: does not display the actual API key.
        System.out.println(
                "Gemini API configured: "
                        + (apiKey != null && !apiKey.isBlank())
        );

        System.out.println(
                "Gemini API key length: "
                        + (apiKey == null ? 0 : apiKey.length())
        );

        System.out.println(
                "Gemini model: " + model
        );
    }

    public String generateResponse(
            String userMessage,
            String language,
            String stadiumContext,
            String conversationHistory
    ) {

        if (apiKey == null || apiKey.isBlank()) {

            return "AI chat is not configured yet. "
                    + "Please set GEMINI_API_KEY "
                    + "and restart the backend.";
        }

        String prompt = """

        You are MatchDay AI, an intelligent,
        multilingual smart-stadium assistant.

        Use the supplied live stadium data and
        previous conversation to answer the user.

        IMPORTANT RULES:

        1. Use current stadium data for crowd,
           queue, transport, navigation and
           emergency questions.

        2. Use previous conversation when the
           user refers to earlier information
           using words such as:
           "it", "that", "there", "this gate",
           "the same place" or "that route".

        3. Current stadium data has priority
           over old conversation information.

        4. Do not invent live stadium values.

        5. If information is unavailable, say:
           "Current information is unavailable."

        6. Give clear and concise answers.

        7. Respond using the requested language.

        8. For emergencies, advise the visitor
           to follow stadium staff instructions.

        CURRENT STADIUM DATA:

        %s


        PREVIOUS CONVERSATION:

        %s


        REQUESTED LANGUAGE:

        %s


        CURRENT USER QUESTION:

        %s

        """.formatted(
        stadiumContext,
        conversationHistory,
        language,
        userMessage
);

        Map<String, Object> requestBody = Map.of(

                "contents",
                List.of(

                        Map.of(

                                "parts",
                                List.of(

                                        Map.of(
                                                "text",
                                                prompt
                                        )
                                )
                        )
                )
        );

        try {

            GeminiResponse response = restClient
                    .post()

                    .uri(
                            "/models/{model}:generateContent?key={apiKey}",
                            model,
                            apiKey
                    )

                    .contentType(
                            MediaType.APPLICATION_JSON
                    )

                    .body(requestBody)

                    .retrieve()

                    .body(
                            GeminiResponse.class
                    );

            if (response == null
                    || response.getCandidates() == null
                    || response.getCandidates().isEmpty()
                    || response.getCandidates()
                            .get(0)
                            .getContent() == null
                    || response.getCandidates()
                            .get(0)
                            .getContent()
                            .getParts() == null
                    || response.getCandidates()
                            .get(0)
                            .getContent()
                            .getParts()
                            .isEmpty()) {

                return "Gemini returned an empty response. "
                        + "Please try again.";
            }

            return response
                    .getCandidates()
                    .get(0)
                    .getContent()
                    .getParts()
                    .get(0)
                    .getText();

        } catch (Exception exception) {

            System.err.println(
                    "Gemini API error: "
                            + exception.getMessage()
            );

            return "Gemini request failed: "
                    + exception.getMessage();
        }
    }
}