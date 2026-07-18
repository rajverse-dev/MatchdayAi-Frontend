package com.matchdayai.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.matchdayai.dto.QueueInfoResponse;
import com.matchdayai.service.QueueService;

@RestController
@RequestMapping("/api/queues")
public class QueueController {

    private final QueueService queueService;

    public QueueController(
            QueueService queueService
    ) {
        this.queueService = queueService;
    }

    @GetMapping
    public List<QueueInfoResponse> getAllQueues() {

        return queueService.getAllQueues();
    }
}