package com.matchdayai.dto.gemini;

import java.util.List;

import lombok.Data;

@Data
public class GeminiContent {

    private List<GeminiPart> parts;
}