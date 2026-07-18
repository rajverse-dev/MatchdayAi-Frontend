package com.matchdayai.dto.gemini;

import java.util.List;

import lombok.Data;

@Data
public class GeminiResponse {

    private List<GeminiCandidate> candidates;
}