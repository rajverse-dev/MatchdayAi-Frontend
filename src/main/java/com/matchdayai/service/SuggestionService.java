package com.matchdayai.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuggestionService {

    public List<String> generateSuggestions(
            String userMessage
    ) {

        if (userMessage == null
                || userMessage.isBlank()) {

            return getDefaultSuggestions();
        }

        String message =
                userMessage.toLowerCase();

        /*
         * Crowd-related suggestions
         */
        if (containsAny(
                message,
                "crowd",
                "crowded",
                "density",
                "busy",
                "gate"
        )) {

            return List.of(
                    "Show all gate crowd levels",
                    "Which gate has the lowest crowd?",
                    "Find the nearest entrance"
            );
        }

        /*
         * Queue-related suggestions
         */
        if (containsAny(
                message,
                "queue",
                "waiting",
                "wait time",
                "food",
                "restaurant",
                "stall"
        )) {

            return List.of(
                    "Show all queue waiting times",
                    "Which location has the shortest queue?",
                    "Find nearby food locations"
            );
        }

        /*
         * Transport-related suggestions
         */
        if (containsAny(
                message,
                "transport",
                "metro",
                "bus",
                "shuttle",
                "parking",
                "arrival",
                "eta"
        )) {

            return List.of(
                    "Which transport arrives first?",
                    "Show available transport options",
                    "Check parking information"
            );
        }

        /*
         * Navigation-related suggestions
         */
        if (containsAny(
                message,
                "where",
                "location",
                "navigate",
                "direction",
                "restroom",
                "medical centre",
                "medical center",
                "entrance",
                "exit",
                "seat"
        )) {

            return List.of(
                    "Where is the nearest restroom?",
                    "Show the Medical Centre",
                    "Find an accessible entrance"
            );
        }

        /*
         * Emergency-related suggestions
         */
        if (containsAny(
                message,
                "emergency",
                "medical",
                "fire",
                "security",
                "incident",
                "danger",
                "help"
        )) {

            return List.of(
                    "Are there any active emergencies?",
                    "Where is the Medical Centre?",
                    "Show the nearest emergency exit"
            );
        }

        return getDefaultSuggestions();
    }

    private boolean containsAny(
            String message,
            String... keywords
    ) {

        for (String keyword : keywords) {

            if (message.contains(keyword)) {
                return true;
            }
        }

        return false;
    }

    private List<String> getDefaultSuggestions() {

        return List.of(
                "Which gate has the lowest crowd?",
                "Find the shortest queue",
                "Show available transport options"
        );
    }
}
