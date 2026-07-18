package com.matchdayai.controller;

import com.matchdayai.entity.AIRecommendation;

import com.matchdayai.service.RecommendationService;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(
        "/api/recommendations"
)
public class RecommendationController {

    private final RecommendationService
            recommendationService;

    public RecommendationController(
            RecommendationService
                    recommendationService
    ) {

        this.recommendationService =
                recommendationService;
    }

    @GetMapping
    public ResponseEntity<AIRecommendation>
    getRecommendation() {

        AIRecommendation recommendation =
                recommendationService
                        .generateRecommendation();

        return ResponseEntity.ok(
                recommendation
        );
    }
}
